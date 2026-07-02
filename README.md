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

Set `APP_ADMIN_API_KEY` and the real Swiss QR creditor values in `.env`.

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

## Swiss QR Invoices

The backend generates Swiss QR invoice PDFs from admin booking rows through `/admin/bookings/{id}/invoice.pdf`.
Real creditor bank details must be supplied in the root `.env` file before use.

## Booking Flow

1. Guest submits `/booking`; the frontend posts to `POST /bookings`.
2. Backend stores the booking in PostgreSQL with status `requested`.
3. Admin opens `/admin`, enters `APP_ADMIN_API_KEY`, reviews bookings, and updates status.
4. Admin opens the Swiss QR invoice PDF, sends it to the guest, and marks status `invoice_sent`.
5. After bank payment is visible, admin marks status `paid`, then `confirmed`.
