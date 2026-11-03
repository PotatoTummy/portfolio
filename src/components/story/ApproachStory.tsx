"use client";

import React from "react";

interface ApproachStoryProps {
  progress?: number;
  activeStep?: number;
}

export const APPROACH_STEPS = [
  {
    badge: "01 Architect",
    desc: "Data flow, queues, and caching decided before the first component.",
  },
  {
    badge: "02 Build",
    desc: "Typed, composable interfaces with motion only where it adds meaning.",
  },
  {
    badge: "03 Tune",
    desc: "Bundles, vitals, and frame rates are measured, not assumed.",
  },
  {
    badge: "04 Ship",
    desc: "Automated pipelines, so every release is uneventful.",
  },
];

export const ApproachStory: React.FC<ApproachStoryProps> = ({
  progress = 0,
  activeStep = 0,
}) => {
  // Portal zoom effect at the end of the approach section
  const clampedPortal = Math.min(1, Math.max(0, (progress - 0.78) / 0.22));
  const portalEased = clampedPortal * clampedPortal * (3 - 2 * clampedPortal);
  const currentStep = APPROACH_STEPS[activeStep] || APPROACH_STEPS[0];

  return (
    <section id="approach" data-nav="Approach" className="relative h-[540vh] w-full bg-[#0B0B0A] select-none z-10">
      <div className="sticky top-0 h-[100svh] overflow-hidden px-4 sm:px-8 md:px-12">
        {/* Giant Drifting Typography */}
        <div
          className="absolute left-4 sm:left-8 md:left-12 top-[12vh] font-grotesk font-medium text-[clamp(70px,13vw,220px)] leading-[0.85] text-white whitespace-nowrap pointer-events-none transition-transform duration-75"
          style={{ transform: `translateX(${(progress - 0.5) * -11}vw)` }}
        >
          Frontend
        </div>

        <div
          className="absolute right-4 sm:right-8 md:right-12 bottom-[8vh] font-grotesk font-medium text-[clamp(70px,13vw,220px)] leading-[0.85] text-[#FF5533] whitespace-nowrap pointer-events-none transition-transform duration-75"
          style={{ transform: `translateX(${(progress - 0.5) * 11}vw)` }}
        >
          Backend
        </div>

        {/* Right Mono Step Index */}
        <ol className="hidden sm:grid gap-2 absolute right-4 sm:right-8 md:right-12 top-[16vh] text-right font-mono text-xs z-20">
          {APPROACH_STEPS.map((s, idx) => (
            <li
              key={idx}
              className={`transition-colors duration-200 ${
                idx === activeStep ? "text-white font-semibold" : "text-white/35"
              }`}
            >
              {s.badge} {idx === activeStep && <span className="text-[#FF5533] ml-1">&rarr;</span>}
            </li>
          ))}
        </ol>

        {/* Bottom Left Active Step Text */}
        <div className="absolute left-4 sm:left-8 md:left-12 bottom-[10vh] w-[min(340px,46vw)] text-[14.5px] leading-relaxed z-20">
          <h3 className="font-mono text-xs text-[#FF5533] mb-2">{currentStep.badge}</h3>
          <p className="text-zinc-400">{currentStep.desc}</p>
        </div>

        {/* Pinned Screen Portal Overlay Expanding into the Cream Work Section */}
        <div
          className="absolute inset-0 bg-[#EFEAE4] z-10 pointer-events-none transition-opacity duration-150"
          style={{
            opacity: clampedPortal > 0.001 ? 1 : 0,
            clipPath: `inset(${46 * (1 - portalEased)}% ${44 * (1 - portalEased)}% ${46 * (1 - portalEased)}% ${44 * (1 - portalEased)}%)`,
          }}
        />
      </div>
    </section>
  );
};

