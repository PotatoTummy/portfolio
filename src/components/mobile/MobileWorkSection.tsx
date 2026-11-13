"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FEATURED_PROJECTS, Project } from "@/data/portfolioData";
import { Network, ArrowRight, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";

interface MobileWorkSectionProps {
  onSelectArchitecture: (project: Project) => void;
}

const PROJECT_CONFIGS: Record<
  string,
  {
    themeColor: string;
    bgTint: string;
    borderColor: string;
    badgeBg: string;
    badgeText: string;
    screenshot: string;
    receipt: { problem: string; decision: string; result: string };
  }
> = {
  nestys: {
    themeColor: "#00D4FF",
    bgTint: "rgba(0, 212, 255, 0.05)",
    borderColor: "rgba(0, 212, 255, 0.3)",
    badgeBg: "rgba(0, 212, 255, 0.12)",
    badgeText: "#00D4FF",
    screenshot: "/projects/screens/nestys-screen.png",
    receipt: {
      problem: "Real-time sync across 3 portals without catalog contention",
      decision: "NestJS microservices + BullMQ job queues + ElastiCache Redis",
      result: "Sub-50ms sync; 0 lag during bulk CSV catalog imports",
    },
  },
  scrollr: {
    themeColor: "#FF2E93",
    bgTint: "rgba(255, 46, 147, 0.05)",
    borderColor: "rgba(255, 46, 147, 0.3)",
    badgeBg: "rgba(255, 46, 147, 0.12)",
    badgeText: "#FF70B8",
    screenshot: "/projects/screens/scrollr-screen.png",
    receipt: {
      problem: "2,500+ vertical reels stuttering on mid-range Android devices",
      decision: "Virtual list windowing (5 active DOM nodes) + expo-video prefetch",
      result: "Rock-solid 60 FPS; Fastify proxy with SSRF guard & byte-range streaming",
    },
  },
  wokataa: {
    themeColor: "#10B981",
    bgTint: "rgba(16, 185, 129, 0.05)",
    borderColor: "rgba(16, 185, 129, 0.3)",
    badgeBg: "rgba(16, 185, 129, 0.12)",
    badgeText: "#34D399",
    screenshot: "/projects/screens/wokataa-screen.png",
    receipt: {
      problem: "Cross-continent move synchronization with jitter spikes",
      decision: "Socket.IO + Ably Cloud dual-transport with optimistic rollback",
      result: "<40ms round-trip latency; zero desync complaints in production",
    },
  },
  "earth-air": {
    themeColor: "#F59E0B",
    bgTint: "rgba(245, 158, 11, 0.05)",
    borderColor: "rgba(245, 158, 11, 0.3)",
    badgeBg: "rgba(245, 158, 11, 0.12)",
    badgeText: "#FBBF24",
    screenshot: "/projects/screens/earthair-screen.png",
    receipt: {
      problem: "Bloated 1.8MB WordPress page builder with 4s LCP score",
      decision: "Custom semantic theme + automated FTPS deploy via GitHub Actions",
      result: "98/100 Core Web Vitals; sub-800ms initial paint; automated CI/CD",
    },
  },
  "urban-arena": {
    themeColor: "#A855F7",
    bgTint: "rgba(168, 85, 247, 0.05)",
    borderColor: "rgba(168, 85, 247, 0.3)",
    badgeBg: "rgba(168, 85, 247, 0.12)",
    badgeText: "#C084FC",
    screenshot: "/projects/screens/urbanarena-screen.png",
    receipt: {
      problem: "Concurrent booking requests causing double-reserved court slots",
      decision: "Redis distributed locking (SET NX with TTL) on checkout write path",
      result: "Zero double-bookings; instant digital QR pass validation",
    },
  },
};

export const MobileWorkSection: React.FC<MobileWorkSectionProps> = ({ onSelectArchitecture }) => {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [expandedReceipts, setExpandedReceipts] = useState<Record<string, boolean>>({
    "nestys-ecosystem": true, // open first by default
  });
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // IntersectionObserver to sync active project slide index
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idxStr = entry.target.getAttribute("data-project-index");
            if (idxStr !== null) {
              setActiveProjectIdx(Number(idxStr));
            }
          }
        });
      },
      { root: carousel, threshold: 0.6 }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleReceipt = (id: string) => {
    setExpandedReceipts((prev) => ({ ...prev, [id]: !prev[id] }));
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(15);
    }
  };

  const scrollToProject = (idx: number) => {
    const el = cardRefs.current[idx];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  };

  return (
    <section id="work" className="w-full py-12 px-4 bg-[#0B0B0A] text-[#F3F3EE] select-none content-auto">
      <div className="max-w-lg mx-auto w-full space-y-5">
        
        {/* Section Header with 1-5 Counter */}
        <div className="flex items-end justify-between border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#00D4FF] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
              <span>04 / Selected Work</span>
            </div>
            <h2 className="font-grotesk text-3xl font-medium tracking-tight text-white">
              Selected Projects
            </h2>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#00D4FF]">
            <span>0{activeProjectIdx + 1}</span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-500">0{FEATURED_PROJECTS.length}</span>
          </div>
        </div>

        {/* Swipeable Horizontal Snap Cards (One Project per Screen) */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 pb-2"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {FEATURED_PROJECTS.map((project: Project, idx: number) => {
            const config = PROJECT_CONFIGS[project.slug] || PROJECT_CONFIGS.nestys;
            const isReceiptOpen = !!expandedReceipts[project.id];

            return (
              <div
                key={project.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                data-project-index={idx}
                className="w-full shrink-0 snap-center rounded-2xl border bg-[#121211] p-4 space-y-4 shadow-xl relative overflow-hidden"
                style={{
                  borderColor: config.borderColor,
                  backgroundColor: "rgba(18, 18, 17, 0.98)",
                }}
              >
                {/* Subtle Ambient Backlight Tint */}
                <div
                  className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none blur-3xl opacity-15"
                  style={{ backgroundColor: config.themeColor }}
                  aria-hidden="true"
                />

                {/* Card Top: Number, Title & Domain Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-mono font-bold text-zinc-500">
                      0{idx + 1} · {project.category}
                    </div>
                    <h3 className="text-xl font-grotesk font-semibold text-white tracking-tight pt-0.5">
                      {project.title}
                    </h3>
                  </div>

                  <span
                    className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium shrink-0 border"
                    style={{
                      backgroundColor: config.badgeBg,
                      color: config.badgeText,
                      borderColor: config.borderColor,
                    }}
                  >
                    {project.badge}
                  </span>
                </div>

                {/* Optimized Retina Mockup Preview */}
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-black/60">
                  <Image
                    src={config.screenshot}
                    alt={`${project.title} Interface Preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    priority={idx === 0}
                    loading={idx === 0 ? "eager" : "lazy"}
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Metric Pill */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono px-2.5 py-1 rounded-lg bg-black/80 border border-white/15 text-zinc-200">
                    <span className="text-zinc-400">{project.metrics[0]?.label || "Speed"}</span>
                    <span className="font-bold text-white" style={{ color: config.themeColor }}>
                      {project.metrics[0]?.value || "60 FPS"}
                    </span>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  {project.tagline}
                </p>

                {/* Tap-to-Expand Accordion: Engineering Receipt (CSS Grid 0fr→1fr) */}
                <div className="rounded-xl bg-white/[0.03] border border-white/10 overflow-hidden text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => toggleReceipt(project.id)}
                    className="w-full p-2.5 flex items-center justify-between hover:bg-white/5 active:bg-white/10 transition-colors text-left"
                  >
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Engineering Receipt</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-zinc-400">
                      <span>{isReceiptOpen ? "Collapse" : "Expand"}</span>
                      {isReceiptOpen ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </button>

                  {/* Zero-JS-Height CSS Grid Transition */}
                  <div
                    className="grid transition-[grid-template-rows] duration-250 ease-out px-2.5"
                    style={{
                      gridTemplateRows: isReceiptOpen ? "1fr" : "0fr",
                    }}
                  >
                    <div className="overflow-hidden space-y-2 pb-2.5 pt-1 border-t border-white/5 text-[11px]">
                      <div>
                        <span className="text-zinc-500 font-bold">Problem: </span>
                        <span className="text-zinc-300">{config.receipt.problem}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 font-bold">Decision: </span>
                        <span className="text-zinc-300">{config.receipt.decision}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 font-bold">Result: </span>
                        <span className="font-semibold text-white" style={{ color: config.themeColor }}>
                          {config.receipt.result}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-[10px] font-mono text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 5 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono text-zinc-500">
                      +{project.techStack.length - 5}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                  {/* Architecture [D] Toggle Button */}
                  <button
                    type="button"
                    onClick={() => onSelectArchitecture(project)}
                    className="flex-1 min-h-[44px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/[0.06] border border-white/15 text-xs font-mono text-zinc-200 hover:text-white active:scale-95 transition-all"
                  >
                    <Network className="w-3.5 h-3.5 text-[#00D4FF]" />
                    <span>Architecture [D]</span>
                  </button>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex-1 min-h-[44px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-xs font-mono text-[#00D4FF] active:scale-95 transition-all font-medium"
                  >
                    <span>Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Repository"
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-white/[0.06] border border-white/15 text-zinc-300 hover:text-white active:scale-95 transition-all"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Stepper Dot Progress Bar */}
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {FEATURED_PROJECTS.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              onClick={() => scrollToProject(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === activeProjectIdx ? "w-6 bg-[#00D4FF]" : "w-2 bg-white/20"
              }`}
              aria-label={`Jump to project ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
