"use client";

import React, { useRef } from "react";
import { FEATURED_PROJECTS, Project } from "@/data/portfolioData";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { InteractiveProjectStage } from "@/components/story/InteractiveProjectStage";
import { ProjectArtworkBackdrop } from "@/components/story/backgrounds/ProjectArtworkBackdrop";
import { ArrowDown } from "lucide-react";

interface WorkStoryProps {
  progress?: number;
}

// Lively, light-toned studio aesthetic themes for each project in the gallery
const PROJECT_THEMES: Record<
  string,
  {
    bgBase: string;
    glowPrimary: string;
    glowSecondary: string;
    titleColor: string;
    taglineColor: string;
    badgeBg: string;
    badgeBorder: string;
    badgeText: string;
    switcherActiveBg: string;
    dividerColor: string;
    footerText: string;
  }
> = {
  nestys: {
    bgBase: "#F1F7FC",
    glowPrimary: "rgba(0, 212, 255, 0.38)",
    glowSecondary: "rgba(37, 99, 235, 0.16)",
    titleColor: "#0A192F",
    taglineColor: "#334155",
    badgeBg: "rgba(0, 212, 255, 0.12)",
    badgeBorder: "rgba(0, 212, 255, 0.35)",
    badgeText: "#0284C7",
    switcherActiveBg: "rgba(2, 132, 199, 0.15)",
    dividerColor: "rgba(10, 25, 47, 0.12)",
    footerText: "#475569",
  },
  scrollr: {
    bgBase: "#FFF8F2",
    glowPrimary: "rgba(245, 158, 11, 0.40)",
    glowSecondary: "rgba(244, 63, 94, 0.18)",
    titleColor: "#1C1917",
    taglineColor: "#44403C",
    badgeBg: "rgba(245, 158, 11, 0.14)",
    badgeBorder: "rgba(245, 158, 11, 0.35)",
    badgeText: "#B45309",
    switcherActiveBg: "rgba(245, 158, 11, 0.18)",
    dividerColor: "rgba(28, 25, 23, 0.12)",
    footerText: "#57534E",
  },
  wokataa: {
    bgBase: "#F0FAF5",
    glowPrimary: "rgba(16, 185, 129, 0.38)",
    glowSecondary: "rgba(20, 184, 166, 0.18)",
    titleColor: "#06281E",
    taglineColor: "#1E3A2F",
    badgeBg: "rgba(16, 185, 129, 0.14)",
    badgeBorder: "rgba(16, 185, 129, 0.35)",
    badgeText: "#059669",
    switcherActiveBg: "rgba(16, 185, 129, 0.16)",
    dividerColor: "rgba(6, 40, 30, 0.12)",
    footerText: "#335C4D",
  },
  "earth-air": {
    bgBase: "#F2F9FD",
    glowPrimary: "rgba(2, 132, 199, 0.36)",
    glowSecondary: "rgba(234, 179, 8, 0.22)",
    titleColor: "#082F49",
    taglineColor: "#1E293B",
    badgeBg: "rgba(2, 132, 199, 0.12)",
    badgeBorder: "rgba(2, 132, 199, 0.35)",
    badgeText: "#0369A1",
    switcherActiveBg: "rgba(2, 132, 199, 0.15)",
    dividerColor: "rgba(8, 47, 73, 0.12)",
    footerText: "#475569",
  },
  "urban-arena": {
    bgBase: "#F2FAF4",
    glowPrimary: "rgba(34, 197, 94, 0.38)",
    glowSecondary: "rgba(132, 204, 22, 0.20)",
    titleColor: "#052E16",
    taglineColor: "#14532D",
    badgeBg: "rgba(34, 197, 94, 0.14)",
    badgeBorder: "rgba(34, 197, 94, 0.35)",
    badgeText: "#15803D",
    switcherActiveBg: "rgba(34, 197, 94, 0.16)",
    dividerColor: "rgba(5, 46, 22, 0.12)",
    footerText: "#2B5E3C",
  },
};

const ENGINEERING_RECEIPTS: Record<
  string,
  { problem: string; decision: string; result: string }
