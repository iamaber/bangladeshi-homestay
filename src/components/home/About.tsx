"use client";

import SectionReveal from "@/components/SectionReveal";
import { useI18n } from "@/lib/useI18n";
import { assetPath } from "@/lib/paths";

export default function About() {
  const { t } = useI18n();

  return (
    <section className="py-16 px-6 lg:px-14" id="about">
      <div className="max-w-[1400px] mx-auto">
        <SectionReveal>
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_4fr] gap-12 lg:gap-24 items-start">
            <div>
              <span className="eyebrow">{t("aboutEyebrow")}</span>
              <h2 className="heading font-serif text-[clamp(32px,3.5vw,50px)] font-bold leading-[1.12] text-ink tracking-[-0.01em] mb-8">
                {t("aboutHeadlineA")}
                <br />
                <em>{t("aboutHeadlineB")}</em>
              </h2>
              <p className="text-[15.5px] font-light text-ink2/80 leading-[1.9]">
                {t("aboutP1")}
              </p>
              <p className="text-[15.5px] font-light text-ink2/80 leading-[1.9] mt-[18px]">
                {t("aboutP2")}
              </p>
              <p className="text-[17px] font-medium text-ink leading-[1.8] mt-[22px]">
                {t("aboutP3")}
              </p>
              <div className="flex flex-wrap gap-2.5 mt-9 pt-9 border-t border-rule">
                {[
                  "Verified Host Families",
                  "All-Inclusive",
                  "Cultural Immersion",
                  "2-Week Stay",
                  "Airport Transfer",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11.5px] font-medium tracking-[0.07em] uppercase text-green-mid border-b border-green-mid pb-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={assetPath("/images/family-living-dining-room.jpeg")}
                  alt="Dining and living room inside a Bangladeshi host family home"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
