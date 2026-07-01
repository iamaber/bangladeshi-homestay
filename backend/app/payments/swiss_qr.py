from decimal import Decimal

from app.payments.models import StructuredAddress, SwissQrInvoiceRequest, SwissQrPayload
from app.settings import CreditorSettings


SWISS_QR_HEADER = "SPC"
SWISS_QR_VERSION = "0200"
SWISS_QR_CODING_TYPE = "1"
REFERENCE_TYPE_NONE = "NON"
SWISS_QR_TRAILER = "EPD"
SUPPORTED_CURRENCY = "CHF"


def build_swiss_qr_payload(
    invoice: SwissQrInvoiceRequest,
    creditor: CreditorSettings,
) -> SwissQrPayload:
    lines = [
        SWISS_QR_HEADER,
        SWISS_QR_VERSION,
        SWISS_QR_CODING_TYPE,
        compact_iban(creditor.iban),
        *structured_address_lines(
            StructuredAddress(
                name=creditor.name,
                street=creditor.street,
                building_number=creditor.building_number,
                postal_code=creditor.postal_code,
                city=creditor.city,
                country=creditor.country,
            )
        ),
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        format_amount(invoice.amount),
        SUPPORTED_CURRENCY,
        *structured_address_lines(invoice.debtor),
        REFERENCE_TYPE_NONE,
        "",
        invoice.message or invoice.invoice_id,
        SWISS_QR_TRAILER,
        "",
        "",
    ]
    return SwissQrPayload(invoice_id=invoice.invoice_id, payload="\n".join(lines))


def structured_address_lines(address: StructuredAddress) -> list[str]:
    return [
        "S",
        address.name,
        address.street,
        address.building_number,
        address.postal_code,
        address.city,
        address.country,
    ]


def compact_iban(value: str) -> str:
    return "".join(value.split()).upper()


def format_amount(value: Decimal) -> str:
    return f"{value:.2f}"
