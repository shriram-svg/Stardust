"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
}

export default function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  label,
  decimals = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="relative">
        <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 font-[family-name:var(--font-space-grotesk)] text-[8rem] font-black text-white/[0.03] leading-none select-none">
          {prefix}
          {value.toFixed(decimals)}
        </span>
        <p className="relative font-[family-name:var(--font-space-grotesk)] text-5xl font-bold text-white">
          {prefix}
          {value.toFixed(decimals)}
          {suffix}
        </p>
      </div>
      <p className="mt-2 text-sm tracking-wide text-cosmic/50">{label}</p>
    </div>
  );
}
