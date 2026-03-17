"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

type MissionStatus = "Active" | "Completed" | "Upcoming" | "In Transit";

interface Mission {
  name: string;
  agency: string;
  status: MissionStatus;
  year: number;
  description: string;
  progress: number;
  launchDate?: string;
}

const missions: Mission[] = [
  { name: "James Webb Space Telescope", agency: "NASA/ESA/CSA", status: "Active", year: 2021, description: "The most powerful space telescope ever built, observing the universe in infrared to study the earliest galaxies and exoplanet atmospheres.", progress: 100 },
  { name: "Artemis I", agency: "NASA", status: "Completed", year: 2022, description: "Uncrewed test flight of the Space Launch System and Orion spacecraft around the Moon.", progress: 100 },
  { name: "Artemis II", agency: "NASA", status: "Upcoming", year: 2025, description: "First crewed flight of the Orion spacecraft, sending astronauts on a lunar flyby.", progress: 75, launchDate: "2025-09-01" },
  { name: "Europa Clipper", agency: "NASA/JPL", status: "In Transit", year: 2024, description: "Mission to conduct detailed reconnaissance of Jupiter's moon Europa and investigate its habitability.", progress: 45 },
  { name: "Mars Sample Return", agency: "NASA/ESA", status: "Upcoming", year: 2028, description: "Ambitious mission to bring Martian soil and rock samples collected by Perseverance back to Earth.", progress: 30, launchDate: "2028-07-01" },
  { name: "OSIRIS-REx", agency: "NASA", status: "Completed", year: 2016, description: "Returned samples from asteroid Bennu to Earth in September 2023 after a seven-year journey.", progress: 100 },
  { name: "Perseverance Rover", agency: "NASA/JPL", status: "Active", year: 2020, description: "Exploring Jezero Crater on Mars, searching for signs of ancient microbial life and collecting samples.", progress: 85 },
  { name: "Voyager 1", agency: "NASA/JPL", status: "Active", year: 1977, description: "The farthest human-made object from Earth, now in interstellar space over 15 billion miles away.", progress: 100 },
  { name: "Chandrayaan-3", agency: "ISRO", status: "Completed", year: 2023, description: "India's successful lunar landing mission, making ISRO the fourth space agency to soft-land on the Moon.", progress: 100 },
  { name: "Dragonfly", agency: "NASA/APL", status: "Upcoming", year: 2028, description: "A rotorcraft lander designed to explore Saturn's moon Titan, studying its prebiotic chemistry.", progress: 20, launchDate: "2028-06-01" },
  { name: "JUICE", agency: "ESA", status: "In Transit", year: 2023, description: "Jupiter Icy Moons Explorer, en route to study Ganymede, Callisto, and Europa.", progress: 35 },
  { name: "Psyche", agency: "NASA", status: "In Transit", year: 2023, description: "Mission to explore 16 Psyche, a unique metal-rich asteroid orbiting between Mars and Jupiter.", progress: 40 },
];

const statusColors: Record<MissionStatus, string> = {
  Active: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  Completed: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Upcoming: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  "In Transit": "bg-purple-500/20 text-purple-300 border-purple-500/30",
};

function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft("Launched");
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      setTimeLeft(`${d}d ${h}h ${m}m`);
    };
    calc();
    const interval = setInterval(calc, 60000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <span className="text-xs text-gold font-mono">{timeLeft}</span>
  );
}

// Group missions by year
const years = [...new Set(missions.map((m) => m.year))].sort((a, b) => b - a);

export default function MissionsPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <section className="pb-8 pt-24 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-[family-name:var(--font-space-grotesk)] text-5xl font-black text-white md:text-7xl"
        >
          Missions
        </motion.h1>
        <p className="mt-4 text-cosmic/50">
          Tracking humanity&apos;s greatest expeditions beyond Earth
        </p>
      </section>

      <div ref={ref} className="mx-auto max-w-4xl px-6 pb-24">
        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10 md:left-1/2" />

          {years.map((year) => (
            <div key={year}>
              {/* Year divider */}
              <div className="relative mb-8 flex justify-center">
                <span className="pointer-events-none font-[family-name:var(--font-space-grotesk)] text-[6rem] font-black text-white/[0.03] leading-none select-none">
                  {year}
                </span>
                <span className="absolute top-1/2 -translate-y-1/2 rounded-full bg-nebula/20 px-4 py-1 font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-purple-300 border border-nebula/30">
                  {year}
                </span>
              </div>

              {missions
                .filter((m) => m.year === year)
                .map((mission, i) => (
                  <motion.div
                    key={mission.name}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className={`relative mb-8 flex ${
                      i % 2 === 0
                        ? "md:justify-start md:pr-[52%]"
                        : "md:justify-end md:pl-[52%]"
                    } pl-14 md:pl-0`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-[18px] top-6 h-4 w-4 rounded-full border-2 border-nebula bg-[#0a0a0f] md:left-1/2 md:-translate-x-1/2" />

                    <div className="glass w-full rounded-2xl p-5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-white">
                          {mission.name}
                        </h3>
                        <span
                          className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${statusColors[mission.status]}`}
                        >
                          {mission.status}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-cosmic/40">{mission.agency}</p>
                      <p className="mt-2 text-sm text-cosmic/50">{mission.description}</p>

                      {/* Progress bar */}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-cosmic/40 mb-1">
                          <span>Progress</span>
                          <span>{mission.progress}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${mission.progress}%` } : {}}
                            transition={{ delay: 0.5, duration: 1.2 }}
                            className="h-full rounded-full bg-gradient-to-r from-nebula to-aurora"
                          />
                        </div>
                      </div>

                      {mission.launchDate && (
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs text-cosmic/40">Countdown:</span>
                          <Countdown targetDate={mission.launchDate} />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
