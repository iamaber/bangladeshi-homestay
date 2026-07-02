export const defaultHostId = "featured-host-family";

export const hosts = [
  {
    id: "featured-host-family",
    label: "Featured Host Family",
    available: true,
    image: "/images/host-home-entrance.jpeg",
  },
  {
    id: "future-host-family",
    label: "Future Host Family",
    available: false,
    image: "/images/family-living-dining-room.jpeg",
  },
  {
    id: "seasonal-host-family",
    label: "Seasonal Host Family",
    available: false,
    image: "/images/riverside-sunset.jpeg",
  },
] as const;

export type HostId = (typeof hosts)[number]["id"];

export function isHostId(value: string): value is HostId {
  return hosts.some((host) => host.id === value);
}

export function hostById(id: string) {
  return hosts.find((host) => host.id === id);
}
