from fastapi import APIRouter, Depends

from app.admin import require_admin
from app.admin_bookings import router as bookings_router
from app.admin_hosts import router as hosts_router


router = APIRouter(
    prefix="/admin",
    tags=["admin"],
    dependencies=[Depends(require_admin)],
)
router.include_router(bookings_router)
router.include_router(hosts_router)
