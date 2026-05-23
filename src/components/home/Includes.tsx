import SectionReveal from "@/components/SectionReveal";

const leftItems = [
  { num: "i.", title: "Airport Transfer", desc: "Your host family meets you on arrival and sees you off on departure day." },
  { num: "ii.", title: "All Meals", desc: "Three meals a day — freshwater fish curries, rooftop breakfasts, festive dinners — cooked by the family." },
  { num: "iii.", title: "Local Transportation", desc: "Rickshaws, CNGs, ferries — you'll get around the Bangladeshi way, fully arranged by your host family." },
];

const rightItems = [
  { num: "iv.", title: "Cultural Activities", desc: "Visits to mosques, temples, markets, riverbanks, and local festivals — guided by people who call this home." },
  { num: "v.", title: "Local Sightseeing Tours", desc: "Guided tours across the city and surrounding areas — history, nature, and daily life in one stay." },
  { num: "vi.", title: "Host Family Home", desc: "A private room in a real family home — not a guesthouse, not a hotel." },
];

const notIncluded = [
  "Personal market purchases",
  "Souvenirs & gifts",
  "Personal expenses",
  "International flights (unless selected)",
];

export default function Includes() {
  return (
    <section className="py-24 px-6 lg:px-14 bg-green" id="includes">
      <div className="max-w-[1400px] mx-auto">
        <SectionReveal>
          <span className="eyebrow">What&apos;s Included</span>
          <h2 className="heading font-serif text-[clamp(32px,3.5vw,50px)] font-normal leading-[1.12] text-cream tracking-[-0.01em]">
            Everything you need,
            <br />
            <em>taken care of</em>
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mt-16">
          <SectionReveal>
            <div className="lg:pr-16 lg:border-r lg:border-white/10">
              {leftItems.map((item) => (
                <div key={item.num} className="flex gap-5 py-[22px] border-b border-white/7 items-start">
                  <span className="font-serif text-[13px] italic text-cream/25 min-w-[28px] mt-0.5">
                    {item.num}
                  </span>
                  <div>
                    <h4 className="text-[15px] font-medium text-cream mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-[13px] font-light text-cream/50 leading-[1.7]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay="2">
            <div className="lg:pl-16">
              {rightItems.map((item) => (
                <div key={item.num} className="flex gap-5 py-[22px] border-b border-white/7 items-start">
                  <span className="font-serif text-[13px] italic text-cream/25 min-w-[28px] mt-0.5">
                    {item.num}
                  </span>
                  <div>
                    <h4 className="text-[15px] font-medium text-cream mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-[13px] font-light text-cream/50 leading-[1.7]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>

        <SectionReveal>
          <div className="flex flex-col lg:flex-row gap-0 mt-12 pt-8 border-t border-white/8">
            <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-cream/30 min-w-[160px] pt-0.5">
              Not included
            </span>
            <div className="flex flex-wrap gap-0">
              {notIncluded.map((item, i) => (
                <span key={item} className="text-[13px] font-light italic text-cream/35 font-serif">
                  {item}
                  {i < notIncluded.length - 1 && (
                    <span className="text-cream/20 mx-2"> · </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}