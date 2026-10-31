"use client";

import React, { useEffect, useRef, useState } from "react";

export const ManifestoStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const text =
    "Most software is a sequence of screens. I treat it as a film: every interaction has timing, weight, and a reason to exist. Then I build the systems underneath so it never drops a frame.";

  const words = text.split(" ");
  const hotWords = ["film:", "timing,", "weight,", "never", "drops", "frame."];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (windowH * 0.8 - rect.top) / (rect.height * 0.9)));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      id="premise"
      data-chap="Reel 01 · Premise"
      className="min-h-[70vh] sm:min-h-[85vh] flex items-center justify-center py-20 px-4 sm:px-8 select-none"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-xs font-mono text-[#FF5533] uppercase tracking-wider mb-6 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF5533]" />
          <span>The Engineering Premise</span>
        </div>

        <p className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] tracking-tight">
          {words.map((word, idx) => {
            const isHot = hotWords.includes(word.toLowerCase());
            const isRevealed = scrollProgress * words.length > idx;
            return (
              <span
                key={idx}
                className={`inline-block mr-2 sm:mr-3.5 transition-all duration-300 ${
                  isRevealed
                    ? isHot
                      ? "text-[#FF5533] opacity-100 font-normal italic"
                      : "text-[#F3F3EE] opacity-100"
                    : "text-zinc-600 opacity-25"
                }`}
              >
                {word}
              </span>
            );
          })}
        </p>

        <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <span>01 / PREMISE</span>
          <span>CRAFTING LOW-LATENCY EXPERIENCES</span>
        </div>
      </div>
    </section>
  );
};

