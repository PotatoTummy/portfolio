"use client";

import React, { useEffect, useState } from "react";

interface FilmRailProps {
  currentReel: string;
  onOpenCmdK: () => void;
}

export const FilmRail: React.FC<FilmRailProps> = ({ currentReel, onOpenCmdK }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setScrollProgress(Math.min(1, Math.max(0, window.scrollY / max)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Red Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2px] w-full bg-[#FF5533] origin-left z-50 transition-transform duration-75 pointer-events-none"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* Film-Strip Rail (Left Border) */}
      <div
        className="hidden md:block fixed left-0 top-0 bottom-0 w-[24px] z-40 border-r border-white/[0.08] pointer-events-none"
        style={{
          background: "repeating-linear-gradient(#0B0B0A 0 14px, transparent 14px 28px)",
          backgroundSize: "8px 28px",
          backgroundRepeat: "repeat-y",
          backgroundPosition: `8px ${-scrollProgress * 200}px`,
        }}
      />

      {/* Bottom Floating Reel HUD */}
      <div className="fixed left-4 md:left-10 bottom-5 z-40 font-mono text-[11px] text-zinc-400 select-none flex items-center gap-3 backdrop-blur-md bg-[#0B0B0A]/70 px-3 py-1.5 rounded-full border border-white/10">
        <span className="h-1.5 w-1.5 rounded-full bg-[#FF5533] animate-pulse" />
        <span className="text-zinc-200">{currentReel || "Reel 00 · Opening"}</span>
      </div>

      {/* Bottom Right Cmd+K Trigger */}
      <div className="fixed right-4 sm:right-6 bottom-5 z-40">
        <button
          onClick={onOpenCmdK}
          className="font-mono text-[11px] text-zinc-300 bg-[#0B0B0A]/80 hover:bg-[#151514] hover:text-white backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 hover:border-[#FF5533]/50 transition-all flex items-center gap-2 shadow-lg"
          title="Open Command Palette"
        >
          <span>Search</span>
          <span className="px-1.5 py-0.5 rounded bg-white/10 text-zinc-400 text-[10px]">⌘K</span>
        </button>
      </div>
    </>
  );
};

