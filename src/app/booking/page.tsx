"use client";

import { useMemo, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const prices = {
  standard: { label: "Standard", withoutFlight: 2700, withFlight: 4200 },
  premium: { label: "Premium", withoutFlight: 3700, withFlight: 5200 },
};

type PackageKey = keyof typeof prices;

export default function BookingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [packageKey, setPackageKey] = useState<PackageKey>("standard");
  const [includeFlight, setIncludeFlight] = useState(false);

  const total = useMemo(() => {
    const selected = prices[packageKey];
    return includeFlight ? selected.withFlight : selected.withoutFlight;
  }, [includeFlight, packageKey]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 900);
  };

  return (
    <>
      <Navigation />
      <main className="pt-16">
        <section className="pt-20 pb-20 px-6 lg:px-14 bg-cream">
          <div className="max-w-1180px mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-start">
            <div>
              <span className="eyebrow">Booking</span>
              <h1 className="heading font-serif text-[clamp(34px,4vw,58px)] leading-[1.08] text-ink tracking-[-0.01em]">
                Book your Bangladeshi <em>homestay experience</em>
              </h1>
              <p className="mt-6 text-[15.5px] font-light text-muted leading-[1.85] max-w-620px">
                Submit your booking request and receive confirmation with a Swiss QR payment invoice by email. Payment is completed after submission, not on this page.
              </p>
            </div>

            <div className="border-t-2 border-gold pt-7">
              <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-muted mb-4">
                Payment after booking
              </div>
              <p className="text-[14px] font-light text-ink2/80 leading-[1.8]">
                After the request is reviewed, a Swiss QR-invoice PDF is sent to your email. Scan it with your Swiss banking app to fill in the transfer details and complete payment.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-24 px-6 lg:px-14 bg-cream">
          <div className="max-w-1180px mx-auto">
            {submitted ? (
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-12 lg:gap-20 items-start">
                <div className="py-12 border-y border-rule">
                  <span className="eyebrow">Request Submitted</span>
                  <h2 className="font-serif text-[clamp(30px,3vw,44px)] text-ink leading-[1.14] mb-5">
                    Your booking request has been received.
                  </h2>
                  <p className="text-[15px] font-light text-muted leading-[1.85] max-w-620px">
                    You will receive a confirmation email with the Swiss QR payment invoice within 24 hours. Once payment is received, the booking is confirmed and the pre-arrival guide will be sent.
                  </p>
                </div>
                <div className="bg-green text-cream p-8">
                  <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-cream/50 mb-5">
                    Selected package
                  </div>
                  <div className="text-[30px] font-serif mb-2">{prices[packageKey].label}</div>
                  <div className="text-[14px] text-cream/60 mb-8">
                    {includeFlight ? "With flight ticket" : "Without flight ticket"}
                  </div>
                  <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-cream/45 mb-2">
                    Estimated total
                  </div>
                  <div className="text-[38px] font-serif">CHF {total.toLocaleString("en-US")}</div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-16">
                <div className="space-y-12">
                  <section>
                    <h2 className="font-serif text-[24px] text-ink mb-6">Choose your package</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(Object.keys(prices) as PackageKey[]).map((key) => {
                        const item = prices[key];
                        const active = packageKey === key;

                        return (
                          <label
                            key={key}
                            className={`block border p-5 cursor-pointer transition-colors ${
                              active ? "border-green bg-green/5" : "border-rule bg-cream2 hover:border-green/30"
                            }`}
                          >
                            <input
                              type="radio"
                              name="package"
                              value={key}
                              checked={active}
                              onChange={() => setPackageKey(key)}
                              className="sr-only"
                            />
                            <div className="flex justify-between items-start gap-4">
                              <div>
                                <div className="font-serif text-[22px] text-ink">{item.label}</div>
                                <p className="text-[13px] font-light text-muted leading-[1.7] mt-2">
                                  {key === "standard"
                                    ? "Host family stay, meals, local transport, and basic cultural activities."
                                    : "Standard inclusions plus extended cooking, music, crafts, and local tours."}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted">
                                  From
                                </div>
                                <div className="font-serif text-[24px] text-green">
                                  CHF {item.withoutFlight.toLocaleString("en-US")}
                                </div>
                              </div>
                            </div>
                          </label>
                        );
                      })}
                    </div>

                    <label className="mt-5 flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeFlight}
                        onChange={(event) => setIncludeFlight(event.target.checked)}
                        className="mt-1 h-4 w-4 accent-green"
                      />
                      <span>
                        <span className="block text-[14px] font-medium text-ink">Include international flight ticket</span>
                        <span className="block text-[13px] font-light text-muted">
                          Adds CHF 1,500 to the selected package.
                        </span>
                      </span>
                    </label>
                  </section>

                  <section>
                    <h2 className="font-serif text-[24px] text-ink mb-6">Guest details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <Field label="First name" name="firstName" autoComplete="given-name" />
                      <Field label="Last name" name="lastName" autoComplete="family-name" />
                      <Field label="Email" name="email" type="email" autoComplete="email" />
                      <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
                      <Field label="Country of residence" name="country" autoComplete="country-name" />
                      <Field label="Number of guests" name="guests" type="number" min="1" max="6" defaultValue="1" />
                    </div>
                  </section>

                  <section>
                    <h2 className="font-serif text-[24px] text-ink mb-6">Travel preferences</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <Field label="Preferred arrival date" name="arrivalDate" type="date" />
                      <Field label="Preferred departure date" name="departureDate" type="date" />
                    </div>
                    <div className="mt-5">
                      <label htmlFor="notes" className="block text-[13px] font-medium text-ink mb-1.5">
                        Dietary needs, accessibility needs, or questions
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        rows={5}
                        className="w-full px-4 py-3 border border-rule bg-cream2 text-ink placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-green/30 focus:border-green transition-colors text-[14px] resize-none"
                        placeholder="Tell us anything important before we review your booking."
                      />
                    </div>
                  </section>
                </div>

                <aside className="lg:sticky lg:top-24 h-fit bg-green text-cream p-7">
                  <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-cream/45 mb-5">
                    Booking summary
                  </div>
                  <div className="flex justify-between gap-4 py-3 border-b border-white/10">
                    <span className="text-cream/55 text-[13px]">Package</span>
                    <span className="text-[14px] font-medium">{prices[packageKey].label}</span>
                  </div>
                  <div className="flex justify-between gap-4 py-3 border-b border-white/10">
                    <span className="text-cream/55 text-[13px]">Flight ticket</span>
                    <span className="text-[14px] font-medium">{includeFlight ? "Included" : "Not included"}</span>
                  </div>
                  <div className="pt-6">
                    <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-cream/45 mb-2">
                      Estimated total
                    </div>
                    <div className="font-serif text-[40px] leading-none">CHF {total.toLocaleString("en-US")}</div>
                  </div>
                  <p className="text-[12.5px] font-light text-cream/55 leading-[1.7] mt-6">
                    Payment is not collected on this page. A Swiss QR payment invoice is sent by email after the booking request is reviewed.
                  </p>
                  <button type="submit" disabled={submitting} className="btn-cream w-full mt-8 text-center">
                    {submitting ? "Submitting..." : "Submit Booking Request"}
                  </button>
                </aside>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  min,
  max,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  min?: string;
  max?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-[13px] font-medium text-ink mb-1.5">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        min={min}
        max={max}
        defaultValue={defaultValue}
        className="w-full px-4 py-3 border border-rule bg-cream2 text-ink placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-green/30 focus:border-green transition-colors text-[14px]"
      />
    </div>
  );
}
