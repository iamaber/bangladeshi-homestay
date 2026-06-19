"use client";

import SectionReveal from "@/components/SectionReveal";
import { useI18n } from "@/lib/i18n";

export default function HowItWorks() {
  const { t } = useI18n();
  const steps = [
    { num: "01 --", title: t("step1Title"), desc: t("step1Desc") },
    { num: "02 --", title: t("step2Title"), desc: t("step2Desc") },
    { num: "03 --", title: t("step3Title"), desc: t("step3Desc") },
  ];

  return (
    <section className="py-16 px-6 lg:px-14 bg-green" id="how">
      <div className="max-w-[1400px] mx-auto">
        <SectionReveal>
          <span className="eyebrow">{t("journeyEyebrow")}</span>
          <h2 className="heading font-serif text-[clamp(32px,3.5vw,50px)] font-bold leading-[1.12] text-cream tracking-[-0.01em]">
            {t("journeyHeadlineA")} <em>{t("journeyHeadlineB")}</em>
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-16 border-t border-white/12">
          {steps.map((step, i) => (
            <SectionReveal key={step.num} delay={i <= 3 ? String(i + 1) as "1" | "2" | "3" : undefined}>
              <div
                className={`pt-10 pb-10 lg:pr-8 ${
                  i > 0 ? "lg:border-l lg:border-white/8 lg:pl-8" : ""
                }`}
              >
                <span className="font-serif text-[11px] tracking-[0.14em] text-cream/25 block mb-7">
                  {step.num}
                </span>
                <span className="block w-6 h-0.5 bg-gold-warm mb-5" />
                <h3 className="font-serif text-[20px] text-cream mb-3">
                  {step.title}
                </h3>
                <p className="text-[13.5px] font-light text-cream/55 leading-[1.8]">
                  {step.desc}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
