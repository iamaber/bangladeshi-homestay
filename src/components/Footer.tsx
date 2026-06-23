"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/useI18n";
import { assetPath } from "@/lib/paths";
import { brand } from "@/lib/site-copy";

const footerLinks = {
  experience: [
    { href: "/#about", labelKey: "aboutEyebrow" },
    { href: "/#how", labelKey: "navHow" },
    { href: "/#host", labelKey: "navHosts" },
    { href: "/packages", labelKey: "navPackages" },
  ],
  support: [
    { href: "/#faq", labelKey: "navFaq" },
    { href: "/contact", labelKey: "footerContact" },
    { href: "/terms", labelKey: "termsTitle" },
    { href: "/privacy", labelKey: "privacyTitle" },
  ],
} as const;

export default function Footer() {
  const { t, copy } = useI18n();

  return (
    <footer id="contact" className="bg-ink py-72px px-6 lg:px-14">
      <div className="max-w-1400px mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14 border-b border-white/7">
          <div className="lg:col-span-1">
            <Image
              src={assetPath("/logo.svg")}
              alt={copy.media.logoAlt}
              width={760}
              height={200}
              className="block h-12 w-auto mb-4"
            />
            <p className="text-[13.5px] font-light text-cream/40 leading-relaxed max-w-240px">
              {t("footerDesc")}
            </p>
          </div>

          <div>
            <h5 className="text-[10.5px] font-semibold tracking-[0.18em] uppercase text-cream/30 mb-5">
              {t("footerExperience")}
            </h5>
            <div className="flex flex-col gap-2.5">
              {footerLinks.experience.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] font-light text-cream/45 no-underline hover:text-cream transition-colors"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-[10.5px] font-semibold tracking-[0.18em] uppercase text-cream/30 mb-5">
              {t("footerSupport")}
            </h5>
            <div className="flex flex-col gap-2.5">
              {footerLinks.support.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] font-light text-cream/45 no-underline hover:text-cream transition-colors"
                >
                  {link.labelKey === "termsTitle"
                    ? copy.pages.legal.termsTitle
                    : link.labelKey === "privacyTitle"
                      ? copy.pages.legal.privacyTitle
                      : t(link.labelKey)}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-[10.5px] font-semibold tracking-[0.18em] uppercase text-cream/30 mb-5">
              {t("footerContact")}
            </h5>
            <div className="flex flex-col gap-2.5">
              <a
                href={`mailto:${brand.email}`}
                className="text-[13px] font-light text-cream/45 no-underline hover:text-cream transition-colors"
              >
                {brand.email}
              </a>
              <span className="text-[12px] font-light text-cream/20 font-serif">
                {brand.domain}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-7 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-[12px] text-cream/30">
            &copy; {new Date().getFullYear()} {brand.name}. {t("footerRights")}
          </span>
          <span className="text-[12px] text-cream/20 font-serif">
            {t("footerPayment")}
          </span>
        </div>
      </div>
    </footer>
  );
}
