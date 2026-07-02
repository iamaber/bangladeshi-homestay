from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from app.bookings.models import Booking, BookingStatus
from app.bookings.routes import get_booking_or_404, list_bookings, update_booking_status
from app.bookings.schemas import BookingRead, BookingStatusUpdate
from app.database import get_db
from app.email import EmailDeliveryError
from app.invoices import render_booking_invoice_pdf, send_booking_invoice
from app.settings import Settings, get_settings


router = APIRouter()


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
        pdf = render_booking_invoice_pdf(booking, settings)
    except ValueError as error:
        raise service_unavailable(error) from error

    headers = {"Content-Disposition": f'inline; filename="{booking.id}.pdf"'}
    return Response(content=pdf, media_type="application/pdf", headers=headers)


@router.post("/bookings/{booking_id}/send-invoice", response_model=BookingRead)
def admin_send_booking_invoice(
    booking_id: str,
    db: Session = Depends(get_db),
    settings: Settings = Depends(get_settings),
) -> Booking:
    booking = get_booking_or_404(booking_id, db)
    try:
        send_booking_invoice(booking, settings)
    except (ValueError, EmailDeliveryError) as error:
        raise service_unavailable(error) from error

    booking.status = BookingStatus.invoice_sent
    db.commit()
    db.refresh(booking)
    return booking


def service_unavailable(error: Exception) -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        detail=str(error),
    )
