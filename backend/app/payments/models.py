from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field, field_validator


class StructuredAddress(BaseModel):
    name: str = Field(min_length=1, max_length=70)
    street: str = Field(min_length=1, max_length=70)
    building_number: str = Field(min_length=1, max_length=16)
    postal_code: str = Field(min_length=1, max_length=16)
    city: str = Field(min_length=1, max_length=35)
    country: str = Field(min_length=2, max_length=2)

    @field_validator("country")
    @classmethod
    def normalize_country(cls, value: str) -> str:
        return value.upper()


class SwissQrInvoiceRequest(BaseModel):
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "invoice_id": "GG-2026-0001",
            "amount": "2700.00",
            "debtor": {
                "name": "Sophie Baumann",
                "street": "Bahnhofstrasse",
                "building_number": "1",
                "postal_code": "8001",
                "city": "Zurich",
                "country": "CH",
            },
            "message": "Bangladeshi homestay booking GG-2026-0001",
        }
    })

    invoice_id: str = Field(min_length=1, max_length=35)
    amount: Decimal = Field(gt=Decimal("0"), max_digits=12, decimal_places=2)
    debtor: StructuredAddress
    message: str | None = Field(default=None, max_length=140)

    @field_validator("amount")
    @classmethod
    def normalize_amount(cls, value: Decimal) -> Decimal:
        return value.quantize(Decimal("0.01"))


class SwissQrPayload(BaseModel):
    invoice_id: str
    payload: str
