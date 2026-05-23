"use client";

import { useI18n } from "@/lib/i18n";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="min-h-screen relative flex flex-col justify-end overflow-hidden">
      {/* Background image with parallax hint via scale */}
      <div className="absolute inset-0">
        <img
          src="/images/river-boat-sunset.jpeg"
          alt="Boat on a Bangladeshi river at sunset"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0e2218]/90 via-green/80 to-[#0e2218]/70" />
      </div>

      {/* Geometric grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-gold-warm) 1px, transparent 1px), linear-gradient(90deg, var(--color-gold-warm) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e2218] via-[#0e2218]/40 to-transparent" />

      {/* Content — staggered entrance choreography */}
      <div className="relative z-10 px-6 lg:px-14 pb-20 lg:pb-20 pt-32 max-w-[780px]">
        <h1 className="font-serif text-[clamp(48px,6.5vw,84px)] font-normal leading-[1.06] text-cream tracking-[-0.015em] mb-7 hero-entrance hero-entrance-delay-1">
          {t("heroHeadlineA")}
          <br />
          <em>{t("heroHeadlineB")}</em>
        </h1>

        <p className="text-base font-light text-cream/65 max-w-[520px] leading-[1.8] mb-12 hero-entrance hero-entrance-delay-2">
          {t("heroSub")}
        </p>

        <div className="flex gap-4 items-center hero-entrance hero-entrance-delay-3">
          <a href="#packages" className="btn-fill">
            {t("explorePackages")}
          </a>
          <a href="#how" className="btn-line">
            {t("howItWorks")}
          </a>
        </div>
      </div>

      {/* Hero stats — entrance delay 4 */}
      <div className="absolute right-6 lg:right-14 bottom-20 z-10 flex gap-12 hero-entrance hero-entrance-delay-4">
        <div>
          <span className="font-serif text-[38px] text-cream leading-none block">
            14
          </span>
          <div className="text-[11px] font-medium tracking-[0.12em] uppercase text-cream/40 mt-1">
            Days Immersion
          </div>
        </div>
        <div>
          <span className="font-serif text-[38px] text-cream leading-none block">
            CHF 2.7k
          </span>
          <div className="text-[11px] font-medium tracking-[0.12em] uppercase text-cream/40 mt-1">
            Starting From
          </div>
        </div>
      </div>
    </section>
  );
}