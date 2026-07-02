from sqlalchemy import Engine, inspect, text


def upgrade_existing_schema(engine: Engine) -> None:
    add_booking_host_id(engine)


def add_booking_host_id(engine: Engine) -> None:
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
