import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Packages from "@/components/home/Packages";
import Includes from "@/components/home/Includes";

export const metadata: Metadata = {
  title: "Student Packages & Pricing — Bengali Homestay",
  description:
    "Compare our Standard and Premium Bangladeshi homestay packages, see exactly what's included, and pick the experience that fits you.",
};

export default function PackagesPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <section className="pt-20 pb-12 px-6 lg:px-14 bg-cream">
          <div className="max-w-[1400px] mx-auto">
            <span className="eyebrow">Packages &amp; Pricing</span>
            <h1 className="heading font-serif text-[clamp(36px,5vw,68px)] leading-[1.06] text-ink tracking-[-0.015em] max-w-[820px]">
              Student packages, <em>built for real immersion</em>
            </h1>
            <p className="mt-6 text-[15.5px] font-light text-muted leading-[1.85] max-w-[560px]">
              Two transparent packages, each a full two-week stay with a host
              family. Compare what&apos;s included, choose with or without a flight
              ticket, and book the experience that fits you.
            </p>
          </div>
        </section>

        <Packages />
        <Includes />

        <section className="py-16 px-6 lg:px-14 bg-terra relative overflow-hidden">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="font-serif text-[clamp(28px,3vw,42px)] font-black text-cream leading-[1.12] mb-4">
              Found your <em>package?</em>
            </h2>
            <p className="text-[15px] font-light text-cream/80 leading-[1.85] mb-8">
              Spots are limited each season. Submit a booking and we&apos;ll send
              your payment details and pre-arrival guide.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/booking" className="btn-cream">
                Book Your Stay
              </Link>
              <Link href="/#host" className="btn-ghost-cream">
                Meet the Hosts
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
