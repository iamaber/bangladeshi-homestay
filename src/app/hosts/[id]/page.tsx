import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { withBasePath } from "@/lib/paths";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const openMonths = ["Feb", "Mar", "May", "Jun", "Aug", "Sep", "Nov", "Dec"];

export function generateStaticParams() {
  return [
    { id: "featured-host-family" },
    { id: "future-host-family" },
    { id: "seasonal-host-family" },
  ];
}

const members = [
  { label: "Host parent", detail: "Coordinates household routines, meals, and guest welcome." },
  { label: "Host parent", detail: "Shares cooking traditions, daily life, and cultural context." },
  { label: "Younger household members", detail: "May join conversations, meals, and everyday family moments." },
  { label: "Extended family", detail: "Visits and shared meals may be part of the natural household rhythm." },
];

export default function HostProfilePage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <section className="pt-12 pb-24 px-6 lg:px-14 bg-cream">
          <div className="max-w-[1200px] mx-auto">
            <Link href="/hosts" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-green transition-colors no-underline mb-6">
              <ChevronLeft size={16} /> Back to Host Families
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
              {/* Photo gallery */}
              <div>
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="col-span-2 aspect-[2/1] rounded-sm overflow-hidden">
                    <img
                      src={withBasePath("/images/host-home-entrance.jpeg")}
                      alt="Entrance of a Bangladeshi host family home"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-sm overflow-hidden">
                    <img
                      src={withBasePath("/images/guest-bedroom-blue.jpeg")}
                      alt="Guest bedroom in a Bangladeshi host home"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-sm overflow-hidden">
                    <img
                      src={withBasePath("/images/home-kitchen.jpeg")}
                      alt="Kitchen inside a Bangladeshi host family home"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-green text-cream text-[11px] font-semibold tracking-[0.06em] uppercase">Available Now</span>
                </div>

                <h1 className="font-serif text-[32px] lg:text-[40px] text-ink leading-tight mb-2">Featured Host Family</h1>
                <div className="text-[13px] text-muted tracking-[0.04em] flex items-center gap-1.5 mb-6">
                  <span className="inline-block text-[11px] rotate-[-45deg] text-gold">↓</span>
                  Bangladesh — exact family details shared after booking review
                </div>

                <p className="font-serif text-[17px] italic text-ink2 leading-[1.75] pl-5 border-l-2 border-l-gold mb-8">
                  &ldquo;A warm, carefully selected Bangladeshi household welcomes guests into everyday family life, shared meals, local routines, and cultural exchange.&rdquo;
                </p>

                <hr className="border-none border-t border-rule" />

                {[
                  ["Languages spoken", "Bangla, English, Hindi"],
                  ["Household size", "5-6 people"],
                  ["Amenities", "Private room, A/C, WiFi, rooftop terrace"],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between items-baseline gap-4 py-3 border-b border-rule-light">
                    <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted">{label}</span>
                    <span className="text-[13.5px] font-light text-ink2">{val}</span>
                  </div>
                ))}

                <div className="flex justify-between items-baseline gap-4 py-3">
                  <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted">Availability</span>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {months.map((m) => (
                      <span key={m} className={`text-[11px] font-medium px-2 py-0.5 border ${openMonths.includes(m) ? "text-green-soft border-green-soft/40" : "text-muted border-rule"}`}>{m}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/booking" className="btn-fill-sm inline-block">Request to Stay — From CHF 2,700</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 lg:px-14 bg-cream2">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="font-serif text-[28px] text-ink mb-8">Household Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.map((m) => (
                <div key={m.label + m.detail} className="p-5 bg-cream border border-rule hover:border-rule-dark transition-colors duration-300">
                  <div className="font-serif text-[15px] text-ink font-medium">{m.label}</div>
                  <p className="text-[13px] font-light text-muted mt-2 leading-[1.7]">{m.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 lg:px-14 bg-green relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(var(--color-gold-warm) 1px, transparent 1px), linear-gradient(90deg, var(--color-gold-warm) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="max-w-[700px] mx-auto text-center relative z-10">
            <h2 className="font-serif text-[clamp(28px,3vw,42px)] text-cream leading-[1.12] mb-4">
              Ready to meet your host family?
            </h2>
            <p className="text-[15px] font-light text-cream/70 leading-[1.85] mb-8">
              Book your two-week immersive stay and experience Bangladesh like a local.
            </p>
            <Link href="/booking" className="btn-cream inline-block">Book Now — From CHF 2,700</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
