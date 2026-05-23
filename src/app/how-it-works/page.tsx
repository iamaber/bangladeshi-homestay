import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

const steps = [
  { num: "1", title: "Choose your package", desc: "Pick Standard or Premium, with or without a flight ticket included." },
  { num: "2", title: "Submit your booking", desc: "Fill out a short form and receive your confirmation and payment invoice by email within 24 hours." },
  { num: "3", title: "Arrive & immerse yourself", desc: "Your host family will be at the airport to welcome you. From there, your Bengali adventure begins." },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <section className="pt-20 pb-24 px-6 lg:px-14 bg-cream">
          <div className="max-w-[900px] mx-auto">
            <span className="eyebrow">How It Works</span>
            <h1 className="heading font-serif text-[clamp(32px,3.5vw,50px)] leading-[1.12] text-ink tracking-[-0.01em]">
              Simple from <em>Start to Finish</em>
            </h1>
            <p className="mt-6 text-[15.5px] font-light text-muted leading-[1.8] max-w-[560px]">
              Choose your experience, submit your booking, and arrive ready for a two-week cultural immersion with a Bangladeshi host family.
            </p>
          </div>
        </section>

        <section className="py-24 px-6 lg:px-14 bg-cream2">
          <div className="max-w-[900px] mx-auto">
            {steps.map((step, i) => (
              <div key={step.num} className="flex gap-6 lg:gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-green to-green-mid flex items-center justify-center shadow-lg shadow-green/20 flex-shrink-0">
                    <span className="font-serif text-cream text-[18px]">{step.num}</span>
                  </div>
                  {i < steps.length - 1 && <div className="w-px flex-1 bg-rule mt-4" />}
                </div>
                <div className="pb-10">
                  <h3 className="font-serif text-[22px] text-ink mb-2">{step.title}</h3>
                  <p className="text-[14px] font-light text-muted leading-[1.8]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-24 px-6 lg:px-14 bg-green">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="font-serif text-[clamp(28px,3vw,42px)] text-cream leading-[1.12] mb-4">
              Ready to start your Bangladeshi <em>journey?</em>
            </h2>
            <p className="text-[15px] font-light text-cream/70 leading-[1.85] mb-8">
              Browse our host families and find the perfect match for your two-week cultural immersion.
            </p>
            <Link href="/#host" className="btn-fill">Browse Host Families</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
