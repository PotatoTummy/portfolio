"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MacBookProMockup } from "@/components/devices/MacBookProMockup";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { Sparkles } from "lucide-react";

interface HeroStoryProps {
  progress?: number;
}

export const HeroStory: React.FC<HeroStoryProps> = () => {
  const [coords, setCoords] = useState({ x: "0.72", y: "0.35" });

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      setCoords({
        x: (e.clientX / window.innerWidth).toFixed(2),
        y: (e.clientY / window.innerHeight).toFixed(2),
      });
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <section
      id="hero"
      data-nav="Intro"
      className="relative min-h-[100svh] w-full select-none bg-[#0B0B0A] text-[#F3F3EE] overflow-hidden flex flex-col justify-between px-6 sm:px-12 md:px-16 pt-24 pb-8"
    >
      {/* Ambient Radial Cyan Aura */}
      <div
        className="absolute right-[5vw] top-[25%] -translate-y-1/2 w-[550px] h-[450px] rounded-full pointer-events-none blur-[150px] opacity-20"
        style={{
          background: "radial-gradient(circle, #00D4FF 0%, #0284C7 50%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      {/* Main Grid: Headline & Bio on Left, Realistic Hardware Mockup on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center my-auto z-10 w-full max-w-7xl mx-auto">
        
        {/* Left Column: Value Proposition & Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Subtle status tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300"
          >
            <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
            <span>Frontend & Full Stack Developer</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400">Available for projects</span>
          </motion.div>

          {/* Large Grotesk Headline */}
          <h1 className="font-grotesk text-[clamp(42px,6.2vw,96px)] font-medium leading-[0.95] tracking-tight text-[#F3F3EE]">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              Thoughtful design.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[#00D4FF] pt-1"
            >
              High-performance code.
            </motion.span>
          </h1>

          {/* Human, Jargon-Free Bio Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-zinc-300 max-w-xl font-sans leading-relaxed"
          >
            I&apos;m Samad Kausar — a frontend-leaning developer crafting responsive websites and digital products. I combine clean visual design with fluid motion and reliable, scalable engineering.
          </motion.p>

          {/* Dual Action CTAs with Liquid Fill Animation */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3.5 pt-2"
          >
            <LiquidButton href="#work" variant="primary">
              View Selected Work
            </LiquidButton>

            <LiquidButton href="#contact" variant="outline" icon={false}>
              Start a Project →
            </LiquidButton>
          </motion.div>
        </motion.div>

        {/* Right Column: Floating 3D Laptop with Real Project Interface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative flex items-center justify-center"
        >
          {/* Subtle Coordinate Badge */}
          <div className="absolute -top-7 right-2 font-mono text-[10px] text-zinc-400 hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#00D4FF] rounded-full" />
            <span>Interactive Preview</span>
            <span className="text-zinc-600">|</span>
            <span>x: {coords.x} y: {coords.y}</span>
          </div>

          {/* Smooth Floating Device Container */}
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full max-w-[500px] drop-shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
          >
            <MacBookProMockup
              projectName="Nestys Platform"
              scrollProgress={0.4}
              straight={false}
              className="origin-center"
            >
              <div className="relative w-full h-full bg-[#0B0D13]">
                <Image
                  src="/projects/screens/nestys-screen.png"
                  alt="Nestys Platform Preview"
                  fill
                  sizes="500px"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </MacBookProMockup>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Editorial Hairline Strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10 font-mono text-xs text-zinc-500 w-full"
      >
        <span className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-[#00D4FF]" />
          <span>Fig. 01 · Studio Portfolio</span>
        </span>
        <span className="hidden sm:inline-block">Built with Next.js, React 19 & Framer Motion</span>
        <span>Portfolio 2026</span>
      </motion.div>
    </section>
  );
};
