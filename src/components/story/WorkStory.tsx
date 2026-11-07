"use client";

import React, { useState, useEffect } from "react";
import { FEATURED_PROJECTS, Project } from "@/data/portfolioData";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { InteractiveProjectStage } from "@/components/story/InteractiveProjectStage";
import { NestysMatrixBackground } from "@/components/story/backgrounds/NestysMatrixBackground";
import { ScrollrFilmBackground } from "@/components/story/backgrounds/ScrollrFilmBackground";
import { WoKataaArenaBackground } from "@/components/story/backgrounds/WoKataaArenaBackground";
import { EarthAirAeroBackground } from "@/components/story/backgrounds/EarthAirAeroBackground";
import { UrbanArenaRadarBackground } from "@/components/story/backgrounds/UrbanArenaRadarBackground";
import { motion } from "framer-motion";
import { ArrowDown, CheckCircle2, Sparkles, Layers } from "lucide-react";

interface WorkStoryProps {
  progress?: number;
}

export const WorkStory: React.FC<WorkStoryProps> = () => {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  // Track active project as user scrolls through vertical sections
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.45;
      FEATURED_PROJECTS.forEach((p, idx) => {
        const el = document.getElementById(`project-${p.slug}`);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveProjectIdx(idx);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderBackground = (slug: string) => {
    switch (slug) {
      case "nestys":
        return <NestysMatrixBackground />;
      case "scrollr":
        return <ScrollrFilmBackground />;
      case "wokataa":
        return <WoKataaArenaBackground />;
      case "earth-air":
        return <EarthAirAeroBackground />;
      case "urban-arena":
      default:
        return <UrbanArenaRadarBackground />;
    }
  };

  return (
    <div id="work" data-nav="Work" className="relative w-full bg-[#0B0B0A] text-[#F3F3EE] select-none">
      
      {/* Selected Work Title Banner */}
      <section className="bg-[#EFEAE4] text-[#121211] py-20 sm:py-28 px-6 sm:px-12 md:px-16 z-20 relative border-t border-[#121211]/15">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 max-w-7xl mx-auto">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#0284C7] font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
              <span>04 / Selected Work</span>
            </div>
            <h2 className="font-grotesk text-[clamp(48px,8vw,110px)] font-medium leading-[0.92] text-[#0284C7] tracking-tight">
              Selected work
            </h2>
          </div>
          <p className="max-w-[380px] text-sm sm:text-base leading-relaxed text-[#121211]/80 font-sans">
            A curated collection of web applications, mobile platforms, and digital experiences built with clean design, fluid animations, and reliable engineering.
          </p>
        </div>
      </section>

      {/* Floating Vertical Project Navigation Indicator (Hidden on mobile) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-2.5 pointer-events-auto">
        <div className="p-2 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 flex flex-col gap-2 shadow-2xl">
          {FEATURED_PROJECTS.map((project, idx) => {
            const isActive = idx === activeProjectIdx;
            return (
              <a
                key={project.id}
                href={`#project-${project.slug}`}
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl font-mono text-xs transition-all duration-200 group ${
                  isActive
                    ? "bg-white/15 text-white font-bold"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full transition-transform"
                  style={{
                    backgroundColor: isActive ? project.accentColor : "rgba(255,255,255,0.2)",
                    transform: isActive ? "scale(1.3)" : "scale(1)",
                  }}
                />
                <span className="text-[10px]">0{idx + 1}</span>
                <span className="hidden group-hover:inline text-[11px] truncate max-w-[120px]">
                  {project.shortName}
                </span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Vertical Project Showcase Sections */}
      <div className="w-full">
        {FEATURED_PROJECTS.map((project: Project, idx: number) => {
          return (
            <section
              key={project.id}
              id={`project-${project.slug}`}
              className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden border-b border-white/10 px-6 sm:px-12 md:px-16 py-20 sm:py-24"
            >
              {/* Bespoke Project Animated Background */}
              {renderBackground(project.slug)}

              {/* Main Balanced Two-Column Stage */}
              <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                
                {/* Left Column: Project Editorial & Action */}
                <div className="lg:col-span-6 space-y-6">
                  {/* Top Index & Category Badge */}
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm sm:text-base font-bold text-zinc-400">
                      0{idx + 1}
                      <span className="text-zinc-600 font-normal"> / 0{FEATURED_PROJECTS.length}</span>
                    </span>

                    <span className="w-px h-3.5 bg-white/20" />

                    <span
                      className="px-3 py-1 rounded-full text-xs font-mono font-semibold border backdrop-blur-md"
                      style={{
                        borderColor: `${project.accentColor}40`,
                        backgroundColor: `${project.accentColor}15`,
                        color: project.accentColor,
                      }}
                    >
                      {project.category}
                    </span>

                    <span className="hidden sm:inline-block text-xs font-mono text-zinc-500">
                      {project.timeline}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="font-grotesk text-[clamp(36px,4.5vw,72px)] font-medium leading-[0.96] tracking-tight text-white">
                    {project.title}
                  </h3>

                  {/* Tagline / Subtitle */}
                  <p
                    className="text-sm sm:text-base font-sans font-medium leading-relaxed"
                    style={{ color: project.accentColor }}
                  >
                    {project.tagline}
                  </p>

                  {/* Overview */}
                  <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed max-w-xl">
                    {project.overview}
                  </p>

                  {/* Key Feature Wins */}
                  <div className="space-y-2 pt-1">
                    {project.features?.slice(0, 2).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
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
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack.slice(0, 6).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/10 text-xs font-mono text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Slick Liquid-Fill Action Button */}
                  <div className="pt-3 flex items-center gap-4">
                    <LiquidButton
                      href={`/projects/${project.slug}`}
                      variant="accent"
                      accentColor={project.accentColor}
                      className="px-6 py-3.5 text-sm"
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
                        Live Website ↗
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Column: 3D Perspective Tilt Stage */}
                <div className="lg:col-span-6 flex items-center justify-center">
                  <InteractiveProjectStage project={project} index={idx} />
                </div>
              </div>

              {/* Bottom Subtle Bar */}
              <div className="absolute bottom-4 left-6 sm:left-12 right-6 sm:right-12 flex items-center justify-between font-mono text-[11px] text-zinc-600 border-t border-white/5 pt-2">
                <span>Role: {project.role}</span>
                <span>Where: {project.whereToSee}</span>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
