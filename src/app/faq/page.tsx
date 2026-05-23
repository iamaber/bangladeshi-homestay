"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";

const faqs = [
  {
    category: "Booking & Payment",
    items: [
      { id: "book-how", q: "How do I book?", a: "Create an account, browse available host families and dates, choose your package, and submit a booking request. You'll receive payment details by email. Your booking is confirmed once payment is received." },
      { id: "book-payment", q: "How does payment work?", a: "After booking, you'll receive a payment invoice by email with the details needed to complete your transfer. Your booking is reviewed and confirmed once payment is received." },
      { id: "book-cancel", q: "Can I cancel my booking?", a: "80% refund if cancelled within 7 days of booking. 50% refund if cancelled after 7 days. The 7-day window is measured from the date of booking confirmation." },
      { id: "book-included", q: "What's included in the price?", a: "All packages include a two-week stay with host family, three meals per day, local transportation, airport pickup and dropoff, cultural activities, and local tours. The Premium package adds cooking classes, music sessions, crafts workshops, and additional tours." },
    ],
  },
  {
    category: "Your Stay",
    items: [
      { id: "stay-choose", q: "Can I choose my host family?", a: "Yes — you browse all available host family profiles before booking. Each profile includes family photos, a bio, location, amenities, languages spoken, and an availability calendar." },
      { id: "stay-diet", q: "What if I have dietary restrictions?", a: "Note your dietary requirements during booking and we'll communicate them to your host family before arrival. Bangladeshi cooking is naturally rich in vegetables and fish; most restrictions can be accommodated with advance notice." },
      { id: "stay-length", q: "How long is the stay?", a: "All packages are for a two-week (14-night) stay. This duration allows for genuine cultural immersion." },
      { id: "stay-pack", q: "What should I pack?", a: "Light, modest clothing is recommended. Bangladesh is warm and humid, and some cultural sites require covered shoulders and knees. We'll send a detailed pre-departure guide with a full packing list." },
    ],
  },
  {
    category: "Safety & Support",
    items: [
      { id: "safe-safe", q: "Is it safe?", a: "All our host families are carefully vetted for safety, comfort, and hospitality. Bangladesh is known for its warm hospitality. Your host family ensures you feel safe and supported, and we remain reachable throughout your stay." },
      { id: "safe-airport", q: "How do I get from the airport?", a: "Airport pickup is included in every package. Your host family or designated representative will be waiting at Hazrat Shahjalal International Airport when you land." },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <Navigation />
      <main className="pt-16">
        <section className="pt-20 pb-24 px-6 lg:px-14 bg-cream">
          <div className="max-w-[900px] mx-auto">
            <span className="eyebrow">FAQ</span>
            <h1 className="heading font-serif text-[clamp(32px,3.5vw,50px)] leading-[1.12] text-ink tracking-[-0.01em]">
              Frequently asked <em>questions</em>
            </h1>
            <p className="mt-6 text-[15px] font-light text-muted leading-[1.8] max-w-[560px]">
              Everything you need to know about booking, your stay, payment, and more.
            </p>
          </div>
        </section>

        <section className="pb-24 px-6 lg:px-14 bg-cream">
          <div className="max-w-[800px] mx-auto">
            {faqs.map((cat) => (
              <div key={cat.category} className="mb-12 last:mb-0">
                <h2 className="font-serif text-[22px] text-ink mb-6 pb-3 border-b border-rule">
                  {cat.category}
                </h2>
                <div className="space-y-0">
                  {cat.items.map((faq) => {
                    const key = faq.id;
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
                          <span>{faq.q}</span>
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
                            <p className="text-[14px] font-light text-muted leading-[1.85] pb-5">{faq.a}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-24 px-6 lg:px-14 bg-cream2">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="font-serif text-[28px] text-ink mb-4">Still have questions?</h2>
            <p className="text-[15px] font-light text-muted mb-8">We&apos;re happy to help. Reach out and we&apos;ll get back to you within 24 hours.</p>
            <Link href="/#contact" className="btn-fill-sm">Contact Us</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
