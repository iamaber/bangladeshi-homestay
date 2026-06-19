"use client";

import { useEffect, useRef } from "react";

export function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      return;
    }

    let animation: Animation | null = null;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animation = el.animate(
            [
              { opacity: 0, transform: "translateY(24px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              duration: 700,
              delay,
              easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            },
          );
          obs.unobserve(el);
        }
      },
      { threshold: 0.08 },
    );

    obs.observe(el);

    return () => {
      obs.disconnect();
      animation?.cancel();
    };
  }, [delay]);

  return ref;
}

export default function SectionReveal({
  children,
  className = "",
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: "1" | "2" | "3";
}) {
  const ref = useReveal(delay ? Number(delay) * 100 : 0);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
