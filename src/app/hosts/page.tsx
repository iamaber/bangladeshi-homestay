import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

const hosts = [
  {
    id: "featured-host-family",
    name: "Featured Host Family",
    location: "Bangladesh",
    desc: "A warm, carefully selected household prepared to welcome guests into everyday family life, home-cooked meals, and local cultural routines.",
    languages: "Bangla, English, Hindi",
    available: true,
    image: "/images/host-home-entrance.jpeg",
  },
  {
    id: "future-host-family",
    name: "Future Host Family",
    location: "Bangladesh",
    desc: "Additional host homes will be added as the platform expands. Family identity and exact location remain private until the booking process.",
    languages: "Bangla, English",
    available: false,
    image: "/images/family-living-dining-room.jpeg",
  },
  {
    id: "seasonal-host-family",
    name: "Seasonal Host Family",
    location: "Bangladesh",
    desc: "A seasonal host profile reserved for future availability. Details will be shown only when the home is approved and ready for guests.",
    languages: "Bangla, English",
    available: false,
    image: "/images/riverside-sunset.jpeg",
  },
];

export default function HostsPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <section className="pt-20 pb-24 px-6 lg:px-14 bg-cream">
          <div className="max-w-[900px] mx-auto">
            <span className="eyebrow">Host Families</span>
            <h1 className="heading font-serif text-[clamp(32px,3.5vw,50px)] leading-[1.12] text-ink tracking-[-0.01em]">
              Meet the families who will <em>welcome you home</em>
            </h1>
            <p className="mt-6 text-[15.5px] font-light text-muted leading-[1.8] max-w-[560px]">
              Each of our host families has been personally vetted for comfort, safety, and genuine Bangladeshi hospitality. Choose the family that feels right for you.
            </p>
          </div>
        </section>

        <section className="py-24 px-6 lg:px-14 bg-cream2">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hosts.map((host) => (
                <Link
                  key={host.id}
                  href={`/hosts/${host.id}`}
                  className="group block bg-cream border border-transparent hover:border-rule transition-all duration-500"
                >
                  <div className="aspect-[3/2] overflow-hidden relative">
                    <img
                      src={host.image}
                      alt={`${host.name} preview`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {host.available ? (
                      <span className="absolute top-3 right-3 px-3 py-1 bg-green text-cream text-[11px] font-semibold tracking-[0.06em] uppercase">
                        Available
                      </span>
                    ) : (
                      <span className="absolute top-3 right-3 px-3 py-1 bg-ink/80 text-cream/60 text-[11px] font-semibold tracking-[0.06em] uppercase">
                        Unavailable
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-serif text-[24px] text-ink group-hover:text-green transition-colors duration-300">
                        {host.name}
                      </h3>
                    </div>
                    <div className="text-[13px] text-muted tracking-[0.04em] mb-3">
                      {host.location}
                    </div>
                    <p className="text-[13px] font-light text-muted leading-[1.7] mb-4">
                      {host.desc}
                    </p>
                    <div className="pt-4 border-t border-rule-light">
                      <div className="text-[11px] font-medium tracking-[0.1em] uppercase text-muted">
                        {host.languages}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 lg:px-14 bg-cream">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="font-serif text-[clamp(28px,3vw,42px)] text-ink leading-[1.12] mb-4">
              More families joining soon
            </h2>
            <p className="text-[15px] font-light text-muted leading-[1.85] mb-8">
              We&apos;re expanding to more cities across Bangladesh. Sign up to be notified when new host families become available.
            </p>
            <Link href="/#contact" className="btn-fill-sm inline-block">Get Notified</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
