import SectionReveal from "@/components/SectionReveal";

const paySteps = [
  { num: "1.", title: "Submit Booking", desc: "Choose your dates, package, and complete the booking form." },
  { num: "2.", title: "Receive Payment Details", desc: "A payment invoice is sent to your email address automatically." },
  { num: "3.", title: "Complete Payment", desc: "Use the invoice details to complete the payment from your bank." },
  { num: "4.", title: "Confirmed", desc: "We verify payment and send your welcome pack & pre-arrival guide." },
];

const paymentNotes = [
  { name: "Invoice by email", type: "Payment details sent after booking" },
  { name: "Bank transfer", type: "Complete payment through your own bank" },
  { name: "Manual confirmation", type: "Booking is confirmed after payment review" },
  { name: "No card checkout", type: "No online card gateway is required" },
];

export default function Payment() {
  return (
    <section className="py-24 px-6 lg:px-14 bg-cream2" id="payment">
      <div className="max-w-[1400px] mx-auto">
        <SectionReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <div>
              <span className="eyebrow">Payment</span>
              <h2 className="heading font-serif text-[clamp(32px,3.5vw,50px)] font-normal leading-[1.12] text-ink tracking-[-0.01em] mb-7">
                Simple
                <br />
                <em>payment process</em>
              </h2>
              <p className="text-[15px] font-light text-ink2/80 leading-[1.9]">
                After booking, you&apos;ll receive a payment invoice by email with the details needed to complete your transfer. Your booking is reviewed and confirmed once payment is received.
              </p>

              <div className="mt-12 pt-9 border-t border-rule">
                <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-muted mb-5">
                  Payment Flow
                </div>
                {paySteps.map((step, i) => (
                  <div
                    key={step.num}
                    className={`flex gap-5 items-start py-4 ${
                      i < paySteps.length - 1 ? "border-b border-rule-light" : ""
                    }`}
                  >
                    <span className="font-serif text-[13px] italic text-gold min-w-[20px]">
                      {step.num}
                    </span>
                    <div>
                      <h4 className="text-[14px] font-semibold text-ink mb-0.5">
                        {step.title}
                      </h4>
                      <p className="text-[13px] font-light text-muted">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="eyebrow" style={{ marginTop: 0 }}>
                Payment Details
              </span>
              <p className="text-[14px] font-light text-muted leading-[1.8]">
                The booking flow keeps payment clear and separate from package selection, so guests understand what happens after submitting a booking.
              </p>

              <div className="mt-10 pt-10 border-t border-rule">
                <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-muted mb-5">
                  What to Expect
                </div>
                {paymentNotes.map((note, i) => (
                  <div
                    key={note.name}
                    className={`flex justify-between items-center py-[13px] ${
                      i < paymentNotes.length - 1 ? "border-b border-rule-light" : ""
                    }`}
                  >
                    <span className="text-[14px] font-medium text-ink2">
                      {note.name}
                    </span>
                    <span className="text-[12px] font-light text-muted italic">
                      {note.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
