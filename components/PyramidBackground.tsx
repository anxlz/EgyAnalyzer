'use client';

export function PyramidBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Top-right pyramid motif */}
      <svg
        className="absolute -top-20 -right-20 w-80 h-80 opacity-[0.035] dark:opacity-[0.05] text-gold-400"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <polygon points="100,10 190,190 10,190" />
        <polygon points="100,40 175,190 25,190" fillOpacity="0.5" />
        <polygon points="100,70 160,190 40,190" fillOpacity="0.3" />
      </svg>

      {/* Bottom-left pyramid motif */}
      <svg
        className="absolute -bottom-20 -left-20 w-96 h-96 opacity-[0.025] dark:opacity-[0.04] text-nile-500"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <polygon points="100,10 190,190 10,190" />
        <polygon points="100,40 175,190 25,190" fillOpacity="0.5" />
        <polygon points="100,70 160,190 40,190" fillOpacity="0.3" />
      </svg>

      {/* Decorative orbs */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gold-400/[0.03] dark:bg-gold-400/[0.04] blur-3xl" />
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-nile-500/[0.03] dark:bg-nile-500/[0.04] blur-3xl" />
    </div>
  );
}
