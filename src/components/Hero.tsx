"use client";

import React, { useEffect, useState } from "react";
import { Terminal, Layers, Cpu, Activity, ShieldCheck, Zap } from "lucide-react";
import { PROFILE } from "@/data/portfolioData";

export const Hero: React.FC = () => {
  const [fps, setFps] = useState(60);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const measureFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(measureFps);
    };

    animId = requestAnimationFrame(measureFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-white/[0.06]">
      {/* Ambient background glow & subtle grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-amber-500/10 via-orange-500/10 to-transparent blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top telemetry & HUD pill */}
        <div className="mb-6 inline-flex flex-wrap items-center gap-3 rounded-full border border-white/[0.1] bg-white/[0.03] px-3.5 py-1.5 backdrop-blur-md">
          <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-300">
            <Activity className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-zinc-500">RUNTIME:</span>
            <span className="text-emerald-400 font-semibold">{fps} FPS</span>
          </div>
          <span className="h-3 w-[1px] bg-white/20 hidden sm:block" />
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-zinc-400">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-zinc-500">LCP:</span>
            <span className="text-zinc-300">0.4s</span>
          </div>
          <span className="h-3 w-[1px] bg-white/20 hidden md:block" />
          <div className="hidden md:flex items-center gap-1.5 text-xs font-mono text-zinc-400">
            <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-zinc-500">STACK:</span>
            <span className="text-zinc-300">Next.js 16 · React 19 · TypeScript</span>
          </div>
        </div>

        {/* Main Title & Manifesto */}
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            Frontend-heavy full stack engineer building{" "}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">
              distributed microservices & high-scale portals.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-zinc-300 leading-relaxed max-w-3xl">
            Currently at <a href={PROFILE.currentCompany.url} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 decoration-amber-400/60 hover:decoration-amber-400 font-medium">{PROFILE.currentCompany.name}</a>. 
            I build enterprise multi-portal suites (Nestys), 60fps algorithm-free mobile video engines (Scrollr), and real-time multiplayer backends (WoKataa). 
            Deeply invested in sub-50ms render latency, clean architecture, and type-safe systems.
          </p>

          {/* Quick Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-white text-zinc-900 font-semibold px-5 py-3 text-sm shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:bg-zinc-200 transition-all"
            >
              <Layers className="h-4 w-4" />
              Explore Systems & Code
            </a>

            <a
              href="#terminal"
              className="inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300 font-medium px-5 py-3 text-sm hover:bg-amber-500/20 hover:border-amber-500/50 transition-all"
            >
              <Terminal className="h-4 w-4" />
              Run Live API Terminal
            </a>

            <a
              href="#architecture"
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] text-zinc-300 font-medium px-4 py-3 text-sm hover:bg-white/[0.08] hover:text-white transition-all"
            >
              <Cpu className="h-4 w-4" />
              System Architecture
            </a>
          </div>
        </div>

        {/* Highlighted Proof Numbers Grid */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {PROFILE.stats.map((stat, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 sm:p-5 backdrop-blur-sm hover:border-white/[0.15] transition-all group"
            >
              <div className="font-mono text-2xl sm:text-3xl font-extrabold text-white group-hover:text-amber-400 transition-colors">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-zinc-400 leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
