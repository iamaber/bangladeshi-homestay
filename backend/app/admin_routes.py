from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from app.admin import require_admin
from app.bookings.availability import list_blackouts
from app.bookings.hosts import host_for_id
from app.bookings.models import Booking, BookingStatus, HostBlackoutDate
from app.bookings.routes import get_booking_or_404, list_bookings, update_booking_status
from app.bookings.schemas import BookingRead, BookingStatusUpdate, HostBlackoutCreate, HostBlackoutRead
from app.database import get_db
from app.email import send_invoice_email
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


@router.get("/hosts/blackouts", response_model=list[HostBlackoutRead])
def admin_list_host_blackouts(
    host_id: str | None = None,
    db: Session = Depends(get_db),
) -> list[HostBlackoutDate]:
    return list_blackouts(db, host_id)


@router.post("/hosts/blackouts", response_model=HostBlackoutRead, status_code=status.HTTP_201_CREATED)
def admin_create_host_blackout(
    payload: HostBlackoutCreate,
    db: Session = Depends(get_db),
) -> HostBlackoutDate:
    if not host_for_id(payload.host_id):
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, detail="Unknown host")
    blackout = HostBlackoutDate(**payload.model_dump())
    db.add(blackout)
    db.commit()
    db.refresh(blackout)
    return blackout


@router.delete("/hosts/blackouts/{blackout_id}", status_code=status.HTTP_204_NO_CONTENT)
def admin_delete_host_blackout(
    blackout_id: int,
    db: Session = Depends(get_db),
) -> Response:
    blackout = db.get(HostBlackoutDate, blackout_id)
    if not blackout:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blackout not found")
    db.delete(blackout)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


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


@router.post("/bookings/{booking_id}/send-invoice", response_model=BookingRead)
def admin_send_booking_invoice(
    booking_id: str,
    db: Session = Depends(get_db),
    settings: Settings = Depends(get_settings),
) -> Booking:
    booking = get_booking_or_404(booking_id, db)
    try:
        creditor = settings.creditor()
        invoice = invoice_from_booking(booking)
        qr_payload = build_swiss_qr_payload(invoice, creditor)
        pdf = render_swiss_qr_invoice_pdf(invoice, creditor, qr_payload)
        send_invoice_email(booking, pdf, settings)
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(error),
        ) from error

    booking.status = BookingStatus.invoice_sent
    db.commit()
    db.refresh(booking)
    return booking


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
