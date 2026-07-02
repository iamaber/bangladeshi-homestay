from decimal import Decimal


PACKAGE_PRICES = {
    "Standard": {
        False: Decimal("2700.00"),
        True: Decimal("4200.00"),
    },
    "Premium": {
        False: Decimal("3700.00"),
        True: Decimal("5200.00"),
    },
}


def expected_total(package: str, include_flight: bool) -> Decimal | None:
    prices = PACKAGE_PRICES.get(package)
    if prices is None:
        return None
    return prices[include_flight]
