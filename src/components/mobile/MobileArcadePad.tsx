"use client";

import React, { useState } from "react";
import { X, Gamepad2 } from "lucide-react";

interface MobileArcadePadProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const KONAMI_SEQUENCE = ["UP", "UP", "DOWN", "DOWN", "LEFT", "RIGHT", "LEFT", "RIGHT", "B", "A"];

export const MobileArcadePad: React.FC<MobileArcadePadProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [failed, setFailed] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  if (!isOpen) return null;

  const handleInput = (key: string) => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(30);
    }

    if (key === KONAMI_SEQUENCE[currentStep]) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setFailed(false);

      if (nextStep === KONAMI_SEQUENCE.length) {
        setUnlocked(true);
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate([60, 60, 120]);
        }
        setTimeout(() => {
          onSuccess();
        }, 1000);
      }
    } else {
      // Wrong key pressed
      setFailed(true);
      setCurrentStep(key === KONAMI_SEQUENCE[0] ? 1 : 0);
      setTimeout(() => setFailed(false), 500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xs bg-[#181817] border border-white/20 rounded-3xl p-5 shadow-2xl space-y-4 text-center text-white relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="flex items-center justify-center gap-2 pt-1 font-mono text-xs text-[#00D4FF] font-semibold">
          <Gamepad2 className="w-4 h-4" />
          <span>VIRTUAL ARCADE CONTROLLER</span>
        </div>

        <p className="text-[11px] font-sans text-zinc-300">
          Enter the classic 80s arcade sequence to unlock the Secret Archive.
        </p>

        {/* Sequence Progress Display */}
        <div className="flex items-center justify-center gap-1 py-1">
          {KONAMI_SEQUENCE.map((key, idx) => {
            const isDone = idx < currentStep;
            const isCurrent = idx === currentStep;
            return (
              <span
                key={idx}
                className={`w-5 h-5 rounded flex items-center justify-center font-mono text-[9px] font-bold border ${
                  isDone
                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                    : isCurrent
                    ? failed
                      ? "bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse"
                      : "bg-[#00D4FF]/20 border-[#00D4FF] text-[#00D4FF] scale-110"
                    : "bg-white/5 border-white/10 text-zinc-600"
                }`}
              >
                {key === "UP" ? "↑" : key === "DOWN" ? "↓" : key === "LEFT" ? "←" : key === "RIGHT" ? "→" : key}
              </span>
            );
          })}
        </div>

        {unlocked && (
          <div className="py-2 text-emerald-400 font-mono text-xs font-bold animate-bounce">
            🎉 CODE ACCEPTED! WARPING TO ARCHIVE...
          </div>
        )}

        {/* Retro Gamepad Controls */}
        <div className="pt-2 grid grid-cols-2 gap-4 items-center">
          {/* Left: D-Pad */}
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            {/* UP */}
            <button
              type="button"
              onClick={() => handleInput("UP")}
              className="absolute top-0 w-9 h-9 rounded-t-lg bg-zinc-800 border-t border-x border-zinc-600 flex items-center justify-center text-zinc-300 active:bg-[#00D4FF] active:text-black font-bold text-sm"
            >
              ▲
            </button>
            {/* LEFT */}
            <button
              type="button"
              onClick={() => handleInput("LEFT")}
              className="absolute left-0 w-9 h-9 rounded-l-lg bg-zinc-800 border-l border-y border-zinc-600 flex items-center justify-center text-zinc-300 active:bg-[#00D4FF] active:text-black font-bold text-sm"
            >
              ◀
            </button>
            {/* CENTER */}
            <div className="w-9 h-9 bg-zinc-800 border border-zinc-700 rounded-sm" />
            {/* RIGHT */}
            <button
              type="button"
              onClick={() => handleInput("RIGHT")}
              className="absolute right-0 w-9 h-9 rounded-r-lg bg-zinc-800 border-r border-y border-zinc-600 flex items-center justify-center text-zinc-300 active:bg-[#00D4FF] active:text-black font-bold text-sm"
            >
              ▶
            </button>
            {/* DOWN */}
            <button
              type="button"
              onClick={() => handleInput("DOWN")}
              className="absolute bottom-0 w-9 h-9 rounded-b-lg bg-zinc-800 border-b border-x border-zinc-600 flex items-center justify-center text-zinc-300 active:bg-[#00D4FF] active:text-black font-bold text-sm"
            >
              ▼
            </button>
          </div>

          {/* Right: B & A Action Buttons */}
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => handleInput("B")}
              className="w-12 h-12 rounded-full bg-rose-700/80 border-2 border-rose-500 shadow-lg flex items-center justify-center text-white font-mono font-bold text-base active:scale-90 active:bg-rose-500"
            >
              B
            </button>
            <button
              type="button"
              onClick={() => handleInput("A")}
              className="w-12 h-12 rounded-full bg-rose-700/80 border-2 border-rose-500 shadow-lg flex items-center justify-center text-white font-mono font-bold text-base active:scale-90 active:bg-rose-500"
            >
              A
            </button>
          </div>
        </div>

        <div className="text-[10px] font-mono text-zinc-500 pt-1">
          Order: ↑ ↑ ↓ ↓ ← → ← → B A
        </div>
      </div>
    </div>
  );
};
