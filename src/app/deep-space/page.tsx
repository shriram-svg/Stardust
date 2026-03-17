"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

type PlanetType = "All" | "Super-Earth" | "Gas Giant" | "Rocky" | "Ice Giant" | "Neptune-like";

interface Exoplanet {
  name: string;
  type: PlanetType;
  distance: number; // light years
  radius: number; // Earth radii
  mass: number; // Earth masses
  discovered: number;
  habitable: boolean;
  description: string;
  image: string;
}

const exoplanets: Exoplanet[] = [
  { name: "Kepler-442b", type: "Super-Earth", distance: 1206, radius: 1.34, mass: 2.34, discovered: 2015, habitable: true, description: "One of the most Earth-like planets ever found, orbiting in the habitable zone of a K-type star.", image: "https://images.unsplash.com/photo-1722850998715-91dcb2b7d327?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920" },
  { name: "TRAPPIST-1e", type: "Rocky", distance: 39.6, radius: 0.92, mass: 0.69, discovered: 2017, habitable: true, description: "A rocky world in the TRAPPIST-1 system, potentially harboring liquid water.", image: "https://images.unsplash.com/photo-1770723963993-ebe8304ff8dd?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920" },
  { name: "Proxima Centauri b", type: "Rocky", distance: 4.24, radius: 1.08, mass: 1.17, discovered: 2016, habitable: true, description: "The closest known exoplanet, orbiting our nearest stellar neighbor.", image: "https://images.unsplash.com/photo-1660323917474-3faad963ae79?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920" },
  { name: "HD 209458 b", type: "Gas Giant", distance: 157, radius: 15.1, mass: 219, discovered: 1999, habitable: false, description: "The first transiting exoplanet discovered, a hot Jupiter with a detected atmosphere.", image: "https://images.unsplash.com/photo-1585083570023-3c099e7b464b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920" },
  { name: "Kepler-22b", type: "Super-Earth", distance: 620, radius: 2.38, mass: 9.1, discovered: 2011, habitable: true, description: "First confirmed planet in the habitable zone discovered by Kepler.", image: "https://images.unsplash.com/photo-1766839236852-2269734af68f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920" },
  { name: "55 Cancri e", type: "Super-Earth", distance: 41, radius: 1.88, mass: 8.08, discovered: 2004, habitable: false, description: "A lava world so hot that its surface may be covered in molten rock.", image: "https://images.unsplash.com/photo-1736231182175-c3202ce807c0?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920" },
  { name: "GJ 1214 b", type: "Neptune-like", distance: 48, radius: 2.68, mass: 6.55, discovered: 2009, habitable: false, description: "A water world surrounded by a thick, steamy atmosphere.", image: "https://images.unsplash.com/photo-1760490196378-85127689ab0e?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920" },
  { name: "HAT-P-11b", type: "Neptune-like", distance: 123, radius: 4.73, mass: 26, discovered: 2009, habitable: false, description: "A warm Neptune with detected water vapor in its atmosphere.", image: "https://images.unsplash.com/photo-1772568842180-02b9a4ca1b36?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920" },
  { name: "WASP-12b", type: "Gas Giant", distance: 1410, radius: 20.7, mass: 461, discovered: 2008, habitable: false, description: "An ultra-hot Jupiter being tidally stretched and consumed by its star.", image: "https://images.unsplash.com/photo-1719448779841-4ebfe2f7af40?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920" },
  { name: "Kepler-186f", type: "Rocky", distance: 582, radius: 1.17, mass: 1.71, discovered: 2014, habitable: true, description: "The first Earth-sized planet found orbiting in the habitable zone.", image: "https://images.unsplash.com/photo-1770067139926-aec4f8eb9aa2?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920" },
  { name: "GJ 436 b", type: "Ice Giant", distance: 33.4, radius: 4.22, mass: 22.1, discovered: 2004, habitable: false, description: "A warm Neptune with exotic hot ice under extreme pressure.", image: "https://images.unsplash.com/photo-1689449454737-120ab43b2e11?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920" },
  { name: "HAT-P-7b", type: "Gas Giant", distance: 1044, radius: 16.9, mass: 540, discovered: 2008, habitable: false, description: "A gas giant with ruby and sapphire clouds in its atmosphere.", image: "https://images.unsplash.com/photo-1705885895198-92bf117f02f0?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920" },
];

const types: PlanetType[] = ["All", "Super-Earth", "Gas Giant", "Rocky", "Ice Giant", "Neptune-like"];

const typeColors: Record<string, string> = {
  "Super-Earth": "bg-emerald-500/20 text-emerald-300",
  "Gas Giant": "bg-orange-500/20 text-orange-300",
  Rocky: "bg-amber-500/20 text-amber-300",
  "Ice Giant": "bg-sky-500/20 text-sky-300",
  "Neptune-like": "bg-blue-500/20 text-blue-300",
};

const maxDistance = Math.max(...exoplanets.map((e) => e.distance));

export default function DeepSpacePage() {
  const [filter, setFilter] = useState<PlanetType>("All");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const filtered =
    filter === "All" ? exoplanets : exoplanets.filter((e) => e.type === filter);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <section className="pb-8 pt-24 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-[family-name:var(--font-space-grotesk)] text-5xl font-black text-white md:text-7xl"
        >
          Deep Space
        </motion.h1>
        <p className="mt-4 text-cosmic/50">
          Browse confirmed exoplanets discovered across the galaxy
        </p>
      </section>

      {/* Filter tabs */}
      <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-2 px-6 pb-12">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-all ${
              filter === t
                ? "bg-nebula text-white"
                : "bg-white/5 text-cosmic/50 hover:bg-white/10 hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Planet grid */}
      <div ref={ref} className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((planet, i) => (
            <motion.div
              key={planet.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ scale: 1.03, rotateY: 5 }}
              style={{ perspective: 1000 }}
              className="glass overflow-hidden rounded-2xl"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={planet.image}
                  alt={planet.name}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
                {planet.habitable && (
                  <span className="absolute top-3 right-3 rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-300">
                    Habitable Zone
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2">
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-white">
                    {planet.name}
                  </h3>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${typeColors[planet.type]}`}>
                    {planet.type}
                  </span>
                </div>
                <p className="mt-2 text-sm text-cosmic/50 line-clamp-2">{planet.description}</p>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <p className="text-cosmic/40">Distance</p>
                    <p className="font-bold text-white">{planet.distance} ly</p>
                  </div>
                  <div>
                    <p className="text-cosmic/40">Radius</p>
                    <p className="font-bold text-white">{planet.radius}x</p>
                  </div>
                  <div>
                    <p className="text-cosmic/40">Mass</p>
                    <p className="font-bold text-white">{planet.mass}x</p>
                  </div>
                </div>
                {/* Distance bar */}
                <div className="mt-3">
                  <div className="h-1 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${(planet.distance / maxDistance) * 100}%` } : {}}
                      transition={{ delay: 0.5 + i * 0.08, duration: 1 }}
                      className="h-full rounded-full bg-gradient-to-r from-nebula to-aurora"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
