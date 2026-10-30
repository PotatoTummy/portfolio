"use client";

import React from "react";
import { Terminal, Download, Search } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { PROFILE } from "@/data/portfolioData";

interface HeaderProps {
  onOpenCmdK: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCmdK }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#0a0a0a]/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Identity & Status */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 font-mono font-bold text-sm shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            SK
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold tracking-tight text-white text-sm sm:text-base">
                {PROFILE.name}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for Roles
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 hidden md:block">
              {PROFILE.role}
            </p>
          </div>
        </div>

        {/* Nav Links & Shortcuts */}
        <nav className="hidden md:flex items-center gap-6 text-xs text-zinc-400">
          <a href="#projects" className="hover:text-white transition-colors">
            Featured Systems
          </a>
          <a href="#architecture" className="hover:text-white transition-colors">
            System Design
          </a>
          <a href="#skills" className="hover:text-white transition-colors">
            Tech Arsenal
          </a>
          <a href="#terminal" className="hover:text-white transition-colors flex items-center gap-1 text-amber-400/90 hover:text-amber-300">
            <Terminal className="h-3.5 w-3.5" />
            Live API Terminal
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenCmdK}
            className="flex items-center gap-2 rounded-lg border border-white/[0.1] bg-white/[0.04] px-2.5 py-1.5 text-xs text-zinc-300 hover:border-white/[0.2] hover:bg-white/[0.08] transition-all"
            aria-label="Search and command palette"
          >
            <Search className="h-3.5 w-3.5 text-zinc-400" />
            <span className="hidden sm:inline text-zinc-400">Cmd</span>
            <kbd className="hidden sm:inline rounded bg-white/[0.08] px-1.5 py-0.5 text-[10px] font-mono text-zinc-300">
              K
            </kbd>
          </button>

          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-zinc-400 hover:text-white hover:border-white/[0.2] transition-colors"
            title="GitHub Profile"
          >
            <GithubIcon className="h-4 w-4" />
          </a>

          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 text-xs font-medium text-amber-400 hover:bg-amber-500/20 hover:border-amber-500/50 transition-all shadow-[0_0_12px_rgba(245,158,11,0.1)]"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden xs:inline">Resume</span>
          </a>
        </div>
      </div>
    </header>
  );
};
