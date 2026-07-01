"use client";

import SectionReveal from "@/components/SectionReveal";
import { useI18n } from "@/lib/useI18n";

export default function Testimonials() {
  const { copy } = useI18n();

  return (
    <section className="py-16 px-6 lg:px-14 bg-ink2 relative overflow-hidden">
      {/* Subtle geometric texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-cream) 1px, transparent 1px), linear-gradient(90deg, var(--color-cream) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <SectionReveal>
          <span className="eyebrow">{copy.home.testimonials.eyebrow}</span>
          <h2 className="heading font-serif text-[clamp(32px,3.5vw,50px)] font-bold leading-[1.12] text-cream tracking-[-0.01em]">
            {copy.home.testimonials.headlineA}
            <br />
            <em>{copy.home.testimonials.headlineB}</em>
          </h2>
        </SectionReveal>

        <div className="mt-16">
          {copy.home.testimonials.items.map(([author, origin, quote], i) => (
            <SectionReveal key={author}>
              <div
                className={`py-11 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-14 items-start ${
                  i === 0 ? "border-t border-white/8" : ""
                } border-b border-white/8`}
              >
                <div className="pt-1">
                  <div className="text-[14px] font-medium text-cream mb-1">
                    {author}
                  </div>
                  <div className="text-[12px] text-cream/40 tracking-[0.04em] mb-4">
                    {origin}
                  </div>
                  <div className="flex gap-[3px]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-gold-warm text-[12px]">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="font-serif text-[20px] text-cream/82 leading-[1.75]">
                  &ldquo;{quote}&rdquo;
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