> = {
  nestys: {
    problem: "Real-time sync across 3 portals without catalog contention",
    decision: "NestJS microservices + BullMQ job queues + ElastiCache Redis",
    result: "Sub-50ms sync; 0 lag during bulk CSV catalog imports",
  },
  scrollr: {
    problem: "2,500+ vertical reels stuttering on mid-range Android devices",
    decision: "Virtual list windowing (5 active DOM nodes) + expo-video prefetch",
    result: "Rock-solid 60 FPS; Fastify proxy with SSRF guard & byte-range streaming",
  },
  wokataa: {
    problem: "Cross-continent move synchronization with jitter spikes",
    decision: "Socket.IO + Ably Cloud dual-transport with optimistic rollback",
    result: "<40ms round-trip latency; zero desync complaints in production",
  },
  "earth-air": {
    problem: "Bloated 1.8MB WordPress page builder with 4s LCP score",
    decision: "Custom semantic theme + automated FTPS deploy via GitHub Actions",
    result: "98/100 Core Web Vitals; sub-800ms initial paint; automated CI/CD",
  },
  "urban-arena": {
    problem: "Concurrent booking requests causing double-reserved court slots",
    decision: "Redis distributed locking (SET NX with TTL) on checkout write path",
    result: "Zero double-bookings; instant digital QR pass validation",
  },
};

