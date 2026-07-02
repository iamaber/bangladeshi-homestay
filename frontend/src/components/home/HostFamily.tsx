"use client";

import SectionReveal from "@/components/SectionReveal";
import Image from "next/image";
import Link from "next/link";
import { defaultHostId } from "@/lib/hosts";
import { assetPath } from "@/lib/paths";
import { useI18n } from "@/lib/useI18n";

export default function HostFamily() {
  const { copy } = useI18n();

  return (
    <section className="py-16 px-6 lg:px-14" id="host">
      <div className="max-w-[1400px] mx-auto">
        <SectionReveal>
          <span className="eyebrow">{copy.home.host.eyebrow}</span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
            {/* Photo grid */}
            <div className="grid grid-cols-2 gap-1.5">
              <div className="relative col-span-2 aspect-[2/1] rounded-sm overflow-hidden">
                <Image
                  src={assetPath("/images/host-home-entrance.jpeg")}
                  alt={copy.media.hostEntrance}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-sm overflow-hidden">
                <Image
                  src={assetPath("/images/guest-bedroom-window.jpeg")}
                  alt={copy.media.bedroomWindow}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-sm overflow-hidden">
                <Image
                  src={assetPath("/images/family-photo.jpeg")}
                  alt={copy.media.familyPhoto}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div>
              <h2 className="heading font-serif text-[clamp(32px,3.5vw,50px)] font-bold leading-[1.12] text-ink tracking-[-0.01em] mb-0">
                {copy.home.host.headlineA}
                <br />
                <em>{copy.home.host.headlineB}</em>
              </h2>
              <div className="font-serif text-[32px] text-ink mt-5 mb-1">
                {copy.home.host.name}
              </div>
              <div className="text-[13px] text-muted tracking-[0.04em] mb-7 flex items-center gap-1.5">
                <span className="inline-block text-[11px] rotate-[-45deg] text-gold">↓</span>
                {copy.home.host.location}
              </div>

              <p className="font-serif text-[17px] text-ink2 leading-[1.75] pl-5 border-l-2 border-l-gold mb-8">
                &ldquo;{copy.home.host.quote}&rdquo;
              </p>

              <hr className="border-none border-t border-rule my-6" />

              {copy.home.host.facts.map(([label, value]) => (
                <div key={label} className="flex justify-between items-baseline gap-4 py-3 border-b border-rule-light">
                  <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted">
                    {label}
                  </span>
                  <span className="text-[13.5px] font-light text-ink2">
                    {value}
                  </span>
                </div>
              ))}

              <div className="mt-8">
                <Link href={`/booking?host=${defaultHostId}`} className="btn-fill-sm inline-block">
                  {copy.common.requestStay}
                </Link>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
