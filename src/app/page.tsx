"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Starfield from "@/components/Starfield";
import AnimatedCounter from "@/components/AnimatedCounter";
import SpotlightCard from "@/components/SpotlightCard";
import Button from "@/components/Button";
import Marquee from "@/components/Marquee";
import ProgressRing from "@/components/ProgressRing";
import AuroraBackground from "@/components/AuroraBackground";
import {
  IconTelescope,
  IconPlanet,
  IconRocket,
  IconPhoto,
  IconMoon,
  IconCalendar,
} from "@tabler/icons-react";

/* ───── Section wrapper with stagger ───── */
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
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ───── Hero ───── */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <Starfield />
      <motion.div style={{ y }} className="relative z-10 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-[family-name:var(--font-space-grotesk)] text-6xl font-black leading-tight tracking-tight text-white sm:text-8xl lg:text-9xl"
        >
          EXPLORE
          <br />
          THE COSMOS
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mx-auto mt-6 max-w-xl text-lg text-cosmic/60"
        >
          Journey through nebulae, track missions, and discover exoplanets in
          your personal space exploration dashboard.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <Button variant="glow">Start Exploring</Button>
          <Button variant="outline">Learn More</Button>
        </motion.div>
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
    </section>
  );
}

/* ───── Stats ───── */
function Stats() {
  return (
    <Section className="py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-12 px-6 md:grid-cols-4">
        <AnimatedCounter target={5500} suffix="+" label="Known Exoplanets" />
        <AnimatedCounter target={50} suffix="+" label="Habitable Zone Planets" />
        <AnimatedCounter target={30} suffix="+" label="Active Missions" />
        <AnimatedCounter target={4.24} label="Light Years to Nearest Star" decimals={2} />
      </div>
    </Section>
  );
}

/* ───── Bento Grid ───── */
const features = [
  { icon: IconTelescope, title: "Live Sky Map", desc: "Real-time celestial object tracking", span: "md:col-span-2" },
  { icon: IconPlanet, title: "Exoplanet Database", desc: "Browse thousands of discovered worlds", span: "md:row-span-2" },
  { icon: IconRocket, title: "Mission Tracker", desc: "Follow active space missions", span: "" },
  { icon: IconPhoto, title: "APOD Gallery", desc: "Astronomy picture of the day archive", span: "" },
  { icon: IconMoon, title: "Moon Phase", desc: "Current lunar phase and calendar", span: "" },
  { icon: IconCalendar, title: "Launch Calendar", desc: "Upcoming rocket launches worldwide", span: "md:col-span-2" },
];

function BentoGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-12 text-center font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-white">
          Your Cosmic Toolkit
        </h2>
        <div
          ref={ref}
          className="grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={f.span}
            >
              <SpotlightCard className="h-full">
                <f.icon size={32} className="mb-3 text-nebula" />
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-white">
                  {f.title}
                </h3>
                <p className="mt-1 text-sm text-cosmic/50">{f.desc}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ───── About ───── */
function About() {
  return (
    <Section className="relative overflow-hidden py-24">
      <AuroraBackground />
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl">
          <Image
            src="https://images.unsplash.com/photo-1719448779841-4ebfe2f7af40?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920"
            alt="Antares nebula"
            width={800}
            height={500}
            unoptimized
            className="h-auto w-full object-cover"
          />
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-white">
            Our Mission
          </h2>
          <p className="mt-4 text-cosmic/60 leading-relaxed">
            Stardust brings the cosmos to your fingertips. We aggregate data from
            NASA, ESA, and leading observatories to create an immersive dashboard
            that makes space exploration accessible and beautiful. From tracking
            active missions to discovering new exoplanets, every interaction is
            designed to inspire wonder.
          </p>
          <p className="mt-4 text-cosmic/60 leading-relaxed">
            Whether you are a seasoned astronomer or a curious stargazer, Stardust
            transforms complex astronomical data into stunning visualizations
            that connect you with the universe.
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ───── Marquee Ticker ───── */
function Ticker() {
  return (
    <section className="py-16 space-y-4">
      <Marquee
        items={[
          "ANDROMEDA",
          "PROXIMA CENTAURI",
          "KEPLER-442b",
          "TRAPPIST-1",
          "JAMES WEBB",
        ]}
      />
      <Marquee
        items={[
          "ARTEMIS",
          "VOYAGER 1",
          "HUBBLE",
          "EUROPA CLIPPER",
          "CASSINI",
        ]}
        reverse
      />
    </section>
  );
}

/* ───── Featured Image (parallax) ───── */
function FeaturedImage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <section ref={ref} className="relative h-[60vh] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1770067139926-aec4f8eb9aa2?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920"
          alt="Blue nebula"
          fill
          unoptimized
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="text-center">
          <p className="font-[family-name:var(--font-space-grotesk)] text-5xl font-black text-white md:text-7xl">
            INFINITE WONDER
          </p>
          <p className="mt-4 text-lg text-cosmic/60">
            Every point of light tells a story billions of years in the making.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ───── Progress Rings ───── */
function MissionProgress() {
  return (
    <Section className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="mb-12 text-center font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-white">
          Mission Progress
        </h2>
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
          <ProgressRing progress={75} label="Artemis" color="#6b21a8" />
          <ProgressRing progress={100} label="JWST" color="#0d9488" />
          <ProgressRing progress={45} label="Europa Clipper" color="#fbbf24" />
          <ProgressRing progress={30} label="Mars Sample Return" color="#6b21a8" />
        </div>
      </div>
    </Section>
  );
}

/* ───── CTA ───── */
function CTA() {
  return (
    <section className="relative overflow-hidden py-32">
      <AuroraBackground />
      <div className="relative z-10 text-center px-6">
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-5xl font-black text-white md:text-6xl">
          Begin Your Journey
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-cosmic/60">
          The universe is waiting. Explore exoplanets, follow missions, and
          discover the beauty of deep space.
        </p>
        <div className="mt-8">
          <Button variant="glow">Launch Dashboard</Button>
        </div>
      </div>
    </section>
  );
}

/* ───── Page ───── */
export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <BentoGrid />
      <About />
      <Ticker />
      <FeaturedImage />
      <MissionProgress />
      <CTA />
    </>
  );
}
