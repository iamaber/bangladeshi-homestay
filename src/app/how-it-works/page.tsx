"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useI18n } from "@/lib/useI18n";

export default function HowItWorksPage() {
  const { t, copy } = useI18n();

  return (
    <>
      <Navigation />
      <main className="pt-16">
        <section className="pt-20 pb-24 px-6 lg:px-14 bg-cream">
          <div className="max-w-[900px] mx-auto">
            <span className="eyebrow">{t("howItWorks")}</span>
            <h1 className="heading font-serif text-[clamp(32px,3.5vw,50px)] leading-[1.12] text-ink tracking-[-0.01em]">
              {t("journeyHeadlineA")} <em>{t("journeyHeadlineB")}</em>
            </h1>
            <p className="mt-6 text-[15.5px] font-light text-muted leading-[1.8] max-w-[560px]">
              {t("step1Desc")} {t("step2Desc")} {t("step3Desc")}
            </p>
          </div>
        </section>

        <section className="py-24 px-6 lg:px-14 bg-cream2">
          <div className="max-w-[900px] mx-auto">
            {copy.pages.how.steps.map(([num, title, desc], i) => (
              <div key={num} className="flex gap-6 lg:gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-green to-green-mid flex items-center justify-center shadow-lg shadow-green/20 flex-shrink-0">
                    <span className="font-serif text-cream text-[18px]">{num}</span>
                  </div>
                  {i < copy.pages.how.steps.length - 1 && <div className="w-px flex-1 bg-rule mt-4" />}
                </div>
                <div className="pb-10">
                  <h3 className="font-serif text-[22px] text-ink mb-2">{title}</h3>
                  <p className="text-[14px] font-light text-muted leading-[1.8]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-24 px-6 lg:px-14 bg-green">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="font-serif text-[clamp(28px,3vw,42px)] text-cream leading-[1.12] mb-4">
              {copy.pages.how.ctaTitle} <em>{copy.pages.how.ctaEmphasis}</em>
            </h2>
            <p className="text-[15px] font-light text-cream/70 leading-[1.85] mb-8">
              {copy.pages.how.ctaText}
            </p>
            <Link href="/#host" className="btn-fill">{copy.common.browseHostFamilies}</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
