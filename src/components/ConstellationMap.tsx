"use client";

import { motion } from "framer-motion";

interface ConstellationData {
  name: string;
  stars: [number, number][];
  lines: [number, number][];
}

const constellations: ConstellationData[] = [
  {
    name: "Orion",
    stars: [
      [120, 40], [180, 40], [100, 100], [200, 100],
      [150, 140], [110, 200], [190, 200], [150, 60],
    ],
    lines: [
      [0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [4, 5], [4, 6], [0, 7], [1, 7],
    ],
  },
  {
    name: "Ursa Major",
    stars: [
      [60, 60], [100, 50], [140, 55], [170, 70],
      [160, 100], [120, 110], [80, 105],
    ],
    lines: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0],
    ],
  },
  {
    name: "Cassiopeia",
    stars: [
      [40, 80], [80, 40], [120, 70], [160, 30], [200, 60],
    ],
    lines: [
      [0, 1], [1, 2], [2, 3], [3, 4],
    ],
  },
];

export default function ConstellationMap() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {constellations.map((c) => (
        <div key={c.name} className="glass rounded-2xl p-4">
          <p className="mb-3 text-center font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-white">
            {c.name}
          </p>
          <svg viewBox="0 0 240 240" className="mx-auto w-full max-w-[200px]">
            {c.lines.map(([a, b], i) => (
              <motion.line
                key={i}
                x1={c.stars[a][0]}
                y1={c.stars[a][1]}
                x2={c.stars[b][0]}
                y2={c.stars[b][1]}
                stroke="rgba(107,33,168,0.5)"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: i * 0.1 }}
              />
            ))}
            {c.stars.map(([x, y], i) => (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="3"
                fill="#fbbf24"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              />
            ))}
          </svg>
        </div>
      ))}
    </div>
  );
}
