"use client";

import { motion, useReducedMotion } from "motion/react";
import { assetPath } from "@/lib/paths";
import { useI18n } from "@/lib/useI18n";

const tiles = [
  {
    src: "/images/riverside-sunset.jpeg",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/images/bhuna-khichuri.jpeg",
    span: "md:col-span-2",
  },
  {
    src: "/images/river-cargo-boat.jpeg",
    span: "md:col-span-2",
  },
  {
    src: "/images/family-sitting-room.jpeg",
    span: "md:col-span-2",
  },
  {
    src: "/images/guest-bedroom-blue.jpeg",
    span: "md:col-span-2",
  },
];

export default function Gallery() {
  const reduceMotion = useReducedMotion();
  const { copy } = useI18n();

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.08 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="py-16 px-6 lg:px-14 bg-green" id="gallery">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">{copy.home.gallery.eyebrow}</span>
          <h2 className="heading font-serif text-[clamp(32px,3.5vw,50px)] font-bold leading-[1.12] text-cream tracking-[-0.01em] mb-10">
            {copy.home.gallery.headline} <em>{copy.home.gallery.emphasis}</em>
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-8%" }}
          className="grid grid-cols-2 md:grid-cols-6 md:auto-rows-[210px] gap-2"
        >
          {tiles.map((tile) => (
            <motion.div
              key={tile.src}
              variants={item}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.5, 1] }}
              className={`img-zoom rounded-sm overflow-hidden aspect-square md:aspect-auto ${tile.span}`}
            >
              <img
                src={assetPath(tile.src)}
                alt={
                  tile.src.includes("riverside")
                    ? copy.media.riverside
                    : tile.src.includes("bhuna-khichuri")
                      ? copy.media.bhunaKhichuri
                      : tile.src.includes("cargo")
                        ? copy.media.cargoBoat
                        : tile.src.includes("sitting")
                          ? copy.media.familyRoom
                          : copy.media.bedroomBlue
                }
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
        <p className="mt-3 text-[10px] leading-relaxed text-cream/40">
          Food photo:{" "}
          <a
            href="https://commons.wikimedia.org/wiki/File:Bhuna_Khichuri_with_Chicken,_Vegetables,_Chili,_and_Lemon.jpg"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-cream/20 underline-offset-2 hover:text-cream/70"
          >
            Ankan Ghosh Dastider
          </a>
          ,{" "}
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-cream/20 underline-offset-2 hover:text-cream/70"
          >
            CC BY-SA 4.0
          </a>
          .
        </p>
      </div>
    </section>
  );
}
