"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useI18n } from "@/lib/useI18n";

export default function TermsPage() {
  const { copy } = useI18n();

  return (
    <>
      <Navigation />
      <main className="pt-16">
        <section className="pt-20 pb-24 px-6 lg:px-14 bg-cream">
          <div className="max-w-800px mx-auto">
            <h1 className="heading font-serif text-[clamp(32px,3.5vw,50px)] leading-[1.12] text-ink tracking-[-0.01em]">
              {copy.pages.legal.termsTitle}
            </h1>
            <p className="mt-4 text-[13px] text-muted">{copy.common.lastUpdated}</p>
          </div>
        </section>
        <section className="pb-24 px-6 lg:px-14 bg-cream">
          <div className="max-w-800px mx-auto space-y-8">
            {copy.pages.legal.terms.map(([title, text]) => (
              <div key={title}>
                <h2 className="font-serif text-[20px] text-ink mb-3">{title}</h2>
                <p className="text-[14px] font-light text-ink2/80 leading-[1.85]">{text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
