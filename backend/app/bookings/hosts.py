from pydantic import BaseModel


class HostDefinition(BaseModel):
    id: str
    name: str
    bookable: bool


HOSTS = {
    "featured-host-family": HostDefinition(
        id="featured-host-family",
        name="Featured Host Family",
        bookable=True,
    ),
    "future-host-family": HostDefinition(
        id="future-host-family",
        name="Future Host Family",
        bookable=False,
    ),
    "seasonal-host-family": HostDefinition(
        id="seasonal-host-family",
        name="Seasonal Host Family",
        bookable=False,
    ),
}


def host_for_id(host_id: str) -> HostDefinition | None:
    return HOSTS.get(host_id)
