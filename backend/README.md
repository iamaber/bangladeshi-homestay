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

Create local env:

```bash
cp .env.example .env
```

Then run the API:

```bash
uv run uvicorn app.main:app --reload
```

## Configuration

Swiss QR invoices require real creditor settings in environment variables:

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

Admin endpoints require the `X-Admin-Key` header.
