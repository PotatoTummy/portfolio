"use client";

import React from "react";
import { Server, Activity, Database, ShieldCheck, ArrowUpRight, Cpu, Network, CheckCircle2 } from "lucide-react";

export const PortalDashboardUI: React.FC = () => {
  const services = [
    { name: "API Gateway Cluster", status: "Healthy", latency: "1.2ms", load: "18%" },
    { name: "BullMQ Event Stream", status: "Active", latency: "4.8ms", load: "34%" },
    { name: "PostgreSQL Replica Pool", status: "Synced", latency: "2.1ms", load: "28%" },
  ];

  return (
    <div className="w-full h-full bg-[#FFFFFF] text-[#0F172A] flex flex-col font-sans select-none overflow-hidden text-[11px]">
      {/* Top Application Bar */}
      <div className="h-11 border-b border-slate-100 bg-white px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-bold tracking-tight text-slate-900">
            <span className="h-5 w-5 rounded-lg bg-gradient-to-tr from-[#0284C7] to-[#00D4FF] flex items-center justify-center text-[10px] text-white font-extrabold shadow-sm">
              ◆
            </span>
            <span className="text-xs font-grotesk font-semibold">Enterprise Core · Systems & Topology</span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            99.995% Uptime SLA
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
          <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700">
            <Network className="h-2.5 w-2.5 text-[#0284C7]" /> Multi-Cloud Mesh
          </span>
          <span className="h-6 w-6 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 text-white font-bold text-[9px] flex items-center justify-center">
            SYS
          </span>
        </div>
      </div>

      {/* Main Dashboard Stage */}
      <div className="flex-1 p-3.5 sm:p-4 bg-slate-50/60 flex flex-col gap-3 overflow-hidden">
        {/* KPI Stat Cards */}
        <div className="grid grid-cols-4 gap-2.5 shrink-0">
          <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between text-slate-500 text-[9px] font-mono">
              <span>Event Throughput</span>
              <span className="text-emerald-600 font-bold flex items-center">
                <ArrowUpRight className="h-2.5 w-2.5" /> +14.2%
              </span>
            </div>
            <div className="text-sm sm:text-base font-bold font-grotesk text-slate-900 mt-0.5 flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5 text-[#0284C7]" />
              124.5k req/s
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between text-slate-500 text-[9px] font-mono">
              <span>Microservices</span>
              <span className="text-[#0284C7] font-bold">18 Total</span>
            </div>
            <div className="text-sm sm:text-base font-bold font-grotesk text-slate-900 mt-0.5 flex items-center gap-1.5">
              <Server className="h-3.5 w-3.5 text-emerald-600" />
              All Healthy
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between text-slate-500 text-[9px] font-mono">
              <span>Queue Latency</span>
              <span className="text-emerald-600 font-bold">Optimal</span>
            </div>
            <div className="text-sm sm:text-base font-bold font-grotesk text-emerald-600 mt-0.5 flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5" />
              &lt;12ms
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between text-slate-500 text-[9px] font-mono">
              <span>Storage Mesh</span>
              <span className="text-[#0284C7] font-bold">Replicated</span>
            </div>
            <div className="text-sm sm:text-base font-bold font-grotesk text-slate-900 mt-0.5 flex items-center gap-1.5">
              <Database className="h-3.5 w-3.5 text-indigo-600" />
              Zero Loss
            </div>
          </div>
        </div>

        {/* Distributed Architecture Pipeline & Service Health */}
        <div className="flex-1 grid grid-cols-12 gap-3 min-h-0">
          {/* Architecture Stream Stages */}
          <div className="col-span-7 p-3 rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col justify-between">
            <div className="flex items-center justify-between shrink-0 mb-1.5">
              <span className="font-bold text-slate-900 text-xs">Event Streaming Pipeline</span>
              <span className="text-[9px] font-mono text-[#0284C7] bg-sky-50 px-2 py-0.5 rounded font-semibold">
                Live Pulse
              </span>
            </div>

            {/* Pipeline Step Progress Bars */}
            <div className="space-y-2 my-auto">
              <div>
                <div className="flex justify-between text-[8px] font-mono text-slate-600 mb-0.5">
                  <span>1. Edge Ingress & Rate Limiting</span>
                  <span className="font-bold text-slate-900">100% Delivered · 0.8ms</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-[#0284C7] rounded-full w-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[8px] font-mono text-slate-600 mb-0.5">
                  <span>2. Schema Validation & Auth Contract</span>
                  <span className="font-bold text-slate-900">99.98% Pass · 2.1ms</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full w-[96%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[8px] font-mono text-slate-600 mb-0.5">
                  <span>3. BullMQ Distributed Job Queues</span>
                  <span className="font-bold text-slate-900">8.4k jobs/sec · 4.2ms</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full w-[82%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[8px] font-mono text-slate-600 mb-0.5">
                  <span>4. Multi-Region Database Commit</span>
                  <span className="font-bold text-emerald-600">Zero Conflict Write · 3.5ms</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-full" />
                </div>
              </div>
            </div>

            <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[8px] font-mono text-slate-400 shrink-0">
              <span>Deterministic concurrency controls</span>
              <span className="text-emerald-600 font-semibold">● Sub-15ms Roundtrip</span>
            </div>
          </div>

          {/* Core Services Monitor */}
          <div className="col-span-5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col justify-between">
            <div className="font-bold text-slate-900 text-xs shrink-0 mb-1">Service Mesh Status</div>

            <div className="space-y-1.5 my-auto">
              {services.map((s, i) => (
                <div key={i} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-[9px]">{s.name}</div>
                    <div className="text-[8px] text-slate-500 font-mono">Load: {s.load} · Ping: {s.latency}</div>
                  </div>
                  <div className="text-right font-mono">
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      {s.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[8px] font-mono text-slate-500 shrink-0">
              <span className="text-[#0284C7] font-semibold flex items-center gap-1">
                <ShieldCheck className="h-2.5 w-2.5" />
                Zero Vulnerabilities
              </span>
              <span>TLS 1.3 Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
