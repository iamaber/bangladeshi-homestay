"use client";

import SectionReveal from "@/components/SectionReveal";
import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    id: "faq-included",
    q: "What is included in the price?",
    a: "All packages include airport pickup and dropoff, all three daily meals cooked by the host family, local transportation, cultural activities, and guided sightseeing. The Premium package adds cooking classes, music and crafts workshops, and additional tours. International flights can be added as an optional extra.",
  },
  {
    id: "faq-book",
    q: "How do I book?",
    a: "Choose your package and dates, then email the prepared booking request. You'll receive payment details after the request is reviewed. Your booking is confirmed once payment is received.",
  },
  {
    id: "faq-choose",
    q: "Can I choose my host family?",
    a: "Yes — you browse all available host family profiles before booking. Each profile includes family photos, a bio, location, amenities, languages spoken, and an availability calendar. You select the family that feels right for you.",
  },
  {
    id: "faq-diet",
    q: "What if I have dietary restrictions?",
    a: "Note your dietary requirements during booking and we'll communicate them to your host family before arrival. Bangladeshi cooking is naturally rich in vegetables and fish; most restrictions can be accommodated with advance notice.",
  },
  {
    id: "faq-safe",
    q: "Is it safe to travel to Bangladesh?",
    a: "Bangladesh is a welcoming and hospitable country. All our host families are carefully vetted and located in safe residential areas. You'll have local support from your family throughout your stay, and we remain reachable for the full duration of your visit.",
  },
  {
    id: "faq-airport",
    q: "How do I get from the airport?",
    a: "Airport pickup is included in every package. Your host family or a designated representative will be waiting at Hazrat Shahjalal International Airport when you land. Share your flight details at booking and we'll handle the rest.",
  },
  {
    id: "faq-pack",
    q: "What should I pack?",
    a: "Light, modest clothing is recommended. Bangladesh is warm and humid, and some cultural sites require covered shoulders and knees. We'll send a detailed pre-departure guide with a full packing list and local customs information before you arrive.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 px-6 lg:px-14" id="faq">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20 items-start">
          <SectionReveal>
            <div>
              <span className="eyebrow">FAQ</span>
              <h2 className="heading font-serif text-[clamp(32px,3.5vw,50px)] font-bold leading-[1.12] text-ink tracking-[-0.01em]">
                Common
                <br />
                <em>questions</em>
              </h2>
              <p className="text-[15px] font-light text-muted leading-[1.8] mt-5 mb-7">
                Can&apos;t find what you&apos;re looking for? Our team responds to all
                enquiries within 24 hours.
              </p>
              <Link href="/contact" className="btn-fill-sm">
                Ask a Question
              </Link>
            </div>
          </SectionReveal>

          <SectionReveal delay="2">
            <div>
              {faqs.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={faq.id} className="border-t border-rule last:border-b">
                    <button
                      type="button"
                      id={`faq-btn-${faq.id}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-ans-${faq.id}`}
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className={`w-full bg-transparent border-none py-5 text-left font-sans text-[15px] font-normal cursor-pointer flex justify-between items-center gap-4 transition-colors duration-200 ${
                        isOpen ? "text-green" : "text-ink"
                      }`}
                    >
                      <span>{faq.q}</span>
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
                      id={`faq-ans-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-btn-${faq.id}`}
                      className={`faq-content ${isOpen ? "open" : ""}`}
                    >
                      <div>
                        <p className="text-[14px] font-light text-muted leading-[1.85] pb-5">
                          {faq.a}
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
