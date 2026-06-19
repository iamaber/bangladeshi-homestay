"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate async submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <>
      <Navigation />
      <main className="pt-16">
        <section className="pt-20 pb-24 px-6 lg:px-14 bg-cream">
          <div className="max-w-[900px] mx-auto">
            <span className="eyebrow">Contact</span>
            <h1 className="heading font-serif text-[clamp(32px,3.5vw,50px)] leading-[1.12] text-ink tracking-[-0.01em]">
              Get in touch with <em>our team</em>
            </h1>
            <p className="mt-6 text-[15px] font-light text-muted leading-[1.8] max-w-[560px]">
              Have questions about your stay, need help booking, or want to learn more about the experience? We&apos;d love to hear from you.
            </p>
          </div>
        </section>

        <section className="pb-24 px-6 lg:px-14 bg-cream">
          <div className="max-w-[900px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
              <div className="lg:col-span-3">
                <h2 className="font-serif text-[22px] text-ink mb-6">Send us a message</h2>
                {submitted ? (
                  <div
                    className="p-8 border border-green/20 bg-green/5 text-center"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="font-serif text-[20px] text-ink mb-2">Message sent!</div>
                    <p className="text-[14px] font-light text-muted">We&apos;ll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" aria-label="Contact form">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="firstName" className="block text-[13px] font-medium text-ink mb-1.5">First Name</label>
                        <input id="firstName" name="firstName" type="text" required autoComplete="given-name" className="w-full px-4 py-3 border border-rule bg-cream2 text-ink placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-green/30 focus:border-green transition-colors text-[14px]" placeholder="Your first name" />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-[13px] font-medium text-ink mb-1.5">Last Name</label>
                        <input id="lastName" name="lastName" type="text" required autoComplete="family-name" className="w-full px-4 py-3 border border-rule bg-cream2 text-ink placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-green/30 focus:border-green transition-colors text-[14px]" placeholder="Your last name" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[13px] font-medium text-ink mb-1.5">Email</label>
                      <input id="email" name="email" type="email" required autoComplete="email" className="w-full px-4 py-3 border border-rule bg-cream2 text-ink placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-green/30 focus:border-green transition-colors text-[14px]" placeholder="your@email.com" />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-[13px] font-medium text-ink mb-1.5">Subject</label>
                      <select id="subject" name="subject" className="w-full px-4 py-3 border border-rule bg-cream2 text-ink focus:outline-none focus:ring-1 focus:ring-green/30 focus:border-green transition-colors text-[14px]">
                        <option>General Inquiry</option>
                        <option>Booking Question</option>
                        <option>Host Family Information</option>
                        <option>Payment & Invoice</option>
                        <option>Cancellation</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-[13px] font-medium text-ink mb-1.5">Message</label>
                      <textarea id="message" name="message" required rows={5} className="w-full px-4 py-3 border border-rule bg-cream2 text-ink placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-green/30 focus:border-green transition-colors text-[14px] resize-none" placeholder="Tell us how we can help..." />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      aria-disabled={submitting}
                      className="btn-fill-sm"
                    >
                      {submitting ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="inline-block w-3.5 h-3.5 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </form>
                )}
              </div>

              <div className="lg:col-span-2">
                <h2 className="font-serif text-[22px] text-ink mb-6">Contact information</h2>
                <div className="space-y-6">
                  <div className="pt-7 border-t-2 border-t-gold">
                    <p className="font-serif text-[18px] text-ink leading-[1.5] mb-2">
                      &ldquo;A table set for guests is a prayer answered in Bangladesh.&rdquo;
                    </p>
                    <span className="text-[12px] font-medium tracking-[0.1em] uppercase text-muted">— Bengali Proverb</span>
                  </div>
                  <div className="space-y-4 pt-4 border-t border-rule">
                    <div>
                      <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted mb-1">Email</div>
                      <div className="text-[14px] font-light text-ink2">hello@bengalliving.com</div>
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted mb-1">Response time</div>
                      <div className="text-[14px] font-light text-ink2">Within 24 hours</div>
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