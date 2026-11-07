"use client";

import React from "react";
import { motion } from "framer-motion";

export const ScrollrFilmBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#0D0B0A]">
      {/* Warm Celluloid Gradient Base */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 90% 80% at 75% 35%, rgba(220, 89, 59, 0.16) 0%, rgba(25, 12, 10, 0.95) 50%, #0A0807 100%)",
        }}
      />

      {/* 35mm Celluloid Film Sprocket Holes (Left Margin) */}
      <div className="absolute left-3 sm:left-6 top-0 bottom-0 w-6 flex flex-col justify-between py-4 opacity-25">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="w-4 h-6 rounded-xs border border-[#DC593B]/40 bg-black/40"
          />
        ))}
      </div>

      {/* 35mm Celluloid Film Sprocket Holes (Right Margin) */}
      <div className="absolute right-3 sm:right-6 top-0 bottom-0 w-6 flex flex-col justify-between py-4 opacity-25">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="w-4 h-6 rounded-xs border border-[#DC593B]/40 bg-black/40"
          />
        ))}
      </div>

      {/* Midnight Film Club Meta Stamp */}
      <div className="absolute top-8 right-16 hidden md:flex items-center gap-3 font-mono text-[11px] text-[#DC593B]/60 tracking-widest uppercase">
        <span className="w-2 h-2 rounded-full bg-[#DC593B] animate-pulse" />
        <span>35mm Celluloid Cinema • 60 FPS Native</span>
      </div>

      {/* Dynamic Soundwave Frequency Audio Visualizer */}
      <div className="absolute bottom-8 left-16 right-16 hidden lg:flex items-center justify-center gap-1 opacity-25">
        {Array.from({ length: 48 }).map((_, i) => {
          const heightFactor = Math.sin((i / 48) * Math.PI) * 100;
          return (
            <motion.div
              key={i}
              animate={{
                height: [
                  `${Math.max(6, heightFactor * 0.3)}px`,
                  `${Math.max(12, heightFactor * 0.9)}px`,
                  `${Math.max(8, heightFactor * 0.4)}px`,
                ],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                repeatType: "reverse",
                delay: (i % 8) * 0.12,
                ease: "easeInOut",
              }}
              className="w-1 rounded-full bg-gradient-to-t from-[#D1A74D] to-[#DC593B]"
            />
          );
        })}
      </div>
    </div>
  );
};
