from decimal import Decimal

from fastapi.testclient import TestClient

from app.main import app
from app.payments.models import StructuredAddress, SwissQrInvoiceRequest
from app.payments.swiss_qr import build_swiss_qr_payload
from app.settings import CreditorSettings, get_settings


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
