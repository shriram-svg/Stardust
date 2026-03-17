"use client";

function getMoonPhase(): { name: string; illumination: number } {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  // Simple moon phase calculation
  let c = 0;
  let e = 0;
  let jd = 0;

  if (month <= 2) {
    c = year - 1;
    e = month + 12;
  } else {
    c = year;
    e = month;
  }

  jd =
    Math.floor(365.25 * (c + 4716)) +
    Math.floor(30.6001 * (e + 1)) +
    day -
    1524.5;

  const daysSinceNew = jd - 2451549.5;
  const newMoons = daysSinceNew / 29.53058770576;
  const phase = newMoons - Math.floor(newMoons);

  const names = [
    "New Moon",
    "Waxing Crescent",
    "First Quarter",
    "Waxing Gibbous",
    "Full Moon",
    "Waning Gibbous",
    "Last Quarter",
    "Waning Crescent",
  ];
  const idx = Math.round(phase * 8) % 8;

  return {
    name: names[idx],
    illumination: Math.round(
      (phase < 0.5 ? phase * 2 : (1 - phase) * 2) * 100
    ),
  };
}

export default function MoonPhase() {
  const { name, illumination } = getMoonPhase();

  // SVG moon
  const phase = illumination / 100;
  const curveX = phase < 0.5 ? 50 - phase * 200 : (phase - 0.5) * 200 - 50;

  return (
    <div className="flex flex-col items-center gap-4">
      <svg viewBox="0 0 100 100" className="w-32 h-32">
        <circle cx="50" cy="50" r="45" fill="#1a1a2e" stroke="#fbbf24" strokeWidth="1" />
        <path
          d={`M 50 5 A 45 45 0 0 1 50 95 A ${curveX} 45 0 0 ${phase > 0.5 ? 1 : 0} 50 5`}
          fill="#fbbf24"
          opacity="0.9"
        />
      </svg>
      <div className="text-center">
        <p className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
          {name}
        </p>
        <p className="text-sm text-cosmic/50">{illumination}% illuminated</p>
      </div>
    </div>
  );
}
