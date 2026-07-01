"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";
import { contact } from "@/lib/contact";
import { contactEmail, createMailtoUrl } from "@/lib/email";
import { useI18n } from "@/lib/useI18n";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { copy } = useI18n();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    window.location.href = createMailtoUrl(
      `${String(data.get("subject") || copy.pages.contact.defaultSubject)}: ${String(data.get("firstName") || "")} ${String(data.get("lastName") || "")}`.trim(),
      [
        { label: copy.pages.contact.fields.firstName, value: data.get("firstName") },
        { label: copy.pages.contact.fields.lastName, value: data.get("lastName") },
        { label: copy.pages.contact.fields.email, value: data.get("email") },
        { label: copy.pages.contact.fields.subject, value: data.get("subject") },
        { label: copy.pages.contact.fields.message, value: data.get("message") },
      ],
    );
    setSubmitted(true);
  };

  return (
    <>
      <Navigation />
      <main className="pt-16">
        <section className="pt-20 pb-24 px-6 lg:px-14 bg-cream">
          <div className="max-w-[900px] mx-auto">
            <span className="eyebrow">{copy.pages.contact.eyebrow}</span>
            <h1 className="heading font-serif text-[clamp(32px,3.5vw,50px)] leading-[1.12] text-ink tracking-[-0.01em]">
              {copy.pages.contact.headline} <em>{copy.pages.contact.emphasis}</em>
            </h1>
            <p className="mt-6 text-[15px] font-light text-muted leading-[1.8] max-w-[560px]">
              {copy.pages.contact.intro}
            </p>
          </div>
        </section>

        <section className="pb-24 px-6 lg:px-14 bg-cream">
          <div className="max-w-[900px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
              <div className="lg:col-span-3">
                <h2 className="font-serif text-[22px] text-ink mb-6">{copy.pages.contact.formTitle}</h2>
                {submitted ? (
                  <div
                    className="p-8 border border-green/20 bg-green/5 text-center"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="font-serif text-[20px] text-ink mb-2">{copy.pages.contact.openedTitle}</div>
                    <p className="text-[14px] font-light text-muted">
                      {copy.pages.contact.openedText.replace("{email}", contactEmail)}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" aria-label={copy.pages.contact.formAria}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="firstName" className="block text-[13px] font-medium text-ink mb-1.5">{copy.pages.contact.fields.firstName}</label>
                        <input id="firstName" name="firstName" type="text" required autoComplete="given-name" className="w-full px-4 py-3 border border-rule bg-cream2 text-ink placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-green/30 focus:border-green transition-colors text-[14px]" placeholder={copy.pages.contact.placeholders.firstName} />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-[13px] font-medium text-ink mb-1.5">{copy.pages.contact.fields.lastName}</label>
                        <input id="lastName" name="lastName" type="text" required autoComplete="family-name" className="w-full px-4 py-3 border border-rule bg-cream2 text-ink placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-green/30 focus:border-green transition-colors text-[14px]" placeholder={copy.pages.contact.placeholders.lastName} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[13px] font-medium text-ink mb-1.5">{copy.pages.contact.fields.email}</label>
                      <input id="email" name="email" type="email" required autoComplete="email" className="w-full px-4 py-3 border border-rule bg-cream2 text-ink placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-green/30 focus:border-green transition-colors text-[14px]" placeholder={copy.pages.contact.placeholders.email} />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-[13px] font-medium text-ink mb-1.5">{copy.pages.contact.fields.subject}</label>
                      <select id="subject" name="subject" className="w-full px-4 py-3 border border-rule bg-cream2 text-ink focus:outline-none focus:ring-1 focus:ring-green/30 focus:border-green transition-colors text-[14px]">
                        {copy.pages.contact.subjects.map((subject) => <option key={subject}>{subject}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-[13px] font-medium text-ink mb-1.5">{copy.pages.contact.fields.message}</label>
                      <textarea id="message" name="message" required rows={5} className="w-full px-4 py-3 border border-rule bg-cream2 text-ink placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-green/30 focus:border-green transition-colors text-[14px] resize-none" placeholder={copy.pages.contact.placeholders.message} />
                    </div>
                    <button
                      type="submit"
                      className="btn-fill-sm"
                    >
                      {copy.pages.contact.submit}
                    </button>
                  </form>
                )}
              </div>

              <div className="lg:col-span-2">
                <h2 className="font-serif text-[22px] text-ink mb-6">{copy.pages.contact.infoTitle}</h2>
                <div className="space-y-6">
                  <div className="pt-7 border-t-2 border-t-gold">
                    <p className="font-serif text-[18px] text-ink leading-[1.5] mb-2">
                      &ldquo;{copy.pages.contact.proverb}&rdquo;
                    </p>
                    <span className="text-[12px] font-medium tracking-[0.1em] uppercase text-muted">-- {copy.pages.contact.proverbSource}</span>
                  </div>
                  <div className="space-y-4 pt-4 border-t border-rule">
                    <div>
                      <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted mb-1">{copy.pages.contact.fields.email}</div>
                      <a
                        href={`mailto:${contactEmail}`}
                        className="text-[14px] font-light text-ink2 hover:text-green transition-colors"
                      >
                        {contactEmail}
                      </a>
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted mb-1">
                        {copy.pages.booking.fields.phone}
                      </div>
                      <a
                        href={`tel:${contact.phone.replace(/\s/g, "")}`}
                        className="text-[14px] font-light text-ink2 hover:text-green transition-colors"
                      >
                        {contact.phone}
                      </a>
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted mb-1">{copy.pages.contact.responseTime}</div>
                      <div className="text-[14px] font-light text-ink2">{copy.pages.contact.responseValue}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
