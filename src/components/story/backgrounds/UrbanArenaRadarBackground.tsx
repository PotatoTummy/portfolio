"use client";

import React from "react";
import { motion } from "framer-motion";

export const UrbanArenaRadarBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#090412]">
      {/* Electric Violet Radial Base */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 90% 80% at 75% 35%, rgba(168, 85, 247, 0.16) 0%, rgba(20, 8, 38, 0.95) 50%, #06020D 100%)",
        }}
      />

      {/* Isometric Sports Arena Court Geometry */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="#A855F7" strokeWidth="1" fill="none">
          {/* Half-court outline */}
          <rect x="10%" y="20%" width="35%" height="60%" rx="8" strokeDasharray="3 3" />
          {/* Center key circle */}
          <circle cx="27.5%" cy="50%" r="60" stroke="#06B6D4" strokeWidth="1.5" />
          <line x1="10%" y1="50%" x2="45%" y2="50%" stroke="#A855F7" strokeWidth="1" />
          {/* 3-point arc */}
          <path d="M 10% 32% Q 24% 50%, 10% 68%" stroke="#A855F7" strokeWidth="1.5" />
        </g>
      </svg>

      {/* Sweeping 360° Venue Availability Radar */}
      <div className="absolute right-[8%] top-[28%] -translate-y-1/2 w-72 h-72 rounded-full border border-purple-500/20 flex items-center justify-center opacity-40">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="w-full h-full rounded-full"
          style={{
            background: "conic-gradient(from 0deg at 50% 50%, rgba(168, 85, 247, 0.25) 0deg, transparent 60deg, transparent 360deg)",
          }}
        />
      </div>

      {/* Venue Lock Status Tag */}
      <div className="absolute top-8 right-16 hidden md:flex items-center gap-3 font-mono text-[11px] text-purple-300/80 bg-purple-950/40 px-3.5 py-1.5 rounded-full border border-purple-500/25 backdrop-blur-xs">
        <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
        <span>Multi-Tenant Arena • Redis Mutex Slot Locks • Dynamic QR</span>
      </div>
    </div>
  );
};

