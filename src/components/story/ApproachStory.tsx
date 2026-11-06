"use client";

import React, { useState } from "react";
import { 
  Network, Layers, Gauge, Rocket, CheckCircle2, RefreshCw 
} from "lucide-react";

interface ApproachStoryProps {
  progress?: number;
  activeStep?: number;
}

export const APPROACH_STEPS = [
  {
    step: "01",
    badge: "01 Architect",
    discipline: "Backend Architecture",
    title: "System Topology & Distributed Queues",
    desc: "Data contracts, Redis event streams, and caching tiers decided before the first UI component is written.",
    icon: Network,
  },
  {
    step: "02",
    badge: "02 Build",
    discipline: "Frontend Craftsmanship",
    title: "Typed Interfaces & 60 FPS Motion Physics",
    desc: "Strict TypeScript contracts with spring physics and gesture choreography only where it provides tactile feedback.",
    icon: Layers,
  },
  {
    step: "03",
    badge: "03 Tune",
    discipline: "Performance Profiling",
    title: "Frame Budgets & Sub-50ms Telemetry",
    desc: "Virtualization, garbage collection cycles, and Core Web Vitals measured under synthetic throttling.",
    icon: Gauge,
  },
  {
    step: "04",
    badge: "04 Ship",
    discipline: "DevOps & SRE",
    title: "Automated Zero-Downtime Pipelines",
    desc: "Containerized CI/CD, blue-green deployment verification, and instant rollback safety guards.",
    icon: Rocket,
  },
];

