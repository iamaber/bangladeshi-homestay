from functools import lru_cache

from pydantic import BaseModel, Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class CreditorSettings(BaseModel):
    iban: str
    name: str
    street: str
    building_number: str
    postal_code: str
    city: str
    country: str = "CH"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="APP_", env_file=".env")

    contact_email: str = "hello@gurugasthaus.com"
    contact_phone: str = "+41 77 400 72 56"
    database_url: str = "postgresql+psycopg://postgres:postgres@localhost:5432/bangladeshi_homestay"
    admin_api_key: str | None = None
    cors_origins: str = "http://localhost:3000,http://127.0.0.1:3000"
    creditor_iban: str | None = Field(default=None)
    creditor_name: str | None = Field(default=None)
    creditor_street: str | None = Field(default=None)
    creditor_building_number: str | None = Field(default=None)
    creditor_postal_code: str | None = Field(default=None)
    creditor_city: str | None = Field(default=None)
    creditor_country: str = "CH"

    def creditor(self) -> CreditorSettings:
        missing = self.missing_creditor_fields()
        if missing:
            joined = ", ".join(missing)
            raise ValueError(f"Missing creditor settings: {joined}")

        return CreditorSettings(
            iban=self.creditor_iban or "",
            name=self.creditor_name or "",
            street=self.creditor_street or "",
            building_number=self.creditor_building_number or "",
            postal_code=self.creditor_postal_code or "",
            city=self.creditor_city or "",
            country=self.creditor_country,
        )

    def missing_creditor_fields(self) -> list[str]:
        fields = {
            "APP_CREDITOR_IBAN": self.creditor_iban,
            "APP_CREDITOR_NAME": self.creditor_name,
            "APP_CREDITOR_STREET": self.creditor_street,
            "APP_CREDITOR_BUILDING_NUMBER": self.creditor_building_number,
            "APP_CREDITOR_POSTAL_CODE": self.creditor_postal_code,
            "APP_CREDITOR_CITY": self.creditor_city,
        }
        return [name for name, value in fields.items() if not value]


@lru_cache
def get_settings() -> Settings:
    return Settings()
