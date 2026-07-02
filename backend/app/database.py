from collections.abc import Generator

from sqlalchemy import inspect, text, create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from app.settings import get_settings


class Base(DeclarativeBase):
    pass


engine = create_engine(get_settings().database_url)
SessionLocal = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)


def init_db() -> None:
    Base.metadata.create_all(bind=engine)
    ensure_booking_host_id_column()


def ensure_booking_host_id_column() -> None:
    inspector = inspect(engine)
    if "bookings" not in inspector.get_table_names():
        return
    columns = {column["name"] for column in inspector.get_columns("bookings")}
    if "host_id" in columns:
        return

    if engine.dialect.name == "postgresql":
        with engine.begin() as connection:
            connection.execute(text("ALTER TABLE bookings ADD COLUMN host_id VARCHAR(80)"))
            connection.execute(
                text("UPDATE bookings SET host_id = 'featured-host-family' WHERE host_id IS NULL")
            )
            connection.execute(
                text("ALTER TABLE bookings ALTER COLUMN host_id SET DEFAULT 'featured-host-family'")
            )
            connection.execute(text("ALTER TABLE bookings ALTER COLUMN host_id SET NOT NULL"))
        return

    with engine.begin() as connection:
        connection.execute(
            text(
                "ALTER TABLE bookings "
                "ADD COLUMN host_id VARCHAR(80) NOT NULL DEFAULT 'featured-host-family'"
            )
        )


def get_db() -> Generator[Session]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
