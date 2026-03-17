"use client";

interface MarqueeProps {
  items: string[];
  reverse?: boolean;
}

export default function Marquee({ items, reverse = false }: MarqueeProps) {
  const text = items.join(" \u2022 ") + " \u2022 ";
  const doubled = text + text;

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div className={reverse ? "marquee-right" : "marquee-left"}>
        <span className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold tracking-widest text-white/10 md:text-4xl">
          {doubled}
        </span>
      </div>
    </div>
  );
}
