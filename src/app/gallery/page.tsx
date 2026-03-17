"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Lightbox from "@/components/Lightbox";

interface GalleryItem {
  src: string;
  title: string;
  date: string;
  description: string;
  span: string;
}

const gallery: GalleryItem[] = [
  { src: "https://images.unsplash.com/photo-1719448779841-4ebfe2f7af40?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920", title: "Antares Nebula", date: "2024-03-15", description: "A stunning view of the Antares region, one of the most colorful areas of the night sky.", span: "col-span-2 row-span-2" },
  { src: "https://images.unsplash.com/photo-1770067139926-aec4f8eb9aa2?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920", title: "Blue Nebula", date: "2024-02-28", description: "Ethereal blue gas clouds illuminated by newborn stars.", span: "" },
  { src: "https://images.unsplash.com/photo-1585083570023-3c099e7b464b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920", title: "Purple Starry Night", date: "2024-01-12", description: "A vibrant purple sky filled with millions of visible stars.", span: "" },
  { src: "https://images.unsplash.com/photo-1766839236852-2269734af68f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920", title: "Triangulum Galaxy", date: "2024-04-05", description: "The Triangulum Galaxy, third largest member of our Local Group.", span: "col-span-2" },
  { src: "https://images.unsplash.com/photo-1770723963993-ebe8304ff8dd?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920", title: "Earth from Space", date: "2024-05-20", description: "Our pale blue dot as seen from low Earth orbit.", span: "" },
  { src: "https://images.unsplash.com/photo-1722850998715-91dcb2b7d327?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920", title: "Alien Planet", date: "2024-06-10", description: "Artist impression of a distant exoplanet with exotic atmosphere.", span: "row-span-2" },
  { src: "https://images.unsplash.com/photo-1715619172925-78d1b2022a77?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920", title: "Aurora Purple Green", date: "2024-07-08", description: "Northern lights painting the sky in vivid purple and green hues.", span: "" },
  { src: "https://images.unsplash.com/photo-1549633760-9a0931220b84?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920", title: "Green Aurora", date: "2024-08-22", description: "A spectacular display of green aurora borealis over Arctic landscape.", span: "col-span-2" },
  { src: "https://images.unsplash.com/photo-1447433589675-4aaa569f3e05?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920", title: "Moon Surface", date: "2024-09-14", description: "NASA high-resolution image of the lunar surface showing craters and maria.", span: "" },
  { src: "https://images.unsplash.com/photo-1728876027996-942383f8fe38?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920", title: "Comet", date: "2024-10-03", description: "A bright comet streaking across the starfield with its dust tail.", span: "" },
  { src: "https://images.unsplash.com/photo-1660323917474-3faad963ae79?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920", title: "Ringed Planet", date: "2024-11-18", description: "A majestic ringed planet bathed in light from its parent star.", span: "col-span-2 row-span-2" },
  { src: "https://images.unsplash.com/photo-1759808418292-f65b69f3ca48?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920", title: "Rocket Trail", date: "2024-12-01", description: "A rocket ascending to space, leaving a brilliant trail of fire.", span: "" },
];

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
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
          Gallery
        </motion.h1>
        <p className="mt-4 text-cosmic/50">
          Astronomy Picture of the Day archive
        </p>
      </section>

      <div ref={ref} className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl ${item.span}`}
              onClick={() => setLightbox(item)}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Grain overlay */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay">
                  <svg className="h-full w-full">
                    <filter id={`grain-${i}`}>
                      <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.8"
                        numOctaves="4"
                      />
                    </filter>
                    <rect
                      width="100%"
                      height="100%"
                      filter={`url(#grain-${i})`}
                    />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-white">
                    {item.title}
                  </p>
                  <p className="text-xs text-cosmic/50">{item.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.title}
          description={lightbox.description}
          open={!!lightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}
