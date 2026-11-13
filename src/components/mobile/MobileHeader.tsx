"use client";

import React, { useState, useEffect, useRef } from "react";
import { PROFILE } from "@/data/portfolioData";
import { Search, Sparkles, Terminal } from "lucide-react";

interface MobileHeaderProps {
  onOpenCmdK?: () => void;
  onOpenSecrets?: () => void;
  onOpenConsole?: () => void;
  onTogglePerf?: () => void;
  onToggleBlueprint?: () => void;
  foundEggsCount?: number;
  totalEggsCount?: number;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  onOpenCmdK,
  onOpenSecrets,
  onOpenConsole,
  onTogglePerf,
  onToggleBlueprint,
  foundEggsCount = 0,
  totalEggsCount = 7,
}) => {
  const [timeStr, setTimeStr] = useState<string>("");
  const [isOnline, setIsOnline] = useState(false);
  const [isLongPressing, setIsLongPressing] = useState(false);
  const [doubleTapFeedback, setDoubleTapFeedback] = useState(false);

  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTapTimeRef = useRef<number>(0);

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const time = new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
        });
        setTimeStr(`${time} IST`);
        const hourIST = new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          hour12: false,
        }).slice(0, 2);
        setIsOnline(Number(hourIST) >= 9 && Number(hourIST) < 23);
      } catch {
        setTimeStr("");
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  // Long-press detection on Brand for Blueprint Mode
  const handleTouchStartLogo = () => {
    setIsLongPressing(true);
    longPressTimerRef.current = setTimeout(() => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("sk:egg", { detail: "blueprint" }));
        window.dispatchEvent(new CustomEvent("sk:blueprint"));
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate(60);
        }
      }
      onToggleBlueprint?.();
      setIsLongPressing(false);
    }, 600);
  };

  const handleTouchEndLogo = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
    setIsLongPressing(false);
  };

  // Double-tap detection on Status Pill for Web Vitals / Perf HUD
  const handleStatusPillTap = () => {
    const now = Date.now();
    if (now - lastTapTimeRef.current < 350) {
      // Double tap triggered!
      setDoubleTapFeedback(true);
      setTimeout(() => setDoubleTapFeedback(false), 800);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("sk:egg", { detail: "perf" }));
        window.dispatchEvent(new CustomEvent("sk:perf"));
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate([40, 40, 40]);
        }
      }
      onTogglePerf?.();
      lastTapTimeRef.current = 0;
    } else {
      lastTapTimeRef.current = now;
    }
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-full bg-[#0B0B0A]/90 backdrop-blur-md border-b border-white/10 px-3.5 py-2.5 transition-colors">
      <div className="flex items-center justify-between gap-2 max-w-lg mx-auto">
        
        {/* Left: Brand with touch-and-hold Easter Egg indicator */}
        <div
          onTouchStart={handleTouchStartLogo}
          onTouchEnd={handleTouchEndLogo}
          onMouseDown={handleTouchStartLogo}
          onMouseUp={handleTouchEndLogo}
          className={`flex items-center gap-1.5 transition-transform duration-200 select-none ${
            isLongPressing ? "scale-95 opacity-80" : "scale-100"
          }`}
          title="Long press for Blueprint Mode"
        >
          <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-mono font-bold text-xs text-[#00D4FF]">
            SK
          </div>
          <span className="font-sans font-semibold text-sm tracking-tight text-white">
            {PROFILE.name.split(" ")[0]}
          </span>
          {isLongPressing && (
            <span className="text-[10px] font-mono text-[#00D4FF] animate-pulse">
              [holding...]
            </span>
          )}
        </div>

        {/* Center: Interactive Status Pill with Double-tap hint */}
        <button
          type="button"
          onClick={handleStatusPillTap}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-mono transition-all active:scale-95 ${
            doubleTapFeedback
              ? "bg-[#00D4FF]/20 border-[#00D4FF] text-[#00D4FF]"
              : "bg-white/[0.04] border-white/10 text-zinc-300"
          }`}
          title="Double tap for Web Vitals HUD"
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isOnline ? "bg-emerald-400 animate-pulse" : "bg-zinc-500"
            }`}
          />
          <span className="truncate max-w-[85px]">{timeStr || "Online"}</span>
          <span className="text-[9px] text-zinc-500 hidden xs:inline">· 2x tap HUD</span>
        </button>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-1.5">
          {/* Terminal Console Trigger (Secret shortcut) */}
          <button
            type="button"
            onClick={onOpenConsole}
            aria-label="Open Mobile Dev Terminal"
            className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-[#00D4FF] active:scale-90 transition-all"
            title="Mobile Dev Console"
          >
            <Terminal className="w-3.5 h-3.5" />
          </button>

          {/* Cmd+K Search Palette Trigger */}
          <button
            type="button"
            onClick={onOpenCmdK}
            aria-label="Open Command Search"
            className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white active:scale-90 transition-all"
            title="Search"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          {/* Secrets Hub Pill */}
          <button
            type="button"
            onClick={onOpenSecrets}
            aria-label="Portfolio Secrets"
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF] text-[11px] font-mono font-medium active:scale-95 transition-all"
            title="Secrets"
          >
            <Sparkles className="w-3 h-3" />
            <span>{foundEggsCount}/{totalEggsCount}</span>
          </button>
        </div>

      </div>
    </header>
  );
};
