"use client";

import React, { useState, useEffect, useRef } from "react";
import { Zap, CheckCircle2, ArrowUpRight, Activity } from "lucide-react";

interface MobileHeroMonitorProps {
  onCoordsChange?: (coords: { x: string; y: string }) => void;
}

export const MobileHeroMonitor: React.FC<MobileHeroMonitorProps> = ({ onCoordsChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTapRef = useRef<number>(0);
  const [inView, setInView] = useState(true);
  const [fpsHistory, setFpsHistory] = useState<number[]>([59, 60, 60, 58, 60, 59, 60, 60, 60, 59]);
  const [currentFps, setCurrentFps] = useState(60);

  const handleChartDoubleTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 400) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("sk:egg", { detail: "perf" }));
        window.dispatchEvent(new CustomEvent("sk:perf"));
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate([30, 30]);
        }
      }
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = now;
    }
  };

  // IntersectionObserver to pause the 10fps loop when offscreen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Throttled Live FPS generator (runs at 10fps = 100ms interval strictly when in view)
  useEffect(() => {
    if (!inView) return;

    const timer = setInterval(() => {
      // Simulate real browser frame delta around 59-60 with occasional 58
      const jitter = Math.random() > 0.85 ? 58 : Math.random() > 0.4 ? 60 : 59;
      setCurrentFps(jitter);
      setFpsHistory((prev) => [...prev.slice(1), jitter]);
    }, 100);

    return () => clearInterval(timer);
  }, [inView]);

  // Generate SVG path for the wave chart
  const points = fpsHistory.map((val, idx) => {
    const x = (idx / (fpsHistory.length - 1)) * 320;
    // Map 55..60 fps to height 70..10
    const normalized = (val - 55) / 5;
    const y = 65 - normalized * 45;
    return `${x},${y}`;
  });

  const linePath = `M${points.join(" L")}`;
  const areaPath = `M0,80 L${points.join(" L")} L320,80 Z`;

  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl border border-white/15 bg-[#121211] text-[#F3F3EE] p-3.5 space-y-3 shadow-xl relative overflow-hidden select-none"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
          <span className="font-bold text-white tracking-tight">Production Systems Monitor</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Active Mesh</span>
        </div>
      </div>

      {/* 2x2 KPIs Grid */}
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10">
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
            <span>Feed Frame Rate</span>
            <span className="text-emerald-400 font-bold">Verified</span>
          </div>
          <div className="text-base font-bold font-grotesk text-white mt-0.5 flex items-baseline gap-1.5">
            <span>{currentFps} FPS</span>
            <span className="text-[10px] font-mono text-zinc-500 font-normal">16.6ms</span>
          </div>
          <div className="text-[9px] font-mono text-zinc-500">2,500+ Items Virtualized</div>
        </div>

        <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10">
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
            <span>Web Vitals</span>
            <span className="text-emerald-400 font-bold flex items-center">
              <ArrowUpRight className="w-3 h-3" /> 98/100
            </span>
          </div>
          <div className="text-base font-bold font-grotesk text-white mt-0.5">0.8s LCP</div>
          <div className="text-[9px] font-mono text-zinc-500">Zero Cumulative Shift</div>
        </div>

        <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10">
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
            <span>Sync Latency</span>
            <span className="text-[#00D4FF] font-bold">P99</span>
          </div>
          <div className="text-base font-bold font-grotesk text-white mt-0.5">&lt; 40ms</div>
          <div className="text-[9px] font-mono text-zinc-500 truncate">Socket.IO + Ably</div>
        </div>

        <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10">
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
            <span>Edge Stream</span>
            <span className="text-emerald-400 font-bold">Fastify</span>
          </div>
          <div className="text-base font-bold font-grotesk text-emerald-400 mt-0.5 flex items-center gap-1">
            <Zap className="w-3 h-3 fill-emerald-400" />
            <span>18ms Edge</span>
          </div>
          <div className="text-[9px] font-mono text-zinc-500">SSRF Guard Active</div>
        </div>
      </div>

      {/* Live Wave Chart (10fps SVG update - 2x tap to open Web Vitals HUD) */}
      <div
        onClick={handleChartDoubleTap}
        className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5 cursor-pointer active:bg-white/[0.06] transition-colors"
        title="Double-tap for Live Web Vitals HUD"
      >
        <div className="flex items-center justify-between text-[10px] font-mono">
          <span className="font-bold text-zinc-300">Throughput &amp; Frame Budget</span>
          <div className="flex items-center gap-1 text-[9px]">
            <span className="px-1.5 py-0.5 rounded bg-white/10 text-zinc-400">2x tap HUD</span>
            <span className="px-1.5 py-0.5 rounded bg-[#00D4FF]/20 text-[#00D4FF] font-bold">60 FPS</span>
          </div>
        </div>

        <div className="relative w-full h-16">
          <svg className="w-full h-full overflow-hidden" viewBox="0 0 320 80" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mobileFpsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* Gridlines */}
            <line x1="0" y1="20" x2="320" y2="20" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
            <line x1="0" y1="45" x2="320" y2="45" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
            <line x1="0" y1="75" x2="320" y2="75" stroke="rgba(255,255,255,0.12)" />
            {/* Area */}
            <path d={areaPath} fill="url(#mobileFpsGrad)" />
            {/* Spline Line */}
            <path d={linePath} fill="none" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <div className="flex items-center justify-between text-[8px] font-mono text-zinc-500 pt-0.5">
          <span>0ms</span>
          <span>4ms</span>
          <span>8ms</span>
          <span>12ms</span>
          <span>16.6ms (Target)</span>
        </div>
      </div>

      {/* Stack Distribution & Queue Health */}
      <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-[10px] font-mono">
        <div className="flex items-center gap-2">
          {/* Mini Donut */}
          <div className="relative w-8 h-8 shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="#00D4FF"
                strokeWidth="5"
                strokeDasharray="60 40"
                strokeDashoffset="0"
              />
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="#0284C7"
                strokeWidth="5"
                strokeDasharray="40 60"
                strokeDashoffset="-60"
              />
            </svg>
          </div>
          <div className="space-y-0.5">
            <div className="text-zinc-300 font-bold">Stack: 60% Front / 40% Back</div>
            <div className="text-[9px] text-zinc-500">React 19 · NestJS · Redis</div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-emerald-400 font-semibold text-[10px]">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>BullMQ OK</span>
        </div>
      </div>
    </div>
  );
};
