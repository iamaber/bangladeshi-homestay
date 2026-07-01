# Bangladeshi Homestay

This repository is split into two applications:

- `frontend/`: static-export Next.js website.
- `backend/`: FastAPI service for booking support and Swiss QR invoice PDFs.

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

The backend generates Swiss QR invoice PDFs through `POST /payments/swiss-qr/invoices`.
Real creditor bank details must be supplied through backend environment variables before use.