// Smooth Hermite interpolation: 0 -> 1 with smooth acceleration & deceleration
function smoothstep(min: number, max: number, value: number): number {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export const WorkStory: React.FC<WorkStoryProps> = ({ progress = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const totalProjects = FEATURED_PROJECTS.length;

  // Transition windows with generous dwell time for all projects,
  // especially Urban Arena which stays locked from 0.80 all the way to 1.00!
  // Slide 0 (Nestys): Dwells from 0.00 to 0.16
  // Slide 1 (Scrollr): Wipes in [0.16, 0.24], dwells until 0.36
  // Slide 2 (WoKataa): Wipes in [0.36, 0.44], dwells until 0.56
  // Slide 3 (Earth Air): Wipes in [0.56, 0.64], dwells until 0.74
  // Slide 4 (Urban Arena): Wipes in [0.74, 0.82], dwells until 1.00 (generous locked window!)
  const reveals = [
    1, // Project 0 is always base
    smoothstep(0.16, 0.24, progress),
    smoothstep(0.36, 0.44, progress),
    smoothstep(0.56, 0.64, progress),
    smoothstep(0.74, 0.82, progress),
  ];

  // Active index determination for navigation highlights
  let activeIndex = 0;
  if (progress >= 0.78) {
    activeIndex = 4;
  } else if (progress >= 0.58) {
    activeIndex = 3;
  } else if (progress >= 0.38) {
    activeIndex = 2;
  } else if (progress >= 0.18) {
    activeIndex = 1;
  }

  // Smooth jump to specific project when clicking top pill
  const scrollToProject = (targetIdx: number) => {
    const el = document.getElementById("work-scroll-container");
    if (!el) return;
    const targets = [0.08, 0.28, 0.48, 0.68, 0.88];
    const targetProg = targets[targetIdx] ?? 0;
    const rect = el.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const scrollRange = el.offsetHeight - window.innerHeight;
    const destination = scrollTop + targetProg * scrollRange;
    window.scrollTo({ top: destination, behavior: "smooth" });
  };

  return (
    <div id="work" data-nav="Work" className="relative w-full bg-[#0B0B0A] text-[#F3F3EE] select-none">
      
      {/* Selected Work Editorial Header Banner */}
      <section className="bg-[#EFEAE4] text-[#121211] py-16 sm:py-20 px-6 sm:px-12 md:px-16 z-20 relative border-t border-[#121211]/15">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 max-w-7xl mx-auto">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#0284C7] font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
              <span>04 / Selected Work</span>
            </div>
            <h2 className="font-grotesk text-[clamp(44px,7vw,100px)] font-medium leading-[0.92] text-[#0284C7] tracking-tight">
              Selected work
            </h2>
          </div>
          <p className="max-w-[380px] text-sm sm:text-base leading-relaxed text-[#121211]/80 font-sans">
            Scroll to explore featured projects — with live production interfaces, custom systems, and interactive 3D hardware stages.
          </p>
        </div>
      </section>

      {/* Pinned Screen Container: Page stays pinned while content wipes in place */}
      <div
        id="work-scroll-container"
        ref={containerRef}
        className="relative min-h-[500vh] w-full bg-[#EFEAE4]"
      >
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          
          {/* Stacked Project Slides with Vertical Wipe & Lively Luminous Studio Backdrops */}
          {FEATURED_PROJECTS.map((project: Project, idx: number) => {
            const reveal = reveals[idx] ?? 0;
            const theme = PROJECT_THEMES[project.slug] || PROJECT_THEMES["nestys"];

            return (
              <div
                key={project.id}
                className="absolute inset-0 overflow-hidden will-change-[clip-path] transform-gpu transition-colors"
                style={{
                  zIndex: idx,
                  clipPath: `inset(${(1 - reveal) * 100}% 0 0 0)`,
                  backgroundColor: theme.bgBase,
                }}
              >
                {/* Lively Luminous Ambient Studio Lighting Backdrops */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `
                      radial-gradient(ellipse 70% 65% at 75% 42%, ${theme.glowPrimary} 0%, transparent 60%),
                      radial-gradient(ellipse 55% 50% at 20% 65%, ${theme.glowSecondary} 0%, transparent 55%),
                      radial-gradient(circle at 50% 10%, rgba(255,255,255,0.85) 0%, transparent 60%)
                    `,
                  }}
                  aria-hidden="true"
                />

                {/* Subtle Modern Studio Micro-Grid & Architectural Texture */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-40"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, ${theme.dividerColor} 1px, transparent 1px),
                      linear-gradient(to bottom, ${theme.dividerColor} 1px, transparent 1px)
                    `,
                    backgroundSize: "64px 64px",
                  }}
                  aria-hidden="true"
                />

                {/* Bespoke Project Vector Artwork & Blueprint Guides */}
                <ProjectArtworkBackdrop slug={project.slug} />

                {/* Soft Readability Scrim for High Typography Contrast */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, ${theme.bgBase} 0%, ${theme.bgBase}D9 45%, transparent 100%)`,
                  }}
                />

                {/* Slide Inner Viewport Layout */}
                <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 sm:px-12 md:px-16 pt-14 sm:pt-20 pb-3 sm:pb-6 flex flex-col justify-between">
                  
                  {/* Top Editorial Status Strip */}
                  <div
                    className="flex items-center justify-between pb-2 sm:pb-3 border-b"
                    style={{ borderColor: theme.dividerColor }}
                  >
                    {/* Project Counter */}
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span
                        className="font-mono text-sm sm:text-base font-bold tracking-wider"
                        style={{ color: theme.titleColor }}
                      >
                        0{idx + 1}
                        <span className="font-normal opacity-50"> / 0{totalProjects}</span>
                      </span>

                      <span
                        className="w-px h-3.5"
                        style={{ backgroundColor: theme.dividerColor }}
                      />

                      <span
                        className="px-2.5 sm:px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-semibold border backdrop-blur-md truncate max-w-[140px] sm:max-w-none"
                        style={{
                          borderColor: theme.badgeBorder,
                          backgroundColor: theme.badgeBg,
                          color: theme.badgeText,
                        }}
                      >
                        {project.category}
                      </span>
                    </div>

                    {/* Quick Project Switcher Pills: Mobile Dots / Numbers */}
                    <div className="flex md:hidden items-center gap-1 p-0.5 rounded-lg bg-white/70 border border-slate-200/80 shadow-xs backdrop-blur-md font-mono text-[10px]">
                      {FEATURED_PROJECTS.map((p, pIdx) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => scrollToProject(pIdx)}
                          className={`w-5 h-5 flex items-center justify-center rounded transition-all cursor-pointer ${
                            pIdx === activeIndex
                              ? "bg-slate-900 text-white font-bold"
                              : "text-slate-600 hover:bg-slate-100"
                          }`}
                          aria-label={`Jump to ${p.title}`}
                        >
                          {pIdx + 1}
                        </button>
                      ))}
                    </div>

                    {/* Quick Project Switcher Pills: Desktop */}
                    <div className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-white/70 border border-slate-200/80 shadow-xs backdrop-blur-md font-mono text-xs">
                      {FEATURED_PROJECTS.map((p, pIdx) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => scrollToProject(pIdx)}
                          className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                            pIdx === activeIndex
                              ? "bg-slate-900 text-white font-bold shadow-xs"
                              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                          }`}
                        >
                          {p.shortName}
                        </button>
                      ))}
                    </div>

                    {/* Timeline */}
                    <span
                      className="hidden sm:inline-block font-mono text-xs font-medium"
                      style={{ color: theme.footerText }}
                    >
                      {project.timeline}
                    </span>
                  </div>

                  {/* Main Two-Column Stage */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-8 lg:gap-12 items-center my-auto">
                    
                    {/* Left Column: Minimal Project Story & Action */}
                    <div className="lg:col-span-6 space-y-2 sm:space-y-4">
                      {/* Project Title */}
                      <h3
                        className="font-grotesk text-[clamp(24px,5.5vw,64px)] font-medium leading-[0.96] tracking-tight transition-transform duration-100"
                        style={{
                          color: theme.titleColor,
                          transform: `translateY(${(1 - reveal) * 30}px)`,
                        }}
                      >
                        {project.title}
                      </h3>

                      {/* Minimal 1-Sentence Summary */}
                      <p
                        className="text-xs sm:text-lg font-sans font-normal leading-relaxed max-w-lg line-clamp-2 sm:line-clamp-none"
                        style={{ color: theme.taglineColor }}
                      >
                        {project.tagline}
                      </p>

                      {/* Tech Stack Badges */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-0.5 pb-1 sm:pt-1 sm:pb-2">
                        {project.techStack.slice(0, 4).map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-md bg-white/80 border border-slate-200/90 text-[10px] sm:text-xs font-mono font-medium text-slate-800 shadow-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Hard Problem → Decision → Result Receipts */}
                      {ENGINEERING_RECEIPTS[project.slug] && (
                        <div
                          className="p-2.5 sm:p-3 rounded-lg border text-[10px] sm:text-[11px] font-mono leading-tight space-y-1.5 backdrop-blur-xs"
                          style={{
                            borderColor: theme.dividerColor,
                            backgroundColor: "rgba(255,255,255,0.7)",
                            color: theme.taglineColor,
                          }}
                        >
                          <div className="flex items-center gap-1.5 font-semibold text-slate-900 text-[10px] uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>Engineering Receipt</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-0.5 text-[9px] sm:text-[10px]">
                            <div>
                              <span className="font-semibold text-slate-800 block text-[9px] uppercase tracking-wide opacity-60">Problem</span>
                              <span>{ENGINEERING_RECEIPTS[project.slug].problem}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-slate-800 block text-[9px] uppercase tracking-wide opacity-60">Decision</span>
                              <span className="text-slate-900 font-medium">→ {ENGINEERING_RECEIPTS[project.slug].decision}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-emerald-700 block text-[9px] uppercase tracking-wide">Result</span>
                              <span className="font-semibold text-emerald-800">{ENGINEERING_RECEIPTS[project.slug].result}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action CTAs with Magnetic Liquid Button */}
                      <div className="pt-1 sm:pt-2 flex items-center gap-3 sm:gap-4">
                        <LiquidButton
                          href={`/projects/${project.slug}`}
                          variant="accent"
                          accentColor={project.accentColor}
                          className="px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm shadow-md"
                        >
                          View Project Case Study
                        </LiquidButton>

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-[11px] sm:text-xs font-semibold text-slate-800 hover:text-black transition-colors underline decoration-slate-400 underline-offset-4"
                          >
                            Live Site ↗
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right Column: 3D Mouse-Tilt Hardware Device with Generated UI Screen */}
                    <div className="lg:col-span-6 flex items-center justify-center">
                      <InteractiveProjectStage project={project} index={idx} />
                    </div>
                  </div>

                  {/* Bottom Strip: Role & Scroll Cue */}
                  <div
                    className="flex items-center justify-between border-t pt-1.5 sm:pt-2 font-mono text-[10px] sm:text-[11px]"
                    style={{ borderColor: theme.dividerColor, color: theme.footerText }}
                  >
                    <span className="truncate max-w-[180px] sm:max-w-none">Role: {project.role}</span>
                    <span className="flex items-center gap-1.5 opacity-80 shrink-0">
                      <span>{idx === totalProjects - 1 ? "Scroll to contact" : "Next project"}</span>
                      <ArrowDown className="h-3 w-3 animate-bounce" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
