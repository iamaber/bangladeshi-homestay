"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Lang } from "@/lib/i18n-data";
import { useI18n } from "@/lib/useI18n";
import { assetPath } from "@/lib/paths";

type NavChild = { href: string; label: string };
type NavItem =
  | { type: "link"; href: string; label: string }
  | { type: "group"; label: string; items: NavChild[] };

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const pathname = usePathname();
  const { lang, setLang, t, copy } = useI18n();
  const reduceMotion = useReducedMotion();
  const langs: Lang[] = ["EN", "DE", "FR", "IT"];
  const isHome = pathname === "/";
  const darkNavigation = scrolled || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    const frame = window.requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  const navItems: NavItem[] = [
    {
      type: "group",
      label: t("navPackages"),
      items: [
        { href: "/packages", label: t("navStudentPackages") },
        { href: "/packages#experience", label: t("navIncludes") },
        { href: "/contact", label: t("navPricing") },
      ],
    },
    {
      type: "group",
      label: t("navExperience"),
      items: [
        { href: "/#how", label: t("navHow") },
        { href: "/#host", label: t("navHosts") },
        { href: "/#about", label: t("navCulturalLife") },
      ],
    },
    { type: "link", href: "/#faq", label: t("navFaq") },
  ];

  const dropdownVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 6 },
    visible: { opacity: 1, y: 0 },
  };

  const handleLogoClick = () => {
    setScrolled(false);
    setMobileOpen(false);
    setOpenGroup(null);
    setMobileGroup(null);

    if (isHome) {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 lg:px-14 transition-all duration-300 ${
          darkNavigation
            ? "bg-[#173524f5] backdrop-blur-sm border-b border-white/8"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <Link
          href="/"
          scroll
          aria-label={copy.media.navHome}
          onClick={handleLogoClick}
          className="no-underline hover:opacity-80 transition-opacity"
        >
          <Image
            src={assetPath("/logo.svg")}
            alt={copy.media.logoAlt}
            width={760}
            height={200}
            priority
            className="block h-10 w-auto"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-9">
          {navItems.map((item) =>
            item.type === "link" ? (
              <Link
                key={item.label}
                href={item.href}
                className="text-[12.5px] font-medium tracking-[0.07em] uppercase text-cream/65 no-underline hover:text-cream transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenGroup(item.label)}
                onMouseLeave={() => setOpenGroup(null)}
              >
                <button
                  type="button"
                  aria-expanded={openGroup === item.label}
                  onClick={() =>
                    setOpenGroup((cur) => (cur === item.label ? null : item.label))
                  }
                  className={`flex items-center gap-1.5 text-[12.5px] font-medium tracking-[0.07em] uppercase no-underline transition-colors bg-transparent border-none cursor-pointer ${
                    openGroup === item.label ? "text-cream" : "text-cream/65 hover:text-cream"
                  }`}
                >
                  {item.label}
                  <motion.svg
                    width="10"
                    height="10"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    animate={{ rotate: openGroup === item.label ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <path d="M2.5 4.5L6 8l3.5-3.5" />
                  </motion.svg>
                </button>

                <AnimatePresence>
                  {openGroup === item.label && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-0 top-full pt-3"
                    >
                      <div className="min-w-220px bg-[#173524f5] backdrop-blur-sm border border-white/10 py-2 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
                        {item.items.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpenGroup(null)}
                            className="block px-5 py-2.5 text-[12.5px] font-medium tracking-[0.04em] text-cream/65 no-underline hover:text-cream hover:bg-white/5 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          )}
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
          <Link
            href="/booking"
            className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase bg-transparent border border-cream/35 text-cream px-[22px] py-2 cursor-pointer transition-all hover:bg-gold-warm hover:border-gold-warm hover:text-ink no-underline"
          >
            {t("bookNow")}
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-cream p-2"
          aria-label={copy.common.toggleMenu}
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

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed inset-0 z-40 bg-[#173524f8] pt-20 px-8 overflow-y-auto"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) =>
                item.type === "link" ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-serif text-2xl text-cream/80 hover:text-cream transition-colors no-underline py-2"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <div key={item.label} className="border-b border-white/8 pb-2">
                    <button
                      type="button"
                      aria-expanded={mobileGroup === item.label}
                      onClick={() =>
                        setMobileGroup((cur) => (cur === item.label ? null : item.label))
                      }
                      className="w-full flex items-center justify-between font-serif text-2xl text-cream/80 hover:text-cream transition-colors bg-transparent border-none cursor-pointer py-2"
                    >
                      {item.label}
                      <motion.svg
                        width="16"
                        height="16"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        animate={{ rotate: mobileGroup === item.label ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <path d="M2.5 4.5L6 8l3.5-3.5" />
                      </motion.svg>
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileGroup === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-1 pl-4 pt-1 pb-2">
                            {item.items.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setMobileOpen(false)}
                                className="text-[15px] tracking-[0.03em] text-cream/55 hover:text-cream transition-colors no-underline py-1.5"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              )}
              <div className="flex gap-2 mt-6">
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
              <Link
                href="/booking"
                onClick={() => setMobileOpen(false)}
                className="btn-fill text-center mt-4"
              >
                {t("bookNow")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
