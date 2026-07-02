from datetime import date

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.bookings.hosts import host_for_id
from app.bookings.models import HostBlackoutDate
from app.bookings.schemas import BookingCreate


def list_blackouts(db: Session, host_id: str | None = None) -> list[HostBlackoutDate]:
    statement = select(HostBlackoutDate).order_by(
        HostBlackoutDate.host_id,
        HostBlackoutDate.start_date,
    )
    if host_id:
        statement = statement.where(HostBlackoutDate.host_id == host_id)
    return list(db.scalars(statement))


def ensure_host_bookable(payload: BookingCreate, db: Session) -> None:
    host = host_for_id(payload.host_id)
    if not host or not host.bookable:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
            detail="Selected host is not available for booking.",
        )

    if has_blackout_overlap(db, payload.host_id, payload.arrival_date, payload.departure_date):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
            detail="Selected host is not available for those dates.",
        )


def has_blackout_overlap(db: Session, host_id: str, start_date: date, end_date: date) -> bool:
    return (
        db.scalar(
            select(HostBlackoutDate.id)
            .where(HostBlackoutDate.host_id == host_id)
            .where(HostBlackoutDate.start_date <= end_date)
            .where(HostBlackoutDate.end_date >= start_date)
            .limit(1)
        )
        is not None
    )
