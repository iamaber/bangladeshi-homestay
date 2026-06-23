"use client";

import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { assetPath } from "@/lib/paths";
import { useI18n } from "@/lib/useI18n";

export default function PackagesPage() {
  const { copy } = useI18n();

  return (
    <>
      <Navigation />
      <main className="pt-16">
        <section className="bg-green text-cream">
          <div className="max-w-1400px mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] min-h-620px">
            <div className="px-6 py-20 lg:px-14 lg:py-28 flex flex-col justify-center">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gold-warm mb-5">
                {copy.pages.packages.eyebrow}
              </span>
              <h1 className="font-serif text-[clamp(40px,5.4vw,76px)] font-black leading-[1.02] tracking-[-0.025em] max-w-[720px]">
                {copy.pages.packages.headline} <span className="text-gold-warm">{copy.pages.packages.emphasis}</span>
              </h1>
              <p className="mt-7 text-[16px] font-light text-cream/70 leading-[1.85] max-w-570px">
                {copy.pages.packages.intro}
              </p>
              <div className="mt-9">
                <Link href="/contact" className="btn-fill">
                  {copy.common.planYourStay}
                </Link>
              </div>
            </div>
            <div className="relative min-h-420px lg:min-h-full">
              <Image
                src={assetPath("/images/family-living-dining-room.jpeg")}
                alt={copy.media.packageHero}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-green/25 to-transparent" />
            </div>
          </div>
        </section>

        <section id="experience" className="py-20 lg:py-28 px-6 lg:px-14 bg-cream">
          <div className="max-w-1180px mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-12 lg:gap-24">
              <div>
                <span className="eyebrow">{copy.pages.packages.experienceEyebrow}</span>
                <h2 className="heading font-serif text-[clamp(32px,4vw,54px)] leading-[1.08] text-ink">
                  {copy.pages.packages.experienceHeadline} <em>{copy.pages.packages.experienceEmphasis}</em>
                </h2>
              </div>
              <div className="border-t border-rule">
                {copy.pages.packages.experiences.map(([number, title, description]) => (
                  <div
                    key={number}
                    className="grid grid-cols-[44px_1fr] md:grid-cols-[64px_0.7fr_1.3fr] gap-4 md:gap-8 py-7 border-b border-rule"
                  >
                    <span className="text-[11px] font-semibold tracking-[0.14em] text-gold">
                      {number}
                    </span>
                    <h3 className="font-serif text-[20px] font-bold leading-[1.3] text-ink">
                      {title}
                    </h3>
                    <p className="col-start-2 md:col-start-auto text-[14px] font-light text-muted leading-[1.8]">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 lg:px-14 bg-terra text-cream">
          <div className="max-w-1000px mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-end">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-cream/60">
                {copy.pages.packages.requestEyebrow}
              </span>
              <h2 className="font-serif text-[clamp(32px,4vw,54px)] font-black leading-[1.08] mt-4 max-w-720px">
                {copy.pages.packages.requestTitle}
              </h2>
              <p className="mt-5 text-[15px] font-light text-cream/75 leading-[1.8] max-w-650px">
                {copy.pages.packages.requestText}
              </p>
            </div>
            <Link href="/contact" className="btn-cream whitespace-nowrap">
              {copy.common.contactOurTeam}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
