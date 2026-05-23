"use client";

import { useEffect, useRef } from "react";

export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
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
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${delay ? `reveal-delay-${delay}` : ""} ${className}`}
    >
      {children}
    </div>
  );
}