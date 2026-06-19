"use client";

import Link from "next/link";
import SectionReveal from "@/components/SectionReveal";
import { useI18n } from "@/lib/useI18n";

const features = [
  { section: "Included in all packages", items: [
    ["14-night stay with host family", true, true],
    ["All meals — breakfast, lunch & dinner", true, true],
    ["Airport pickup & dropoff", true, true],
    ["Local transportation throughout stay", true, true],
    ["Cultural activities & local sightseeing", true, true],
  ]},
  { section: "Premium only", items: [
    ["Bengali cooking classes", false, true],
    ["Traditional music sessions & crafts workshops", false, true],
    ["Additional guided local tours & excursions", false, true],
    ["More elaborate & varied meal offerings", false, true],
  ]},
];

export default function Packages() {
  const { t } = useI18n();

  return (
    <section className="py-16 px-6 lg:px-14 bg-cream2" id="packages">
      <div className="max-w-[1400px] mx-auto">
        <SectionReveal>
          <span className="eyebrow">{t("packagesEyebrow")}</span>
          <h2 className="heading font-serif text-[clamp(32px,3.5vw,50px)] font-bold leading-[1.12] text-ink tracking-[-0.01em]">
            {t("packagesHeadlineA")} <em>{t("packagesHeadlineB")}</em>
          </h2>
        </SectionReveal>

        <div className="mt-16">
          <SectionReveal>
            <div className="grid grid-cols-[2fr_1fr_1fr] gap-0 pb-5 border-b border-rule">
              <div />
              <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-muted pl-6">
                Without Flight
              </div>
              <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-muted pl-6">
                With Flight Ticket
              </div>
            </div>

            <div className="grid grid-cols-[2fr_1fr_1fr] gap-0 py-7 border-b border-rule-light items-start">
              <div>
                <div className="font-serif text-[26px] text-ink mb-1.5">
                  Standard
                </div>
                <div className="text-[13px] font-light text-muted max-w-[320px] leading-[1.6]">
                  {t("standardDesc")}
                </div>
              </div>
              <div className="pl-6">
                <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-muted mb-1">
                  CHF
                </div>
                <div className="font-serif text-[36px] text-green leading-none">
                  2,700
                </div>
              </div>
              <div className="pl-6">
                <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-muted mb-1">
                  CHF
                </div>
                <div className="font-serif text-[36px] text-green leading-none">
                  4,200
                </div>
              </div>
            </div>

            <div className="grid grid-cols-[2fr_1fr_1fr] gap-0 py-7 border-b border-rule-light items-start">
              <div>
                <div className="font-serif text-[26px] text-ink mb-1.5">
                  Premium{" "}
                  <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-gold border border-gold px-2 py-0.5 ml-3 relative top-[-2px]">
                    Recommended
                  </span>
                </div>
                <div className="text-[13px] font-light text-muted max-w-[320px] leading-[1.6]">
                  {t("premiumDesc")}
                </div>
              </div>
              <div className="pl-6">
                <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-muted mb-1">
                  CHF
                </div>
                <div className="font-serif text-[36px] text-green leading-none">
                  3,700
                </div>
              </div>
              <div className="pl-6">
                <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-muted mb-1">
                  CHF
                </div>
                <div className="font-serif text-[36px] text-green leading-none">
                  5,200
                </div>
              </div>
            </div>
          </SectionReveal>

          <div className="mt-12">
            {features.map((section) => (
              <SectionReveal key={section.section}>
                <div className="text-[10.5px] font-semibold tracking-[0.18em] uppercase text-muted py-5 border-t border-rule">
                  {section.section}
                </div>
                {section.items.map((item) => (
                  <div
                    key={typeof item[0] === "string" ? item[0] : String(item[0])}
                    className="grid grid-cols-[2fr_1fr_1fr] gap-0 py-3 border-b border-rule-light items-center"
                  >
                    <div className="text-[14px] font-light text-ink2">
                      {item[0]}
                    </div>
                    <div className="pl-6 flex items-center gap-1.5">
                      {item[1] ? (
                        <span className="text-green-soft text-[15px] font-semibold">
                          ✓
                        </span>
                      ) : (
                        <span className="text-rule text-[18px]">—</span>
                      )}
                    </div>
                    <div className="pl-6 flex items-center gap-1.5">
                      {item[2] ? (
                        <>
                          <span className="text-green-soft text-[15px] font-semibold">
                            ✓
                          </span>
                          {section.section === "Premium only" && (
                            <span className="text-[11px] text-gold font-medium tracking-[0.04em]">
                              Premium
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-rule text-[18px]">—</span>
                      )}
                    </div>
                  </div>
                ))}
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <div className="flex gap-4 mt-9">
              <Link href="/booking" className="btn-fill-sm">
                {t("bookYourStay")}
              </Link>
              <Link href="#includes" className="btn-line-sm">
                {t("comparePackages")}
              </Link>
            </div>
            <p className="mt-7 text-[13px] text-muted">
              All prices are listed in CHF. Payment details are sent by invoice
              after booking. Personal market purchases, souvenirs, and
              international flights (unless selected) are not included.
            </p>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
