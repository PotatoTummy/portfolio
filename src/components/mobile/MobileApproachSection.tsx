"use client";

import React, { useState, useEffect, useRef } from "react";
import { Cpu, ShieldCheck, Gauge, CheckCircle2, Terminal, Layers, ArrowUpRight, Activity } from "lucide-react";
import { useInView } from "framer-motion";

const CODE_LINES = [
  "@Controller('v1/orders')",
  "export class OrdersController {",
  "  @Post('checkout')",
  "  async process(@Body() dto: CheckoutDto) {",
  "    await this.queueService.addJob('lock', dto.sku);",
  "    return this.orderService.executeOrder(dto);",
  "  }",
  "}",
];

export const MobileApproachSection: React.FC = () => {
  const codeCardRef = useRef<HTMLDivElement>(null);
  const isCodeInView = useInView(codeCardRef, { once: true, amount: 0.3 });
  const [typedLines, setTypedLines] = useState<number>(0);

  // Single-shot code typewriter trigger when Phase 02 enters view
  useEffect(() => {
    if (!isCodeInView) return;

    let current = 0;
    const interval = setInterval(() => {
      current++;
      setTypedLines(current);
      if (current >= CODE_LINES.length) {
        clearInterval(interval);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [isCodeInView]);

  return (
    <section
      id="approach"
      className="w-full py-12 px-4 bg-[#EFEAE4] text-[#121211] select-none border-t border-[#121211]/15"
    >
      <div className="max-w-lg mx-auto w-full space-y-6">
        
        {/* Section Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#0284C7] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
            <span>03 / Engineering &amp; Approach</span>
          </div>
          <h2 className="font-grotesk text-3xl font-medium tracking-tight text-[#121211]">
            How I Build
          </h2>
          <p className="text-xs text-[#121211]/80 font-sans leading-relaxed">
            From design systems and typed APIs to zero-downtime scaling.
          </p>
        </div>

        {/* Stacked Sticky Overlapping Cards */}
        <div className="space-y-4 pt-2">
          
          {/* Card 01: Design & UX */}
          <div
            className="sticky top-16 z-10 rounded-2xl border border-[#121211]/15 bg-white p-5 space-y-3.5 shadow-lg"
          >
            <div className="flex items-center justify-between border-b border-[#121211]/10 pb-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0284C7]">
                <span className="w-6 h-6 rounded-md bg-[#0284C7] text-white flex items-center justify-center text-[10px]">
                  01
                </span>
                <span>System Architecture &amp; UX</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 font-semibold border border-sky-200">
                Phase 01
              </span>
            </div>

            <h3 className="font-grotesk text-lg font-bold text-[#121211] tracking-tight">
              Thoughtful visual systems before writing code.
            </h3>

            <p className="text-xs text-[#121211]/80 font-sans leading-relaxed">
              Design tokens, state hierarchies, and accessibility standards mapped before implementation begins.
            </p>

            {/* Wireframe Mockup Preview */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-[#0284C7]" />
                  <span>app.component.spec.tsx</span>
                </div>
                <span className="text-emerald-600 font-bold">100% Type-Safe</span>
              </div>

              <div className="grid grid-cols-4 gap-1.5 pt-1">
                <div className="h-7 rounded bg-sky-100/70 border border-sky-200 p-1 flex flex-col justify-between">
                  <span className="h-1 w-6 bg-sky-400 rounded-full" />
                  <span className="h-1 w-10 bg-sky-300 rounded-full" />
                </div>
                <div className="h-7 rounded bg-indigo-100/70 border border-indigo-200 p-1 flex flex-col justify-between">
                  <span className="h-1 w-6 bg-indigo-400 rounded-full" />
                  <span className="h-1 w-8 bg-indigo-300 rounded-full" />
                </div>
                <div className="h-7 rounded bg-emerald-100/70 border border-emerald-200 p-1 flex flex-col justify-between">
                  <span className="h-1 w-5 bg-emerald-400 rounded-full" />
                  <span className="h-1 w-7 bg-emerald-300 rounded-full" />
                </div>
                <div className="h-7 rounded bg-amber-100/70 border border-amber-200 p-1 flex flex-col justify-between">
                  <span className="h-1 w-6 bg-amber-400 rounded-full" />
                  <span className="h-1 w-9 bg-amber-300 rounded-full" />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {["React 19", "Figma Tokens", "Tailwind 4", "WCAG AA Contrast"].map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-md bg-[#121211]/5 border border-[#121211]/10 text-[10px] font-mono text-[#121211]/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Card 02: Full-Stack Code & APIs */}
          <div
            ref={codeCardRef}
            className="sticky top-20 z-20 rounded-2xl border border-[#121211]/20 bg-[#121211] text-[#F3F3EE] p-5 space-y-3.5 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#10B981]">
                <span className="w-6 h-6 rounded-md bg-[#10B981] text-black flex items-center justify-center text-[10px] font-black">
                  02
                </span>
                <span>Full-Stack Engineering</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                Phase 02
              </span>
            </div>

            <h3 className="font-grotesk text-lg font-bold text-white tracking-tight">
              Strictly typed foundations &amp; zero silent `any`.
            </h3>

            {/* Single-Shot Typewriter Code Window */}
            <div className="p-3 rounded-xl bg-black/60 border border-white/15 font-mono text-[11px] space-y-1 overflow-hidden">
              <div className="flex items-center justify-between text-[9px] text-zinc-500 pb-1 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-[#00D4FF]" />
                  <span>api/gateway/orders.controller.ts</span>
                </div>
                <span className="text-emerald-400 font-bold">● TypeScript 5.6</span>
              </div>

              <div className="pt-1 text-[10px] leading-relaxed">
                {CODE_LINES.slice(0, Math.max(1, typedLines)).map((line, i) => (
                  <div key={i} className="text-zinc-300">
                    {line.startsWith("@") ? (
                      <span className="text-[#00D4FF] font-semibold">{line}</span>
                    ) : line.includes("export") ? (
                      <span className="text-sky-300">{line}</span>
                    ) : line.includes("await") ? (
                      <span className="text-amber-300">{line}</span>
                    ) : line.includes("return") ? (
                      <span className="text-emerald-300">{line}</span>
                    ) : (
                      line
                    )}
                  </div>
                ))}
                {typedLines < CODE_LINES.length && (
                  <span className="inline-block w-1.5 h-3 bg-[#00D4FF] animate-pulse ml-0.5" />
                )}
              </div>
            </div>

            {/* Microservice Badges */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
              <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                <div className="text-emerald-400 font-bold">Postgres</div>
                <div className="text-zinc-500 text-[9px]">Prisma ORM</div>
              </div>
              <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                <div className="text-[#00D4FF] font-bold">Redis</div>
                <div className="text-zinc-500 text-[9px]">BullMQ Jobs</div>
              </div>
              <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                <div className="text-amber-400 font-bold">Sockets</div>
                <div className="text-zinc-500 text-[9px]">&lt;40ms Sync</div>
              </div>
            </div>
          </div>

          {/* Card 03: Speed & Precision */}
          <div
            className="sticky top-24 z-30 rounded-2xl border border-[#0284C7]/40 bg-white p-5 space-y-3.5 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#121211]/10 pb-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#F59E0B]">
                <span className="w-6 h-6 rounded-md bg-[#F59E0B] text-white flex items-center justify-center text-[10px] font-black">
                  03
                </span>
                <span>60 FPS Speed &amp; Reliability</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold border border-amber-200">
                Phase 03
              </span>
            </div>

            <h3 className="font-grotesk text-lg font-bold text-[#121211] tracking-tight">
              Sub-second LCP &amp; zero double-booking concurrency.
            </h3>

            {/* CWV Score Row */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-xl font-bold font-grotesk text-emerald-600">98/100</div>
                <div className="text-[10px] font-mono text-slate-700 font-semibold">PageSpeed</div>
                <div className="text-[8px] text-slate-500">Sub-800ms LCP</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-xl font-bold font-grotesk text-sky-600">60 FPS</div>
                <div className="text-[10px] font-mono text-slate-700 font-semibold">Feed Motion</div>
                <div className="text-[8px] text-slate-500">2,500+ Items</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-xl font-bold font-grotesk text-indigo-600">0s</div>
                <div className="text-[10px] font-mono text-slate-700 font-semibold">Downtime</div>
                <div className="text-[8px] text-slate-500">CI/CD Deploy</div>
              </div>
            </div>

            {/* Telemetry Progress Meter */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <Activity className="w-3 h-3 text-emerald-600" />
                  <span>Largest Contentful Paint (LCP)</span>
                </div>
                <span className="text-emerald-600 font-bold">0.6s (Optimal)</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[95%] rounded-full" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
