from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from app.admin import require_admin
from app.bookings.models import Booking
from app.bookings.routes import get_booking_or_404, list_bookings, update_booking_status
from app.bookings.schemas import BookingRead, BookingStatusUpdate
from app.database import get_db
from app.payments.models import StructuredAddress, SwissQrInvoiceRequest
from app.payments.pdf import render_swiss_qr_invoice_pdf
from app.payments.swiss_qr import build_swiss_qr_payload
from app.settings import Settings, get_settings


router = APIRouter(
    prefix="/admin",
    tags=["admin"],
    dependencies=[Depends(require_admin)],
)


@router.get("/bookings", response_model=list[BookingRead])
def admin_list_bookings(db: Session = Depends(get_db)) -> list[Booking]:
    return list_bookings(db)


@router.patch("/bookings/{booking_id}/status", response_model=BookingRead)
def admin_update_booking_status(
    booking_id: str,
    payload: BookingStatusUpdate,
    db: Session = Depends(get_db),
) -> Booking:
    return update_booking_status(booking_id, payload, db)


@router.get("/bookings/{booking_id}/invoice.pdf", response_class=Response)
def admin_booking_invoice(
    booking_id: str,
    db: Session = Depends(get_db),
    settings: Settings = Depends(get_settings),
) -> Response:
    booking = get_booking_or_404(booking_id, db)
    try:
        creditor = settings.creditor()
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(error),
        ) from error

    invoice = invoice_from_booking(booking)
    qr_payload = build_swiss_qr_payload(invoice, creditor)
    pdf = render_swiss_qr_invoice_pdf(invoice, creditor, qr_payload)
    headers = {"Content-Disposition": f'inline; filename="{booking.id}.pdf"'}
    return Response(content=pdf, media_type="application/pdf", headers=headers)


def invoice_from_booking(booking: Booking) -> SwissQrInvoiceRequest:
    return SwissQrInvoiceRequest(
        invoice_id=booking.id,
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
