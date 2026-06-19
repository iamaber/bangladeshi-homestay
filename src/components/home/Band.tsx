"use client";

import { Handshake, Plane, Utensils } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function Band() {
  const { t } = useI18n();
  const items = [
    {
      title: t("featureLifeTitle"),
      desc: t("featureLifeDesc"),
      Icon: Utensils,
    },
    {
      title: t("featureCareTitle"),
      desc: t("featureCareDesc"),
      Icon: Plane,
    },
    {
      title: t("featureSmallTitle"),
      desc: t("featureSmallDesc"),
      Icon: Handshake,
    },
  ];

  return (
    <section className="bg-green px-6 lg:px-14 py-12 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-0 border-y border-white/10">
      {items.map((item, i) => (
        <div
          key={item.title}
          className={`py-8 md:px-8 ${
            i > 0 ? "border-t md:border-t-0 md:border-l border-white/8" : ""
          }`}
        >
          <item.Icon className="h-5 w-5 text-gold-warm mb-5" strokeWidth={1.7} />
          <h3 className="text-[17px] font-semibold text-cream mb-3">
            {item.title}
          </h3>
          <p className="text-[13.5px] font-light text-cream/58 leading-[1.8] max-w-[330px]">
            {item.desc}
          </p>
        </div>
      ))}
      </div>
    </section>
  );
}
