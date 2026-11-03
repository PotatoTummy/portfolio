"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { FEATURED_PROJECTS, Project } from "@/data/portfolioData";
import { MacBookProMockup } from "@/components/devices/MacBookProMockup";
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
import { ArrowRight, ExternalLink, ChevronDown } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";

const FullViewportProjectSection: React.FC<{ project: Project; idx: number }> = ({ project, idx }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollProgress = useSectionScroll(sectionRef);

  const reelNumber = String(idx + 2).padStart(2, "0");

  const clamp = (value: number) => Math.min(1, Math.max(0, value));
  const ease = (value: number) => 1 - Math.pow(1 - clamp(value), 3);

  // Every scroll segment advances the project rather than simply moving content.
  // The device goes from an object of curiosity to a proof of the underlying system.
  const storyProgress = clamp((scrollProgress - 0.16) / 0.58);
  const activeBeat = Math.min(3, Math.floor(storyProgress * 4));
  const reveal = ease(storyProgress / 0.28);
  const inspect = ease((storyProgress - 0.26) / 0.28);
  const prove = ease((storyProgress - 0.52) / 0.24);
  const handoff = ease((storyProgress - 0.74) / 0.22);

  const beats = [
    { id: "01", label: "Initialize", detail: "A system with a point of view" },
    { id: "02", label: "Interact", detail: "The interface responds in real time" },
    { id: "03", label: "Prove", detail: "The engineering carries the experience" },
    { id: "04", label: "Handoff", detail: "Open the full case study" },
  ];

  // Entrance & exit transitions keep adjacent case studies from visually colliding.
  const fadeIn = Math.min(1, Math.max(0, scrollProgress / 0.12));
  const fadeOut = Math.min(1, Math.max(0, (1 - scrollProgress) / 0.14));
  const containerOpacity = Math.min(fadeIn, fadeOut);
  const projectSide = idx % 2 === 0 ? -1 : 1;
  const deviceScale = 0.72 + reveal * 0.32 - handoff * 0.17;
  const deviceTranslateX = projectSide * inspect * 9;
  // Reserve the lower third for the proof panel once the scroll reaches that beat.
  // Phone stages need more clearance than desktop rigs, so the movement is intentionally generous.
  const deviceTranslateY = 80 - reveal * 80 - prove * 110 - handoff * 24;
  const deviceRotate = projectSide * (12 - inspect * 12 + prove * 4);

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
        {/* The light field grows as the system is uncovered. */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72vw] max-w-[920px] h-[42vw] max-h-[540px] rounded-full blur-[150px] pointer-events-none"
          style={{ backgroundColor: project.accentColor, opacity: 0.08 + inspect * 0.17 }}
        />

        <div className="absolute inset-x-0 top-[18%] h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent pointer-events-none" />

        {/* A readable scroll score: scroll is advancing a case-study state machine. */}
        <aside className="hidden lg:flex absolute left-10 top-1/2 -translate-y-1/2 z-30 flex-col gap-4 font-mono text-[10px] uppercase tracking-[0.14em]">
          <span className="text-zinc-500 [writing-mode:vertical-rl] rotate-180">case study / {reelNumber}</span>
          <div className="h-32 w-px bg-white/10 relative">
            <div
              className="absolute top-0 left-0 w-px origin-top"
              style={{ height: `${storyProgress * 100}%`, backgroundColor: project.accentColor }}
            />
          </div>
          <span style={{ color: project.accentColor }}>{beats[activeBeat].id} / 04</span>
        </aside>

        <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 z-30 text-right font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-500">
          <div className="text-white mb-2">{beats[activeBeat].label}</div>
          <div className="max-w-32 leading-relaxed">{beats[activeBeat].detail}</div>
        </div>

        {/* The title is the invitation. It clears away so the object can take over. */}
        <header
          className="relative z-30 w-full max-w-4xl mx-auto flex flex-col items-center text-center space-y-2 pointer-events-none"
          style={{
            opacity: 1 - inspect * 1.15,
            transform: `translate3d(0, ${-inspect * 42}px, 0)`,
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

        {/* Each device is the project itself, not a decorative screenshot. */}
        <div
          className="relative z-20 w-full flex-1 flex items-center justify-center will-change-transform"
          style={{
            transform: `translate3d(${deviceTranslateX}vw, ${deviceTranslateY}px, 0) rotate(${deviceRotate}deg) scale(${deviceScale})`,
          }}
        >
          <div className="w-full max-w-3xl px-2">
            {renderHardwareDevice()}
          </div>
        </div>

        {/* This cue changes its meaning with the story instead of repeating “scroll”. */}
        <div
          className="relative z-20 flex flex-col items-center gap-1 text-[10px] font-mono text-zinc-400"
          style={{ opacity: Math.max(0, 1 - prove * 1.4) }}
        >
          <span>{activeBeat === 0 ? "Scroll to bring the system online" : "Scroll to inspect the build"}</span>
          <ChevronDown className="h-3 w-3 animate-bounce text-[#FF5533]" />
        </div>

        {/* Proof appears only after the interface has earned attention. */}
        <div
          className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 right-4 sm:right-8 z-30 max-w-5xl mx-auto p-4 sm:p-5 rounded-2xl bg-[#0B0B0A]/90 backdrop-blur-2xl border border-white/[0.14] shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
          style={{
            transform: `translate3d(0, ${(1 - prove) * 125}%, 0)`,
            opacity: prove,
            pointerEvents: prove > 0.5 ? "auto" : "none",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Left: Summary & Role */}
            <div className="md:col-span-7 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase font-bold" style={{ color: project.accentColor }}>
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
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-[#0B0B0A] hover:scale-105 transition-transform"
                  style={{ backgroundColor: project.accentColor, boxShadow: `0 0 20px ${project.accentColor}40` }}
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
