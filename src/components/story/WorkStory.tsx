"use client";

import React from "react";
import Image from "next/image";
import { FEATURED_PROJECTS, Project } from "@/data/portfolioData";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { InteractiveProjectStage } from "@/components/story/InteractiveProjectStage";
import { CheckCircle2, ArrowDown } from "lucide-react";

interface WorkStoryProps {
  progress?: number;
}

const PROJECT_BACKGROUNDS: Record<string, string> = {
  nestys: "/projects/backgrounds/nestys-bg.jpg",
  scrollr: "/projects/backgrounds/scrollr-bg.jpg",
  wokataa: "/projects/backgrounds/wokataa-bg.jpg",
  "earth-air": "/projects/backgrounds/earthair-bg.jpg",
  "urban-arena": "/projects/backgrounds/urbanarena-bg.jpg",
};

export const WorkStory: React.FC<WorkStoryProps> = ({ progress = 0 }) => {
  const totalProjects = FEATURED_PROJECTS.length;

  // Dwell and wipe calculation:
  // Each project stays centered, then cleanly wipes to the next project
  const rawPos = Math.min(totalProjects - 1, Math.max(0, progress * totalProjects - 0.5));
  const floorIdx = Math.min(totalProjects - 1, Math.floor(rawPos));
  const frac = rawPos - floorIdx;
  const easedFrac =
    frac < 0.5
      ? 0
      : ((frac - 0.5) / 0.5) * ((frac - 0.5) / 0.5) * (3 - 2 * ((frac - 0.5) / 0.5));
  const activeSlideProgress = Math.min(totalProjects - 1, floorIdx + easedFrac);
  const activeIndex = Math.min(totalProjects - 1, Math.round(activeSlideProgress));

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
      <div className="relative min-h-[500vh] w-full bg-[#0B0B0A]">
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          
          {/* Stacked Project Slides with Vertical Wipe & Cinematic Background Artwork */}
          {FEATURED_PROJECTS.map((project: Project, idx: number) => {
            const reveal = Math.min(1, Math.max(0, activeSlideProgress - idx + 1));
            const bgImage = PROJECT_BACKGROUNDS[project.slug] || PROJECT_BACKGROUNDS["nestys"];

            return (
              <div
                key={project.id}
                className="absolute inset-0 overflow-hidden text-white will-change-[clip-path]"
                style={{
                  zIndex: idx,
                  clipPath: `inset(${(1 - reveal) * 100}% 0 0 0)`,
                }}
              >
                {/* Generated High-Resolution Cinematic Background Wallpaper */}
                <div
                  className="absolute inset-0 will-change-transform"
                  style={{
                    transform: `scale(${1 + (1 - reveal) * 0.12})`,
                  }}
                >
                  <Image
                    src={bgImage}
                    alt={`${project.title} Background`}
                    fill
                    priority={idx === 0}
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                </div>

                {/* Thematic Ambient Glow Aura */}
                <div
                  className="absolute inset-0 pointer-events-none blur-[120px] opacity-40"
                  style={{
                    background: `radial-gradient(circle at 75% 40%, ${project.accentColor} 0%, transparent 60%)`,
                  }}
                  aria-hidden="true"
                />

                {/* Readability Scrim: Heavy dark gradient preserving 100% contrast for typography */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(11,11,10,0.95) 0%, rgba(11,11,10,0.85) 45%, rgba(11,11,10,0.40) 100%), linear-gradient(180deg, rgba(11,11,10,0.5) 0%, transparent 20%, transparent 80%, rgba(11,11,10,0.8) 100%)",
                  }}
                />

                {/* Slide Inner Viewport Layout */}
                <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 pt-20 pb-6 flex flex-col justify-between">
                  
                  {/* Top Editorial Status Strip */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    {/* Project Counter */}
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-base font-bold text-white tracking-wider">
                        0{idx + 1}
                        <span className="text-zinc-500 font-normal"> / 0{totalProjects}</span>
                      </span>

                      <span className="w-px h-3.5 bg-white/20" />

                      <span
                        className="px-3 py-0.5 rounded-full text-xs font-mono font-semibold border backdrop-blur-md"
                        style={{
                          borderColor: `${project.accentColor}50`,
                          backgroundColor: `${project.accentColor}20`,
                          color: project.accentColor,
                        }}
                      >
                        {project.category}
                      </span>
                    </div>

                    {/* Quick Project Switcher Pills */}
                    <div className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md font-mono text-xs">
                      {FEATURED_PROJECTS.map((p, pIdx) => (
                        <span
                          key={p.id}
                          className={`px-2.5 py-1 rounded-lg transition-all ${
                            pIdx === idx
                              ? "bg-white/20 text-white font-bold"
                              : "text-zinc-400 opacity-60"
                          }`}
                        >
                          {p.shortName}
                        </span>
                      ))}
                    </div>

                    {/* Timeline */}
                    <span className="hidden sm:inline-block font-mono text-xs text-zinc-400">
                      {project.timeline}
                    </span>
                  </div>

                  {/* Main Two-Column Stage */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
                    
                    {/* Left Column: Project Narrative & Actions */}
                    <div className="lg:col-span-6 space-y-4">
                      {/* Project Title */}
                      <h3
                        className="font-grotesk text-[clamp(32px,4vw,64px)] font-medium leading-[0.96] tracking-tight text-white transition-transform duration-100"
                        style={{ transform: `translateY(${(1 - reveal) * 40}px)` }}
                      >
                        {project.title}
                      </h3>

                      {/* Tagline */}
                      <p
                        className="text-sm sm:text-base font-sans font-medium leading-relaxed"
                        style={{ color: project.accentColor }}
                      >
                        {project.tagline}
                      </p>

                      {/* Overview */}
                      <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed max-w-xl">
                        {project.overview}
                      </p>

                      {/* Key Feature Wins */}
                      <div className="space-y-1.5 pt-1">
                        {project.features?.slice(0, 2).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300">
                            <CheckCircle2
                              className="h-4 w-4 shrink-0 mt-0.5"
                              style={{ color: project.accentColor }}
                            />
                            <span>
                              <strong className="text-white font-semibold">{feat.title}:</strong>{" "}
                              {feat.description}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.techStack.slice(0, 5).map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-0.5 rounded-md bg-white/[0.08] border border-white/10 text-[11px] font-mono text-zinc-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action CTAs */}
                      <div className="pt-2 flex items-center gap-4">
                        <LiquidButton
                          href={`/projects/${project.slug}`}
                          variant="accent"
                          accentColor={project.accentColor}
                          className="px-5 py-2.5 text-xs sm:text-sm"
                        >
                          View Project Case Study
                        </LiquidButton>

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs text-zinc-400 hover:text-white transition-colors underline decoration-white/20 underline-offset-4"
                          >
                            Live Site ↗
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right Column: 3D Mouse-Tilt Hardware Device */}
                    <div className="lg:col-span-6 flex items-center justify-center">
                      <InteractiveProjectStage project={project} index={idx} />
                    </div>
                  </div>

                  {/* Bottom Strip: Role & Scroll Cue */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-2 font-mono text-[11px] text-zinc-400">
                    <span>Role: {project.role}</span>
                    <span className="flex items-center gap-1.5 text-zinc-500">
                      <span>Scroll to switch project</span>
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
