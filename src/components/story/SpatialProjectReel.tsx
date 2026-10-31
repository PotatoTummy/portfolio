"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { FEATURED_PROJECTS, Project } from "@/data/portfolioData";
import { MacBookProMockup } from "@/components/devices/MacBookProMockup";
import { IPhoneMockup } from "@/components/devices/IPhoneMockup";
import { DualPhoneStage } from "@/components/devices/DualPhoneStage";
import { ReelIntermission } from "@/components/story/ReelIntermission";
import { 
  NestysScreen, 
  ScrollrScreen, 
  WoKataaScreen, 
  EarthAirScreen, 
  UrbanArenaScreen 
} from "@/components/devices/RealisticScreenUI";
import { useSectionScroll } from "@/hooks/useSectionScroll";
import { ArrowRight, ExternalLink, ChevronDown, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";

const FullViewportProjectSection: React.FC<{ project: Project; idx: number }> = ({ project, idx }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollProgress = useSectionScroll(sectionRef);

  const reelNumber = String(idx + 2).padStart(2, "0");

  // Entrance & Exit Transitions (Prevents abrupt collision between projects)
  const fadeIn = Math.min(1, Math.max(0, scrollProgress / 0.12));
  const fadeOut = Math.min(1, Math.max(0, (1 - scrollProgress) / 0.14));
  const containerOpacity = Math.min(fadeIn, fadeOut);

  // Two-Phase Scroll Transition:
  // Phase 1 (0.12 -> 0.42): Full-screen 3D hardware focus. Title is visible.
  // Transition (0.42 -> 0.62): Title fades out, device scales to top half, details card slides up into bottom half.
  // Phase 2 (0.62 -> 0.86): Zero overlap! Device sits in upper half, details card sits in lower half.
  // Phase 3 (0.86 -> 1.00): Smooth fade out into the Reel Intermission separator.
  const phase2Ratio = Math.min(1, Math.max(0, (scrollProgress - 0.42) / 0.22));
  const easeOutQuad = (x: number) => 1 - (1 - x) * (1 - x);
  const smoothedPhase2 = easeOutQuad(phase2Ratio);

  // Header Title Fades Out in Phase 2 to prevent any overlap
  const titleOpacity = Math.max(0, 1 - smoothedPhase2 * 1.8);

  // Device scales and shifts to the upper half in Phase 2
  const deviceScale = 1.02 - smoothedPhase2 * 0.28;
  const deviceTranslateY = -smoothedPhase2 * 70;

  const renderHardwareDevice = () => {
    switch (project.slug) {
      case "nestys":
        return (
          <MacBookProMockup
            projectName={project.title}
            scrollProgress={scrollProgress}
            videoUrl={project.media?.videoUrl}
            screenshotUrl={project.media?.screenshotUrl}
          >
            <NestysScreen scrollProgress={scrollProgress} />
          </MacBookProMockup>
        );

      case "scrollr":
        return (
          <DualPhoneStage
            mode="staggered"
            scrollProgress={scrollProgress}
            primaryProjectName="Scrollr Reel Player"
            secondaryProjectName="Scrollr Algoless Feed"
            primaryChild={<ScrollrScreen scrollProgress={scrollProgress} />}
            secondaryChild={<ScrollrScreen scrollProgress={scrollProgress} />}
          />
        );

      case "wokataa":
        return (
          <DualPhoneStage
            mode="clash"
            scrollProgress={scrollProgress}
            primaryProjectName="WoKataa Player 1"
            secondaryProjectName="WoKataa Player 2"
            primaryChild={<WoKataaScreen scrollProgress={scrollProgress} />}
            secondaryChild={<WoKataaScreen scrollProgress={scrollProgress} />}
          />
        );

      case "earth-air":
        return (
          <MacBookProMockup
            projectName={project.title}
            scrollProgress={scrollProgress}
            videoUrl={project.media?.videoUrl}
            screenshotUrl={project.media?.screenshotUrl}
          >
            <EarthAirScreen scrollProgress={scrollProgress} />
          </MacBookProMockup>
        );

      case "urban-arena":
      default:
        return (
          <MacBookProMockup
            projectName={project.title}
            scrollProgress={scrollProgress}
            videoUrl={project.media?.videoUrl}
            screenshotUrl={project.media?.screenshotUrl}
          >
            <UrbanArenaScreen scrollProgress={scrollProgress} />
          </MacBookProMockup>
        );
    }
  };

  return (
    <section
      ref={sectionRef}
      id={project.slug}
      data-chap={`Reel ${reelNumber} · ${project.shortName}`}
      className="relative h-[260vh] w-full"
    >
      {/* 100svh Sticky Pinned Full-Viewport Stage */}
      <div
        className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-between items-center px-4 sm:px-8 py-4 sm:py-6 select-none transition-opacity duration-300"
        style={{ opacity: containerOpacity }}
      >
        {/* Background Ambient Color Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full blur-[130px] pointer-events-none opacity-20 transition-opacity duration-500"
          style={{ backgroundColor: project.accentColor }}
        />

        {/* Phase 1 Header Title (Fades Out in Phase 2 to Prevent ANY Overlap) */}
        <header
          className="relative z-30 w-full max-w-4xl mx-auto flex flex-col items-center text-center space-y-1 transition-all duration-300 pointer-events-none"
          style={{
            opacity: titleOpacity,
            transform: `translate3d(0, ${-smoothedPhase2 * 30}px, 0)`,
          }}
        >
          <div className="inline-flex items-center gap-2 font-mono text-[11px] text-zinc-400">
            <span
              className="px-2.5 py-0.5 rounded-full border font-semibold"
              style={{
                borderColor: `${project.accentColor}40`,
                backgroundColor: `${project.accentColor}15`,
                color: project.accentColor,
              }}
            >
              Reel {reelNumber} · {project.category}
            </span>
            <span>•</span>
            <span>{project.timeline}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight leading-none">
            {project.title}
          </h2>

          <p className="font-sans text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto truncate">
            {project.tagline}
          </p>
        </header>

        {/* Central 3D Hardware Stage (Partitioned in Upper Half during Phase 2) */}
        <div
          className="relative z-20 w-full flex-1 flex items-center justify-center transition-all duration-300 will-change-transform"
          style={{
            transform: `translate3d(0, ${deviceTranslateY}px, 0) scale(${deviceScale})`,
          }}
        >
          <div className="w-full max-w-3xl px-2">
            {renderHardwareDevice()}
          </div>
        </div>

        {/* Phase 1 Scroll Cue */}
        <div
          className="relative z-20 flex flex-col items-center gap-1 text-[10px] font-mono text-zinc-400 transition-opacity duration-200"
          style={{ opacity: Math.max(0, 1 - smoothedPhase2 * 3) }}
        >
          <span>Scroll down for architecture details</span>
          <ChevronDown className="h-3 w-3 animate-bounce text-[#FF5533]" />
        </div>

        {/* Phase 2: Project Details Card (Cleanly Partitioned in Lower Half - No Overlap!) */}
        <div
          className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 right-4 sm:right-8 z-30 max-w-4xl mx-auto p-4 sm:p-6 rounded-2xl bg-[#0B0B0A]/95 backdrop-blur-2xl border border-white/[0.14] shadow-[0_20px_50px_rgba(0,0,0,0.95)] transition-all duration-300 ease-out"
          style={{
            transform: `translate3d(0, ${(1 - smoothedPhase2) * 115}%, 0)`,
            opacity: smoothedPhase2,
            pointerEvents: smoothedPhase2 > 0.4 ? "auto" : "none",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Left: Summary & Role */}
            <div className="md:col-span-7 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#FF5533] uppercase font-bold">
                  {project.shortName} System Design
                </span>
                <span className="text-zinc-500">•</span>
                <span className="text-[11px] font-mono text-zinc-400">{project.whereToSee}</span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans line-clamp-2">
                {project.overview}
              </p>

              <div className="p-2 rounded-lg border border-white/[0.08] bg-white/[0.02] text-xs font-mono text-zinc-300 flex items-center gap-2">
                <span className="text-zinc-400 shrink-0">My Role:</span>
                <span className="text-white font-medium truncate">{project.role}</span>
              </div>
            </div>

            {/* Right: Key Metrics & Case Study Link */}
            <div className="md:col-span-5 space-y-3 md:border-l md:border-white/[0.08] md:pl-4">
              <div className="grid grid-cols-3 gap-1.5">
                {project.metrics.map((metric, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-1.5 rounded-lg border border-white/[0.06] bg-black/60 text-center"
                  >
                    <div className="text-xs sm:text-sm font-mono font-bold text-white">
                      {metric.value}
                    </div>
                    <div className="text-[8px] text-zinc-400 truncate mt-0.5">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-0.5">
                <Link
                  href={`/projects/${project.slug}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#FF5533] px-4 py-2 text-xs font-bold text-[#0B0B0A] hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,85,51,0.3)]"
                >
                  <span>Full Case Study</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 hover:text-white transition-colors"
                    title="Live Site"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 hover:text-white transition-colors"
                    title="GitHub Repository"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const SpatialProjectReel: React.FC = () => {
  return (
    <div id="projects" className="w-full">
      {FEATURED_PROJECTS.map((project, idx) => {
        const nextProject = FEATURED_PROJECTS[idx + 1];
        const reelNumber = String(idx + 2).padStart(2, "0");
        const nextReelNumber = String(idx + 3).padStart(2, "0");

        return (
          <React.Fragment key={project.id}>
            {/* The Full-Viewport Single Project Experience */}
            <FullViewportProjectSection project={project} idx={idx} />

            {/* Clear Intermission Spacer Between Projects */}
            {nextProject && (
              <ReelIntermission
                completedReelNumber={reelNumber}
                nextReelNumber={nextReelNumber}
                nextProjectTitle={nextProject.title}
                nextCategory={nextProject.category}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
