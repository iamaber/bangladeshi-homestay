import type { Metadata } from "next";
import PackagesClient from "./PackagesClient";

export const metadata: Metadata = {
  title: "Student Experience -- Guru Gasthaus",
  description:
    "Discover the tailored student homestay experience offered by Guru Gasthaus in Bangladesh.",
};

export default function PackagesPage() {
  return <PackagesClient />;
}
