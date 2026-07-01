from decimal import Decimal

from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.database import Base, get_db
from app.main import app
from app.bookings.models import BookingStatus
from app.payments.models import StructuredAddress, SwissQrInvoiceRequest
from app.payments.swiss_qr import build_swiss_qr_payload
from app.settings import CreditorSettings, get_settings


TestSessionLocal = sessionmaker(autoflush=False, expire_on_commit=False)


def override_test_db():
    db = TestSessionLocal()
    try:
        yield db
    finally:
        db.close()


def sample_creditor() -> CreditorSettings:
    return CreditorSettings(
        iban="CH93 0076 2011 6238 5295 7",
        name="Guru Gasthaus",
        street="Bahnhofstrasse",
        building_number="1",
        postal_code="8001",
        city="Zurich",
        country="CH",
    )


def sample_invoice() -> SwissQrInvoiceRequest:
    return SwissQrInvoiceRequest(
        invoice_id="GG-2026-0001",
        amount=Decimal("2700.00"),
        debtor=StructuredAddress(
            name="Sophie Baumann",
            street="Rue du Lac",
            building_number="7",
            postal_code="1200",
            city="Geneva",
            country="ch",
        ),
        message="Bangladeshi homestay booking GG-2026-0001",
    )


def sample_invoice_payload() -> dict[str, object]:
    invoice = sample_invoice()
    return {
        "invoice_id": invoice.invoice_id,
        "amount": str(invoice.amount),
        "debtor": invoice.debtor.model_dump(),
        "message": invoice.message,
    }


def sample_booking_payload() -> dict[str, object]:
    return {
        "first_name": "Sophie",
        "last_name": "Baumann",
        "email": "sophie@example.com",
        "phone": "+41 77 400 72 56",
        "country": "CH",
        "street": "Rue du Lac",
        "building_number": "7",
        "postal_code": "1200",
        "city": "Geneva",
        "guests": 2,
        "package": "Standard",
        "include_flight": False,
        "total_chf": "2700.00",
        "arrival_date": "2026-09-01",
        "departure_date": "2026-09-15",
        "notes": "Vegetarian meals.",
    }


def test_create_booking_and_update_status(monkeypatch) -> None:
    monkeypatch.setenv("APP_ADMIN_API_KEY", "test-admin-key")
    get_settings.cache_clear()
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    TestSessionLocal.configure(bind=engine)
    Base.metadata.create_all(bind=engine)
    app.dependency_overrides[get_db] = override_test_db
    client = TestClient(app)

    created = client.post("/bookings", json=sample_booking_payload())
    assert created.status_code == 201
    booking_id = created.json()["id"]
    assert created.json()["status"] == BookingStatus.requested.value

    listed = client.get("/admin/bookings", headers={"X-Admin-Key": "test-admin-key"})
    assert listed.status_code == 200
    assert listed.json()[0]["id"] == booking_id

    updated = client.patch(
        f"/admin/bookings/{booking_id}/status",
        headers={"X-Admin-Key": "test-admin-key"},
        json={"status": "paid"},
    )
    assert updated.status_code == 200
    assert updated.json()["status"] == "paid"
    app.dependency_overrides.clear()
    get_settings.cache_clear()


def test_admin_requires_configured_key() -> None:
    get_settings.cache_clear()
    client = TestClient(app)

    response = client.get("/admin/bookings", headers={"X-Admin-Key": "dev-admin-key"})

    assert response.status_code == 503
    assert response.json()["detail"] == "Admin API key is not configured"


def test_swiss_qr_payload_uses_expected_header_and_addresses() -> None:
    payload = build_swiss_qr_payload(sample_invoice(), sample_creditor())
    lines = payload.payload.split("\n")

    assert lines[0:4] == ["SPC", "0200", "1", "CH9300762011623852957"]
    assert "Guru Gasthaus" in lines
    assert "Sophie Baumann" in lines
    assert "2700.00" in lines
    assert lines[-3:] == ["EPD", "", ""]


def test_invoice_endpoint_returns_pdf(monkeypatch) -> None:
    monkeypatch.setenv("APP_CREDITOR_IBAN", "CH9300762011623852957")
    monkeypatch.setenv("APP_CREDITOR_NAME", "Guru Gasthaus")
    monkeypatch.setenv("APP_CREDITOR_STREET", "Bahnhofstrasse")
    monkeypatch.setenv("APP_CREDITOR_BUILDING_NUMBER", "1")
    monkeypatch.setenv("APP_CREDITOR_POSTAL_CODE", "8001")
    monkeypatch.setenv("APP_CREDITOR_CITY", "Zurich")
    get_settings.cache_clear()
    client = TestClient(app)

    response = client.post("/payments/swiss-qr/invoices", json=sample_invoice_payload())

    assert response.status_code == 200
    assert response.headers["content-type"] == "application/pdf"
    assert response.content.startswith(b"%PDF")
    get_settings.cache_clear()


def test_invoice_endpoint_reports_missing_creditor_settings() -> None:
    get_settings.cache_clear()
    client = TestClient(app)

    response = client.post("/payments/swiss-qr/invoices", json=sample_invoice_payload())

    assert response.status_code == 503
    assert "APP_CREDITOR_IBAN" in response.json()["detail"]
