"use client";

import { useI18n } from "@/lib/i18n";
import { withBasePath } from "@/lib/paths";

const footerLinks = {
  experience: [
    { href: "/#about", labelKey: "aboutEyebrow" },
    { href: "/#how", labelKey: "navHow" },
    { href: "/#host", labelKey: "navHosts" },
    { href: "/#packages", labelKey: "navPackages" },
  ],
  support: [
    { href: "/#faq", labelKey: "navFaq" },
    { href: "/#contact", labelKey: "footerContact" },
    { href: "/terms", label: "Terms & Conditions" },
    { href: "/privacy", label: "Privacy Policy" },
  ],
} as const;

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer id="contact" className="bg-ink py-[72px] px-6 lg:px-14">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14 border-b border-white/7">
          <div className="lg:col-span-1">
            <div className="font-serif text-[20px] text-cream tracking-[0.01em] mb-4">
              Bengali <span className="text-gold-warm">Homestay</span>
            </div>
            <p className="text-[13.5px] font-light text-cream/40 leading-relaxed max-w-[240px]">
              {t("footerDesc")}
            </p>
          </div>

          <div>
            <h5 className="text-[10.5px] font-semibold tracking-[0.18em] uppercase text-cream/30 mb-5">
              {t("footerExperience")}
            </h5>
            <div className="flex flex-col gap-2.5">
              {footerLinks.experience.map((link) => (
                <a
                  key={link.href}
                href={withBasePath(link.href)}
                  className="text-[13px] font-light text-cream/45 no-underline hover:text-cream transition-colors"
                >
                  {t(link.labelKey)}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-[10.5px] font-semibold tracking-[0.18em] uppercase text-cream/30 mb-5">
              {t("footerSupport")}
            </h5>
            <div className="flex flex-col gap-2.5">
              {footerLinks.support.map((link) => (
                <a
                  key={link.href}
                  href={withBasePath(link.href)}
                  className="text-[13px] font-light text-cream/45 no-underline hover:text-cream transition-colors"
                >
                  {"labelKey" in link ? t(link.labelKey) : link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-[10.5px] font-semibold tracking-[0.18em] uppercase text-cream/30 mb-5">
              {t("footerContact")}
            </h5>
            <div className="flex flex-col gap-2.5">
              <a
                href="mailto:hello@bengalihomestay.com"
                className="text-[13px] font-light text-cream/45 no-underline hover:text-cream transition-colors"
              >
                hello@bengalihomestay.com
              </a>
              <a
                href="#"
                className="text-[13px] font-light text-cream/45 no-underline hover:text-cream transition-colors"
              >
                WhatsApp
              </a>
              <span className="text-[12px] font-light text-cream/20 italic font-serif">
                bengalihomestay.com
              </span>
            </div>
          </div>
        </div>

        <div className="pt-7 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-[12px] text-cream/30">
            &copy; {new Date().getFullYear()} Bengali Homestay. {t("footerRights")}
          </span>
          <span className="text-[12px] text-cream/20 italic font-serif">
            {t("footerPayment")}
          </span>
        </div>
      </div>
    </footer>
  );
}
