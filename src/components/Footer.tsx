export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#07070b] py-12">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold tracking-widest text-white/80">
          STARDUST
        </p>
        <p className="mt-2 text-sm text-cosmic/40">
          A personal cosmos experience. Data sourced from NASA, ESA &amp; open
          astronomy databases.
        </p>
        <p className="mt-4 text-xs text-cosmic/30">
          &copy; {new Date().getFullYear()} Stardust. Built with Next.js &amp;
          Framer Motion.
        </p>
      </div>
    </footer>
  );
}
