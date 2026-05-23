"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useI18n, type Lang } from "@/lib/i18n";
import { withBasePath } from "@/lib/paths";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useI18n();
  const langs: Lang[] = ["EN", "DE", "FR", "IT"];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: withBasePath("/#how"), label: t("navHow") },
    { href: withBasePath("/#packages"), label: t("navPackages") },
    { href: withBasePath("/#host"), label: t("navHosts") },
    { href: withBasePath("/#faq"), label: t("navFaq") },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 lg:px-14 transition-all duration-300 ${
          scrolled
            ? "bg-[#173524f5] backdrop-blur-sm border-b border-white/8"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <Link href="/" className="font-semibold text-[18px] text-cream tracking-[0.01em] no-underline hover:opacity-80 transition-opacity">
          {t("brandFirst")} <span className="text-gold-warm">{t("brandSecond")}</span>
        </Link>

        <div className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[12.5px] font-medium tracking-[0.07em] uppercase text-cream/65 no-underline hover:text-cream transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <div className="flex gap-0.5">
            {langs.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`bg-none border-none font-sans text-[11.5px] font-medium tracking-[0.06em] uppercase cursor-pointer px-1.5 py-1 transition-colors ${
                  lang === l ? "text-gold-warm" : "text-cream/45 hover:text-gold-warm"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <a
            href={withBasePath("/booking")}
            className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase bg-transparent border border-cream/35 text-cream px-[22px] py-2 cursor-pointer transition-all hover:bg-gold-warm hover:border-gold-warm hover:text-ink no-underline"
          >
            {t("bookNow")}
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-cream p-2"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#173524f8] pt-20 px-8">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-serif text-2xl text-cream/80 hover:text-cream transition-colors no-underline"
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-2 mt-4">
              {langs.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`bg-transparent border-none font-sans text-[11px] font-medium tracking-[0.07em] uppercase cursor-pointer px-2 py-1 transition-colors ${
                    lang === l ? "text-gold-warm" : "text-cream/40 hover:text-gold-warm"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <a
              href={withBasePath("/booking")}
              onClick={() => setMobileOpen(false)}
              className="btn-fill text-center mt-4"
            >
              {t("bookNow")}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
