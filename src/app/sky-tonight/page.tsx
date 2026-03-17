"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MoonPhase from "@/components/MoonPhase";
import ConstellationMap from "@/components/ConstellationMap";
import SpotlightCard from "@/components/SpotlightCard";
import GlassCard from "@/components/GlassCard";

const visibleObjects = [
  { name: "Venus", type: "Planet", magnitude: -3.9, constellation: "Pisces", visible: "Evening" },
  { name: "Jupiter", type: "Planet", magnitude: -2.1, constellation: "Taurus", visible: "All night" },
  { name: "Mars", type: "Planet", magnitude: 1.2, constellation: "Gemini", visible: "Evening" },
  { name: "Saturn", type: "Planet", magnitude: 0.9, constellation: "Aquarius", visible: "Morning" },
  { name: "Sirius", type: "Star", magnitude: -1.46, constellation: "Canis Major", visible: "Evening" },
  { name: "Betelgeuse", type: "Star", magnitude: 0.5, constellation: "Orion", visible: "Evening" },
  { name: "Orion Nebula", type: "Deep Sky", magnitude: 4.0, constellation: "Orion", visible: "Evening" },
  { name: "Pleiades", type: "Cluster", magnitude: 1.6, constellation: "Taurus", visible: "Evening" },
];

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function SkyTonightPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <Section className="pb-8 pt-24 text-center px-6">
        <h1 className="font-[family-name:var(--font-space-grotesk)] text-5xl font-black text-white md:text-7xl">
          Sky Tonight
        </h1>
        <p className="mt-4 text-cosmic/50">
          What&apos;s visible in the night sky right now
        </p>
      </Section>

      {/* Moon Phase */}
      <Section className="py-12">
        <div className="mx-auto max-w-md">
          <GlassCard className="flex flex-col items-center py-8">
            <h2 className="mb-6 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white">
              Current Moon Phase
            </h2>
            <MoonPhase />
          </GlassCard>
        </div>
      </Section>

      {/* Visible Objects */}
      <Section className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-8 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white">
            Visible Tonight
          </h2>
          <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {visibleObjects.map((obj, i) => (
              <motion.div
                key={obj.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <SpotlightCard className="h-full">
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        obj.type === "Planet"
                          ? "bg-nebula/20 text-purple-300"
                          : obj.type === "Star"
                          ? "bg-gold/20 text-yellow-300"
                          : "bg-aurora/20 text-teal-300"
                      }`}
                    >
                      {obj.type}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-white">
                    {obj.name}
                  </h3>
                  <p className="mt-1 text-xs text-cosmic/40">
                    Mag: {obj.magnitude} &bull; {obj.constellation}
                  </p>
                  <p className="mt-1 text-xs text-aurora">{obj.visible}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Constellation Viewer */}
      <Section className="py-12 pb-24">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white">
            Constellation Viewer
          </h2>
          <ConstellationMap />
        </div>
      </Section>
    </div>
  );
}
