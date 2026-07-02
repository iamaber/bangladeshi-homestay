"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/useI18n";
import { assetPath } from "@/lib/paths";

export default function Hero() {
  const { t, copy } = useI18n();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const ease = [0.16, 1, 0.3, 1] as const;
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.14, delayChildren: 0.1 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 26 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
  };

  return (
    <section ref={sectionRef} className="min-h-screen relative flex flex-col justify-end overflow-hidden">
      {/* Background image with scroll-linked parallax */}
      <motion.div className="absolute inset-0" style={{ y: reduceMotion ? 0 : bgY }}>
        <Image
          src={assetPath("/images/river-boat-sunset.jpeg")}
          alt={copy.media.heroRiver}
          fill
          priority
          sizes="100vw"
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0e2218]/90 via-green/80 to-[#0e2218]/70" />
      </motion.div>

      {/* Geometric grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-gold-warm) 1px, transparent 1px), linear-gradient(90deg, var(--color-gold-warm) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e2218] via-[#0e2218]/40 to-transparent" />

      {/* Content — staggered entrance choreography */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ y: reduceMotion ? 0 : contentY, opacity: reduceMotion ? 1 : contentOpacity }}
        className="relative z-10 px-6 lg:px-14 pb-20 lg:pb-20 pt-32 max-w-[780px]"
      >
        <motion.h1
          variants={fadeUp}
          className="font-serif text-[clamp(48px,6.5vw,84px)] font-black leading-[1.06] text-cream tracking-[-0.015em] mb-7"
        >
          {t("heroHeadlineA")}
          <br />
          <em>{t("heroHeadlineB")}</em>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-base font-light text-cream/65 max-w-[520px] leading-[1.8] mb-12"
        >
          {t("heroSub")}
        </motion.p>

        <motion.div variants={fadeUp} className="flex gap-4 items-center">
          <Link href="/packages" className="btn-fill">
            {t("explorePackages")}
          </Link>
          <a href="#how" className="btn-line">
            {t("howItWorks")}
          </a>
        </motion.div>
      </motion.div>

      {/* Human booking note */}
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.6 }}
        className="absolute right-6 lg:right-14 bottom-20 z-10 hidden max-w-[300px] border-t border-cream/20 pt-4 text-right lg:block"
      >
        <div className="text-[11px] font-medium tracking-[0.14em] uppercase text-gold-warm mb-2">
          {copy.home.heroNote.label}
        </div>
        <div className="font-serif text-[20px] leading-[1.45] text-cream">
          {copy.home.heroNote.text}
        </div>
      </motion.div>
    </section>
  );
}
