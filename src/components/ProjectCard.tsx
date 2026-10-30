"use client";

import React, { useState } from "react";
import { ExternalLink, Network, CheckCircle2, ChevronRight, Activity, Cpu } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { Project } from "@/data/portfolioData";

interface ProjectCardProps {
  project: Project;
  onOpenArchitecture: (project: Project) => void;
  onTriggerTerminal?: (projectId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenArchitecture,
  onTriggerTerminal
}) => {
  const [activeTab, setActiveTab] = useState<"highlights" | "architecture">("highlights");

  return (
    <div className="group relative rounded-2xl border border-white/[0.08] bg-[#111110]/90 p-5 sm:p-7 backdrop-blur-md transition-all hover:border-white/[0.18] hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] flex flex-col justify-between">
      {/* Top Header & Badges */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-mono font-medium"
              style={{
                borderColor: `${project.accentColor}40`,
                backgroundColor: `${project.accentColor}15`,
                color: project.accentColor
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: project.accentColor }} />
              {project.badge}
            </span>
            <span className="text-xs font-mono text-zinc-500">{project.timeline}</span>
          </div>

          <span className="text-[11px] font-mono text-zinc-400 bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded-md">
            {project.statusLabel}
          </span>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
          {project.title}
        </h3>
        <p className="mt-1 text-xs sm:text-sm font-medium text-amber-400/90 font-mono">
          {project.tagline}
        </p>

        <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          {project.overview}
        </p>

        {/* Core Metrics Strip */}
        <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl border border-white/[0.06] bg-black/40 p-2.5">
          {project.metrics.map((metric, i) => (
            <div key={i} className="text-center">
              <div className="text-xs sm:text-sm font-mono font-bold text-white">
                {metric.value}
              </div>
              <div className="text-[10px] text-zinc-400 font-sans truncate">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive View Switcher */}
        <div className="mt-5 border-b border-white/[0.08] flex items-center gap-4 text-xs font-mono">
          <button
            onClick={() => setActiveTab("highlights")}
            className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "highlights"
                ? "border-amber-400 text-white font-semibold"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Activity className="h-3.5 w-3.5" />
            Engineering Breakthroughs
          </button>
          <button
            onClick={() => setActiveTab("architecture")}
            className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "architecture"
                ? "border-amber-400 text-white font-semibold"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Cpu className="h-3.5 w-3.5" />
            Architecture Preview
          </button>
        </div>

        {/* Dynamic Tab Body */}
        <div className="mt-4">
          {activeTab === "highlights" ? (
            <ul className="space-y-2.5 text-xs text-zinc-300">
              {project.keyEngineeringWins.map((win, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{win}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-xl border border-white/[0.08] bg-black/50 p-3.5 font-mono text-xs space-y-2">
              <div className="text-zinc-400 font-semibold flex items-center justify-between">
                <span>PIPELINE OVERVIEW</span>
                <button
                  onClick={() => onOpenArchitecture(project)}
                  className="text-amber-400 hover:underline inline-flex items-center gap-1 text-[11px]"
                >
                  Expand Full Flow <ChevronRight className="h-3 w-3" />
                </button>
              </div>
              <p className="text-zinc-300 text-[11px] leading-relaxed">
                {project.architecture.overview}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.architecture.nodes.map((node, i) => (
                  <span key={i} className="rounded bg-white/[0.06] border border-white/[0.08] px-2 py-0.5 text-[10px] text-zinc-300">
                    {node.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer: Tech Stack & Actions */}
      <div className="mt-6 pt-4 border-t border-white/[0.06]">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 6).map((tech, i) => (
            <span
              key={i}
              className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[11px] font-mono text-zinc-400"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 6 && (
            <span className="text-[11px] font-mono text-zinc-500 self-center">
              +{project.techStack.length - 6} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => onOpenArchitecture(project)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-xs font-mono text-zinc-200 hover:bg-white/[0.08] hover:border-white/[0.2] transition-colors"
          >
            <Network className="h-3.5 w-3.5 text-amber-400" />
            Inspect Architecture
          </button>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 text-xs font-medium text-emerald-400 hover:bg-emerald-500/20 transition-all"
              >
                <span>Live Site</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border border-white/[0.1] bg-white/[0.04] p-1.5 text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-colors"
                title="View Repository"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
            )}

            {project.demoType === "interactive-terminal" && onTriggerTerminal && (
              <button
                onClick={() => onTriggerTerminal(project.id)}
                className="inline-flex items-center gap-1 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1.5 text-xs font-mono text-amber-300 hover:bg-amber-500/20 transition-all"
              >
                Test API
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
