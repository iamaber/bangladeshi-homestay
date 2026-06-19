import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import { HandHeart, Leaf, Orbit } from "lucide-react";
import { withBasePath } from "@/lib/paths";

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <section className="pt-20 pb-24 px-6 lg:px-14 bg-cream">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
            <div>
            <span className="eyebrow">About Us</span>
            <h1 className="heading font-serif text-[clamp(32px,3.5vw,50px)] leading-[1.12] text-ink tracking-[-0.01em]">
              We Believe Travel Should <em>Feel Like Home</em>
            </h1>
            <div className="mt-8 space-y-4 text-[15.5px] font-light text-ink2/80 leading-[1.9]">
              <h2 className="text-[18px] font-semibold text-ink">Our Story</h2>
              <p>
                Gutu Gasthaus was born from a simple belief: the most meaningful travel experiences don&apos;t happen in hotels. They happen around kitchen tables, in family courtyards, and on evening walks through local neighbourhoods.
              </p>
              <p>
                We created this platform to bridge the gap between curious travellers and the rich, generous culture of Bangladesh. We want the world to see what we see: a country of extraordinary warmth, stunning landscapes, and people who open their homes and hearts with remarkable ease.
              </p>
              <h2 className="pt-4 text-[18px] font-semibold text-ink">What We Do</h2>
              <p>
                We carefully match international guests with a host family in Bangladesh for a fully immersive 2-week stay. Everything is included: meals, local transport, cultural activities, and airport transfers, so you can focus entirely on the experience.
              </p>
              <p>
                Whether you join a cooking class, visit a local bazaar, or simply sit and talk over chai, every moment is genuine. Nothing is staged. Everything is real.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 mt-9 pt-9 border-t border-rule">
              {["Verified Host Families", "All-Inclusive", "Cultural Immersion", "2-Week Stay", "Airport Transfer"].map((tag) => (
                <span key={tag} className="text-[11.5px] font-medium tracking-[0.07em] uppercase text-green-mid border-b border-green-mid pb-0.5">
                  {tag}
                </span>
              ))}
            </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <img
                src={withBasePath("/images/family-sitting-room.jpeg")}
                alt="Sitting room in a Bangladeshi host family home"
                className="col-span-2 aspect-[16/10] w-full object-cover"
              />
              <img
                src={withBasePath("/images/water-lily-harvest.jpeg")}
                alt="Person gathering water lilies in Bangladesh"
                className="aspect-[4/5] w-full object-cover"
              />
              <img
                src={withBasePath("/images/riverside-sunset.jpeg")}
                alt="Sunset over a Bangladeshi riverside"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="py-24 px-6 lg:px-14 bg-green">
          <div className="max-w-[900px] mx-auto">
            <h2 className="heading font-serif text-[clamp(28px,3vw,42px)] text-cream leading-[1.12] mb-12">
              What <em>guides us</em>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {[
                { title: "Authenticity", desc: "We don't create performances for tourists. We invite you into real homes and real lives.", Icon: Leaf },
                { title: "Respect", desc: "We work closely with our host families to ensure the experience is enriching for both guests and hosts.", Icon: HandHeart },
                { title: "Connection", desc: "We believe cultural exchange makes the world better, one stay at a time.", Icon: Orbit },
              ].map((v, i) => (
                <div key={v.title} className={`py-8 ${i > 0 ? 'border-t border-white/8 md:border-t-0 md:border-l md:border-white/8' : 'border-t border-white/8'} ${i === 0 ? 'border-t-0' : ''} md:px-10 md:py-0`}>
                  <v.Icon className="h-5 w-5 text-gold-warm mb-4" strokeWidth={1.7} />
                  <h3 className="font-serif text-[20px] text-cream mb-2">{v.title}</h3>
                  <p className="text-[13.5px] font-light text-cream/55 leading-[1.8]">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 lg:px-14 bg-terra relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(var(--color-cream) 1px, transparent 1px), linear-gradient(90deg, var(--color-cream) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
          <div className="relative z-10 max-w-[700px] mx-auto text-center">
            <h2 className="font-serif text-[clamp(28px,3vw,42px)] text-cream leading-[1.12] mb-4">
              Ready to see Bangladesh <em>differently?</em>
            </h2>
            <p className="text-[15px] font-light text-cream/70 leading-[1.85] mb-8">
              Browse our host families and start planning your immersive two-week stay.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/#host" className="btn-cream">View Host Families</Link>
              <Link href="/#how" className="btn-ghost-cream">How It Works</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
