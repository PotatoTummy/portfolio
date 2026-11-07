"use client";

import React from "react";
import { motion } from "framer-motion";

export const NestysMatrixBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#030B17]">
      {/* Deep Sapphire Gradient Base */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 90% 80% at 75% 35%, rgba(0, 212, 255, 0.14) 0%, rgba(2, 24, 54, 0.95) 50%, #020914 100%)",
        }}
      />

      {/* Isometric Commerce Grid Lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="nestys-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="#00D4FF"
              strokeWidth="0.75"
              strokeDasharray="2 4"
            />
            <circle cx="0" cy="0" r="1.5" fill="#00D4FF" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#nestys-grid)" />
      </svg>

      {/* Floating Live Transaction Data Packets */}
      <div className="absolute inset-0 overflow-hidden font-mono text-[10px] text-cyan-400/50">
        {[
          { text: "ORD #4920 · $1,280.00", top: "18%", delay: 0, duration: 18 },
          { text: "INVENTORY MATRIX · 1,248 SKUs", top: "42%", delay: 4, duration: 22 },
          { text: "HLS STREAM · 60 FPS ADAPTIVE", top: "72%", delay: 8, duration: 20 },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ x: "-20%", opacity: 0 }}
            animate={{ x: "120%", opacity: [0, 0.7, 0.7, 0] }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: "linear",
            }}
            className="absolute whitespace-nowrap px-3 py-1 rounded bg-[#00D4FF]/5 border border-[#00D4FF]/20 backdrop-blur-xs flex items-center gap-2"
            style={{ top: item.top }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
            <span>{item.text}</span>
          </motion.div>
        ))}
      </div>

      {/* Bottom Live Order Throughput Equalizer Bars */}
      <div className="absolute bottom-6 right-8 hidden lg:flex items-end gap-1.5 h-20 opacity-35">
        {[45, 75, 55, 90, 65, 80, 40, 100, 70, 85, 95, 60].map((h, i) => (
          <motion.div
            key={i}
            animate={{ height: [`${h * 0.4}%`, `${h}%`, `${h * 0.6}%`] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.15,
              ease: "easeInOut",
            }}
            className="w-1.5 rounded-t bg-gradient-to-t from-[#00D4FF]/20 to-[#00D4FF]"
          />
        ))}
      </div>
    </div>
  );
};
