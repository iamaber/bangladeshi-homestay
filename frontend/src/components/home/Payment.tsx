"use client";

import SectionReveal from "@/components/SectionReveal";
import Link from "next/link";
import { useI18n } from "@/lib/useI18n";

export default function Payment() {
  const { copy } = useI18n();

  return (
    <section className="py-16 px-6 lg:px-14 bg-cream2" id="payment">
      <div className="max-w-[1400px] mx-auto">
        <SectionReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <div>
              <span className="eyebrow">{copy.home.payment.eyebrow}</span>
              <h2 className="heading font-serif text-[clamp(32px,3.5vw,50px)] font-bold leading-[1.12] text-ink tracking-[-0.01em] mb-7">
                {copy.home.payment.headlineA}
                <br />
                <em>{copy.home.payment.headlineB}</em>
              </h2>
              <p className="text-[15px] font-light text-ink2/80 leading-[1.9]">
                {copy.home.payment.intro}
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/booking" className="btn-fill-sm">
                  {copy.common.startBooking}
                </Link>
                <Link href="/contact" className="btn-line-sm">
                  {copy.common.paymentQuestions}
                </Link>
              </div>

              <div className="mt-10 pt-8 border-t border-rule">
                <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-muted mb-5">
                  {copy.home.payment.flow}
                </div>
                {copy.home.payment.steps.map(([num, title, desc], i) => (
                  <div
                    key={num}
                    className={`flex gap-5 items-start py-4 ${
                      i < copy.home.payment.steps.length - 1 ? "border-b border-rule-light" : ""
                    }`}
                  >
                    <span className="font-serif text-[13px] text-gold min-w-[20px]">
                      {num}
                    </span>
                    <div>
                      <h4 className="text-[14px] font-semibold text-ink mb-0.5">
                        {title}
                      </h4>
                      <p className="text-[13px] font-light text-muted">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="eyebrow" style={{ marginTop: 0 }}>
                {copy.home.payment.details}
              </span>
              <p className="text-[14px] font-light text-muted leading-[1.8]">
                {copy.home.payment.detailsText}
              </p>

              <div className="mt-8 pt-8 border-t border-rule">
                <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-muted mb-5">
                  {copy.home.payment.expect}
                </div>
                {copy.home.payment.notes.map(([name, type], i) => (
                  <div
                    key={name}
                    className={`flex justify-between items-center py-[13px] ${
                      i < copy.home.payment.notes.length - 1 ? "border-b border-rule-light" : ""
                    }`}
                  >
                    <span className="text-[14px] font-medium text-ink2">
                      {name}
                    </span>
                    <span className="text-[12px] font-light text-muted">
                      {type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Cancellation policy — merged into the booking & payment section */}
        <SectionReveal>
          <div className="mt-14 pt-12 border-t border-rule">
            <span className="eyebrow">{copy.home.payment.cancellation.eyebrow}</span>
            <h3 className="heading font-serif text-[clamp(26px,2.6vw,38px)] font-bold leading-[1.14] text-ink tracking-[-0.01em] mb-10">
              {copy.home.payment.cancellation.headline} <em>{copy.home.payment.cancellation.emphasis}</em>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 pt-8 border-t border-rule">
              <div className="md:pr-10 md:border-r md:border-rule">
                <div className="font-serif text-[56px] font-bold text-green leading-none mb-3">
                  80%
                </div>
                <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted mb-3">
                  {copy.home.payment.cancellation.firstWindow}
                </div>
                <p className="text-[14px] font-light text-ink2 leading-[1.75]">
                  {copy.home.payment.cancellation.firstText}
                </p>
              </div>

              <div className="md:px-10 md:border-r md:border-rule py-10 md:py-0">
                <div className="font-serif text-[56px] font-bold text-green leading-none mb-3">
                  50%
                </div>
                <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted mb-3">
                  {copy.home.payment.cancellation.secondWindow}
                </div>
                <p className="text-[14px] font-light text-ink2 leading-[1.75]">
                  {copy.home.payment.cancellation.secondText}
                </p>
              </div>

              <div className="md:pl-10">
                <div className="font-serif text-[20px] font-semibold text-muted mb-5">
                  {copy.home.payment.cancellation.rescheduleTitle}
                </div>
                <p className="text-[14px] font-light text-ink2 leading-[1.75] mb-5">
                  {copy.home.payment.cancellation.rescheduleText}
                </p>
                <Link
                  href="/contact"
                  className="text-[12px] font-semibold tracking-[0.1em] uppercase text-green no-underline border-b border-green pb-0.5"
                >
                  {copy.common.contactOurTeam} →
                </Link>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
