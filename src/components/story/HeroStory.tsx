"use client";

import React, { useState, useEffect } from "react";

interface HeroStoryProps {
  progress?: number;
}

export const HeroStory: React.FC<HeroStoryProps> = ({ progress = 0 }) => {
  const [coords, setCoords] = useState({ x: "0.50", y: "0.50" });

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      setCoords({
        x: (e.clientX / window.innerWidth).toFixed(2),
        y: (e.clientY / window.innerHeight).toFixed(2),
      });
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <section id="hero" data-nav="Intro" className="relative h-[180vh] w-full select-none">
      <div className="sticky top-0 h-[100svh] overflow-hidden px-4 sm:px-8 md:px-12 flex flex-col justify-between">
        {/* Radar Crosshair with pointer coordinates */}
        <div
          className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 w-[min(44vw,520px)] aspect-square rounded-full border border-white/10 pointer-events-none transition-opacity duration-300"
          style={{ opacity: Math.max(0, 1 - progress * 1.5) }}
          aria-hidden="true"
        >
          {/* Crosshair lines */}
          <div className="absolute left-1/2 top-[-15%] bottom-[-15%] w-px bg-white/10" />
          <div className="absolute top-1/2 left-[-15%] right-[-15%] h-px bg-white/10" />
          {/* Coordinates readout */}
          <span className="absolute left-[-22%] top-[48%] font-mono text-[11px] text-zinc-500">
            y {coords.y}
          </span>
          <span className="absolute right-[-22%] top-[48%] font-mono text-[11px] text-zinc-500">
            x {coords.x}
          </span>
        </div>

        {/* Headline (Low-left, tight-tracked grotesk) */}
        <h1
          aria-label="Pixels move. Systems hold."
          className="absolute left-4 sm:left-8 md:left-12 bottom-[18vh] font-grotesk text-[clamp(62px,10.5vw,178px)] font-medium leading-[0.88] text-[#F3F3EE] max-w-[90vw] pointer-events-none transition-transform duration-75"
          style={{ transform: `translateY(${-progress * 70}px)` }}
        >
          <span className="block overflow-hidden py-0.5">
            <span className="block animate-[headlineRise_1.2s_cubic-bezier(0.16,1,0.3,1)_forwards]">
              Pixels move.
            </span>
          </span>
          <span className="block overflow-hidden py-0.5 text-right pl-[clamp(20px,8vw,140px)]">
            <span className="block animate-[headlineRise_1.2s_cubic-bezier(0.16,1,0.3,1)_0.12s_forwards]">
              Systems hold.
            </span>
          </span>
        </h1>

        {/* Bottom Right Bio & Action Stack */}
        <div className="absolute right-4 sm:right-8 md:right-12 bottom-[18vh] w-[min(340px,44vw)] text-[14.5px] leading-relaxed flex flex-col gap-3">
          <p className="text-zinc-400">
            I&apos;m Samad, a frontend-heavy full stack engineer. I build the interfaces people enjoy and the resilient systems that keep them fast.
          </p>

          <a
            href="#work"
            className="flex items-center justify-between px-4 py-3 bg-[#FF5533] text-[#0B0B0A] font-medium text-sm rounded transition-all hover:translate-x-1 hover:bg-[#ff6a4a] shadow-[0_0_20px_rgba(255,85,51,0.35)]"
          >
            <span>View selected work</span>
            <span>↗</span>
          </a>

          <a
            href="#contact"
            className="flex items-center justify-between px-4 py-3 border border-white/25 text-[#F3F3EE] text-sm rounded transition-all hover:translate-x-1 hover:border-white/50"
          >
            <span>Start a project</span>
            <span>&rarr;</span>
          </a>
        </div>

        {/* Footer rule with Fig. 01 caption */}
        <div className="absolute left-4 sm:left-8 md:left-12 right-4 sm:right-8 md:right-12 bottom-[4vh] flex items-center justify-between pt-3 border-t border-white/15 font-mono text-xs text-zinc-500">
          <span>Fig. 01 · Frontend-heavy full stack</span>
          <span>Portfolio 2026</span>
        </div>
      </div>
    </section>
  );
};
