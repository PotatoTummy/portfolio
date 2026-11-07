"use client";

import React from "react";
import { Users, Briefcase, Award, ArrowUpRight, CheckCircle2, Clock, Filter } from "lucide-react";

export const PortalDashboardUI: React.FC = () => {
  const candidates = [
    { name: "Alex Rivera", role: "Sr. Distributed Systems", stage: "Partner Screen", score: "96%", status: "Active" },
    { name: "Elena Rostova", role: "Lead Frontend Architect", stage: "Offer Review", score: "98%", status: "Extended" },
    { name: "Devon Zhang", role: "DevOps & Cloud Infra", stage: "Technical Screen", score: "91%", status: "Scheduled" },
  ];

  return (
    <div className="w-full h-full bg-[#FFFFFF] text-[#0F172A] flex flex-col font-sans select-none overflow-hidden text-[11px]">
      {/* Top Application Bar */}
      <div className="h-11 border-b border-slate-100 bg-white px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-bold tracking-tight text-slate-900">
            <span className="h-5 w-5 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-[10px] text-white font-extrabold shadow-sm">
              N
            </span>
            <span className="text-xs font-grotesk font-semibold">Eureka Central · Enterprise Suite</span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[9px] font-mono px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-600 animate-pulse" />
            12 Active Roles
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
          <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700">
            <Filter className="h-2.5 w-2.5" /> All Departments
          </span>
          <span className="h-6 w-6 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 text-white font-bold text-[9px] flex items-center justify-center">
            EA
          </span>
        </div>
      </div>

      {/* Main Dashboard Stage */}
      <div className="flex-1 p-3.5 sm:p-4 bg-slate-50/60 flex flex-col gap-3 overflow-hidden">
        {/* KPI Stat Cards */}
        <div className="grid grid-cols-4 gap-2.5 shrink-0">
          <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between text-slate-500 text-[9px] font-mono">
              <span>Open Requisitions</span>
              <span className="text-purple-600 font-bold">14 Active</span>
            </div>
            <div className="text-sm sm:text-base font-bold font-grotesk text-slate-900 mt-0.5 flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5 text-purple-600" />
              12 Offers
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between text-slate-500 text-[9px] font-mono">
              <span>Candidates</span>
              <span className="text-emerald-600 flex items-center font-bold">
                <ArrowUpRight className="h-2.5 w-2.5" /> +24%
              </span>
            </div>
            <div className="text-sm sm:text-base font-bold font-grotesk text-slate-900 mt-0.5 flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-sky-600" />
              2,490
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between text-slate-500 text-[9px] font-mono">
              <span>Acceptance Rate</span>
              <span className="text-emerald-600 font-bold">Q4 High</span>
            </div>
            <div className="text-sm sm:text-base font-bold font-grotesk text-emerald-600 mt-0.5 flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5" />
              92.4%
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between text-slate-500 text-[9px] font-mono">
              <span>Velocity</span>
              <span className="text-purple-600 font-bold">Fast</span>
            </div>
            <div className="text-sm sm:text-base font-bold font-grotesk text-slate-900 mt-0.5 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-amber-500" />
              4.2 Days
            </div>
          </div>
        </div>

        {/* Pipeline Stages & Candidate Cards */}
        <div className="flex-1 grid grid-cols-12 gap-3 min-h-0">
          {/* Funnel Pipeline Visual */}
          <div className="col-span-7 p-3 rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col justify-between">
            <div className="flex items-center justify-between shrink-0 mb-1.5">
              <span className="font-bold text-slate-900 text-xs">Conversion Funnel</span>
              <span className="text-[9px] font-mono text-purple-600 bg-purple-50 px-2 py-0.5 rounded font-semibold">
                Live Pipeline
              </span>
            </div>

            {/* Stage Step Progress Bars */}
            <div className="space-y-2 my-auto">
              <div>
                <div className="flex justify-between text-[8px] font-mono text-slate-600 mb-0.5">
                  <span>1. Application Ingest</span>
                  <span className="font-bold text-slate-900">2,490 (100%)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full w-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[8px] font-mono text-slate-600 mb-0.5">
                  <span>2. Automated Code Screening</span>
                  <span className="font-bold text-slate-900">842 (34%)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full w-[34%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[8px] font-mono text-slate-600 mb-0.5">
                  <span>3. System Design Duel</span>
                  <span className="font-bold text-slate-900">184 (7.4%)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-sky-600 rounded-full w-[16%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[8px] font-mono text-slate-600 mb-0.5">
                  <span>4. Final Offer Extended</span>
                  <span className="font-bold text-emerald-600">42 (1.7%)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[8%]" />
                </div>
              </div>
            </div>

            <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[8px] font-mono text-slate-400 shrink-0">
              <span>Zero drop-off at contract stage</span>
              <span className="text-emerald-600 font-semibold">● 100% SLA Met</span>
            </div>
          </div>

          {/* Recent Candidate Shortlist */}
          <div className="col-span-5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col justify-between">
            <div className="font-bold text-slate-900 text-xs shrink-0 mb-1">Top Matches</div>

            <div className="space-y-1.5 my-auto">
              {candidates.map((c, i) => (
                <div key={i} className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-[9px]">{c.name}</div>
                    <div className="text-[8px] text-slate-500 font-mono truncate max-w-[90px]">{c.role}</div>
                  </div>
                  <div className="text-right font-mono">
                    <span className="px-1.5 py-0.2 rounded text-[7px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                      {c.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[8px] font-mono text-slate-500 shrink-0">
              <span className="text-purple-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-2.5 w-2.5" />
                Ready to review
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
