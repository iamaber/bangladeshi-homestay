from email.message import EmailMessage
import smtplib

from app.bookings.models import Booking
from app.settings import Settings


class EmailDeliveryError(RuntimeError):
    pass


class EmailConfigurationError(ValueError):
    pass


def send_booking_emails(booking: Booking, settings: Settings) -> None:
    if not settings.emails_enabled:
        return
    ensure_smtp_configured(settings)

    send_email(
        settings,
        to_email=booking.email,
        subject=f"Booking request received: {booking.id}",
        body=(
            f"Dear {booking.first_name},\n\n"
            f"We received your booking request {booking.id} for "
            f"{booking.arrival_date} to {booking.departure_date}.\n\n"
            "We will review the details and email your Swiss QR invoice before any payment is due.\n\n"
            "Guru Gasthaus"
        ),
    )

    if settings.admin_notification_email:
        send_email(
            settings,
            to_email=settings.admin_notification_email,
            subject=f"New booking request: {booking.id}",
            body=(
                f"New booking request {booking.id}\n\n"
                f"Guest: {booking.first_name} {booking.last_name}\n"
                f"Email: {booking.email}\n"
                f"Dates: {booking.arrival_date} to {booking.departure_date}\n"
                f"Host: {booking.host_id}\n"
                f"Amount: CHF {booking.total_chf}"
            ),
        )


def send_invoice_email(booking: Booking, pdf: bytes, settings: Settings) -> None:
    ensure_smtp_configured(settings)
    send_email(
        settings,
        to_email=booking.email,
        subject=f"Swiss QR invoice for booking {booking.id}",
        body=(
            f"Dear {booking.first_name},\n\n"
            "Your Swiss QR invoice is attached. Please complete payment from your bank. "
            "Your booking is confirmed after payment is received.\n\n"
            "Guru Gasthaus"
        ),
        attachment=pdf,
        attachment_name=f"{booking.id}.pdf",
    )


def ensure_smtp_configured(settings: Settings) -> None:
    missing = settings.missing_smtp_fields()
    if missing:
        joined = ", ".join(missing)
        raise EmailConfigurationError(f"Missing SMTP settings: {joined}")


def send_email(
    settings: Settings,
    *,
    to_email: str,
    subject: str,
    body: str,
    attachment: bytes | None = None,
    attachment_name: str | None = None,
) -> None:
    message = EmailMessage()
    from_email = settings.smtp_from_email or ""
    from_name = settings.smtp_from_name or "Guru Gasthaus"
    message["From"] = f"{from_name} <{from_email}>"
    message["To"] = to_email
    message["Subject"] = subject
    message.set_content(body)

    if attachment and attachment_name:
        message.add_attachment(
            attachment,
            maintype="application",
            subtype="pdf",
            filename=attachment_name,
        )

    try:
        with smtplib.SMTP(settings.smtp_host or "", settings.smtp_port, timeout=20) as smtp:
            smtp.starttls()
            smtp.login(settings.smtp_username or "", settings.smtp_password or "")
            smtp.send_message(message)
    except (OSError, smtplib.SMTPException) as error:
        raise EmailDeliveryError(str(error)) from error
