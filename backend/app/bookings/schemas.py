from datetime import date, datetime
from decimal import Decimal

from pydantic import BaseModel, Field, ValidationInfo, field_validator, model_validator

from app.bookings.models import BookingStatus
from app.bookings.pricing import expected_total


class BookingBase(BaseModel):
    first_name: str = Field(min_length=1, max_length=80)
    last_name: str = Field(min_length=1, max_length=80)
    email: str = Field(min_length=3, max_length=255)
    phone: str = Field(min_length=3, max_length=40)
    country: str = Field(min_length=2, max_length=2)
    street: str = Field(min_length=1, max_length=120)
    building_number: str = Field(min_length=1, max_length=20)
    postal_code: str = Field(min_length=1, max_length=20)
    city: str = Field(min_length=1, max_length=80)
    guests: int = Field(ge=1, le=6)
    package: str = Field(min_length=1, max_length=40)
    include_flight: bool
    total_chf: Decimal = Field(gt=Decimal("0"), max_digits=12, decimal_places=2)
    arrival_date: date
    departure_date: date
    notes: str | None = Field(default=None, max_length=2000)

    @field_validator("country")
    @classmethod
    def normalize_country(cls, value: str) -> str:
        return value.upper()

    @field_validator("departure_date")
    @classmethod
    def validate_departure(cls, value: date, info: ValidationInfo) -> date:
        arrival = info.data.get("arrival_date")
        if arrival and value <= arrival:
            raise ValueError("departure_date must be after arrival_date")
        return value

    @model_validator(mode="after")
    def validate_package_total(self) -> "BookingCreate":
        expected = expected_total(self.package, self.include_flight)
        if expected is None:
            raise ValueError("package must be Standard or Premium")
        if self.total_chf != expected:
            raise ValueError("total_chf does not match the selected package")
        return self


class BookingCreate(BookingBase):
    spam_token: str = Field(min_length=1)
    company_website: str | None = Field(default=None, max_length=200)


class BookingStatusUpdate(BaseModel):
    status: BookingStatus


class BookingRead(BookingBase):
    id: str
    status: BookingStatus
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
