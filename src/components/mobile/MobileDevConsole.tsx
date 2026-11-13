"use client";

import React, { useEffect, useState } from "react";
import { X, Check, Copy } from "lucide-react";
import { PROFILE } from "@/data/portfolioData";

interface MobileDevConsoleProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDevConsole: React.FC<MobileDevConsoleProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("sk:egg", { detail: "console" }));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 select-none"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md bg-[#0B0B0A] border-t sm:border border-white/20 sm:rounded-2xl rounded-t-2xl max-h-[85vh] flex flex-col shadow-2xl text-zinc-300 font-mono text-xs overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-black/60 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-[11px] font-semibold text-zinc-400 pl-2">
              developer-console.sh
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

        {/* Terminal Body */}
        <div className="p-4 overflow-y-auto space-y-3 font-mono text-[11px] leading-relaxed text-zinc-300">
          <div className="text-emerald-400 font-bold">
            $ samad-cli --inspect --mobile
          </div>

          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-[#00D4FF] space-y-1">
            <div className="font-bold text-xs">👋 Hey there, inspector.</div>
            <div className="text-zinc-300 text-[11px]">
              You found the mobile console egg. Nice instincts!
            </div>
          </div>

          <p className="text-zinc-300">
            I&apos;m <strong className="text-white">Samad Kausar</strong> — I build the kind of interfaces that make people look twice, backed by distributed systems that don&apos;t fall over.
          </p>

          <div className="p-3 rounded-lg bg-black/50 border border-white/10 space-y-1.5 text-[10px]">
            <div className="text-zinc-500 uppercase tracking-wider font-bold">
              Engineering Specs
            </div>
            <div>• Core Stack: React 19, Next.js, TypeScript, NestJS</div>
            <div>• Real-Time: Redis, BullMQ, Socket.IO, Fastify</div>
            <div>• Performance: Sub-second LCP, 98/100 Core Web Vitals</div>
            <div>• Location: Gorakhpur, UP, India (Open to Remote / Hybrid)</div>
          </div>

          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#00D4FF] text-[#0B0B0A] font-semibold text-xs active:scale-95 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy samadkausar786@gmail.com"}</span>
            </button>
          </div>

          <div className="text-[10px] text-zinc-500 text-center pt-2">
            Status: ✓ Console Easter Egg unlocked &amp; saved!
          </div>
        </div>
      </div>
    </div>
  );
};
