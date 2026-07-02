# Bangladeshi Homestay Backend

FastAPI backend for booking storage, admin status tracking, and Swiss QR invoice PDF generation.

## Setup

Install dependencies with uv:

```bash
uv sync
```

Add packages only with `uv add`.

## Run

Start PostgreSQL from the repo root:

```bash
docker compose up -d postgres
```

Create the root local env file:

```bash
cd ..
cp .env.example .env
```

Then run the API from `backend/`:

```bash
cd backend
uv run uvicorn app.main:app --reload
```

For an existing database, apply schema upgrades before starting the new version:

```bash
uv run python scripts/upgrade_db.py
```

## Configuration

Swiss QR invoices require real creditor settings in the root `.env` file:

```bash
APP_CREDITOR_IBAN=CH0000000000000000000
APP_CREDITOR_NAME="Guru Gasthaus"
APP_CREDITOR_STREET="Bahnhofstrasse"
APP_CREDITOR_BUILDING_NUMBER=1
APP_CREDITOR_POSTAL_CODE=8001
APP_CREDITOR_CITY=Zurich
APP_CREDITOR_COUNTRY=CH
```

Default contact values:

```bash
APP_CONTACT_EMAIL=hello@gurugasthaus.com
APP_CONTACT_PHONE="+41 77 400 72 56"
```

Booking spam protection values:

```bash
APP_BOOKING_SPAM_SECRET=change-this-booking-spam-secret
APP_BOOKING_MIN_SUBMIT_SECONDS=4
APP_BOOKING_TOKEN_MAX_AGE_SECONDS=1800
APP_BOOKING_IP_LIMIT_PER_HOUR=5
APP_BOOKING_EMAIL_LIMIT_PER_DAY=2
APP_TRUST_PROXY_HEADERS=false
```

SMTP email values:

```bash
APP_EMAILS_ENABLED=false
APP_SMTP_HOST=smtp.example.com
APP_SMTP_PORT=587
APP_SMTP_USERNAME=change-this-smtp-username
APP_SMTP_PASSWORD=change-this-smtp-password
APP_SMTP_FROM_EMAIL=hello@gurugasthaus.com
APP_SMTP_FROM_NAME="Guru Gasthaus"
APP_ADMIN_NOTIFICATION_EMAIL=hello@gurugasthaus.com
```

## Checks

```bash
uv run pytest
uv run ruff check .
```

## Flow

- Public booking form: `POST /bookings`
- Admin list: `GET /admin/bookings`
- Admin status update: `PATCH /admin/bookings/{id}/status`
- Admin invoice PDF: `GET /admin/bookings/{id}/invoice.pdf`
- Admin invoice email: `POST /admin/bookings/{id}/send-invoice`
- Admin host blackout list/create/delete: `/admin/hosts/blackouts`

Admin endpoints require the `X-Admin-Key` header.
