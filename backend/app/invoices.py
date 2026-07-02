from app.bookings.models import Booking
from app.email import send_invoice_email
from app.payments.models import StructuredAddress, SwissQrInvoiceRequest
from app.payments.pdf import render_swiss_qr_invoice_pdf
from app.payments.swiss_qr import build_swiss_qr_payload
from app.settings import Settings


def invoice_from_booking(booking: Booking) -> SwissQrInvoiceRequest:
    return SwissQrInvoiceRequest(
        invoice_id=booking.id.replace("-", ""),
        amount=booking.total_chf,
        debtor=StructuredAddress(
            name=f"{booking.first_name} {booking.last_name}",
            street=booking.street,
            building_number=booking.building_number,
            postal_code=booking.postal_code,
            city=booking.city,
            country=booking.country,
        ),
        message=f"Bangladeshi homestay booking {booking.id}",
    )


def render_booking_invoice_pdf(booking: Booking, settings: Settings) -> bytes:
    creditor = settings.creditor()
    invoice = invoice_from_booking(booking)
    qr_payload = build_swiss_qr_payload(invoice, creditor)
    return render_swiss_qr_invoice_pdf(invoice, creditor, qr_payload)


def send_booking_invoice(booking: Booking, settings: Settings) -> None:
    pdf = render_booking_invoice_pdf(booking, settings)
    send_invoice_email(booking, pdf, settings)
