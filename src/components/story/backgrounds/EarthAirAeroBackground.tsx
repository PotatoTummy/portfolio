"use client";

import React from "react";
import { motion } from "framer-motion";

export const EarthAirAeroBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#0D0A02]">
      {/* Warm Amber Gold Base Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 90% 80% at 75% 35%, rgba(245, 183, 0, 0.15) 0%, rgba(26, 20, 4, 0.95) 50%, #0A0802 100%)",
        }}
      />

      {/* Aerodynamic Laminar Airflow Streamlines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-25"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {[80, 160, 240, 320, 400, 480].map((y, idx) => (
          <motion.path
            key={idx}
            d={`M -200 ${y} C 300 ${y - 40}, 800 ${y + 40}, 1800 ${y - 20}`}
            fill="none"
            stroke="#F5B700"
            strokeWidth={idx % 2 === 0 ? "1.5" : "0.75"}
            strokeDasharray="8 12"
            animate={{ strokeDashoffset: [0, -120] }}
            transition={{
              duration: 14 + idx * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>

      {/* Core Web Vitals Performance Badge */}
      <div className="absolute top-8 right-16 hidden md:flex items-center gap-3 font-mono text-[11px] text-amber-300/80 bg-amber-950/40 px-3.5 py-1.5 rounded-full border border-amber-500/25 backdrop-blur-xs">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Performance: 95+ Core Web Vitals • 0s Downtime CI/CD</span>
      </div>
    </div>
  );
};
