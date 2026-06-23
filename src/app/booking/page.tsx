"use client";

import { useMemo, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { contactEmail, createMailtoUrl } from "@/lib/email";
import { useI18n } from "@/lib/useI18n";

const prices = {
  standard: { label: "Standard", withoutFlight: 2700, withFlight: 4200 },
  premium: { label: "Premium", withoutFlight: 3700, withFlight: 5200 },
};

type PackageKey = keyof typeof prices;

export default function BookingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [packageKey, setPackageKey] = useState<PackageKey>("standard");
  const [includeFlight, setIncludeFlight] = useState(false);
  const { copy } = useI18n();

  const total = useMemo(() => {
    const selected = prices[packageKey];
    return includeFlight ? selected.withFlight : selected.withoutFlight;
  }, [includeFlight, packageKey]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = copy.pages.booking.subject.replace("{package}", prices[packageKey].label);

    window.location.href = createMailtoUrl(subject, [
      { label: copy.pages.booking.fields.firstName, value: data.get("firstName") },
      { label: copy.pages.booking.fields.lastName, value: data.get("lastName") },
      { label: copy.pages.booking.fields.email, value: data.get("email") },
      { label: copy.pages.booking.fields.phone, value: data.get("phone") },
      { label: copy.pages.booking.fields.country, value: data.get("country") },
      { label: copy.pages.booking.fields.guests, value: data.get("guests") },
      { label: copy.pages.booking.fields.package, value: prices[packageKey].label },
      { label: copy.pages.booking.fields.flight, value: includeFlight ? copy.common.included : copy.common.notIncluded },
      { label: copy.pages.booking.fields.total, value: `CHF ${total.toLocaleString("en-US")}` },
      { label: copy.pages.booking.fields.arrival, value: data.get("arrivalDate") },
      { label: copy.pages.booking.fields.departure, value: data.get("departureDate") },
      { label: copy.pages.booking.fields.notes, value: data.get("notes") },
    ]);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navigation />
      <main className="pt-16">
        <section className="pt-20 pb-20 px-6 lg:px-14 bg-cream">
          <div className="max-w-1180px mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-start">
            <div>
              <span className="eyebrow">{copy.pages.booking.eyebrow}</span>
              <h1 className="heading font-serif text-[clamp(34px,4vw,58px)] leading-[1.08] text-ink tracking-[-0.01em]">
                {copy.pages.booking.headline} <em>{copy.pages.booking.emphasis}</em>
              </h1>
              <p className="mt-6 text-[15.5px] font-light text-muted leading-[1.85] max-w-620px">
                {copy.pages.booking.intro}
              </p>
            </div>

            <div className="border-t-2 border-gold pt-7">
              <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-muted mb-4">
                {copy.pages.booking.afterTitle}
              </div>
              <p className="text-[14px] font-light text-ink2/80 leading-[1.8]">
                {copy.pages.booking.afterText}
              </p>
            </div>
          </div>
        </section>

        <section className="pb-24 px-6 lg:px-14 bg-cream">
          <div className="max-w-1180px mx-auto">
            {submitted ? (
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-12 lg:gap-20 items-start">
                <div className="py-12 border-y border-rule">
                  <span className="eyebrow">{copy.pages.booking.opened}</span>
                  <h2 className="font-serif text-[clamp(30px,3vw,44px)] text-ink leading-[1.14] mb-5">
                    {copy.pages.booking.openedTitle}
                  </h2>
                  <p className="text-[15px] font-light text-muted leading-[1.85] max-w-620px">
                    {copy.pages.booking.openedText.replace("{email}", contactEmail)}
                  </p>
                </div>
                <div className="bg-green text-cream p-8">
                  <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-cream/50 mb-5">
                    {copy.pages.booking.selectedPackage}
                  </div>
                  <div className="text-[30px] font-serif mb-2">{prices[packageKey].label}</div>
                  <div className="text-[14px] text-cream/60 mb-8">
                    {includeFlight ? copy.common.withFlight : copy.common.withoutFlight}
                  </div>
                  <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-cream/45 mb-2">
                    {copy.common.estimatedTotal}
                  </div>
                  <div className="text-[38px] font-serif">CHF {total.toLocaleString("en-US")}</div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-16">
                <div className="space-y-12">
                  <section>
                    <h2 className="font-serif text-[24px] text-ink mb-6">{copy.pages.booking.choosePackage}</h2>
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
                                    ? copy.pages.booking.standardDesc
                                    : copy.pages.booking.premiumDesc}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted">
                                  {copy.common.from}
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
                        name="includeFlight"
                        checked={includeFlight}
                        onChange={(event) => setIncludeFlight(event.target.checked)}
                        className="mt-1 h-4 w-4 accent-green"
                      />
                      <span>
                        <span className="block text-[14px] font-medium text-ink">{copy.pages.booking.includeFlight}</span>
                        <span className="block text-[13px] font-light text-muted">
                          {copy.pages.booking.flightExtra}
                        </span>
                      </span>
                    </label>
                  </section>

                  <section>
                    <h2 className="font-serif text-[24px] text-ink mb-6">{copy.pages.booking.guestDetails}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <Field label={copy.pages.booking.fields.firstName} name="firstName" autoComplete="given-name" />
                      <Field label={copy.pages.booking.fields.lastName} name="lastName" autoComplete="family-name" />
                      <Field label={copy.pages.booking.fields.email} name="email" type="email" autoComplete="email" />
                      <Field label={copy.pages.booking.fields.phone} name="phone" type="tel" autoComplete="tel" />
                      <Field label={copy.pages.booking.fields.countryResidence} name="country" autoComplete="country-name" />
                      <Field label={copy.pages.booking.fields.guests} name="guests" type="number" min="1" max="6" defaultValue="1" />
                    </div>
                  </section>

                  <section>
                    <h2 className="font-serif text-[24px] text-ink mb-6">{copy.pages.booking.travelPrefs}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <Field label={copy.pages.booking.fields.arrival} name="arrivalDate" type="date" />
                      <Field label={copy.pages.booking.fields.departure} name="departureDate" type="date" />
                    </div>
                    <div className="mt-5">
                      <label htmlFor="notes" className="block text-[13px] font-medium text-ink mb-1.5">
                        {copy.pages.booking.notesLabel}
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        rows={5}
                        className="w-full px-4 py-3 border border-rule bg-cream2 text-ink placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-green/30 focus:border-green transition-colors text-[14px] resize-none"
                        placeholder={copy.pages.booking.notesPlaceholder}
                      />
                    </div>
                  </section>
                </div>

                <aside className="lg:sticky lg:top-24 h-fit bg-green text-cream p-7">
                  <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-cream/45 mb-5">
                    {copy.pages.booking.summary}
                  </div>
                  <div className="flex justify-between gap-4 py-3 border-b border-white/10">
                    <span className="text-cream/55 text-[13px]">{copy.common.package}</span>
                    <span className="text-[14px] font-medium">{prices[packageKey].label}</span>
                  </div>
                  <div className="flex justify-between gap-4 py-3 border-b border-white/10">
                    <span className="text-cream/55 text-[13px]">{copy.common.flightTicket}</span>
                    <span className="text-[14px] font-medium">{includeFlight ? copy.common.included : copy.common.notIncluded}</span>
                  </div>
                  <div className="pt-6">
                    <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-cream/45 mb-2">
                      {copy.common.estimatedTotal}
                    </div>
                    <div className="font-serif text-[40px] leading-none">CHF {total.toLocaleString("en-US")}</div>
                  </div>
                  <p className="text-[12.5px] font-light text-cream/55 leading-[1.7] mt-6">
                    {copy.pages.booking.summaryNote}
                  </p>
                  <button type="submit" className="btn-cream w-full mt-8 text-center">
                    {copy.pages.booking.submit}
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
