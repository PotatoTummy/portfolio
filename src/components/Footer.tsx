"use client";

import React from "react";
import { Mail } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { PROFILE } from "@/data/portfolioData";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#080807] py-12 text-zinc-400 text-xs font-mono">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-white/[0.06]">
          {/* Identity Column */}
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-sm tracking-tight mb-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              {PROFILE.name}
            </div>
            <p className="text-zinc-400 font-sans leading-relaxed text-xs">
              {PROFILE.subHeadline}
            </p>
            <div className="mt-4 text-[11px] text-zinc-500">
              Stack: Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript, Framer Motion.
            </div>
          </div>

          {/* Quick Contact & Channels */}
          <div>
            <div className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Direct Channels
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <Mail className="h-3.5 w-3.5 text-zinc-500" />
                  {PROFILE.email}
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <GithubIcon className="h-3.5 w-3.5 text-zinc-500" />
                  github.com/PotatoTummy
                </a>
              </li>
            </ul>
          </div>

          {/* Standards & Philosophy */}
          <div>
            <div className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Engineering Commitments
            </div>
            <ul className="space-y-1.5 text-[11px] text-zinc-400">
              <li>• Zero layout shift (Cumulative Layout Shift = 0)</li>
              <li>• Sub-50ms user action response budget</li>
              <li>• Strict TypeScript without unverified <code className="text-amber-400">any</code> types</li>
              <li>• Resilience via distributed queues & retry policies</li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Telemetry */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500">
          <div>
            © 2026 {PROFILE.name}. Built with care & craftsmanship.
          </div>
          <div className="flex items-center gap-2 font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>ALL SYSTEMS VERIFIED HEALTHY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
