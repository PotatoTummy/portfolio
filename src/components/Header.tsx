"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PROFILE } from "@/data/portfolioData";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { Search } from "lucide-react";

interface HeaderProps {
  activeSection?: string;
  onOpenCmdK?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection = "Intro", onOpenCmdK }) => {
  const [timeStr, setTimeStr] = useState<string>("IST 16:00");

  useEffect(() => {
    const updateTime = () => {
      try {
        const time = new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
        });
        setTimeStr(`IST ${time}`);
      } catch {
        setTimeStr("IST 16:00");
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3.5 sm:px-8 py-2.5 sm:py-4 font-mono text-xs text-white mix-blend-difference select-none pointer-events-none">
      {/* Brand & Active Section */}
      <div className="flex items-center gap-2 sm:gap-4 pointer-events-auto">
        <Link
          href="#hero"
          className="font-sans font-semibold text-base sm:text-xl tracking-tight text-white hover:opacity-80 transition-opacity"
        >
          {PROFILE.name}
        </Link>
        <span className="w-px h-3.5 sm:h-4 bg-white/30 hidden sm:inline-block" />
        <span className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2 text-zinc-300">
          <span className="inline-block w-1.5 h-1.5 bg-[#00D4FF] rounded-full" />
          <span className="capitalize">{activeSection}</span>
        </span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Clock & Action CTA */}
      <div className="flex items-center gap-2 sm:gap-6 pointer-events-auto">
        <span className="hidden md:inline-block text-zinc-300 font-mono tracking-wide">
          {timeStr}
        </span>

        {onOpenCmdK && (
          <>
            {/* Desktop Cmd+K pill */}
            <button
              onClick={onOpenCmdK}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-white/20 text-zinc-300 hover:text-white hover:border-white/40 transition-colors"
              title="Command Palette"
              aria-label="Open command palette"
            >
              <span>Cmd</span>
              <kbd className="px-1 py-0.2 bg-white/10 rounded text-[10px]">K</kbd>
            </button>

            {/* Mobile search icon button */}
            <button
              onClick={onOpenCmdK}
              className="sm:hidden p-1.5 rounded-lg border border-white/20 text-zinc-200 hover:text-white hover:border-white/40 active:bg-white/10 transition-colors"
              title="Command Palette"
              aria-label="Open search and navigation"
            >
              <Search className="h-3.5 w-3.5" />
            </button>
          </>
        )}

        <LiquidButton
          href="#contact"
          variant="primary"
          icon={false}
          className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs rounded-lg"
        >
          <span className="hidden xs:inline">Start a project</span>
          <span className="xs:hidden">Contact</span>
        </LiquidButton>
      </div>
    </header>
  );
};
