from datetime import date

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.bookings.hosts import host_for_id
from app.bookings.models import HostBlackoutDate


def list_blackouts(db: Session, host_id: str | None = None) -> list[HostBlackoutDate]:
    statement = select(HostBlackoutDate).order_by(
        HostBlackoutDate.host_id,
        HostBlackoutDate.start_date,
    )
    if host_id:
        statement = statement.where(HostBlackoutDate.host_id == host_id)
    return list(db.scalars(statement))


def host_unavailability_reason(
    db: Session,
    host_id: str,
    start_date: date,
    end_date: date,
) -> str | None:
    host = host_for_id(host_id)
    if not host or not host.bookable:
        return "Selected host is not available for booking."

    if has_blackout_overlap(db, host_id, start_date, end_date):
        return "Selected host is not available for those dates."

    return None


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
