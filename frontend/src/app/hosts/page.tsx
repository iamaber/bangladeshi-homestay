"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { assetPath } from "@/lib/paths";
import { useI18n } from "@/lib/useI18n";

const hosts = [
  {
    id: "featured-host-family",
    available: true,
    image: assetPath("/images/host-home-entrance.jpeg"),
  },
  {
    id: "future-host-family",
    available: false,
    image: assetPath("/images/family-living-dining-room.jpeg"),
  },
  {
    id: "seasonal-host-family",
    available: false,
    image: assetPath("/images/riverside-sunset.jpeg"),
  },
];

export default function HostsPage() {
  const { copy } = useI18n();

  return (
    <>
      <Navigation />
      <main className="pt-16">
        <section className="pt-20 pb-24 px-6 lg:px-14 bg-cream">
          <div className="max-w-[900px] mx-auto">
            <span className="eyebrow">{copy.pages.hosts.eyebrow}</span>
            <h1 className="heading font-serif text-[clamp(32px,3.5vw,50px)] leading-[1.12] text-ink tracking-[-0.01em]">
              {copy.pages.hosts.headline} <em>{copy.pages.hosts.emphasis}</em>
            </h1>
            <p className="mt-6 text-[15.5px] font-light text-muted leading-[1.8] max-w-[560px]">
              {copy.pages.hosts.intro}
            </p>
          </div>
        </section>

        <section className="py-24 px-6 lg:px-14 bg-cream2">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hosts.map((host, index) => {
                const translated = copy.pages.hosts.cards[index];
                const [, name, location, desc, languages] = translated;
                return (
                <Link
                  key={host.id}
                  href={`/hosts/${host.id}`}
                  className="group block bg-cream border border-transparent hover:border-rule transition-all duration-500"
                >
                  <div className="aspect-[3/2] overflow-hidden relative">
                    <Image
                      src={host.image}
                      alt={`${name} ${copy.media.hostPreview}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {host.available ? (
                      <span className="absolute top-3 right-3 px-3 py-1 bg-green text-cream text-[11px] font-semibold tracking-[0.06em] uppercase">
                        {copy.common.available}
                      </span>
                    ) : (
                      <span className="absolute top-3 right-3 px-3 py-1 bg-ink/80 text-cream/60 text-[11px] font-semibold tracking-[0.06em] uppercase">
                        {copy.common.unavailable}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-serif text-[24px] text-ink group-hover:text-green transition-colors duration-300">
                        {name}
                      </h3>
                    </div>
                    <div className="text-[13px] text-muted tracking-[0.04em] mb-3">
                      {location}
                    </div>
                    <p className="text-[13px] font-light text-muted leading-[1.7] mb-4">
                      {desc}
                    </p>
                    <div className="pt-4 border-t border-rule-light">
                      <div className="text-[11px] font-medium tracking-[0.1em] uppercase text-muted">
                        {languages}
                      </div>
                    </div>
                  </div>
                </Link>
              )})}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 lg:px-14 bg-cream">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="font-serif text-[clamp(28px,3vw,42px)] text-ink leading-[1.12] mb-4">
              {copy.pages.hosts.moreTitle}
            </h2>
            <p className="text-[15px] font-light text-muted leading-[1.85] mb-8">
              {copy.pages.hosts.moreText}
            </p>
            <Link href="/contact" className="btn-fill-sm inline-block">{copy.common.getNotified}</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
