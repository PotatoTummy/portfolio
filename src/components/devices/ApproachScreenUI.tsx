"use client";

import React from "react";
import { Layers, Terminal, Activity, CheckCircle2, Cpu, Zap, ArrowUpRight } from "lucide-react";

interface ApproachScreenUIProps {
  phase: number; // 0: Design & UX, 1: Code & Architecture, 2: Speed & Performance
}

export const ApproachScreenUI: React.FC<ApproachScreenUIProps> = ({ phase }) => {
  return (
    <div className="w-full h-full bg-[#FFFFFF] text-[#0F172A] flex flex-col font-sans select-none overflow-hidden text-[11px]">
      {/* Top Application Bar */}
      <div className="h-10 border-b border-slate-100 bg-white px-3 sm:px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-md bg-[#0284C7] flex items-center justify-center text-[9px] text-white font-extrabold shadow-xs">
            {phase === 0 ? "01" : phase === 1 ? "02" : "03"}
          </span>
          <span className="font-mono text-[10px] font-semibold text-slate-800">
            {phase === 0
              ? "Phase 01 · Architecture & UX Wireframes"
              : phase === 1
              ? "Phase 02 · Full-Stack Code & APIs"
              : "Phase 03 · 60 FPS Speed & Reliability"}
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[9px]">
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Verified Pipeline
          </span>
        </div>
      </div>

      {/* Main Screen Content Viewport */}
      <div className="flex-1 p-3.5 sm:p-5 bg-slate-50/70 overflow-hidden flex flex-col justify-between">
        {phase === 0 && (
          <div className="space-y-3 h-full flex flex-col justify-between">
            {/* Visual Design Grid Preview */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-1">
                <div className="flex items-center gap-1.5 text-sky-600 font-mono text-[9px] font-bold">
                  <Layers className="h-3 w-3" />
                  <span>UI System</span>
                </div>
                <div className="font-bold text-slate-900 text-xs">Tailwind & Radix</div>
                <div className="text-[9px] text-slate-500">Accessible design tokens</div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-1">
                <div className="flex items-center gap-1.5 text-indigo-600 font-mono text-[9px] font-bold">
                  <Cpu className="h-3 w-3" />
                  <span>State Mesh</span>
                </div>
                <div className="font-bold text-slate-900 text-xs">Zustand & TanStack</div>
                <div className="text-[9px] text-slate-500">Predictable client data</div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-600 font-mono text-[9px] font-bold">
                  <Zap className="h-3 w-3" />
                  <span>Fluid Motion</span>
                </div>
                <div className="font-bold text-slate-900 text-xs">Framer Motion</div>
                <div className="text-[9px] text-slate-500">Natural physical springs</div>
              </div>
            </div>

            {/* Wireframe Mockup Canvas */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <span className="font-mono text-[9px] text-slate-400 ml-1">app.component.spec.tsx</span>
                </div>
                <span className="text-[9px] font-mono text-sky-600">Strict TypeScript</span>
              </div>

              <div className="grid grid-cols-4 gap-2 pt-2">
                <div className="h-10 rounded-lg bg-sky-50 border border-sky-100 p-2 flex flex-col justify-between">
                  <span className="h-1.5 w-10 bg-sky-300 rounded-full" />
                  <span className="h-1.5 w-16 bg-sky-200 rounded-full" />
                </div>
                <div className="h-10 rounded-lg bg-indigo-50 border border-indigo-100 p-2 flex flex-col justify-between">
                  <span className="h-1.5 w-10 bg-indigo-300 rounded-full" />
                  <span className="h-1.5 w-14 bg-indigo-200 rounded-full" />
                </div>
                <div className="h-10 rounded-lg bg-emerald-50 border border-emerald-100 p-2 flex flex-col justify-between">
                  <span className="h-1.5 w-8 bg-emerald-300 rounded-full" />
                  <span className="h-1.5 w-12 bg-emerald-200 rounded-full" />
                </div>
                <div className="h-10 rounded-lg bg-amber-50 border border-amber-100 p-2 flex flex-col justify-between">
                  <span className="h-1.5 w-10 bg-amber-300 rounded-full" />
                  <span className="h-1.5 w-14 bg-amber-200 rounded-full" />
                </div>
              </div>

              <div className="font-mono text-[9px] text-slate-400 pt-1 flex items-center justify-between">
                <span>Wireframe to pixel-perfect delivery without friction</span>
                <span className="text-emerald-600 font-bold">100% Type-Safe</span>
              </div>
            </div>
          </div>
        )}

        {phase === 1 && (
          <div className="space-y-3 h-full flex flex-col justify-between">
            {/* Live Terminal & Typed Engine */}
            <div className="p-3.5 rounded-xl bg-[#0F172A] text-slate-200 font-mono text-[10px] space-y-1.5 flex-1 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-2 text-[9px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Terminal className="h-3 w-3 text-cyan-400" />
                  <span>api/gateway/router.controller.ts</span>
                </div>
                <span className="text-emerald-400 font-bold">● TypeScript 5.6</span>
              </div>
              <div className="space-y-0.5 pt-1 text-[9.5px]">
                <div className="text-purple-300">
                  <span className="text-sky-400">@Controller</span>(&apos;v1/orders&apos;)
                </div>
                <div>
                  <span className="text-blue-400">export class</span> <span className="text-yellow-300">OrdersController</span> &#123;
                </div>
                <div className="pl-3 text-slate-300">
                  <span className="text-purple-300">@Post</span>(&apos;checkout&apos;)
                </div>
                <div className="pl-3">
                  <span className="text-blue-400">async</span> <span className="text-sky-300">process</span>(@Body() dto: <span className="text-emerald-300">CheckoutDto</span>): Promise&lt;<span className="text-emerald-300">OrderReceipt</span>&gt; &#123;
                </div>
                <div className="pl-6 text-slate-400">
                  <span className="text-sky-400">await</span> this.queueService.<span className="text-sky-300">addJob</span>(&apos;inventory_lock&apos;, dto.sku);
                </div>
                <div className="pl-6 text-emerald-400">
                  return this.orderService.<span className="text-sky-300">executeOrder</span>(dto);
                </div>
                <div className="pl-3">&#125;</div>
                <div>&#125;</div>
              </div>
            </div>

            {/* Microservice & Database Health Status */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <div className="font-mono text-[9px] truncate">
                  <div className="font-bold text-slate-900">PostgreSQL</div>
                  <div className="text-slate-400">Prisma ORM</div>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <div className="font-mono text-[9px] truncate">
                  <div className="font-bold text-slate-900">Redis Cache</div>
                  <div className="text-slate-400">BullMQ Queues</div>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <div className="font-mono text-[9px] truncate">
                  <div className="font-bold text-slate-900">WebSockets</div>
                  <div className="text-slate-400">&lt;40ms Response</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {phase === 2 && (
          <div className="space-y-3 h-full flex flex-col justify-between">
            {/* Speed & CWV Metric Meters */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-xs text-center flex flex-col items-center justify-center">
                <div className="text-xl font-bold font-grotesk text-emerald-600">98 / 100</div>
                <div className="text-[9px] font-mono text-slate-800 font-semibold mt-0.5">Google PageSpeed</div>
                <div className="text-[8px] text-slate-400">Sub-second First Paint</div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-xs text-center flex flex-col items-center justify-center">
                <div className="text-xl font-bold font-grotesk text-sky-600">60 FPS</div>
                <div className="text-[9px] font-mono text-slate-800 font-semibold mt-0.5">Fluid Motion</div>
                <div className="text-[8px] text-slate-400">Hardware Acceleration</div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-xs text-center flex flex-col items-center justify-center">
                <div className="text-xl font-bold font-grotesk text-indigo-600">0s</div>
                <div className="text-[9px] font-mono text-slate-800 font-semibold mt-0.5">Downtime CI/CD</div>
                <div className="text-[8px] text-slate-400">Automated GitHub Actions</div>
              </div>
            </div>

            {/* Performance Telemetry Graph */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold text-slate-800">
                  <Activity className="h-3 w-3 text-emerald-600" />
                  <span>Real-Time Vitals Telemetry</span>
                </div>
                <span className="text-[9px] font-mono text-emerald-600 font-bold">100% Pass Rate</span>
              </div>

              <div className="py-2">
                <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 mb-1">
                  <span>Largest Contentful Paint (LCP)</span>
                  <span className="text-emerald-600 font-bold">0.6s (Optimal)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[95%]" />
                </div>
              </div>

              <div className="font-mono text-[9px] text-slate-400 pt-1 flex items-center justify-between">
                <span>Production ready for high-load platforms</span>
                <span className="text-sky-600 font-semibold flex items-center gap-1">
                  Ready for Showcase <ArrowUpRight className="h-2.5 w-2.5" />
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
