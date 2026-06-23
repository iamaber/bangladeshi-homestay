"use client";

import SectionReveal from "@/components/SectionReveal";
import { useI18n } from "@/lib/useI18n";

export default function Includes() {
  const { copy } = useI18n();

  return (
    <section className="py-16 px-6 lg:px-14 bg-green" id="includes">
      <div className="max-w-[1400px] mx-auto">
        <SectionReveal>
          <span className="eyebrow">{copy.home.includes.eyebrow}</span>
          <h2 className="heading font-serif text-[clamp(32px,3.5vw,50px)] font-bold leading-[1.12] text-cream tracking-[-0.01em]">
            {copy.home.includes.headlineA}
            <br />
            <em>{copy.home.includes.headlineB}</em>
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mt-16">
          <SectionReveal>
            <div className="lg:pr-16 lg:border-r lg:border-white/10">
              {copy.home.includes.left.map(([num, title, desc]) => (
                <div key={num} className="flex gap-5 py-[22px] border-b border-white/7 items-start">
                  <span className="font-serif text-[13px] text-cream/25 min-w-[28px] mt-0.5">
                    {num}
                  </span>
                  <div>
                    <h4 className="text-[15px] font-medium text-cream mb-1.5">
                      {title}
                    </h4>
                    <p className="text-[13px] font-light text-cream/50 leading-[1.7]">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay="2">
            <div className="lg:pl-16">
              {copy.home.includes.right.map(([num, title, desc]) => (
                <div key={num} className="flex gap-5 py-[22px] border-b border-white/7 items-start">
                  <span className="font-serif text-[13px] text-cream/25 min-w-[28px] mt-0.5">
                    {num}
                  </span>
                  <div>
                    <h4 className="text-[15px] font-medium text-cream mb-1.5">
                      {title}
                    </h4>
                    <p className="text-[13px] font-light text-cream/50 leading-[1.7]">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>

        <SectionReveal>
          <div className="flex flex-col lg:flex-row gap-0 mt-12 pt-8 border-t border-white/8">
            <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-cream/30 min-w-[160px] pt-0.5">
              {copy.common.notIncluded}
            </span>
            <div className="flex flex-wrap gap-0">
              {copy.home.includes.notIncluded.map((item, i) => (
                <span key={item} className="text-[13px] font-light text-cream/35 font-serif">
                  {item}
                  {i < copy.home.includes.notIncluded.length - 1 && (
                    <span className="text-cream/20 mx-2"> · </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
