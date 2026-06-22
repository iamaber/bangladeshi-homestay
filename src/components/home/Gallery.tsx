"use client";

import { motion, useReducedMotion } from "motion/react";
import { assetPath } from "@/lib/paths";

const tiles = [
  {
    src: "/images/riverside-sunset.jpeg",
    alt: "Riverside at sunset in Bangladesh",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/images/water-lily-harvest.jpeg",
    alt: "Harvesting water lilies on a Bangladeshi river",
    span: "md:col-span-2",
  },
  {
    src: "/images/river-cargo-boat.jpeg",
    alt: "Cargo boat on a Bangladeshi river",
    span: "md:col-span-2",
  },
  {
    src: "/images/family-sitting-room.jpeg",
    alt: "Family sitting room inside a host home",
    span: "md:col-span-2",
  },
  {
    src: "/images/guest-bedroom-blue.jpeg",
    alt: "Guest bedroom in blue tones",
    span: "md:col-span-2",
  },
];

export default function Gallery() {
  const reduceMotion = useReducedMotion();

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
          <span className="eyebrow">In Their World</span>
          <h2 className="heading font-serif text-[clamp(32px,3.5vw,50px)] font-bold leading-[1.12] text-cream tracking-[-0.01em] mb-10">
            Glimpses of <em>everyday life</em>
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
                alt={tile.alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
