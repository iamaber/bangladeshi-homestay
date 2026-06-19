import SectionReveal from "@/components/SectionReveal";

const testimonials = [
  {
    author: "Sophie Baumann",
    origin: "Zurich, Switzerland",
    stars: 5,
    quote:
      "I've travelled to 40 countries and this was genuinely unlike anything else. My host family treated me like a daughter. I came for two weeks and cried when I had to leave.",
  },
  {
    author: "Markus Keller",
    origin: "Munich, Germany",
    stars: 5,
    quote:
      "Das Essen, die Herzlichkeit, die Gespräche — ich hatte keine Ahnung, dass Bangladesh so wunderschön ist. Das war die beste Reise meines Lebens, ohne jede Übertreibung.",
  },
  {
    author: "Thomas Conti",
    origin: "Milan, Italy",
    stars: 5,
    quote:
      "The cooking classes, the music session on the third evening, the market visit with the grandmother — moments I will carry my whole life.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 px-6 lg:px-14 bg-ink2 relative overflow-hidden">
      {/* Subtle geometric texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-cream) 1px, transparent 1px), linear-gradient(90deg, var(--color-cream) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <SectionReveal>
          <span className="eyebrow">Guest Stories</span>
          <h2 className="heading font-serif text-[clamp(32px,3.5vw,50px)] font-bold leading-[1.12] text-cream tracking-[-0.01em]">
            What guests came
            <br />
            <em>home saying</em>
          </h2>
        </SectionReveal>

        <div className="mt-16">
          {testimonials.map((t, i) => (
            <SectionReveal key={t.author}>
              <div
                className={`py-11 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-14 items-start ${
                  i === 0 ? "border-t border-white/8" : ""
                } border-b border-white/8`}
              >
                <div className="pt-1">
                  <div className="text-[14px] font-medium text-cream mb-1">
                    {t.author}
                  </div>
                  <div className="text-[12px] text-cream/40 tracking-[0.04em] mb-4">
                    {t.origin}
                  </div>
                  <div className="flex gap-[3px]">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <span key={i} className="text-gold-warm text-[12px]">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="font-serif text-[20px] text-cream/82 leading-[1.75]">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
