"use client";

import React from "react";
import { MacBookProMockup } from "@/components/devices/MacBookProMockup";
import { ApproachScreenUI } from "@/components/devices/ApproachScreenUI";
import { ArrowDown, CheckCircle2 } from "lucide-react";

interface LaptopZoomPortalProps {
  progress?: number;
}

const PHASES = [
  {
    number: "01",
    label: "Design",
    headline: "System Architecture & UX",
    detail: "Thoughtful visual systems and accessible UI components designed before writing code.",
    wordLeft: "Design.",
    color: "#0284C7",
  },
  {
    number: "02",
    label: "Build",
    headline: "Full-Stack Engineering",
    detail: "Clean typed TypeScript, NestJS API gateways, Redis queues, and PostgreSQL data models.",
    wordRight: "Development.",
    color: "#059669",
  },
  {
    number: "03",
    label: "Scale",
    headline: "60 FPS Speed & Reliability",
    detail: "Sub-second LCP, 98/100 Core Web Vitals, zero downtime deploys, and tactile micro-interactions.",
    wordLeft: "Precision.",
    color: "#D97706",
  },
];

export const LaptopZoomPortal: React.FC<LaptopZoomPortalProps> = ({ progress = 0 }) => {
  // Determine active phase across scroll progress:
  // Phase 0: 0.00 -> 0.32
  // Phase 1: 0.32 -> 0.62
  // Phase 2: 0.62 -> 0.82
  // Zoom fly-through: 0.80 -> 1.00
  let activePhase = 0;
  if (progress >= 0.62) {
    activePhase = 2;
  } else if (progress >= 0.32) {
    activePhase = 1;
  }

  const currentPhaseData = PHASES[activePhase];

  // Camera zoom into laptop screen starts smoothly at 0.78 and completes at 0.98
  const zoomProgress = Math.min(1, Math.max(0, (progress - 0.76) / 0.22));
  const zoomEased = zoomProgress * zoomProgress * (3 - 2 * zoomProgress);

  // Expands laptop screen to cover full viewport edge-to-edge
  const currentScale = 1 + zoomEased * 4.2;
  const contentFadeOut = Math.max(0, 1 - zoomProgress * 3.2);
  const currentOpacity = zoomProgress > 0.95 ? Math.max(0, 1 - (zoomProgress - 0.95) / 0.05) : 1;

  return (
    <section
      id="portal"
      className="relative min-h-[300vh] w-full bg-[#EFEAE4] text-[#121211] select-none z-20 overflow-clip"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-between">
        
        {/* Top Editorial Status Strip */}
        <div
          className="relative z-30 max-w-7xl mx-auto w-full px-4 sm:px-12 md:px-16 pt-16 sm:pt-20 pb-2.5 sm:pb-3 flex items-center justify-between border-b border-[#121211]/15 transition-opacity duration-200"
          style={{ opacity: contentFadeOut }}
        >
          <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-[#0284C7] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
            <span className="uppercase tracking-wider">03 / Engineering & Approach</span>
          </div>

          {/* Right Phase Tracker (Webdrift Inspired) */}
          <div className="hidden sm:flex items-center gap-3 font-mono text-xs text-[#121211]/70">
            {PHASES.map((p, idx) => (
              <span
                key={p.number}
                className={`transition-colors ${
                  idx === activePhase ? "text-[#121211] font-bold" : "opacity-40"
                }`}
              >
                {p.number} {p.label}
              </span>
            ))}
          </div>
        </div>

        {/* Left & Right Kinetic Webdrift-Style Typography */}
        <div
          className="absolute inset-0 pointer-events-none flex items-center justify-between px-6 sm:px-12 lg:px-20 z-10 overflow-hidden"
          style={{ opacity: contentFadeOut }}
        >
          {/* Left Kinetic Word */}
          <div className="hidden lg:block -translate-y-8">
            <span
              className="font-grotesk text-[clamp(60px,8vw,120px)] font-bold tracking-tight select-none transition-all duration-300 opacity-20"
              style={{ color: currentPhaseData.color }}
            >
              {currentPhaseData.wordLeft || "Design."}
            </span>
          </div>

          {/* Right Kinetic Word */}
          <div className="hidden lg:block translate-y-16">
            <span
              className="font-grotesk text-[clamp(60px,8vw,120px)] font-bold tracking-tight select-none transition-all duration-300 opacity-20"
              style={{ color: currentPhaseData.color }}
            >
              {currentPhaseData.wordRight || "Code."}
            </span>
          </div>
        </div>

        {/* Absolute Centered Straight MacBook Pro Rig */}
        <div className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden pointer-events-none">
          <div
            className="relative w-[min(88vw,440px)] sm:w-[min(90vw,780px)] transition-transform duration-75 origin-[center_44%] will-change-transform flex items-center justify-center pointer-events-auto"
            style={{
              transform: `scale(${currentScale}) translateY(${zoomEased * 2}%)`,
              opacity: currentOpacity,
            }}
          >
            <MacBookProMockup
              projectName="Samad Kausar · Craft Terminal"
              scrollProgress={1.0}
              straight={true}
              className="drop-shadow-[0_20px_50px_rgba(0,0,0,0.18)]"
            >
              <ApproachScreenUI phase={activePhase} />
            </MacBookProMockup>
          </div>
        </div>

        {/* Narrative Craft Caption & Step Prompt (Positioned cleanly under the laptop) */}
        <div
          className="relative z-30 max-w-xl mx-auto text-center px-4 mb-3 sm:mb-16 transition-opacity duration-300 pointer-events-none"
          style={{ opacity: contentFadeOut }}
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/80 border border-[#121211]/10 font-mono text-[10px] sm:text-[11px] font-semibold text-slate-800 shadow-xs mb-1 sm:mb-2">
            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
            <span>{currentPhaseData.headline}</span>
          </div>
          <p className="text-[11px] sm:text-sm text-[#121211]/75 font-sans leading-relaxed max-w-md mx-auto line-clamp-2 sm:line-clamp-none">
            {currentPhaseData.detail}
          </p>
          <div className="mt-1.5 sm:mt-2.5 inline-flex items-center gap-1.5 sm:gap-2 font-mono text-[11px] sm:text-xs text-[#0284C7]">
            <ArrowDown className="h-3 w-3 sm:h-3.5 sm:w-3.5 animate-bounce" />
            <span>Scroll down to advance phase & zoom</span>
          </div>
        </div>

        {/* Footer Bar */}
        <div
          className="relative z-30 max-w-7xl mx-auto w-full px-4 sm:px-12 md:px-16 pb-3 sm:pb-6 pt-2 sm:pt-3 flex items-center justify-between border-t border-[#121211]/15 font-mono text-[11px] sm:text-xs text-[#121211]/70 transition-opacity duration-200"
          style={{ opacity: contentFadeOut }}
        >
          <span>Fig. 03 · Engineering Approach</span>
          <span>Next: 04 Selected Work</span>
        </div>
      </div>
    </section>
  );
};
