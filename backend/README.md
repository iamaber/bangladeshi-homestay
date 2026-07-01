# Bangladeshi Homestay Backend

FastAPI backend for booking support and Swiss QR invoice PDF generation.

## Setup

Install dependencies with uv:

```bash
uv sync
```

Add packages only with `uv add`.

## Run

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
