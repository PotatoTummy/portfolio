"use client";

import React from "react";
import { MacBookProMockup } from "@/components/devices/MacBookProMockup";
import { PortalDashboardUI } from "@/components/devices/PortalDashboardUI";
import { Monitor, ArrowDown } from "lucide-react";

interface LaptopZoomPortalProps {
  progress?: number;
}

export const LaptopZoomPortal: React.FC<LaptopZoomPortalProps> = ({ progress = 0 }) => {
  // Smooth, continuous stages:
  // Stage 1 (0.00 -> 0.28): Straight laptop lid opens upright facing user
  // Stage 2 (0.28 -> 0.70): Screen reveals genuine project dashboard
  // Stage 3 (0.50 -> 0.95): Full camera zoom into the screen to cover the entire viewport
  const zoomProgress = Math.min(1, Math.max(0, (progress - 0.28) / 0.58));
  const zoomEased = zoomProgress * zoomProgress * (3 - 2 * zoomProgress);

  // Scale factor expands laptop screen past viewport boundaries (zero side borders)
  const currentScale = 1 + zoomEased * 3.8;
  const contentFadeOut = Math.max(0, 1 - zoomProgress * 2.8);
  const currentOpacity = zoomProgress > 0.94 ? Math.max(0, 1 - (zoomProgress - 0.94) / 0.06) : 1;

  return (
    <section
      id="portal"
      className="relative min-h-[240vh] w-full bg-[#EFEAE4] text-[#121211] select-none z-20 overflow-clip"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-between">
        
        {/* Top Editorial Bar */}
        <div
          className="relative z-30 max-w-7xl mx-auto w-full px-6 sm:px-12 md:px-16 pt-20 pb-3 flex items-center justify-between border-b border-[#121211]/15 transition-opacity duration-200"
          style={{ opacity: contentFadeOut }}
        >
          <div className="flex items-center gap-2 font-mono text-xs text-[#0284C7] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
            <span className="uppercase tracking-wider">03 / Interactive Preview</span>
          </div>

          <div className="font-mono text-xs text-[#121211]/70 hidden sm:flex items-center gap-2">
            <Monitor className="h-3.5 w-3.5 text-[#0284C7]" />
            <span>Production Dashboard · Interactive Interface</span>
          </div>
        </div>

        {/* Absolute Centered Zooming Laptop Rig (Centers directly across full 100vw x 100vh) */}
        <div className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden pointer-events-none">
          <div
            className="relative w-[min(90vw,780px)] transition-transform duration-75 origin-[center_42%] will-change-transform flex items-center justify-center pointer-events-auto"
            style={{
              transform: `scale(${currentScale}) translateY(${zoomEased * 2}%)`,
              opacity: currentOpacity,
            }}
          >
            <MacBookProMockup
              projectName="Enterprise Core Systems"
              scrollProgress={1.0}
              straight={true}
              className="drop-shadow-[0_20px_50px_rgba(0,0,0,0.18)]"
            >
              <PortalDashboardUI />
            </MacBookProMockup>
          </div>
        </div>

        {/* Introductory Headline & Scroll Cue (Fades out cleanly as camera zooms) */}
        <div
          className="relative z-30 max-w-xl mx-auto text-center px-4 mb-16 transition-opacity duration-300 pointer-events-none"
          style={{ opacity: contentFadeOut }}
        >
          <h2 className="font-grotesk text-3xl sm:text-4xl font-medium tracking-tight text-[#121211]">
            Inside the Work
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-[#121211]/75 font-sans">
            Scroll down to explore production interfaces and dive into selected projects.
          </p>
          <div className="mt-3.5 inline-flex items-center gap-2 font-mono text-xs text-[#0284C7]">
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
            <span>Scroll to explore projects</span>
          </div>
        </div>

        {/* Footer Bar */}
        <div
          className="relative z-30 max-w-7xl mx-auto w-full px-6 sm:px-12 md:px-16 pb-6 pt-3 flex items-center justify-between border-t border-[#121211]/15 font-mono text-xs text-[#121211]/70 transition-opacity duration-200"
          style={{ opacity: contentFadeOut }}
        >
          <span>Fig. 03 · Hardware Showcase</span>
          <span>Next: Selected Work & Case Studies</span>
        </div>
      </div>
    </section>
  );
};
