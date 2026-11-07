"use client";

import React from "react";
import { motion } from "framer-motion";

export const WoKataaArenaBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#03120C]">
      {/* Cyber Emerald Ambient Base */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 90% 80% at 75% 35%, rgba(24, 195, 138, 0.16) 0%, rgba(3, 25, 16, 0.95) 50%, #020C08 100%)",
        }}
      />

      {/* Aerodynamic Wind / Kite Line Vector Curves */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M -100 200 Q 400 50, 900 350 T 1800 250"
          fill="none"
          stroke="#18C38A"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          animate={{ strokeDashoffset: [0, -100] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M -100 450 Q 500 250, 1100 600 T 2000 400"
          fill="none"
          stroke="#00FF9D"
          strokeWidth="1"
          strokeDasharray="4 6"
          animate={{ strokeDashoffset: [0, -80] }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* Real-Time Clash Arena Radar Circle */}
      <div className="absolute right-[10%] top-[30%] -translate-y-1/2 w-80 h-80 rounded-full border border-emerald-500/15 flex items-center justify-center opacity-40">
        <div className="w-56 h-56 rounded-full border border-emerald-500/20 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border border-emerald-500/30 animate-ping opacity-30" />
        </div>
      </div>

      {/* Low-Latency Match Sync Status Tag */}
      <div className="absolute top-8 right-16 hidden md:flex items-center gap-2.5 font-mono text-[11px] text-emerald-400/80 bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-500/20 backdrop-blur-xs">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Real-Time Match Sync: &lt;40ms (Ably + WebSockets)</span>
      </div>
    </div>
  );
};

