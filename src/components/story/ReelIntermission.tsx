"use client";

import React from "react";
import { ArrowDown } from "lucide-react";

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
  return (
    <div className="relative py-28 sm:py-36 px-4 flex flex-col items-center justify-center text-center select-none overflow-hidden">
      {/* Central Film Strip Line */}
      <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-[#FF5533] to-transparent mb-6 animate-pulse" />

      {/* Separation Intermission Card */}
      <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-[#121211]/90 backdrop-blur-xl shadow-2xl text-xs font-mono">
        <span className="text-zinc-400">Reel {completedReelNumber} Complete</span>
        <span className="text-[#FF5533] font-bold">/</span>
        <span className="text-white font-semibold">
          Up Next: Reel {nextReelNumber} · {nextProjectTitle}
        </span>
        <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-zinc-400">
          {nextCategory}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
        <span>Scroll to enter next reel</span>
        <ArrowDown className="h-3 w-3 text-[#FF5533] animate-bounce" />
      </div>

      {/* Subtle Horizontal Border Divider */}
      <div className="mt-10 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
    </div>
  );
};

