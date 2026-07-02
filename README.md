# Bangladeshi Homestay

This repository is split into two applications:

- `frontend/`: static-export Next.js website.
- `backend/`: FastAPI service for booking storage, admin status tracking, and Swiss QR invoice PDFs.

## Local Setup

Start PostgreSQL:

```bash
docker compose up -d postgres
```

Create the root env file:

```bash
cp .env.example .env
```

Set `APP_ADMIN_API_KEY`, `APP_BOOKING_SPAM_SECRET`, contact values, SMTP values, and the real Swiss QR creditor values in `.env`.

## Frontend

```bash
cd frontend
npm run dev
```

Build and verify the static export:

```bash
npm run lint
npm run build
npm run verify:export
```

## Backend

Use uv for all Python package management. Add packages only with `uv add`.

```bash
cd backend
uv sync
uv run uvicorn app.main:app --reload
```

Run backend checks:

```bash
uv run pytest
uv run ruff check .
```

Upgrade an existing database after pulling schema changes:

```bash
uv run python scripts/upgrade_db.py
```

## Swiss QR Invoices

The backend generates Swiss QR invoice PDFs from admin booking rows through `/admin/bookings/{id}/invoice.pdf`.
Real creditor bank details must be supplied in the root `.env` file before use.

## Booking Spam Protection

The public booking form uses a signed spam token, a hidden honeypot field, minimum submit timing, and IP/email rate limits. Configure these root `.env` values before production:

```bash
APP_BOOKING_SPAM_SECRET=change-this-booking-spam-secret
APP_BOOKING_MIN_SUBMIT_SECONDS=4
APP_BOOKING_TOKEN_MAX_AGE_SECONDS=1800
APP_BOOKING_IP_LIMIT_PER_HOUR=5
APP_BOOKING_EMAIL_LIMIT_PER_DAY=2
APP_TRUST_PROXY_HEADERS=false
```

Set `APP_TRUST_PROXY_HEADERS=true` only when the API is behind a trusted reverse proxy that sets `X-Forwarded-For`.

## Availability and Email

Host availability is managed from `/admin` with blackout date ranges. Booking requests are rejected when the selected host is not bookable or overlaps a blackout range.

Automated email uses SMTP and is disabled by default. Set `APP_EMAILS_ENABLED=true` and configure these values before using invoice email delivery:

```bash
APP_SMTP_HOST=smtp.example.com
APP_SMTP_PORT=587
APP_SMTP_USERNAME=change-this-smtp-username
APP_SMTP_PASSWORD=change-this-smtp-password
APP_SMTP_FROM_EMAIL=hello@gurugasthaus.com
APP_SMTP_FROM_NAME="Guru Gasthaus"
APP_ADMIN_NOTIFICATION_EMAIL=hello@gurugasthaus.com
```

## Booking Flow

1. Guest submits `/booking`; the frontend posts to `POST /bookings`.
2. Backend stores the booking in PostgreSQL with status `requested`.
3. Admin opens `/admin`, enters `APP_ADMIN_API_KEY`, reviews bookings, and updates status.
4. Admin opens or emails the Swiss QR invoice PDF. Emailing the invoice marks status `invoice_sent`.
5. After bank payment is visible, admin marks status `paid`, then `confirmed`.
