from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from app.bookings.availability import list_blackouts
from app.bookings.hosts import host_for_id
from app.bookings.models import HostBlackoutDate
from app.bookings.schemas import HostBlackoutCreate, HostBlackoutRead
from app.database import get_db


router = APIRouter()


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
