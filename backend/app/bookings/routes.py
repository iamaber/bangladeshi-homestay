import logging

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.bookings.availability import host_unavailability_reason, list_blackouts
from app.bookings.hosts import host_for_id
from app.bookings.models import Booking
from app.bookings.schemas import (
    BookingCreate,
    BookingRead,
    BookingStatusUpdate,
    HostAvailabilityRead,
)
from app.bookings.spam import create_spam_token, validate_booking_submission
from app.database import get_db
from app.email import EmailConfigurationError, EmailDeliveryError, send_booking_emails
from app.settings import Settings, get_settings


router = APIRouter(prefix="/bookings", tags=["bookings"])
logger = logging.getLogger(__name__)


@router.get("/spam-token")
def booking_spam_token(settings: Settings = Depends(get_settings)) -> dict[str, str]:
    return {"token": create_spam_token(settings)}


@router.get("/availability", response_model=HostAvailabilityRead)
def host_availability(
    host_id: str,
    db: Session = Depends(get_db),
) -> dict[str, object]:
    host = host_for_id(host_id)
    return {
        "host_id": host_id,
        "bookable": bool(host and host.bookable),
        "blackouts": list_blackouts(db, host_id),
    }


@router.post("", response_model=BookingRead, status_code=status.HTTP_201_CREATED)
def create_booking(
    payload: BookingCreate,
    request: Request,
    db: Session = Depends(get_db),
    settings: Settings = Depends(get_settings),
) -> Booking:
    validate_booking_submission(request, payload, db, settings)
    unavailability_reason = host_unavailability_reason(
        db,
        payload.host_id,
        payload.arrival_date,
        payload.departure_date,
    )
    if unavailability_reason:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
            detail=unavailability_reason,
        )

    booking = Booking(**payload.model_dump(exclude={"spam_token", "company_website"}))
    db.add(booking)
    db.commit()
    db.refresh(booking)
    try:
        send_booking_emails(booking, settings)
    except (EmailConfigurationError, EmailDeliveryError):
        logger.exception("Booking %s was saved, but booking email delivery failed", booking.id)
    return booking


def list_bookings(db: Session) -> list[Booking]:
    return list(db.scalars(select(Booking).order_by(Booking.created_at.desc())))


def get_booking_or_404(booking_id: str, db: Session) -> Booking:
    booking = db.get(Booking, booking_id)
    if not booking:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found")
    return booking


def update_booking_status(
    booking_id: str,
    payload: BookingStatusUpdate,
    db: Session,
) -> Booking:
    booking = get_booking_or_404(booking_id, db)
    booking.status = payload.status
    db.commit()
    db.refresh(booking)
    return booking
