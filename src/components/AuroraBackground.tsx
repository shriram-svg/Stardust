"use client";

export default function AuroraBackground({ className = "" }: { className?: string }) {
  return (
    <div
      className={`aurora-bg absolute inset-0 opacity-30 ${className}`}
      aria-hidden="true"
    />
  );
}
