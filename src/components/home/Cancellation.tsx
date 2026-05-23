import SectionReveal from "@/components/SectionReveal";

export default function Cancellation() {
  return (
    <section className="py-24 px-6 lg:px-14">
      <div className="max-w-[1400px] mx-auto">
        <SectionReveal>
          <span className="eyebrow">Cancellation Policy</span>
          <h2 className="heading font-serif text-[clamp(32px,3.5vw,50px)] font-normal leading-[1.12] text-ink tracking-[-0.01em] mb-12">
            Fair & transparent
            <br />
            <em>refund policy</em>
          </h2>
          <hr className="border-none border-t border-rule" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 pt-10">
            <div className="md:pr-10 md:border-r md:border-rule">
              <div className="font-serif text-[64px] text-green leading-none mb-3">
                80%
              </div>
              <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted mb-3">
                Within 7 days of booking
              </div>
              <p className="text-[14px] font-light text-ink2 leading-[1.75]">
                Cancel within the first week and receive 80% of your payment back —
                no questions asked.
              </p>
            </div>

            <div className="md:px-10 md:border-r md:border-rule py-10 md:py-0">
              <div className="font-serif text-[64px] text-green leading-none mb-3">
                50%
              </div>
              <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted mb-3">
                After 7 days
              </div>
              <p className="text-[14px] font-light text-ink2 leading-[1.75]">
                Life happens. If you need to cancel after the first week, a 50%
                refund is processed promptly.
              </p>
            </div>

            <div className="md:pl-10">
              <div className="font-serif text-[20px] text-muted mb-5 italic">
                Need to reschedule?
              </div>
              <p className="text-[14px] font-light text-ink2 leading-[1.75] mb-5">
                We&apos;re happy to help you find new dates with the same host family
                where possible.
              </p>
              <a
                href="#contact"
                className="text-[12px] font-semibold tracking-[0.1em] uppercase text-green no-underline border-b border-green pb-0.5"
              >
                Contact our team →
              </a>
            </div>
          </div>
          <hr className="border-none border-t border-rule mt-10" />
        </SectionReveal>
      </div>
    </section>
  );
}