"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { FEATURED_PROJECTS, Project } from "@/data/portfolioData";
import { THEME_TOKENS } from "@/styles/theme";

interface WorkStoryProps {
  progress?: number;
}

export const WorkStory: React.FC<WorkStoryProps> = ({ progress = 0 }) => {
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  // Dwell and fast snap transition computation
  const rawPos = Math.min(FEATURED_PROJECTS.length - 1, Math.max(0, progress * FEATURED_PROJECTS.length - 0.5));
  const floorIdx = Math.min(FEATURED_PROJECTS.length - 1, Math.floor(rawPos));
  const frac = rawPos - floorIdx;
  const easedFrac = frac < 0.55 ? 0 : ((frac - 0.55) / 0.45) * ((frac - 0.55) / 0.45) * (3 - 2 * ((frac - 0.55) / 0.45));
  const activeSlideProgress = Math.min(FEATURED_PROJECTS.length - 1, floorIdx + easedFrac);
  const activeIndex = Math.round(activeSlideProgress);

  // Helper: Rounded Rectangle
  const drawRoundRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) => {
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(x, y, w, h, r);
    } else {
      ctx.rect(x, y, w, h);
    }
  };

  // Render high-res colorful UI preview for each project canvas
  useEffect(() => {
    canvasRefs.current.forEach((canvas, idx) => {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      if (idx === 0) {
        // 1. Nestys: Deep Sapphire & Cyan Enterprise Matrix
        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, "#021226");
        grad.addColorStop(0.5, "#07294D");
        grad.addColorStop(1, "#031730");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Sidebar
        ctx.fillStyle = "rgba(0, 212, 255, 0.08)";
        ctx.fillRect(0, 0, w * 0.18, h);

        for (let i = 0; i < 5; i++) {
          ctx.fillStyle = i === 0 ? "#00D4FF" : "rgba(255,255,255,0.2)";
          drawRoundRect(ctx, 20, 60 + i * 36, w * 0.18 - 40, 14, 4);
          ctx.fill();
        }

        // Title & Stats
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 20px sans-serif";
        ctx.fillText("Nestys Seller Central & Super Admin", w * 0.22, 45);

        for (let i = 0; i < 3; i++) {
          const cx = w * 0.22 + i * (w * 0.24);
          ctx.fillStyle = "rgba(0, 212, 255, 0.12)";
          drawRoundRect(ctx, cx, 70, w * 0.22, 70, 8);
          ctx.fill();
          ctx.strokeStyle = "rgba(0, 212, 255, 0.35)";
          ctx.stroke();

          ctx.fillStyle = i === 0 ? "#00D4FF" : "#FFFFFF";
          drawRoundRect(ctx, cx + 16, 110, w * 0.12, 14, 4);
          ctx.fill();
        }

        // Live Throughput Bars
        const barCount = 14;
        const barWidth = (w * 0.72) / barCount;
        for (let i = 0; i < barCount; i++) {
          const bh = 60 + 80 * Math.sin(i * 0.9);
          ctx.fillStyle = i % 2 === 0 ? "#00D4FF" : "rgba(0, 212, 255, 0.4)";
          drawRoundRect(ctx, w * 0.22 + i * barWidth, h - 80 - bh, barWidth - 10, bh, 4);
          ctx.fill();
        }
      } else if (idx === 1) {
        // 2. Scrollr: Cinema Violet & Hot Magenta Reel Canvas
        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, "#1F0433");
        grad.addColorStop(0.5, "#4A0E5C");
        grad.addColorStop(1, "#8A1260");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Ambient Reel Ring
        ctx.fillStyle = "rgba(255, 0, 122, 0.18)";
        ctx.beginPath();
        ctx.arc(w / 2, h * 0.46, 130, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "#FF007A";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(w / 2, h * 0.46, 68, 0, Math.PI * 2);
        ctx.stroke();

        // Play Triangle
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.moveTo(w / 2 - 14, h * 0.46 - 22);
        ctx.lineTo(w / 2 + 24, h * 0.46);
        ctx.lineTo(w / 2 - 14, h * 0.46 + 22);
        ctx.fill();

        ctx.fillStyle = "#FF70B8";
        ctx.font = "bold 18px monospace";
        ctx.textAlign = "center";
        ctx.fillText("60 FPS VIRTUALIZED • FISHER-YATES REEL", w / 2, h - 90);
        ctx.textAlign = "left";
      } else if (idx === 2) {
        // 3. WoKataa: Real-Time Gaming Midnight Forest & Cyber Jade
        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, "#012217");
        grad.addColorStop(0.5, "#064E3B");
        grad.addColorStop(1, "#022F22");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Team Cards
        ctx.fillStyle = "rgba(16, 185, 129, 0.25)";
        drawRoundRect(ctx, w / 2 - 160, h * 0.35, 130, 190, 16);
        ctx.fill();
        ctx.strokeStyle = "#10B981";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = "rgba(0, 212, 255, 0.25)";
        drawRoundRect(ctx, w / 2 + 30, h * 0.32, 130, 190, 16);
        ctx.fill();
        ctx.strokeStyle = "#00D4FF";
        ctx.stroke();

        ctx.fillStyle = "#10B981";
        ctx.font = "bold 16px monospace";
        ctx.fillText("TEAM A [YOU]", w / 2 - 140, h * 0.35 + 40);

        ctx.fillStyle = "#00D4FF";
        ctx.fillText("TEAM B [RIVAL]", w / 2 + 50, h * 0.32 + 40);

        ctx.fillStyle = "#34D399";
        ctx.font = "bold 20px monospace";
        ctx.textAlign = "center";
        ctx.fillText("<40ms STATE SYNC • ABLY + SOCKET.IO", w / 2, h - 70);
        ctx.textAlign = "left";
      } else if (idx === 3) {
        // 4. Earth Air Condition: Solar Gold & Warm Bronze Amber
        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, "#261102");
        grad.addColorStop(0.5, "#5C2B04");
        grad.addColorStop(1, "#8C4307");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = "#FBBF24";
        ctx.font = "bold 22px sans-serif";
        ctx.fillText("Earth Air Condition — Commercial HVAC Infrastructure", 36, 48);

        // Radial Performance Gauge (98 score)
        ctx.strokeStyle = "#F59E0B";
        ctx.lineWidth = 16;
        ctx.beginPath();
        ctx.arc(w - 180, h * 0.48, 64, 0, Math.PI * 2 * 0.98);
        ctx.stroke();

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 44px monospace";
        ctx.textAlign = "center";
        ctx.fillText("98", w - 180, h * 0.48 + 15);

        ctx.font = "bold 14px monospace";
        ctx.fillStyle = "#FBBF24";
        ctx.fillText("CORE WEB VITALS", w - 180, h * 0.48 + 40);
        ctx.textAlign = "left";
      } else {
        // 5. UrbanArena: Stadium Indigo & Electric Amethyst
        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, "#17042B");
        grad.addColorStop(0.5, "#3B0D66");
        grad.addColorStop(1, "#581C87");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = "#C084FC";
        ctx.font = "bold 22px sans-serif";
        ctx.fillText("UrbanArena Platform — Multi-Tenant Facility Reservation", 36, 48);

        // Facility Venue Slots
        const colW = (w - 100) / 4;
        for (let i = 0; i < 4; i++) {
          ctx.fillStyle = "rgba(168, 85, 247, 0.15)";
          drawRoundRect(ctx, 36 + i * (colW + 10), 80, colW, h - 140, 10);
          ctx.fill();
          ctx.strokeStyle = "rgba(168, 85, 247, 0.4)";
          ctx.stroke();

          ctx.fillStyle = i === 1 ? "#A855F7" : "rgba(255,255,255,0.4)";
          drawRoundRect(ctx, 50 + i * (colW + 10), 120, colW - 28, 36, 6);
          ctx.fill();
        }

        ctx.fillStyle = "#E9D5FF";
        ctx.font = "bold 15px monospace";
        ctx.fillText("REDIS MUTEX CONCURRENCY LOCKS • RESEND DYNAMIC QR PASSES", 36, h - 35);
      }
    });
  }, []);

  return (
    <>
      {/* Selected Work Title Banner */}
      <div className="bg-[#EFEAE4] text-[#121211] py-[10vh] px-4 sm:px-8 md:px-14 z-20 relative border-t border-[#121211]/15">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 max-w-6xl mx-auto">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#0284C7] font-bold block mb-2">
              04 / Selected Work
            </span>
            <h2 className="font-grotesk text-[clamp(56px,10vw,160px)] font-medium leading-[0.88] text-[#0284C7]">
              Selected work
            </h2>
          </div>
          <p className="max-w-[360px] text-[15px] leading-relaxed text-[#121211]/80">
            A curated collection of web applications and digital products built with clean design, fluid animations, and solid engineering.
          </p>
        </div>
      </div>

      {/* Pinned Full-Bleed Thematic Slides */}
      <section id="work" data-nav="Work" className="relative min-h-[620vh] w-full bg-[#0B0B0A] select-none z-20">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          
          {/* Chrome Overlay: Counter and Project List */}
          <div className="absolute inset-0 z-30 pointer-events-none text-white px-6 sm:px-12 md:px-16">
            <div className="absolute left-6 sm:left-12 md:left-16 top-[92px] font-sans font-bold text-[clamp(28px,3.2vw,44px)] tracking-tight">
              0{activeIndex + 1}
              <small className="font-mono text-xs opacity-70 ml-2">/ 0{FEATURED_PROJECTS.length}</small>
            </div>

            <ol className="hidden md:grid gap-1.5 absolute left-[min(34vw,440px)] top-[94px] font-mono text-xs">
              {FEATURED_PROJECTS.map((p, idx) => (
                <li
                  key={p.id}
                  className={`pl-4 relative transition-all duration-200 ${
                    idx === activeIndex ? "opacity-100 font-bold text-white translate-x-1" : "opacity-45 text-zinc-300"
                  }`}
                >
                  {idx === activeIndex && (
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-px"
                      style={{ backgroundColor: p.accentColor }}
                    />
                  )}
                  {p.title}
                </li>
              ))}
            </ol>
          </div>

          {/* Project Slides with Unique Thematic Backgrounds */}
          {FEATURED_PROJECTS.map((project: Project, idx: number) => {
            const reveal = Math.min(1, Math.max(0, activeSlideProgress - idx + 1));
            const themeKey = (project.slug === "nestys"
              ? "nestys"
              : project.slug === "scrollr"
              ? "scrollr"
              : project.slug === "wokataa"
              ? "wokataa"
              : project.slug === "earth-air"
              ? "earth-air"
              : "urban-arena") as keyof typeof THEME_TOKENS.projectThemes;
            
            const projectTheme = THEME_TOKENS.projectThemes[themeKey];

            return (
              <div
                key={project.id}
                className="absolute inset-0 overflow-hidden text-white will-change-[clip-path]"
                style={{
                  zIndex: idx,
                  clipPath: `inset(${(1 - reveal) * 100}% 0 0 0)`,
                  background: projectTheme.bgGradient,
                }}
              >
                {/* Thematic Ambient Glow Aura */}
                <div
                  className="absolute inset-0 pointer-events-none blur-[120px] opacity-40"
                  style={{
                    background: `radial-gradient(circle at 75% 30%, ${projectTheme.primaryAccent} 0%, transparent 60%)`,
                  }}
                  aria-hidden="true"
                />

                {/* UI Preview Canvas Artwork */}
                <div
                  className="absolute inset-0 will-change-transform"
                  style={{
                    transform: `scale(${1 + (1 - reveal) * 0.15 + (idx < activeSlideProgress ? 0.03 * (activeSlideProgress - idx) : 0)}) translateY(${idx < activeSlideProgress ? -(activeSlideProgress - idx) * 4 : 0}%)`,
                    opacity: 0.85,
                  }}
                >
                  <canvas
                    ref={(el) => {
                      canvasRefs.current[idx] = el;
                    }}
                    width={1280}
                    height={720}
                    className="w-full h-full object-cover block"
                    aria-hidden="true"
                  />
                </div>

                {/* Subtle Readability Scrim Overlay (Preserves Rich Colors while ensuring 100% contrast) */}
                <div
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{
                    background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.78) 75%, rgba(0,0,0,0.92) 100%)",
                  }}
                />

                {/* Category & Status Label */}
                <div className="absolute right-6 sm:right-12 md:right-16 top-[92px] z-20 flex items-center gap-2">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-mono font-semibold border backdrop-blur-md"
                    style={{
                      backgroundColor: projectTheme.badgeBg,
                      color: projectTheme.badgeText,
                      borderColor: projectTheme.cardBorder,
                    }}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Giant Title (unmasking from below) */}
                <div className="absolute left-4 sm:left-8 md:left-14 bottom-[8vh] z-20 overflow-hidden py-1 max-w-[55vw]">
                  <h2
                    className="font-grotesk font-semibold text-[clamp(48px,9vw,140px)] leading-[0.92] text-white transition-transform duration-75"
                    style={{ transform: `translateY(${(1 - reveal) * 105}%)` }}
                  >
                    {project.title}
                  </h2>
                </div>

                {/* Project Details Box */}
                <div className="absolute right-4 sm:right-8 md:right-14 bottom-[8vh] z-20 w-[min(420px,44vw)] text-[14.5px] leading-relaxed">
                  <p className="text-white/95 mb-4 font-sans text-sm sm:text-base leading-relaxed">
                    {project.overview}
                  </p>

                  <dl className="grid grid-cols-2 gap-3 border-t border-white/20 pt-3 mb-4 text-[13px]">
                    <div>
                      <dt className="font-mono text-[11px] text-white/70 mb-0.5">Role</dt>
                      <dd className="font-medium text-white">{project.role}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[11px] text-white/70 mb-0.5">Where to see it</dt>
                      <dd className="font-medium text-white">{project.whereToSee}</dd>
                    </div>
                  </dl>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center justify-between w-full px-4 py-3 border font-semibold text-sm rounded transition-all backdrop-blur-md hover:scale-[1.02] shadow-lg"
                    style={{
                      borderColor: projectTheme.primaryAccent,
                      backgroundColor: "rgba(0,0,0,0.45)",
                      color: "#FFFFFF",
                    }}
                  >
                    <span>View project case study</span>
                    <span style={{ color: projectTheme.primaryAccent }}>↗</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
