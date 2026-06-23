"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { assetPath } from "@/lib/paths";
import { useI18n } from "@/lib/useI18n";

const openMonths = ["Feb", "Mar", "May", "Jun", "Aug", "Sep", "Nov", "Dec"];

export default function HostProfileClient() {
  const { copy } = useI18n();
  const months = copy.pages.hostProfile.months;

  return (
    <>
      <Navigation />
      <main className="pt-16">
        <section className="pt-12 pb-24 px-6 lg:px-14 bg-cream">
          <div className="max-w-[1200px] mx-auto">
            <Link href="/hosts" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-green transition-colors no-underline mb-6">
              <ChevronLeft size={16} /> {copy.pages.hostProfile.back}
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
              <div>
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="col-span-2 aspect-[2/1] rounded-sm overflow-hidden">
                    <img src={assetPath("/images/host-home-entrance.jpeg")} alt={copy.media.hostEntrance} className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square rounded-sm overflow-hidden">
                    <img src={assetPath("/images/guest-bedroom-blue.jpeg")} alt={copy.media.bedroomBlue} className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square rounded-sm overflow-hidden">
                    <img src={assetPath("/images/home-kitchen.jpeg")} alt={copy.media.homeKitchen} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-green text-cream text-[11px] font-semibold tracking-[0.06em] uppercase">
                    {copy.common.availableNow}
                  </span>
                </div>

                <h1 className="font-serif text-[32px] lg:text-[40px] text-ink leading-tight mb-2">
                  {copy.pages.hostProfile.name}
                </h1>
                <div className="text-[13px] text-muted tracking-[0.04em] flex items-center gap-1.5 mb-6">
                  <span className="inline-block text-[11px] rotate-[-45deg] text-gold">↓</span>
                  {copy.pages.hostProfile.location}
                </div>

                <p className="font-serif text-[17px] text-ink2 leading-[1.75] pl-5 border-l-2 border-l-gold mb-8">
                  &ldquo;{copy.pages.hostProfile.quote}&rdquo;
                </p>

                <hr className="border-none border-t border-rule" />

                {copy.pages.hostProfile.facts.slice(0, 3).map(([label, val]) => (
                  <div key={label} className="flex justify-between items-baseline gap-4 py-3 border-b border-rule-light">
                    <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted">{label}</span>
                    <span className="text-[13.5px] font-light text-ink2">{val}</span>
                  </div>
                ))}

                <div className="flex justify-between items-baseline gap-4 py-3">
                  <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted">
                    {copy.pages.hostProfile.facts[3][0]}
                  </span>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {months.map((m) => (
                      <span key={m} className={`text-[11px] font-medium px-2 py-0.5 border ${openMonths.includes(m) ? "text-green-soft border-green-soft/40" : "text-muted border-rule"}`}>{m}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/booking" className="btn-fill-sm inline-block">{copy.common.requestStayFrom}</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 lg:px-14 bg-cream2">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="font-serif text-[28px] text-ink mb-8">{copy.pages.hostProfile.overview}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {copy.pages.hostProfile.members.map(([label, detail]) => (
                <div key={label + detail} className="p-5 bg-cream border border-rule hover:border-rule-dark transition-colors duration-300">
                  <div className="font-serif text-[15px] text-ink font-medium">{label}</div>
                  <p className="text-[13px] font-light text-muted mt-2 leading-[1.7]">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 lg:px-14 bg-green relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(var(--color-gold-warm) 1px, transparent 1px), linear-gradient(90deg, var(--color-gold-warm) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="max-w-[700px] mx-auto text-center relative z-10">
            <h2 className="font-serif text-[clamp(28px,3vw,42px)] text-cream leading-[1.12] mb-4">
              {copy.pages.hostProfile.ctaTitle}
            </h2>
            <p className="text-[15px] font-light text-cream/70 leading-[1.85] mb-8">
              {copy.pages.hostProfile.ctaText}
            </p>
            <Link href="/booking" className="btn-cream inline-block">{copy.common.bookNowFrom}</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
