"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { FEATURED_PROJECTS, Project } from "@/data/portfolioData";

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

  // Render high-res UI preview for each project canvas
  useEffect(() => {
    canvasRefs.current.forEach((canvas, idx) => {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      if (idx === 0) {
        // Nestys UI
        ctx.fillStyle = "#0D0D0C";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#161615";
        ctx.fillRect(0, 0, w * 0.18, h);
        for (let i = 0; i < 6; i++) {
          ctx.fillStyle = i === 1 ? "#FF5533" : "rgba(255,255,255,0.15)";
          drawRoundRect(ctx, 16, 60 + i * 32, w * 0.18 - 32, 12, 4);
          ctx.fill();
        }
        ctx.fillStyle = "#F3F3EE";
        ctx.font = "600 18px sans-serif";
        ctx.fillText("Nestys Seller Central", w * 0.22, 38);
        for (let i = 0; i < 3; i++) {
          const cx = w * 0.22 + i * (w * 0.25);
          ctx.fillStyle = "#1A1A18";
          drawRoundRect(ctx, cx, 58, w * 0.23, 64, 8);
          ctx.fill();
          ctx.fillStyle = i === 0 ? "#FF5533" : "#F3F3EE";
          drawRoundRect(ctx, cx + 14, 92, w * 0.14, 14, 4);
          ctx.fill();
        }
        const barCount = 12;
        const barWidth = (w * 0.74) / barCount;
        for (let i = 0; i < barCount; i++) {
          const bh = 50 + 60 * Math.sin(i * 1.3);
          ctx.fillStyle = i % 3 === 0 ? "#FF5533" : "rgba(255,85,51,0.45)";
          drawRoundRect(ctx, w * 0.22 + i * barWidth, h - 80 - bh, barWidth - 8, bh, 4);
          ctx.fill();
        }
      } else if (idx === 1) {
        // Scrollr UI
        ctx.fillStyle = "#080808";
        ctx.fillRect(0, 0, w, h);
        const grad = ctx.createLinearGradient(0, 0, w * 0.7, h);
        grad.addColorStop(0, "#FF5533");
        grad.addColorStop(1, "#0B0B0A");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "rgba(255,255,255,0.25)";
        ctx.beginPath();
        ctx.arc(w / 2, h * 0.46, 44, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#FFF";
        ctx.beginPath();
        ctx.moveTo(w / 2 - 10, h * 0.46 - 18);
        ctx.lineTo(w / 2 + 18, h * 0.46);
        ctx.lineTo(w / 2 - 10, h * 0.46 + 18);
        ctx.fill();
      } else if (idx === 2) {
        // WoKataa UI
        ctx.fillStyle = "#0A0A09";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#FF5533";
        drawRoundRect(ctx, 40, 36, (w - 80) * 0.68, 12, 6);
        ctx.fill();
        ctx.fillStyle = "#2B6CFF";
        drawRoundRect(ctx, w / 2 - 120, h * 0.4, 110, 160, 14);
        ctx.fill();
        ctx.fillStyle = "#FF5533";
        drawRoundRect(ctx, w / 2 + 10, h * 0.38, 110, 160, 14);
        ctx.fill();
      } else if (idx === 3) {
        // Earth Air UI
        ctx.fillStyle = "#090908";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#F3F3EE";
        ctx.font = "600 16px sans-serif";
        ctx.fillText("Earth Air Condition — Commercial HVAC", 24, 28);
        ctx.strokeStyle = "#2FD27A";
        ctx.lineWidth = 14;
        ctx.beginPath();
        ctx.arc(w - 140, h * 0.45, 52, 0, Math.PI * 2 * 0.98);
        ctx.stroke();
        ctx.fillStyle = "#2FD27A";
        ctx.font = "700 38px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("98", w - 140, h * 0.45 + 13);
        ctx.textAlign = "left";
      } else {
        // Servotech UI
        ctx.fillStyle = "#0B0B0A";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#F3F3EE";
        ctx.font = "600 17px sans-serif";
        ctx.fillText("Servotech Enterprise — PM Board & HRMS", 24, 38);
        const colW = (w - 70) / 4;
        for (let i = 0; i < 4; i++) {
          ctx.fillStyle = "rgba(255,255,255,0.06)";
          drawRoundRect(ctx, 24 + i * (colW + 8), 58, colW, h - 80, 8);
          ctx.fill();
          ctx.fillStyle = i === 1 ? "#FF5533" : "rgba(255,255,255,0.12)";
          drawRoundRect(ctx, 34 + i * (colW + 8), 96, colW - 20, 44, 6);
          ctx.fill();
        }
      }
    });
  }, []);

  return (
    <>
      {/* Work Intro Banner */}
      <div className="bg-[#EFEAE4] text-[#121211] py-[22vh] px-4 sm:px-8 md:px-12 z-20 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <h2 className="font-grotesk text-[clamp(68px,12.5vw,210px)] font-medium leading-[0.88] text-[#551009]">
            Selected work
          </h2>
          <p className="max-w-[260px] text-[13.5px] leading-relaxed text-[#121211]/70">
            Five products across web, mobile, and APIs, designed and engineered end to end.
          </p>
        </div>
      </div>

      {/* Pinned Full-Bleed Duotone Slides */}
      <section id="work" data-nav="Work" className="relative h-[650vh] w-full bg-[#0B0B0A] select-none z-20">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {/* Chrome Overlay: Counter and Project List */}
          <div className="absolute inset-0 z-30 pointer-events-none text-white px-4 sm:px-8 md:px-12">
            <div className="absolute left-4 sm:left-8 md:left-12 top-[70px] font-sans font-medium text-[clamp(28px,3.2vw,44px)] tracking-tight">
              0{activeIndex + 1}
              <small className="font-mono text-xs opacity-60 ml-2">/ 0{FEATURED_PROJECTS.length}</small>
            </div>

            <ol className="hidden md:grid gap-1 absolute left-[min(34vw,440px)] top-[74px] font-mono text-xs">
              {FEATURED_PROJECTS.map((p, idx) => (
                <li
                  key={p.id}
                  className={`pl-4 relative transition-opacity duration-200 ${
                    idx === activeIndex ? "opacity-100 font-semibold" : "opacity-45"
                  }`}
                >
                  {idx === activeIndex && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-px bg-[#FF5533]" />
                  )}
                  {p.title}
                </li>
              ))}
            </ol>
          </div>

          {/* Project Slides */}
          {FEATURED_PROJECTS.map((project: Project, idx: number) => {
            const reveal = Math.min(1, Math.max(0, activeSlideProgress - idx + 1));
            return (
              <div
                key={project.id}
                className="absolute inset-0 overflow-hidden text-white will-change-[clip-path]"
                style={{
                  zIndex: idx,
                  clipPath: `inset(${(1 - reveal) * 100}% 0 0 0)`,
                }}
              >
                {/* Duotone Canvas Art */}
                <div
                  className="absolute inset-0 will-change-transform"
                  style={{
                    transform: `scale(${1 + (1 - reveal) * 0.2 + (idx < activeSlideProgress ? 0.03 * (activeSlideProgress - idx) : 0)}) translateY(${idx < activeSlideProgress ? -(activeSlideProgress - idx) * 5 : 0}%)`,
                  }}
                >
                  <canvas
                    ref={(el) => {
                      canvasRefs.current[idx] = el;
                    }}
                    width={1200}
                    height={675}
                    className="w-full h-full object-cover filter grayscale contrast-125 brightness-75 block"
                    aria-hidden="true"
                  />
                </div>

                {/* Duotone Multiply & Gradient Overlays */}
                <div
                  className="absolute inset-0 z-10 pointer-events-none mix-blend-multiply"
                  style={{
                    background: "linear-gradient(175deg, #FF5533 0%, #680E06 100%)",
                  }}
                />
                <div
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{
                    background: "linear-gradient(180deg, rgba(11,11,10,0.15) 0%, rgba(11,11,10,0.85) 100%)",
                  }}
                />

                {/* Kind Label */}
                <span className="absolute right-4 sm:right-8 md:right-12 top-[76px] font-mono text-xs text-white/80 z-20">
                  {project.category}
                </span>

                {/* Giant Title (unmasking from below) */}
                <div className="absolute left-4 sm:left-8 md:left-12 bottom-[8vh] z-20 overflow-hidden py-1 max-w-[55vw]">
                  <h2
                    className="font-grotesk font-medium text-[clamp(60px,11vw,190px)] leading-[0.88] text-white transition-transform duration-75"
                    style={{ transform: `translateY(${(1 - reveal) * 105}%)` }}
                  >
                    {project.title}
                  </h2>
                </div>

                {/* Project Details Box */}
                <div className="absolute right-4 sm:right-8 md:right-12 bottom-[8vh] z-20 w-[min(420px,44vw)] text-[14.5px] leading-relaxed">
                  <p className="text-white/90 mb-4">{project.overview}</p>

                  <dl className="grid grid-cols-2 gap-3 border-t border-white/35 pt-3 mb-4 text-[13px]">
                    <div>
                      <dt className="font-mono text-[11px] text-white/60 mb-1">Role</dt>
                      <dd className="font-medium text-white">{project.role}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[11px] text-white/60 mb-1">Where to see it</dt>
                      <dd className="font-medium text-white">{project.whereToSee}</dd>
                    </div>
                  </dl>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center justify-between w-full px-4 py-3 border border-white/80 text-sm font-medium bg-[#0B0B0A]/40 backdrop-blur-md rounded transition-all hover:bg-white hover:text-[#0B0B0A]"
                  >
                    <span>View project case study</span>
                    <span>↗</span>
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

