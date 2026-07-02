import base64
import hashlib
import hmac
import json
import secrets
from datetime import UTC, datetime, timedelta
from typing import Any

from fastapi import HTTPException, Request, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.bookings.models import BookingSubmissionAttempt
from app.bookings.schemas import BookingCreate
from app.settings import Settings

TOKEN_VERSION = 1
BOT_MESSAGE = "Could not submit booking. Please refresh the page and try again."
RATE_LIMIT_MESSAGE = "Too many booking attempts. Please try again later."


def create_spam_token(settings: Settings) -> str:
    payload = {
        "v": TOKEN_VERSION,
        "iat": int(datetime.now(UTC).timestamp()),
        "nonce": secrets.token_urlsafe(16),
    }
    encoded = encode_json(payload)
    signature = sign(encoded, settings.spam_secret())
    return f"{encoded}.{signature}"


def validate_booking_submission(
    request: Request,
    payload: BookingCreate,
    db: Session,
    settings: Settings,
) -> None:
    ip_hash = hash_value(client_ip(request, settings), settings.spam_secret())
    email_hash = hash_value(payload.email.lower(), settings.spam_secret())

    reason = spam_reason(payload, settings)
    if not reason:
        reason = rate_limit_reason(db, ip_hash, email_hash, settings)

    if reason:
        record_attempt(db, ip_hash, email_hash, accepted=False, reason=reason)
        if reason in {"ip_rate_limited", "email_rate_limited"}:
            raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS, detail=RATE_LIMIT_MESSAGE)
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, detail=BOT_MESSAGE)

    record_attempt(db, ip_hash, email_hash, accepted=True, reason="accepted")


def spam_reason(payload: BookingCreate, settings: Settings) -> str | None:
    if payload.company_website and payload.company_website.strip():
        return "honeypot"

    token_payload = decode_spam_token(payload.spam_token, settings)
    if not token_payload:
        return "invalid_token"

    issued_at = token_payload["iat"]
    now = datetime.now(UTC)
    age = (now - issued_at).total_seconds()
    if age < settings.booking_min_submit_seconds:
        return "too_fast"
    if age > settings.booking_token_max_age_seconds:
        return "expired_token"
    return None


def decode_spam_token(token: str, settings: Settings) -> dict[str, datetime] | None:
    try:
        encoded, signature = token.split(".", 1)
        expected = sign(encoded, settings.spam_secret())
        if not hmac.compare_digest(signature, expected):
            return None

        data = decode_json(encoded)
        if data.get("v") != TOKEN_VERSION or not isinstance(data.get("iat"), int):
            return None
        return {"iat": datetime.fromtimestamp(data["iat"], UTC)}
    except (ValueError, KeyError, TypeError, json.JSONDecodeError):
        return None


def rate_limit_reason(
    db: Session,
    ip_hash: str,
    email_hash: str,
    settings: Settings,
) -> str | None:
    now = datetime.now(UTC)
    ip_count = count_attempts(db, BookingSubmissionAttempt.ip_hash, ip_hash, now - timedelta(hours=1))
    if ip_count >= settings.booking_ip_limit_per_hour:
        return "ip_rate_limited"

    email_count = count_attempts(
        db,
        BookingSubmissionAttempt.email_hash,
        email_hash,
        now - timedelta(days=1),
    )
    if email_count >= settings.booking_email_limit_per_day:
        return "email_rate_limited"
    return None


def count_attempts(db: Session, column: Any, value: str, since: datetime) -> int:
    return db.scalar(
        select(func.count()).select_from(BookingSubmissionAttempt).where(
            column == value,
            BookingSubmissionAttempt.created_at >= since,
        )
    ) or 0


def record_attempt(
    db: Session,
    ip_hash: str,
    email_hash: str,
    *,
    accepted: bool,
    reason: str,
) -> None:
    db.add(
        BookingSubmissionAttempt(
            ip_hash=ip_hash,
            email_hash=email_hash,
            accepted=accepted,
            reason=reason,
        )
    )
    db.commit()


def client_ip(request: Request, settings: Settings) -> str:
    if settings.trust_proxy_headers:
        forwarded = request.headers.get("x-forwarded-for")
        if forwarded:
            return forwarded.split(",", 1)[0].strip()
    if request.client:
        return request.client.host
    return "unknown"


def hash_value(value: str, secret: str) -> str:
    return hmac.new(secret.encode(), value.encode(), hashlib.sha256).hexdigest()


def sign(value: str, secret: str) -> str:
    digest = hmac.new(secret.encode(), value.encode(), hashlib.sha256).digest()
    return base64.urlsafe_b64encode(digest).decode().rstrip("=")


def encode_json(value: dict[str, object]) -> str:
    raw = json.dumps(value, separators=(",", ":"), sort_keys=True).encode()
    return base64.urlsafe_b64encode(raw).decode().rstrip("=")


def decode_json(value: str) -> dict[str, object]:
    padding = "=" * (-len(value) % 4)
    raw = base64.urlsafe_b64decode(f"{value}{padding}")
    return json.loads(raw)
