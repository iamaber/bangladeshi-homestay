from app.database import engine
from app.migrations import upgrade_existing_schema


def main() -> None:
    upgrade_existing_schema(engine)


if __name__ == "__main__":
    main()
