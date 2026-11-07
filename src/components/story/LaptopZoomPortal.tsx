"use client";

import React from "react";
import { motion } from "framer-motion";
import { MacBookProMockup } from "@/components/devices/MacBookProMockup";
import { PortalDashboardUI } from "@/components/devices/PortalDashboardUI";
import { Monitor, ArrowDown } from "lucide-react";

interface LaptopZoomPortalProps {
  progress?: number;
}

export const LaptopZoomPortal: React.FC<LaptopZoomPortalProps> = ({ progress = 0 }) => {
  // Smooth, continuous stages:
  // Stage 1 (0.00 -> 0.40): Straight laptop lid opens upright facing user
  // Stage 2 (0.35 -> 0.70): Screen reveals genuine project dashboard
  // Stage 3 (0.60 -> 1.00): Smooth camera zoom into the selected work
  const zoomProgress = Math.min(1, Math.max(0, (progress - 0.45) / 0.48));
  const zoomEased = zoomProgress * zoomProgress * (3 - 2 * zoomProgress);

  const currentScale = 1 + zoomEased * 2.0;
  const currentOpacity = zoomProgress > 0.92 ? Math.max(0, 1 - (zoomProgress - 0.92) / 0.08) : 1;

  return (
    <section
      id="portal"
      className="relative min-h-[220vh] w-full bg-[#EFEAE4] text-[#121211] select-none z-20 overflow-clip"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden px-6 sm:px-12 md:px-16 pt-20 pb-6 flex flex-col justify-between max-w-7xl mx-auto">
        
        {/* Top Editorial Bar */}
        <div
          className="flex items-center justify-between border-b border-[#121211]/15 pb-3 transition-opacity duration-200"
          style={{ opacity: Math.max(0, 1 - zoomProgress * 2.2) }}
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

        {/* Main Center Stage: Straight Laptop with Scroll-Driven Lid Opening & Screen Zoom */}
        <div className="my-auto flex flex-col items-center justify-center w-full">
          
          {/* Introductory Headline (Fades out as camera zooms) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: Math.max(0, 1 - zoomProgress * 2), y: -zoomProgress * 25 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-5 max-w-xl"
          >
            <h2 className="font-grotesk text-3xl sm:text-4xl font-medium tracking-tight text-[#121211]">
              Inside the Work
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#121211]/75 font-sans">
              Scroll down to explore production interfaces and dive into selected projects.
            </p>
          </motion.div>

          {/* The Zooming Laptop Container - Perfectly Straight, Centered */}
          <div
            className="relative w-full max-w-[780px] transition-transform duration-75 origin-[center_46%] will-change-transform flex items-center justify-center"
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

          {/* Scroll Cue Indicator */}
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mt-5 flex items-center gap-2 font-mono text-xs text-[#0284C7] transition-opacity duration-300"
            style={{ opacity: Math.max(0, 1 - zoomProgress * 3) }}
          >
            <ArrowDown className="h-3.5 w-3.5" />
            <span>Scroll to explore projects</span>
          </motion.div>
        </div>

        {/* Footer Bar */}
        <div
          className="flex items-center justify-between border-t border-[#121211]/15 pt-3 font-mono text-xs text-[#121211]/70 transition-opacity duration-200"
          style={{ opacity: Math.max(0, 1 - zoomProgress * 2.2) }}
        >
          <span>Fig. 03 · Hardware Showcase</span>
          <span>Next: Selected Work & Case Studies</span>
        </div>
      </div>
    </section>
  );
};
