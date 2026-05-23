import SectionReveal from "@/components/SectionReveal";

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const openMonths = ["Feb", "Mar", "May", "Jun", "Aug", "Sep", "Nov", "Dec"];

export default function HostFamily() {
  return (
    <section className="py-24 px-6 lg:px-14" id="host">
      <div className="max-w-[1400px] mx-auto">
        <SectionReveal>
          <span className="eyebrow">Featured Host Family</span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
            {/* Photo grid */}
            <div className="grid grid-cols-2 gap-1.5">
              <div className="col-span-2 aspect-[2/1] rounded-sm overflow-hidden">
                <img
                  src="/images/host-home-entrance.jpeg"
                  alt="Entrance of a Bangladeshi host family home"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-sm overflow-hidden">
                <img
                  src="/images/guest-bedroom-window.jpeg"
                  alt="Guest bedroom with window in a Bangladeshi host home"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-sm overflow-hidden">
                <img
                  src="/images/home-kitchen.jpeg"
                  alt="Kitchen inside a Bangladeshi host family home"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div>
              <h2 className="heading font-serif text-[clamp(32px,3.5vw,50px)] font-normal leading-[1.12] text-ink tracking-[-0.01em] mb-0">
                Meet your
                <br />
                <em>future host family</em>
              </h2>
              <div className="font-serif text-[32px] text-ink mt-5 mb-1">
                Featured Host Family
              </div>
              <div className="text-[13px] text-muted tracking-[0.04em] mb-7 flex items-center gap-1.5">
                <span className="inline-block text-[11px] rotate-[-45deg] text-gold">↓</span>
                Bangladesh — exact family details shared after booking review
              </div>

              <p className="font-serif text-[17px] italic text-ink2 leading-[1.75] pl-5 border-l-2 border-l-gold mb-8">
                &ldquo;A warm, carefully selected Bangladeshi household welcomes guests into everyday family life, shared meals, local routines, and cultural exchange.&rdquo;
              </p>

              <hr className="border-none border-t border-rule my-6" />

              <div className="flex justify-between items-baseline gap-4 py-3 border-b border-rule-light">
                <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted">
                  Languages spoken
                </span>
                <span className="text-[13.5px] font-light text-ink2">
                  Bangla, English, Hindi
                </span>
              </div>
              <div className="flex justify-between items-baseline gap-4 py-3 border-b border-rule-light">
                <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted">
                  Household size
                </span>
                <span className="text-[13.5px] font-light text-ink2">
                  5-6 people
                </span>
              </div>
              <div className="flex justify-between items-baseline gap-4 py-3 border-b border-rule-light">
                <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted">
                  Amenities
                </span>
                <span className="text-[13.5px] font-light text-ink2">
                  Private room, A/C, WiFi, rooftop terrace
                </span>
              </div>
              <div className="flex justify-between items-baseline gap-4 py-3">
                <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted">
                  Availability 2025–2026
                </span>
                <div className="flex flex-wrap gap-1.5 justify-end">
                  {months.map((m) => (
                    <span
                      key={m}
                      className={`text-[11px] font-medium px-2 py-0.5 border transition-colors ${
                        openMonths.includes(m)
                          ? "text-green-soft border-green-soft/40 hover:bg-green-soft/5 cursor-default"
                          : "text-muted border-rule"
                      }`}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <a href="#booking" className="btn-fill-sm inline-block">
                  Request to Stay
                </a>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