export const ApproachStory: React.FC<ApproachStoryProps> = ({
  progress = 0,
  activeStep = 0,
}) => {
  const currentStep = APPROACH_STEPS[activeStep] || APPROACH_STEPS[0];
  const [pulseCount, setPulseCount] = useState(148);

  return (
    <section id="approach" data-nav="Approach" className="relative min-h-[420vh] w-full bg-[#0B0B0A] select-none z-10">
      <div className="sticky top-0 h-[100svh] overflow-hidden px-6 sm:px-12 md:px-16 pt-24 pb-8 flex flex-col justify-between">
        
        {/* Top Header Strip (Safe distance from fixed global navigation) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-[#00D4FF]">
            <span className="w-2 h-2 bg-[#00D4FF] animate-pulse" />
            <span className="uppercase tracking-wider font-bold">03 / Engineering Methodology</span>
          </div>

          {/* Centered Step Indicator (Safely positioned away from top right) */}
          <div className="flex items-center gap-2 font-mono text-xs">
            {APPROACH_STEPS.map((s, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all duration-300 ${
                  idx === activeStep
                    ? "bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/50 font-semibold shadow-[0_0_15px_rgba(0,212,255,0.25)]"
                    : "text-zinc-500 border border-white/5 bg-white/[0.02]"
                }`}
              >
                <span>{s.step}</span>
                <span className="hidden md:inline">{s.badge.replace(/^\d+\s*/, "")}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Minimal Frontend & Backend Dual-Discipline Bar */}
        <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto w-full pt-2">
          <div
            className={`p-3 rounded-lg border transition-all duration-300 ${
              activeStep === 1 || activeStep === 2
                ? "bg-[#00D4FF]/10 border-[#00D4FF]/40 text-white"
                : "bg-white/[0.02] border-white/10 text-zinc-400"
            }`}
          >
            <div className="font-mono text-[11px] font-bold text-[#00D4FF] uppercase tracking-wider flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF]" />
              Frontend Architecture
            </div>
            <div className="text-xs sm:text-sm font-medium mt-0.5">
              Tactile 60 FPS Interfaces · Sub-Second LCP · Gesture Physics
            </div>
          </div>

          <div
            className={`p-3 rounded-lg border transition-all duration-300 ${
              activeStep === 0 || activeStep === 3
                ? "bg-[#00D4FF]/10 border-[#00D4FF]/40 text-white"
                : "bg-white/[0.02] border-white/10 text-zinc-400"
            }`}
          >
            <div className="font-mono text-[11px] font-bold text-[#00D4FF] uppercase tracking-wider flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF]" />
              Backend Architecture
            </div>
            <div className="text-xs sm:text-sm font-medium mt-0.5">
              Distributed NestJS Microservices · BullMQ Queues · Redis 7
            </div>
          </div>
        </div>

        {/* Creative Center Stage: Dynamic Interactive Engineering Laboratory */}
        <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto w-full">
          
          {/* Left Column: Stage Narrative */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#00D4FF]/15 border border-[#00D4FF]/30 font-mono text-[11px] text-[#00D4FF] font-semibold">
              {React.createElement(currentStep.icon, { className: "h-3.5 w-3.5" })}
              <span>{currentStep.discipline}</span>
            </div>

            <h2 className="font-grotesk text-2xl sm:text-4xl font-medium text-white tracking-tight leading-[1.08]">
              {currentStep.title}
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {currentStep.desc}
            </p>

            {/* Quick Metrics Badges for Active Phase */}
            <div className="pt-1 flex flex-wrap gap-2 text-xs font-mono">
              {activeStep === 0 && (
                <>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-zinc-300">BullMQ Streams</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-zinc-300">Nginx Gateway</span>
                  <span className="px-2.5 py-1 rounded bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">&lt;10ms Gateway</span>
                </>
              )}
              {activeStep === 1 && (
                <>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-zinc-300">Strict TypeScript</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-zinc-300">Reanimated 3</span>
                  <span className="px-2.5 py-1 rounded bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">60 FPS Native</span>
                </>
              )}
              {activeStep === 2 && (
                <>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-zinc-300">CLS = 0.00</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-zinc-300">LCP 0.4s</span>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">100/100 Lighthouse</span>
                </>
              )}
              {activeStep === 3 && (
                <>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-zinc-300">Docker Healthcheck</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-zinc-300">GitHub Actions</span>
                  <span className="px-2.5 py-1 rounded bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">0s Downtime</span>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Creative Visualizer Card */}
          <div className="lg:col-span-7 bg-[#101214] border border-white/15 rounded-2xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
            
            {/* Ambient Cyan Corner Glow */}
            <div
              className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-[#00D4FF]/15 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            {/* STEP 0: ARCHITECT - Dynamic Live Node Mesh */}
            {activeStep === 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs border-b border-white/10 pb-2.5">
                  <span className="flex items-center gap-2 text-[#00D4FF] font-semibold">
                    <Network className="h-4 w-4" />
                    <span>Distributed Microservices Mesh</span>
                  </span>
                  <button
                    onClick={() => setPulseCount((p) => p + 1)}
                    className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] hover:bg-emerald-500/20 transition-colors"
                  >
                    <RefreshCw className="h-2.5 w-2.5 animate-spin" />
                    <span>Emit Pulse #{pulseCount}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 py-1">
                  {[
                    { title: "Nginx Gateway", role: "SSL / Rate Limiting", ping: "1.2ms", color: "#00D4FF" },
                    { title: "NestJS Cluster", role: "9 Domain Services", ping: "8.4ms", color: "#38BDF8" },
                    { title: "BullMQ / Redis", role: "Async Event Stream", ping: "2.1ms", color: "#10B981" },
                    { title: "PostgreSQL RDS", role: "Partitioned Storage", ping: "3.5ms", color: "#A855F7" },
                  ].map((node, i) => (
                    <div key={i} className="p-3.5 rounded-xl border border-white/10 bg-black/60 space-y-1 relative group hover:border-[#00D4FF]/40 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white text-xs">{node.title}</span>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: node.color }} />
                      </div>
                      <div className="font-mono text-[11px] text-zinc-400">{node.role}</div>
                      <div className="font-mono text-[10px] text-[#00D4FF] pt-0.5">ping: {node.ping}</div>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-black/70 border border-white/10 font-mono text-xs text-zinc-300 flex items-center justify-between">
                  <span className="text-zinc-400">Stream Contract:</span>
                  <span className="text-[#00D4FF]">[Gateway] &rarr; [BullMQ Stream] &rarr; [RDS]</span>
                </div>
              </div>
            )}

            {/* STEP 1: BUILD - Tactile Spring Physics Sandbox */}
            {activeStep === 1 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs border-b border-white/10 pb-2.5">
                  <span className="flex items-center gap-2 text-[#00D4FF] font-semibold">
                    <Layers className="h-4 w-4" />
                    <span>Tactile Spring Physics Engine</span>
                  </span>
                  <span className="text-cyan-400 font-semibold">60 FPS Locked</span>
                </div>

                <div className="p-4 rounded-xl bg-black/70 border border-white/10 font-mono text-xs space-y-2 text-zinc-300">
                  <div className="text-zinc-500 text-[11px]">{"// Reanimated 3 Spring Calibration"}</div>
                  <div><span className="text-[#00D4FF]">const</span> springConfig = &#123;</div>
                  <div className="pl-4 text-zinc-300">
                    stiffness: <span className="text-[#00D4FF]">320</span>, damping: <span className="text-[#00D4FF]">28</span>, mass: <span className="text-[#00D4FF]">0.8</span>
                  </div>
                  <div>&#125;;</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl border border-white/10 bg-black/50">
                    <div className="text-zinc-400 text-xs font-mono">Frame Latency</div>
                    <div className="text-2xl font-bold font-mono text-white mt-0.5">&lt; 16.6ms</div>
                    <div className="text-[10px] text-emerald-400 mt-0.5">Zero dropped frames</div>
                  </div>
                  <div className="p-3.5 rounded-xl border border-white/10 bg-black/50">
                    <div className="text-zinc-400 text-xs font-mono">Virtualized Buffer</div>
                    <div className="text-2xl font-bold font-mono text-white mt-0.5">2,500+ Items</div>
                    <div className="text-[10px] text-cyan-400 mt-0.5">Windowed flatlist memory</div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: TUNE - Real-Time Telemetry & Core Web Vitals */}
            {activeStep === 2 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs border-b border-white/10 pb-2.5">
                  <span className="flex items-center gap-2 text-[#00D4FF] font-semibold">
                    <Gauge className="h-4 w-4" />
                    <span>Real-Time Performance Telemetry</span>
                  </span>
                  <span className="text-emerald-400 font-semibold">Verified</span>
                </div>

                <div className="grid grid-cols-3 gap-3 py-1">
                  <div className="p-3.5 rounded-xl border border-white/10 bg-black/50 text-center">
                    <div className="text-3xl font-bold font-mono text-emerald-400">100</div>
                    <div className="font-mono text-[10px] text-zinc-400 mt-1">Lighthouse</div>
                  </div>
                  <div className="p-3.5 rounded-xl border border-white/10 bg-black/50 text-center">
                    <div className="text-3xl font-bold font-mono text-emerald-400">0.00</div>
                    <div className="font-mono text-[10px] text-zinc-400 mt-1">CLS (Shift)</div>
                  </div>
                  <div className="p-3.5 rounded-xl border border-white/10 bg-black/50 text-center">
                    <div className="text-3xl font-bold font-mono text-[#00D4FF]">&lt;40ms</div>
                    <div className="font-mono text-[10px] text-zinc-400 mt-1">Multiplayer Ping</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-zinc-300 flex items-center justify-between">
                  <span className="text-zinc-400">First Contentful Paint (FCP)</span>
                  <span className="text-emerald-400 font-bold">0.4s · Instant Paint</span>
                </div>
              </div>
            )}

            {/* STEP 3: SHIP - CI/CD & Automated Pipeline */}
            {activeStep === 3 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs border-b border-white/10 pb-2.5">
                  <span className="flex items-center gap-2 text-[#00D4FF] font-semibold">
                    <Rocket className="h-4 w-4" />
                    <span>Zero-Downtime Deployment</span>
                  </span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Healthy
                  </span>
                </div>

                <div className="space-y-2 py-1">
                  {[
                    { label: "Git Push to Main Branch", status: "Triggered (SHA 9b82f1)" },
                    { label: "Docker Multi-Stage Build", status: "Built in 14.2s (Zero Bloat)" },
                    { label: "Zero-Downtime Blue-Green Swap", status: "Live Without Interruption" },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-black/50 border border-white/10 font-mono text-xs">
                      <span className="text-zinc-300">{step.label}</span>
                      <span className="text-cyan-400 text-[11px] font-semibold">{step.status}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 font-mono text-xs text-emerald-400 text-center">
                  Live Deployment Active · Rollback Safety Guard Armed
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section Footnote */}
        <div className="flex items-center justify-between border-t border-white/10 pt-3 font-mono text-xs text-zinc-500">
          <span>03 / 04 Methodology Progression</span>
          <span className="text-[#00D4FF]">Scroll to advance phase &rarr;</span>
        </div>
      </div>
    </section>
  );
};
