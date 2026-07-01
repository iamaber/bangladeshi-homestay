import HostProfileClient from "./HostProfileClient";

export function generateStaticParams() {
  return [
    { id: "featured-host-family" },
    { id: "future-host-family" },
    { id: "seasonal-host-family" },
  ];
}

export default function HostProfilePage() {
  return <HostProfileClient />;
}
