"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { HandHeart, Leaf, Orbit } from "lucide-react";
import { assetPath } from "@/lib/paths";
import { useI18n } from "@/lib/useI18n";

export default function AboutPage() {
  const { copy } = useI18n();
  const icons = [Leaf, HandHeart, Orbit];

  return (
    <>
      <Navigation />
      <main className="pt-16">
        <section className="pt-20 pb-24 px-6 lg:px-14 bg-cream">
          <div className="max-w-1200px mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
            <div>
            <span className="eyebrow">{copy.pages.about.eyebrow}</span>
            <h1 className="heading font-serif text-[clamp(32px,3.5vw,50px)] leading-[1.12] text-ink tracking-[-0.01em]">
              {copy.pages.about.headline} <em>{copy.pages.about.emphasis}</em>
            </h1>
            <div className="mt-8 space-y-4 text-[15.5px] font-light text-ink2/80 leading-[1.9]">
              <h2 className="text-[18px] font-semibold text-ink">{copy.pages.about.storyTitle}</h2>
              {copy.pages.about.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <h2 className="pt-4 text-[18px] font-semibold text-ink">{copy.pages.about.workTitle}</h2>
              {copy.pages.about.work.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="flex flex-wrap gap-2.5 mt-9 pt-9 border-t border-rule">
              {copy.home.tags.map((tag) => (
                <span key={tag} className="text-[11.5px] font-medium tracking-[0.07em] uppercase text-green-mid border-b border-green-mid pb-0.5">
                  {tag}
                </span>
              ))}
            </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Image
                src={assetPath("/images/family-sitting-room.jpeg")}
                alt={copy.media.sittingRoom}
                width={2048}
                height={1536}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="col-span-2 aspect-16/10 w-full object-cover"
              />
              <Image
                src={assetPath("/images/water-lily-harvest.jpeg")}
                alt={copy.media.waterLilies}
                width={1200}
                height={1600}
                sizes="(min-width: 1024px) 20vw, 50vw"
                className="aspect-4/5 w-full object-cover"
              />
              <Image
                src={assetPath("/images/riverside-sunset.jpeg")}
                alt={copy.media.riverside}
                width={1200}
                height={1600}
                sizes="(min-width: 1024px) 20vw, 50vw"
                className="aspect-4/5 w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="py-24 px-6 lg:px-14 bg-green">
          <div className="max-w-900px mx-auto">
            <h2 className="heading font-serif text-[clamp(28px,3vw,42px)] text-cream leading-[1.12] mb-12">
              {copy.pages.about.guides} <em>{copy.pages.about.guidesEmphasis}</em>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {copy.pages.about.values.map(([title, desc], i) => {
                const Icon = icons[i];
                return (
                <div key={title} className={`py-8 ${i > 0 ? 'border-t border-white/8 md:border-t-0 md:border-l md:border-white/8' : 'border-t border-white/8'} ${i === 0 ? 'border-t-0' : ''} md:px-10 md:py-0`}>
                  <Icon className="h-5 w-5 text-gold-warm mb-4" strokeWidth={1.7} />
                  <h3 className="font-serif text-[20px] text-cream mb-2">{title}</h3>
                  <p className="text-[13.5px] font-light text-cream/55 leading-[1.8]">{desc}</p>
                </div>
              )})}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 lg:px-14 bg-terra relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(var(--color-cream) 1px, transparent 1px), linear-gradient(90deg, var(--color-cream) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
          <div className="relative z-10 max-w-700px mx-auto text-center">
            <h2 className="font-serif text-[clamp(28px,3vw,42px)] text-cream leading-[1.12] mb-4">
              {copy.pages.about.ctaTitle} <em>{copy.pages.about.ctaEmphasis}</em>
            </h2>
            <p className="text-[15px] font-light text-cream/70 leading-[1.85] mb-8">
              {copy.pages.about.ctaText}
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/#host" className="btn-cream">{copy.common.viewHostFamilies}</Link>
              <Link href="/#how" className="btn-ghost-cream">{copy.common.howItWorks}</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
