"use client";

import React from "react";

interface StudioStoryProps {
  progress?: number;
}

export const StudioStory: React.FC<StudioStoryProps> = ({ progress = 0 }) => {
  const statement =
    "One engineer for the whole product: interfaces crafted with taste, and distributed systems underneath that never drop a frame.";
  const words = statement.split(" ");
  const activeWordCount = Math.floor(Math.min(1, Math.max(0, progress * 1.25 - 0.08)) * words.length);

  return (
    <section
      id="studio"
      data-nav="Studio"
      className="relative h-[320vh] w-full bg-[#EFEAE4] text-[#121211] select-none z-10 transition-colors"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden px-4 sm:px-8 md:px-12 grid grid-cols-1 md:grid-cols-[1fr_minmax(260px,0.36fr)] gap-8 items-center">
        {/* Studio Badge */}
        <span className="absolute left-4 sm:left-8 md:left-12 top-[12vh] font-mono text-xs uppercase tracking-wider text-[#121211]/80 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#FF5533]" />
          <span>Studio</span>
        </span>

        {/* Word-by-Word Scrubbing Statement */}
        <p className="font-grotesk text-[clamp(32px,4.8vw,76px)] font-medium leading-[1.05] tracking-tight max-w-[14em] pl-0 md:pl-10">
          {words.map((w, idx) => (
            <span
              key={idx}
              className={`mr-2.5 transition-opacity duration-300 ${
                idx < activeWordCount ? "opacity-100" : "opacity-15"
              }`}
            >
              {w}
            </span>
          ))}
        </p>

        {/* Fig. 02 Parallax Card & Meta Columns */}
        <div className="hidden md:flex flex-col">
          <div className="relative aspect-[3/4] rounded bg-gradient-to-br from-[#FF5533] to-[#4D0E05] overflow-hidden shadow-2xl">
            {/* Drifting Card Layers */}
            <div
              className="absolute left-[12%] right-[12%] h-[22%] top-[12%] rounded-xl bg-[#EFEAE4]/90 shadow-xl transition-transform duration-75"
              style={{ transform: `translateY(${(progress - 0.5) * -50}px)` }}
            />
            <div
              className="absolute left-[12%] right-[12%] h-[22%] top-[38%] rounded-xl bg-[#121211] shadow-xl transition-transform duration-75"
              style={{ transform: `translateY(${(progress - 0.5) * -100}px)` }}
            />
            <div
              className="absolute left-[12%] right-[12%] h-[22%] top-[64%] rounded-xl bg-[#EFEAE4]/60 shadow-xl transition-transform duration-75"
              style={{ transform: `translateY(${(progress - 0.5) * -150}px)` }}
            />
            <span className="absolute right-3 bottom-2.5 font-mono text-[11px] text-white">
              Fig. 02
            </span>
          </div>

          <dl className="grid grid-cols-2 gap-4 mt-6 text-[13.5px]">
            <div>
              <dt className="font-mono text-[11px] text-[#121211]/60 border-t border-[#121211]/20 pt-2 mb-1">
                Focus
              </dt>
              <dd className="font-medium text-[#121211]">Frontend-heavy full stack</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] text-[#121211]/60 border-t border-[#121211]/20 pt-2 mb-1">
                Core Stack
              </dt>
              <dd className="font-medium text-[#121211]">React, React Native, NestJS, Fastify</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};

