"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { FEATURED_PROJECTS, Project } from "@/data/portfolioData";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { InteractiveProjectStage } from "@/components/story/InteractiveProjectStage";
import { ArrowDown } from "lucide-react";

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
        className="relative min-h-[500vh] w-full bg-[#0B0B0A]"
      >
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          
          {/* Stacked Project Slides with Vertical Wipe & Cinematic Background Artwork */}
          {FEATURED_PROJECTS.map((project: Project, idx: number) => {
            const reveal = reveals[idx] ?? 0;
            const bgImage = PROJECT_BACKGROUNDS[project.slug] || PROJECT_BACKGROUNDS["nestys"];

            return (
              <div
                key={project.id}
                className="absolute inset-0 overflow-hidden text-white will-change-[clip-path] transform-gpu"
                style={{
                  zIndex: idx,
                  clipPath: `inset(${(1 - reveal) * 100}% 0 0 0)`,
                }}
              >
                {/* High-Resolution Cinematic Background Artwork */}
                <div
                  className="absolute inset-0 will-change-transform transform-gpu"
                  style={{
                    transform: `scale(${1 + (1 - reveal) * 0.08})`,
                  }}
                >
                  <Image
                    src={bgImage}
                    alt={`${project.title} Background`}
                    fill
                    priority={idx <= 1}
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                </div>

                {/* Thematic Ambient Glow Aura */}
                <div
                  className="absolute inset-0 pointer-events-none blur-[120px] opacity-35"
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
                      "linear-gradient(90deg, rgba(11,11,10,0.94) 0%, rgba(11,11,10,0.85) 45%, rgba(11,11,10,0.40) 100%), linear-gradient(180deg, rgba(11,11,10,0.5) 0%, transparent 20%, transparent 80%, rgba(11,11,10,0.85) 100%)",
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
                    <div className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md font-mono text-xs">
                      {FEATURED_PROJECTS.map((p, pIdx) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => scrollToProject(pIdx)}
                          className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                            pIdx === activeIndex
                              ? "bg-white/20 text-white font-bold shadow-xs"
                              : "text-zinc-400 hover:text-zinc-200 opacity-70 hover:opacity-100"
                          }`}
                        >
                          {p.shortName}
                        </button>
                      ))}
                    </div>

                    {/* Timeline */}
                    <span className="hidden sm:inline-block font-mono text-xs text-zinc-400">
                      {project.timeline}
                    </span>
                  </div>

                  {/* Main Two-Column Stage */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
                    
                    {/* Left Column: Minimal Project Story & Action */}
                    <div className="lg:col-span-6 space-y-4">
                      {/* Project Title */}
                      <h3
                        className="font-grotesk text-[clamp(34px,4.2vw,64px)] font-medium leading-[0.96] tracking-tight text-white transition-transform duration-100"
                        style={{ transform: `translateY(${(1 - reveal) * 30}px)` }}
                      >
                        {project.title}
                      </h3>

                      {/* Minimal 1-Sentence Summary */}
                      <p
                        className="text-base sm:text-lg font-sans font-normal leading-relaxed text-zinc-300 max-w-lg"
                      >
                        {project.tagline}
                      </p>

                      {/* Tech Stack Badges */}
                      <div className="flex flex-wrap gap-2 pt-1 pb-2">
                        {project.techStack.slice(0, 4).map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-3 py-1 rounded-md bg-white/[0.08] border border-white/10 text-xs font-mono text-zinc-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action CTAs with Magnetic Liquid Button */}
                      <div className="pt-2 flex items-center gap-4">
                        <LiquidButton
                          href={`/projects/${project.slug}`}
                          variant="accent"
                          accentColor={project.accentColor}
                          className="px-6 py-3 text-sm"
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

                    {/* Right Column: 3D Mouse-Tilt Hardware Device with Generated UI Screen */}
                    <div className="lg:col-span-6 flex items-center justify-center">
                      <InteractiveProjectStage project={project} index={idx} />
                    </div>
                  </div>

                  {/* Bottom Strip: Role & Scroll Cue */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-2 font-mono text-[11px] text-zinc-400">
                    <span>Role: {project.role}</span>
                    <span className="flex items-center gap-1.5 text-zinc-500">
                      <span>{idx === totalProjects - 1 ? "Scroll down to contact" : "Scroll to next project"}</span>
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
