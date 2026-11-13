"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ExternalLink, Sparkles } from "lucide-react";
import { MobileHeroMonitor } from "@/components/mobile/MobileHeroMonitor";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/useDeviceTier";

export const MobileHero: React.FC = () => {
  const reducedMotion = usePrefersReducedMotion();
  const [coords, setCoords] = useState({ x: "0.50", y: "0.50" });
  const [hasGyro, setHasGyro] = useState(false);

  // Feature-detect and listen to DeviceOrientation for gyroscope tilt coords
  useEffect(() => {
    if (typeof window === "undefined" || !("DeviceOrientationEvent" in window)) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        setHasGyro(true);
        // Normalize gamma (-45 to 45) and beta (-45 to 45) to 0.00..1.00
        const normX = Math.min(1, Math.max(0, (e.gamma + 45) / 90)).toFixed(2);
        const normY = Math.min(1, Math.max(0, (e.beta + 45) / 90)).toFixed(2);
        setCoords({ x: normX, y: normY });
      }
    };

    window.addEventListener("deviceorientation", handleOrientation, { passive: true });
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full pt-6 pb-12 px-4 flex flex-col justify-between overflow-hidden bg-[#0B0B0A] text-[#F3F3EE]"
    >
      {/* Subtle Ambient Radial Aura (CSS gradient, 0 JS) */}
      <div
        className="absolute top-0 right-0 w-[240px] h-[240px] rounded-full pointer-events-none opacity-20 blur-3xl -z-10"
        style={{
          background: "radial-gradient(circle, #00D4FF 0%, #0284C7 60%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-lg mx-auto w-full space-y-5"
      >
        {/* Subtle Status Tag */}
        <motion.div
          variants={fadeUp}
          custom={{ reducedMotion }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300"
        >
          <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse shrink-0" />
          <span className="truncate">Frontend-Heavy Full Stack</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-400">Open to Roles</span>
        </motion.div>

        {/* Large Editorial Grotesk Headline (Line-by-Line Reveal) */}
        <div className="space-y-1">
          <h1 className="font-grotesk text-[clamp(40px,9.5vw,56px)] font-medium tracking-tight text-white leading-[0.95]">
            <motion.span
              variants={fadeUp}
              custom={{ delay: 0.1, reducedMotion }}
              className="block"
            >
              Pixels move.
            </motion.span>
            <motion.span
              variants={fadeUp}
              custom={{ delay: 0.2, reducedMotion }}
              className="block text-[#00D4FF] pt-1"
            >
              Systems hold.
            </motion.span>
          </h1>

          <motion.p
            variants={fadeUp}
            custom={{ delay: 0.3, reducedMotion }}
            className="text-sm text-zinc-300 font-sans leading-relaxed pt-2"
          >
            I&apos;m <strong className="text-white font-medium">Samad Kausar</strong> — designing and building interfaces that feel finished, on backends that don&apos;t flinch. 2,500+ items at 60fps, 95+ Core Web Vitals, and resilient microservices.
          </motion.p>
        </div>

        {/* Action CTAs: Stacked, Full-Width, 44px+ Tap Targets */}
        <motion.div
          variants={fadeUp}
          custom={{ delay: 0.4, reducedMotion }}
          className="flex flex-col gap-2.5 pt-1"
        >
          <a
            href="#work"
            className="w-full min-h-[48px] flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#00D4FF] text-[#0B0B0A] font-semibold text-sm shadow-[0_0_20px_rgba(0,212,255,0.25)] active:scale-[0.98] transition-transform"
          >
            <span>View Selected Work</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <div className="grid grid-cols-2 gap-2 w-full">
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/[0.06] border border-white/15 text-zinc-200 font-mono text-xs active:scale-[0.98] transition-transform hover:text-white"
            >
              <span>Resume / CV</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            </a>

            <a
              href="#contact"
              className="min-h-[44px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/[0.06] border border-white/15 text-zinc-200 font-mono text-xs active:scale-[0.98] transition-transform hover:text-white"
            >
              <span>Contact</span>
              <span className="text-zinc-400">→</span>
            </a>
          </div>
        </motion.div>

        {/* Monitor Dashboard Stage */}
        <motion.div
          variants={fadeUp}
          custom={{ delay: 0.5, reducedMotion }}
          className="pt-2 space-y-1.5"
        >
          {/* Subtle Sensor Coordinate Badge */}
          <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500 px-1">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
              <span>Interactive Preview</span>
            </span>
            <span>
              {hasGyro ? "gyro" : "tilt"}: x: {coords.x} y: {coords.y}
            </span>
          </div>

          {/* Scaled Production Systems Monitor */}
          <MobileHeroMonitor />
        </motion.div>

        {/* Editorial Hairline Strip */}
        <motion.div
          variants={fadeUp}
          custom={{ delay: 0.6, reducedMotion }}
          className="flex items-center justify-between pt-4 border-t border-white/10 font-mono text-xs text-zinc-500"
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#00D4FF]" />
            <span>Fig. 01 · Studio Portfolio</span>
          </span>
          <span>Next.js 15 &amp; React 19</span>
        </motion.div>
      </motion.div>
    </section>
  );
};
