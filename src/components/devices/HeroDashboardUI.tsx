"use client";

import React from "react";
import { Zap, Search, Bell, CheckCircle2, ArrowUpRight, Activity, ShieldCheck, Cpu } from "lucide-react";

export const HeroDashboardUI: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#FFFFFF] text-[#0F172A] flex flex-col font-sans select-none overflow-hidden text-[11px]">
      {/* Top Application Bar */}
      <div className="h-8 sm:h-11 border-b border-slate-100 bg-white px-2.5 sm:px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2 font-bold tracking-tight text-slate-900">
            <span className="h-4 w-4 sm:h-5 sm:w-5 rounded-md sm:rounded-lg bg-gradient-to-tr from-[#0284C7] to-[#00D4FF] flex items-center justify-center text-[9px] sm:text-[10px] text-white font-extrabold shadow-xs">
              ◆
            </span>
            <span className="text-[11px] sm:text-xs font-grotesk font-semibold">Production Systems Monitor</span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active Mesh · 5 Services
          </span>
        </div>

        {/* Global Search & Avatar */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-400 text-[10px] w-48">
            <Search className="h-3 w-3" />
            <span>Search service logs...</span>
          </div>
          <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
            <Bell className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          </div>
          <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 text-white font-bold text-[8px] sm:text-[9px] flex items-center justify-center">
            SK
          </div>
        </div>
      </div>

      {/* Main Dashboard Stage */}
      <div className="flex-1 p-2 sm:p-4 bg-slate-50/50 flex flex-col gap-2 sm:gap-3 overflow-hidden">
        {/* Real Engineering KPIs Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2.5 shrink-0">
          <div className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between text-slate-500 text-[8px] sm:text-[9px] font-mono">
              <span className="truncate">Feed Frame Rate</span>
              <span className="text-emerald-600 flex items-center font-bold">Verified</span>
            </div>
            <div className="text-xs sm:text-base font-bold font-grotesk text-slate-900 mt-0.5">
              60 FPS
            </div>
            <div className="text-[8px] font-mono text-slate-400 mt-0.5 truncate">
              2,500+ Items Virtualized
            </div>
          </div>

          <div className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between text-slate-500 text-[8px] sm:text-[9px] font-mono">
              <span className="truncate">Web Vitals</span>
              <span className="text-emerald-600 flex items-center font-bold">
                <ArrowUpRight className="h-2 w-2 sm:h-2.5 sm:w-2.5" /> 98 / 100
              </span>
            </div>
            <div className="text-xs sm:text-base font-bold font-grotesk text-slate-900 mt-0.5">
              0.8s LCP
            </div>
            <div className="text-[8px] font-mono text-slate-400 mt-0.5 truncate">
              Zero Cumulative Shift
            </div>
          </div>

          <div className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hidden xs:block">
            <div className="flex items-center justify-between text-slate-500 text-[8px] sm:text-[9px] font-mono">
              <span>Sync Latency</span>
              <span className="text-sky-600 font-bold">P99</span>
            </div>
            <div className="text-xs sm:text-base font-bold font-grotesk text-slate-900 mt-0.5">
              &lt; 40ms
            </div>
            <div className="text-[8px] font-mono text-slate-400 mt-0.5 truncate">
              Socket.IO + Ably Cloud
            </div>
          </div>

          <div className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hidden xs:block">
            <div className="flex items-center justify-between text-slate-500 text-[8px] sm:text-[9px] font-mono">
              <span>Media Stream</span>
              <span className="text-emerald-600 font-bold">Fastify</span>
            </div>
            <div className="text-xs sm:text-base font-bold font-grotesk text-emerald-600 mt-0.5 flex items-center gap-1">
              <Zap className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-emerald-500" />
              18ms Edge
            </div>
            <div className="text-[8px] font-mono text-slate-400 mt-0.5 truncate">
              SSRF Guard Active
            </div>
          </div>
        </div>

        {/* Charts & Breakdown Grid */}
        <div className="flex-1 grid grid-cols-12 gap-2 sm:gap-3 min-h-0">
          {/* Main Spline Area Chart */}
          <div className="col-span-12 sm:col-span-8 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col justify-between">
            <div className="flex items-center justify-between shrink-0 mb-1">
              <div>
                <span className="font-bold text-slate-900 text-xs">Throughput & Frame Budget</span>
                <span className="text-[9px] font-mono text-slate-400 ml-2">16.6ms / frame</span>
              </div>
              <div className="flex items-center gap-1 font-mono text-[9px]">
                <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">FPS</span>
                <span className="px-1.5 py-0.5 rounded bg-[#0284C7] text-white font-semibold">Live</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">P99</span>
              </div>
            </div>

            {/* SVG Wave Chart */}
            <div className="relative flex-1 w-full min-h-[90px]">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 400 120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="heroGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0284C7" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Gridlines */}
                <line x1="0" y1="30" x2="400" y2="30" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="70" x2="400" y2="70" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="110" x2="400" y2="110" stroke="#F1F5F9" strokeWidth="1" />
                {/* Area */}
                <path
                  d="M0,100 C60,90 90,40 150,55 C210,70 240,20 300,35 C350,50 370,15 400,20 L400,120 L0,120 Z"
                  fill="url(#heroGradient)"
                />
                {/* Spline Line */}
                <path
                  d="M0,100 C60,90 90,40 150,55 C210,70 240,20 300,35 C350,50 370,15 400,20"
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Peak Point */}
                <circle cx="300" cy="35" r="3.5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
              </svg>
            </div>

            {/* X-Axis Labels */}
            <div className="flex items-center justify-between text-[8px] font-mono text-slate-400 pt-1 shrink-0">
              <span>0ms</span>
              <span>3.3ms</span>
              <span>6.6ms</span>
              <span>10ms</span>
              <span>13.3ms</span>
              <span>16.6ms (60fps)</span>
            </div>
          </div>

          {/* Right Architecture Breakdown */}
          <div className="hidden sm:flex sm:col-span-4 p-3 rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex-col justify-between">
            <div className="font-bold text-slate-900 text-xs shrink-0">Stack Distribution</div>
            
            {/* Donut Chart Simulation */}
            <div className="flex items-center justify-center gap-3 my-auto py-1">
              <div className="relative w-14 h-14 shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#E2E8F0" strokeWidth="5" />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#0284C7"
                    strokeWidth="5"
                    strokeDasharray="60 40"
                    strokeDashoffset="0"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#00D4FF"
                    strokeWidth="5"
                    strokeDasharray="40 60"
                    strokeDashoffset="-60"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-[9px] text-slate-800">
                  Full
                </div>
              </div>

              <div className="space-y-1 text-[8px] font-mono">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
                  <span>Frontend / Apps (60%)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-[#00D4FF]" />
                  <span>Backend &amp; Queues (40%)</span>
                </div>
              </div>
            </div>

            {/* Live Feed Pill */}
            <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[8px] font-mono text-slate-500 shrink-0">
              <span className="flex items-center gap-1 text-emerald-600 font-semibold truncate">
                <CheckCircle2 className="h-2.5 w-2.5 shrink-0" />
                NestJS BullMQ Queue: Healthy
              </span>
              <span className="shrink-0 text-slate-400">Live</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
