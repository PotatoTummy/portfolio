"use client";

import React, { useState } from "react";
import { Mail, Check, Copy, ArrowUpRight, FileText } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
import { PROFILE } from "@/data/portfolioData";

export const ContactStory: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard?.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer
      id="contact"
      data-chap="Reel 08 · Credits"
      className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 sm:px-8 py-24 select-none"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-xs font-mono text-[#FF5533] uppercase tracking-wider">
          Reel 08 · Credits & Direct Channel
        </div>

        <h2 className="font-serif text-5xl sm:text-7xl lg:text-9xl font-normal text-white tracking-tight leading-[0.92]">
          Let&apos;s make<br />
          the <em className="italic text-[#FF5533] font-normal">next</em> one.
        </h2>

        <p className="font-sans text-base sm:text-xl text-zinc-300 max-w-xl mx-auto leading-relaxed">
          Open for principal frontend engineering, high-scale full-stack systems, or specialized low-latency contracts.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${PROFILE.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#FF5533] px-8 py-4 text-sm sm:text-base font-semibold text-[#0B0B0A] hover:scale-105 hover:-rotate-1 transition-all shadow-[0_0_30px_rgba(255,85,51,0.35)]"
          >
            <span>Start a Conversation</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>

          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-4 text-xs sm:text-sm font-mono text-zinc-200 hover:text-white hover:bg-white/[0.08] transition-all backdrop-blur-md"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-[#FF5533]" />
                <span>{PROFILE.email}</span>
              </>
            )}
          </button>
        </div>

        {/* Footer Meta Strip */}
        <div className="pt-16 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-zinc-400 w-full">
          <div>
            <span>© 2026 {PROFILE.name}</span>
            <span className="mx-2">•</span>
            <span>{PROFILE.location}</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <LinkedinIcon className="h-3.5 w-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1 text-[#FF5533]"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
