from fastapi import FastAPI

from app.payments.routes import router as payments_router


def health() -> dict[str, str]:
    return {"status": "ok"}


def create_app() -> FastAPI:
    app = FastAPI(title="Bangladeshi Homestay Backend")
    app.include_router(payments_router)
    app.get("/health")(health)
    return app


app = create_app()
