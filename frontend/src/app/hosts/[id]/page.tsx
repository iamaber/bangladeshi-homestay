import HostProfileClient from "./HostProfileClient";
import { hosts } from "@/lib/hosts";

export function generateStaticParams() {
  return hosts.map((host) => ({ id: host.id }));
}

export default function HostProfilePage() {
  return <HostProfileClient />;
}
