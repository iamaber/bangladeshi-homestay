"use client";

import SectionReveal from "@/components/SectionReveal";
import { useI18n } from "@/lib/useI18n";
import Link from "next/link";

export default function CTA() {
  const { t, copy } = useI18n();

  return (
    <section className="py-16 px-6 lg:px-14 bg-terra relative overflow-hidden" id="booking">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-cream) 1px, transparent 1px), linear-gradient(90deg, var(--color-cream) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative z-10 max-w-[1400px] mx-auto">
        <SectionReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-cream/60 mb-5 block">
                {t("ctaEyebrow")}
              </span>
              <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-black leading-[1.1] text-cream tracking-[-0.01em]">
                {t("ctaHeadlineA")}
                <br />
                <em>{t("ctaHeadlineB")}</em>
              </h2>
            </div>
            <div className="pb-1.5">
              <p className="text-[15px] font-light text-cream/70 leading-[1.85] mb-10">
                {t("ctaDesc")}
              </p>
              <div className="flex gap-4">
                <Link href="/booking" className="btn-cream">
                  {t("bookNow")}
                </Link>
                <Link href="/contact" className="btn-ghost-cream">
                  {copy.home.ctaContact}
                </Link>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
