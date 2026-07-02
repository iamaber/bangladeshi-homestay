from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.bookings.models import Booking
from app.bookings.schemas import BookingCreate, BookingRead, BookingStatusUpdate
from app.bookings.spam import create_spam_token, validate_booking_submission
from app.database import get_db
from app.settings import Settings, get_settings


router = APIRouter(prefix="/bookings", tags=["bookings"])


@router.get("/spam-token")
def booking_spam_token(settings: Settings = Depends(get_settings)) -> dict[str, str]:
    return {"token": create_spam_token(settings)}


@router.post("", response_model=BookingRead, status_code=status.HTTP_201_CREATED)
def create_booking(
    payload: BookingCreate,
    request: Request,
    db: Session = Depends(get_db),
    settings: Settings = Depends(get_settings),
) -> Booking:
    validate_booking_submission(request, payload, db, settings)
    booking = Booking(**payload.model_dump(exclude={"spam_token", "company_website"}))
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking


def list_bookings(db: Session) -> list[Booking]:
    return list(db.scalars(select(Booking).order_by(Booking.created_at.desc())))


def get_booking_or_404(booking_id: str, db: Session) -> Booking:
    booking = db.get(Booking, booking_id)
    if not booking:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found")
    return booking


def update_booking_status(
    booking_id: str,
    payload: BookingStatusUpdate,
    db: Session,
) -> Booking:
    booking = get_booking_or_404(booking_id, db)
    booking.status = payload.status
    db.commit()
    db.refresh(booking)
    return booking
