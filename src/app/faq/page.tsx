"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";
import { useI18n } from "@/lib/useI18n";

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const { copy } = useI18n();

  const toggle = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <Navigation />
      <main className="pt-16">
        <section className="pt-20 pb-24 px-6 lg:px-14 bg-cream">
          <div className="max-w-[900px] mx-auto">
            <span className="eyebrow">{copy.pages.faq.eyebrow}</span>
            <h1 className="heading font-serif text-[clamp(32px,3.5vw,50px)] leading-[1.12] text-ink tracking-[-0.01em]">
              {copy.pages.faq.headline} <em>{copy.pages.faq.emphasis}</em>
            </h1>
            <p className="mt-6 text-[15px] font-light text-muted leading-[1.8] max-w-[560px]">
              {copy.pages.faq.intro}
            </p>
          </div>
        </section>

        <section className="pb-24 px-6 lg:px-14 bg-cream">
          <div className="max-w-[800px] mx-auto">
            {copy.pages.faq.categories.map(([category, items], catIndex) => {
              const categoryTitle = String(category);
              const categoryItems = items as string[][];
              return (
              <div key={categoryTitle} className="mb-12 last:mb-0">
                <h2 className="font-serif text-[22px] text-ink mb-6 pb-3 border-b border-rule">
                  {categoryTitle}
                </h2>
                <div className="space-y-0">
                  {categoryItems.map(([question, answer], itemIndex) => {
                    const key = `faq-${catIndex}-${itemIndex}`;
                    const isOpen = openItems[key] || false;
                    return (
                      <div key={key} className="border-t border-rule last:border-b">
                        <button
                          type="button"
                          id={`faq-btn-${key}`}
                          aria-expanded={isOpen}
                          aria-controls={`faq-ans-${key}`}
                          onClick={() => toggle(key)}
                          className={`w-full bg-transparent border-none py-5 text-left font-sans text-[15px] font-normal cursor-pointer flex justify-between items-center gap-4 transition-colors duration-200 ${isOpen ? "text-green" : "text-ink"}`}
                        >
                          <span>{question}</span>
                          <span
                            className="text-[18px] text-muted flex-shrink-0"
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
                          id={`faq-ans-${key}`}
                          role="region"
                          aria-labelledby={`faq-btn-${key}`}
                          className={`faq-content ${isOpen ? "open" : ""}`}
                        >
                          <div>
                            <p className="text-[14px] font-light text-muted leading-[1.85] pb-5">{answer}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )})}
          </div>
        </section>

        <section className="py-24 px-6 lg:px-14 bg-cream2">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="font-serif text-[28px] text-ink mb-4">{copy.pages.faq.stillTitle}</h2>
            <p className="text-[15px] font-light text-muted mb-8">{copy.pages.faq.stillText}</p>
            <Link href="/contact" className="btn-fill-sm">{copy.common.contactUs}</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
