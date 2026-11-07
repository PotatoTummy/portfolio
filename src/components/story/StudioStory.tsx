"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IPhoneMockup } from "@/components/devices/IPhoneMockup";
import { Sparkles, Zap, ShieldCheck } from "lucide-react";

interface StudioStoryProps {
  progress?: number;
}

export const StudioStory: React.FC<StudioStoryProps> = ({ progress = 0 }) => {
  // Simple, human, clear principles inspired by modern design studios (Webdrift)
  const principles = [
    {
      id: "01",
      icon: Sparkles,
      lead: "Design & Craft",
      highlight: "Design and code under one roof.",
      detail:
        "Great digital products happen when visual aesthetics and technical craft work together from day one. No awkward handoffs — just thoughtful design and clean, maintainable code.",
    },
    {
      id: "02",
      icon: Zap,
      lead: "Speed & Fluidity",
      highlight: "Fast, smooth, and delightful.",
      detail:
        "Instant page loads, smooth transitions, and tactile animations powered by Framer Motion. Every interaction is carefully tuned to feel natural across all devices.",
    },
    {
      id: "03",
      icon: ShieldCheck,
      lead: "Modern Standards",
      highlight: "Clean foundations built to last.",
      detail:
        "Modern TypeScript, scalable architecture, and maintainable standards designed to grow with your product without slowing down.",
    },
  ];

  // Active step computed from scroll progress
  const activeStep = Math.min(2, Math.floor(progress * 2.99));

  return (
    <section
      id="studio"
      data-nav="Studio"
      className="relative min-h-[220vh] w-full bg-[#EFEAE4] text-[#121211] select-none z-10 transition-colors"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden px-6 sm:px-12 md:px-16 pt-20 sm:pt-22 pb-4 sm:pb-6 flex flex-col justify-between max-w-7xl mx-auto">
        
        {/* Top Header Badge & Meta Status */}
        <div className="flex items-center justify-between border-b border-[#121211]/15 pb-3">
          <span className="font-mono text-xs uppercase tracking-wider text-[#121211]/85 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
            <span className="font-bold text-[#0284C7]">02 / Philosophy & Studio</span>
          </span>

          <span className="font-mono text-xs text-[#121211]/70 hidden sm:inline-block">
            Scroll drives reel swipe • Framer Motion
          </span>
        </div>

        {/* Main Content Stage: Shifted upwards with ample bottom breathing room */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6 lg:gap-12 items-start mt-2 sm:mt-4 mb-auto">
          
          {/* Left Column: Clean, High-Contrast Principles (shifted comfortably upward) */}
          <div className="space-y-3 sm:space-y-3.5 max-w-2xl">
            {principles.map((p, idx) => {
              const isActive = idx === activeStep;
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.id}
                  animate={{
                    scale: isActive ? 1.01 : 0.99,
                    x: isActive ? 4 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`p-4 sm:p-5 rounded-xl border transition-all duration-300 ${
                    isActive
                      ? "bg-white/95 border-[#0284C7]/50 shadow-[0_12px_28px_rgba(2,132,199,0.12)]"
                      : "bg-white/40 border-[#121211]/10 opacity-75 hover:opacity-95"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="h-4 w-4 text-[#0284C7]" />
                    <span className="font-mono text-[11px] font-bold text-[#0284C7] uppercase tracking-wider">
                      Principle {p.id} · {p.lead}
                    </span>
                  </div>

                  <h3 className="font-grotesk text-[clamp(18px,1.8vw,26px)] font-bold tracking-tight text-[#121211] leading-snug">
                    {p.highlight}
                  </h3>

                  <p className="mt-1 text-xs sm:text-sm text-[#121211]/80 font-sans leading-relaxed">
                    {p.detail}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: 3D Phone Mockup with Full Reel Swipe */}
          <div className="hidden lg:flex flex-col items-center justify-center relative pt-2">
            
            {/* Ambient Soft Glow */}
            <div
              className="absolute w-64 h-64 rounded-full bg-[#0284C7]/15 blur-3xl pointer-events-none -top-6"
              aria-hidden="true"
            />

            {/* Realistic 3D Mockup Device with full vertical reel swipe */}
            <div className="relative w-[230px] transform-gpu drop-shadow-[0_20px_45px_rgba(0,0,0,0.18)]">
              <IPhoneMockup
                projectName="Scrollr App"
                scrollProgress={progress}
                baseRotateY={-6}
                baseRotateX={4}
                className="scale-[0.84] origin-top"
              >
                <div className="relative w-full h-full bg-[#10100F] overflow-hidden select-none">
                  <Image
                    src="/projects/screens/scrollr-screen.png"
                    alt="Scrollr App Interface"
                    fill
                    sizes="230px"
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </IPhoneMockup>
            </div>

            {/* Active Reel Navigation Indicator */}
            <div className="flex items-center gap-3 mt-4 pt-2.5 font-mono text-[11px] text-[#121211]/80 border-t border-[#121211]/15">
              <span>Swipe Reel:</span>
              {[0, 1, 2].map((r) => (
                <span
                  key={r}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                    activeStep === r
                      ? "bg-[#0284C7] text-white shadow-sm"
                      : "bg-[#121211]/10 text-[#121211]/60"
                  }`}
                >
                  0{r + 1}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Meta Strip with generous margin from the 3rd principle */}
        <div className="flex items-center justify-between border-t border-[#121211]/15 pt-3 font-mono text-xs text-[#121211]/70 mt-2">
          <span>Fig. 02 · Studio Principles</span>
          <span>Core Stack: Next.js · React 19 · TypeScript · Tailwind CSS</span>
        </div>
      </div>
    </section>
  );
};
