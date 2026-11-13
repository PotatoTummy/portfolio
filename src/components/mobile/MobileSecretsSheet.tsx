"use client";

import React from "react";
import { X, Sparkles, ArrowUpRight } from "lucide-react";

interface MobileSecretsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  foundSet?: Set<string>;
  onOpenArcade: () => void;
  onOpenConsole: () => void;
  onTogglePerf: () => void;
  onToggleBlueprint: () => void;
  onGoToArchive: () => void;
}

const MOBILE_HINTS = [
  {
    id: "konami",
    title: "Classic Arcade Code",
    hint: "Tap 'Virtual Gamepad' below, or enter ↑↑↓↓←→←→BA",
    actionLabel: "🎮 Open Gamepad",
    actionKey: "arcade",
  },
  {
    id: "perf",
    title: "Live Web Vitals HUD",
    hint: "Double-tap the IST status pill in header, or shake device",
    actionLabel: "⚡ Toggle HUD",
    actionKey: "perf",
  },
  {
    id: "blueprint",
    title: "Blueprint Render Tokens",
    hint: "Long-press the 'SK' brand logo in the header for 600ms",
    actionLabel: "📐 Toggle Blueprint",
    actionKey: "blueprint",
  },
  {
    id: "diagram",
    title: "System Architecture",
    hint: "Triple-tap any project card, or tap 'Architecture ⚡'",
    actionLabel: null,
    actionKey: null,
  },
  {
    id: "console",
    title: "Developer Console Egg",
    hint: "Tap 'Dev Terminal' below to read the developer note",
    actionLabel: "📟 Dev Terminal",
    actionKey: "console",
  },
  {
    id: "archive",
    title: "The Cutting Room Floor",
    hint: "Tap 'Portfolio 2026' badge 5 times in the footer",
    actionLabel: "🏛️ Warp Archive",
    actionKey: "archive",
  },
  {
    id: "hello",
    title: "Multilingual Greeting",
    hint: "Tap the 'Hello. नमस्ते.' card 5 times in Contact section",
    actionLabel: null,
    actionKey: null,
  },
];

export const MobileSecretsSheet: React.FC<MobileSecretsSheetProps> = ({
  isOpen,
  onClose,
  foundSet,
  onOpenArcade,
  onOpenConsole,
  onTogglePerf,
  onToggleBlueprint,
  onGoToArchive,
}) => {
  if (!isOpen) return null;

  const foundCount = MOBILE_HINTS.filter((h) => foundSet?.has(h.id)).length;
  const totalCount = MOBILE_HINTS.length;

  const triggerAction = (actionKey: string | null) => {
    if (actionKey === "arcade") onOpenArcade();
    else if (actionKey === "console") onOpenConsole();
    else if (actionKey === "perf") onTogglePerf();
    else if (actionKey === "blueprint") onToggleBlueprint();
    else if (actionKey === "archive") onGoToArchive();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-end justify-center p-0 select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#141413] border-t border-white/20 rounded-t-3xl max-h-[88vh] flex flex-col shadow-2xl text-zinc-300 font-mono text-xs overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle Bar & Header */}
        <div className="pt-3 pb-2 px-4 flex flex-col items-center border-b border-white/10 shrink-0">
          <div className="w-10 h-1 bg-white/20 rounded-full mb-3" />
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00D4FF]" />
              <span className="font-bold text-white uppercase tracking-wider text-xs">
                Mobile Secrets &amp; Tools ({foundCount}/{totalCount})
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-zinc-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-4 py-2 bg-white/[0.02] border-b border-white/5 flex items-center justify-between text-[11px]">
          <span className="text-zinc-400">Progress:</span>
          <div className="flex-1 mx-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#00D4FF] transition-all duration-300"
              style={{ width: `${(foundCount / totalCount) * 100}%` }}
            />
          </div>
          <span className="font-bold text-[#00D4FF]">
            {Math.round((foundCount / totalCount) * 100)}%
          </span>
        </div>

        {/* Hints List */}
        <div className="p-4 overflow-y-auto space-y-2.5">
          <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
            Designed as tactile mobile engineering tools and secrets. Can you unlock all 7?
          </p>

          <div className="space-y-2">
            {MOBILE_HINTS.map((h, i) => {
              const isFound = foundSet?.has(h.id);

              return (
                <div
                  key={h.id}
                  className={`p-3 rounded-xl border flex flex-col gap-2 transition-colors ${
                    isFound
                      ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-200"
                      : "bg-white/[0.03] border-white/10 text-zinc-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] opacity-60">0{i + 1}.</span>
                      <span className="font-bold text-white text-xs">{h.title}</span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isFound
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-white/5 text-zinc-500 border border-white/10"
                      }`}
                    >
                      {isFound ? "✓ Found" : "Locked"}
                    </span>
                  </div>

                  <p className="text-[11px] font-sans text-zinc-400 leading-relaxed">
                    {h.hint}
                  </p>

                  {h.actionLabel && (
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => triggerAction(h.actionKey)}
                        className="py-1 px-2.5 rounded-lg bg-white/10 hover:bg-[#00D4FF] hover:text-black border border-white/15 text-[11px] font-mono text-zinc-200 active:scale-95 transition-all inline-flex items-center gap-1.5"
                      >
                        <span>{h.actionLabel}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer padding for safe area */}
        <div className="p-3 text-center text-[10px] text-zinc-600 border-t border-white/10 bg-black/40">
          Tap anywhere outside to close
        </div>
      </div>
    </div>
  );
};
