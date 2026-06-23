"use client";

import SectionReveal from "@/components/SectionReveal";
import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/useI18n";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { copy } = useI18n();

  return (
    <section className="py-16 px-6 lg:px-14" id="faq">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20 items-start">
          <SectionReveal>
            <div>
              <span className="eyebrow">FAQ</span>
              <h2 className="heading font-serif text-[clamp(32px,3.5vw,50px)] font-bold leading-[1.12] text-ink tracking-[-0.01em]">
                {copy.home.faq.headlineA}
                <br />
                <em>{copy.home.faq.headlineB}</em>
              </h2>
              <p className="text-[15px] font-light text-muted leading-[1.8] mt-5 mb-7">
                {copy.home.faq.intro}
              </p>
              <Link href="/contact" className="btn-fill-sm">
                {copy.common.askQuestion}
              </Link>
            </div>
          </SectionReveal>

          <SectionReveal delay="2">
            <div>
              {copy.home.faq.items.map(([question, answer], i) => {
                const isOpen = openIndex === i;
                const id = `faq-${i}`;
                return (
                  <div key={id} className="border-t border-rule last:border-b">
                    <button
                      type="button"
                      id={`faq-btn-${id}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-ans-${id}`}
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className={`w-full bg-transparent border-none py-5 text-left font-sans text-[15px] font-normal cursor-pointer flex justify-between items-center gap-4 transition-colors duration-200 ${
                        isOpen ? "text-green" : "text-ink"
                      }`}
                    >
                      <span>{question}</span>
                      <span
                        className="text-[18px] text-muted flex-shrink-0 transition-transform duration-300"
                        style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
                        aria-hidden="true"
                      >
                        <span
                          className="inline-block"
                          style={{
                            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                            transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                          }}
                        >
                          +
                        </span>
                      </span>
                    </button>
                    <div
                      id={`faq-ans-${id}`}
                      role="region"
                      aria-labelledby={`faq-btn-${id}`}
                      className={`faq-content ${isOpen ? "open" : ""}`}
                    >
                      <div>
                        <p className="text-[14px] font-light text-muted leading-[1.85] pb-5">
                          {answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
