"use client";

import React, { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { useSectionScroll } from "@/hooks/useSectionScroll";

interface ReelIntermissionProps {
  completedReelNumber: string;
  nextReelNumber: string;
  nextProjectTitle: string;
  nextCategory: string;
}

export const ReelIntermission: React.FC<ReelIntermissionProps> = ({
  completedReelNumber,
  nextReelNumber,
  nextProjectTitle,
  nextCategory,
}) => {
  const intermissionRef = useRef<HTMLDivElement | null>(null);
  const progress = useSectionScroll(intermissionRef);
  const charge = Math.min(1, Math.max(0, (progress - 0.18) / 0.58));

  return (
    <div
      ref={intermissionRef}
      className="relative h-[72svh] px-4 flex flex-col items-center justify-center text-center select-none overflow-hidden"
    >
      {/* A transmission bridge: scroll physically sends the visitor to the next project. */}
      <div className="absolute inset-x-[10%] top-1/2 h-px bg-white/[0.09]" />
      <div
        className="absolute left-[10%] top-1/2 h-px origin-left bg-[#FF5533] shadow-[0_0_18px_rgba(255,85,51,0.9)]"
        style={{ width: `${charge * 80}%` }}
      />
      <div
        className="absolute top-1/2 h-3.5 w-3.5 rounded-full bg-[#FF5533] shadow-[0_0_25px_rgba(255,85,51,1)]"
        style={{ left: `calc(10% + ${charge * 80}%)`, transform: "translate(-50%, -50%)" }}
      />

      <div
        className="relative z-10 max-w-xl transition-transform duration-100"
        style={{ transform: `translateY(${(1 - charge) * 24}px)`, opacity: 0.25 + charge * 0.75 }}
      >
        <div className="mb-5 flex items-center justify-center gap-3 text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">
          <span>Reel {completedReelNumber} archived</span>
          <span className="h-px w-7 bg-[#FF5533]" />
          <span>Loading {nextReelNumber}</span>
        </div>
        <h3 className="font-serif text-4xl sm:text-6xl text-[#F3F3EE] leading-none">
          {nextProjectTitle}
        </h3>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-400">
          {nextCategory} / signal ready {Math.round(charge * 100)}%
        </p>
      </div>

      <div className="absolute bottom-9 flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
        <span>{charge > 0.88 ? "Entering next system" : "Scroll to transmit"}</span>
        <ArrowDown className="h-3 w-3 text-[#FF5533] animate-bounce" />
      </div>
    </div>
  );
};

