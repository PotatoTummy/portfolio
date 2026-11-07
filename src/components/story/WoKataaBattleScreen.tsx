"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Flame, Wind, Swords, Sparkles } from "lucide-react";

export const WoKataaBattleScreen: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-[#0D1117] text-white flex flex-col justify-between p-3 select-none overflow-hidden font-sans">
      {/* Dynamic Battle Grid Background with Wind Vectors */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(249,115,22,0.18) 0%, transparent 60%), linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 20px 20px, 20px 20px",
        }}
      />

      {/* Top Header: Match Status & Latency */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[9px] text-zinc-300 tracking-wider">LIVE CLASH · R3</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 font-mono text-[8px] text-emerald-400">
          <Wind className="w-2.5 h-2.5 animate-spin" style={{ animationDuration: "6s" }} />
          <span>22 km/h NW · 28ms</span>
        </div>
      </div>

      {/* Opponent Card (Top) with Floating Motion */}
      <motion.div
        animate={{
          y: [0, -6, 0],
          rotate: [-1, 2, -1],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.8,
          ease: "easeInOut",
        }}
        className="relative z-10 mx-auto w-[88%] rounded-xl p-2.5 bg-gradient-to-br from-indigo-950/90 to-purple-950/80 border border-indigo-500/40 shadow-[0_8px_20px_rgba(79,70,229,0.25)]"
      >
        <div className="flex items-center justify-between text-[9px] font-mono text-indigo-300 mb-1">
          <span className="flex items-center gap-1">
            <Zap className="w-2.5 h-2.5 text-indigo-400" />
            <span>THUNDER FALCON</span>
          </span>
          <span className="px-1.5 py-0.2 rounded bg-indigo-500/30 font-bold text-white">LVL 48</span>
        </div>
        <div className="flex items-center justify-between text-[8px] text-zinc-400">
          <span>Kite Class: S-Tier</span>
          <span className="text-indigo-300 font-mono">Tension: 84%</span>
        </div>
      </motion.div>

      {/* Center Clash Nexus with Pulsing Duel Rings */}
      <div className="relative z-10 my-1 flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.35, 1], opacity: [0.3, 0.8, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="absolute w-12 h-12 rounded-full border border-orange-500/40 bg-orange-500/10"
          />
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.6)]">
            <Swords className="w-4 h-4 text-white" />
          </div>
        </div>
        <span className="font-mono text-[8px] font-bold tracking-widest text-orange-400 mt-1 uppercase">
          String Lock: 1.2m
        </span>
      </div>

      {/* Player Card (Bottom) with Counter-Phase Floating Motion */}
      <motion.div
        animate={{
          y: [0, 6, 0],
          rotate: [1, -2, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.4,
          ease: "easeInOut",
        }}
        className="relative z-10 mx-auto w-[88%] rounded-xl p-2.5 bg-gradient-to-br from-amber-950/90 to-orange-950/80 border border-orange-500/50 shadow-[0_8px_20px_rgba(249,115,22,0.3)]"
      >
        <div className="flex items-center justify-between text-[9px] font-mono text-orange-300 mb-1">
          <span className="flex items-center gap-1">
            <Flame className="w-2.5 h-2.5 text-orange-400" />
            <span>DRAGON FLAME</span>
          </span>
          <span className="px-1.5 py-0.2 rounded bg-orange-500/30 font-bold text-white">LVL 52</span>
        </div>
        <div className="flex items-center justify-between text-[8px] text-zinc-400">
          <span>Glass-Coat Manjha</span>
          <span className="text-orange-300 font-mono font-bold">Power: 98</span>
        </div>
      </motion.div>

      {/* Bottom Action Gesture Slider */}
      <div className="relative z-10 pt-2 border-t border-white/10">
        <div className="relative h-7 rounded-full bg-white/5 border border-white/10 overflow-hidden flex items-center px-2">
          <motion.div
            animate={{ x: [0, 110, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 flex items-center justify-center shadow-md cursor-grab"
          >
            <Sparkles className="w-2.5 h-2.5 text-white" />
          </motion.div>
          <span className="absolute inset-0 flex items-center justify-center font-mono text-[8px] text-zinc-400 uppercase tracking-wider pointer-events-none">
            Swipe Right to Cut ➔
          </span>
        </div>
      </div>
    </div>
  );
};
