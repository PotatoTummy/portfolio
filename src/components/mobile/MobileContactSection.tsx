"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Copy, Check, ArrowUp, ArrowUpRight } from "lucide-react";
import { PROFILE } from "@/data/portfolioData";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";

interface MobileContactSectionProps {
  onHelloClick?: () => void;
  onArchiveClick?: () => void;
}

const GREETINGS = ["Hello.", "Bonjour.", "Hola.", "Ciao.", "Hej.", "Olá.", "नमस्ते."];

export const MobileContactSection: React.FC<MobileContactSectionProps> = ({
  onHelloClick,
  onArchiveClick,
}) => {
  const [copied, setCopied] = useState(false);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [helloTapCount, setHelloTapCount] = useState(0);
  const [footerTapCount, setFooterTapCount] = useState(0);
  const [timeStr, setTimeStr] = useState("Gorakhpur 19:48");

  // Cycle greetings smoothly
  useEffect(() => {
    const timer = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  // Update IST Clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const time = new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
        });
        setTimeStr(`Gorakhpur ${time}`);
      } catch {
        setTimeStr("Gorakhpur 19:48");
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(PROFILE.email);
    setCopied(true);
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(30);
    }
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGreetingTap = () => {
    const next = helloTapCount + 1;
    setHelloTapCount(next);
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(25);
    }
    if (next >= 5) {
      setHelloTapCount(0);
      onHelloClick?.();
    }
  };

  const handleFooterTap = () => {
    const next = footerTapCount + 1;
    setFooterTapCount(next);
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(25);
    }
    if (next >= 5) {
      setFooterTapCount(0);
      onArchiveClick?.();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="contact"
      className="w-full pt-12 pb-28 px-4 bg-[#0B0B0A] text-[#00D4FF] select-none border-t border-white/10 content-auto"
      style={{
        background: "radial-gradient(100% 50% at 50% 0%, rgba(0, 212, 255, 0.14), transparent 75%), #0B0B0A",
      }}
    >
      <div className="max-w-lg mx-auto w-full space-y-6">
        
        {/* Top Header Strip */}
        <div className="flex items-center justify-between font-mono text-xs text-[#00D4FF]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00D4FF]" />
            <span className="uppercase tracking-wider font-semibold">05 / Contact</span>
          </div>
          <span className="tracking-wider">{timeStr}</span>
        </div>

        {/* Large Editorial Headline */}
        <h2 className="font-grotesk text-5xl font-medium leading-[0.92] text-[#00D4FF] tracking-tight">
          A project<br />in mind?
        </h2>

        {/* Full-Width Divider */}
        <div className="w-full border-t border-[#00D4FF]/30 my-2" />

        {/* Large Email CTA Button */}
        <div className="rounded-2xl border border-[#00D4FF]/30 bg-[#00D4FF]/[0.05] p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-[#00D4FF]/70">
            <span>Direct Email</span>
            <span>Worldwide / Remote</span>
          </div>

          <a
            href={`mailto:${PROFILE.email}`}
            className="block text-xl font-grotesk font-semibold text-white break-all hover:text-[#00D4FF] transition-colors"
          >
            {PROFILE.email}
          </a>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="flex-1 min-h-[44px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#00D4FF] text-[#0B0B0A] font-semibold text-xs active:scale-[0.98] transition-transform"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied to Clipboard!" : "Copy Email Address"}</span>
            </button>

            <a
              href={`mailto:${PROFILE.email}`}
              className="min-h-[44px] flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-white/10 border border-white/20 text-white font-mono text-xs active:scale-[0.98] transition-transform"
            >
              <span>Compose</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Experience Strip */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-3 font-mono text-xs">
          <div className="text-[11px] uppercase tracking-wider text-[#00D4FF]/70 font-bold">
            Experience
          </div>
          <div className="space-y-2.5">
            <div>
              <div className="font-semibold text-white">Stack-IT Technologies</div>
              <div className="text-zinc-400 text-[11px]">
                Full Stack Developer (Frontend Heavy) · April 2026 – Present
              </div>
            </div>
            <div className="border-t border-white/5 pt-2">
              <div className="font-semibold text-white">W3villa Technologies</div>
              <div className="text-zinc-400 text-[11px]">
                Frontend Engineer · 2024 – 2026
              </div>
            </div>
          </div>
        </div>

        {/* Quick Social & CV Links */}
        <div className="grid grid-cols-3 gap-2">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] flex flex-col items-center justify-center p-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-xs active:scale-95 transition-all text-center gap-1"
          >
            <GithubIcon className="w-4 h-4 text-[#00D4FF]" />
            <span>GitHub ↗</span>
          </a>

          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] flex flex-col items-center justify-center p-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-xs active:scale-95 transition-all text-center gap-1"
          >
            <LinkedinIcon className="w-4 h-4 text-[#00D4FF]" />
            <span>LinkedIn ↗</span>
          </a>

          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] flex flex-col items-center justify-center p-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-xs active:scale-95 transition-all text-center gap-1"
          >
            <span className="text-[#00D4FF] font-bold">CV</span>
            <span>Resume ↗</span>
          </a>
        </div>

        {/* Giant Cycling Greeting (Hello Easter Egg) */}
        <div
          onClick={handleGreetingTap}
          className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center cursor-pointer active:scale-95 transition-transform space-y-1 relative overflow-hidden"
        >
          <div className="font-grotesk text-5xl font-semibold text-[#00D4FF] tracking-tight">
            {GREETINGS[greetingIndex]}
          </div>
          <div className="text-[11px] font-mono text-zinc-400 pt-1">
            {helloTapCount > 0 ? (
              <span className="text-white font-bold">
                Secret Greeting Progress: {helloTapCount}/5...
              </span>
            ) : (
              <span>Tap 5 times to unlock a secret surprise</span>
            )}
          </div>
        </div>

        {/* Footer Editorial Strip & Back to Top */}
        <div className="flex flex-col items-center justify-center gap-3 pt-4 border-t border-white/10 text-[11px] font-mono text-zinc-500 text-center">
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

          <div
            onClick={handleFooterTap}
            className="cursor-pointer active:scale-95 transition-transform px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-zinc-400"
          >
            <span>&copy; 2026 {PROFILE.name}</span>
            {footerTapCount > 0 && (
              <span className="text-[#00D4FF] ml-1.5 font-bold">({footerTapCount}/5)</span>
            )}
          </div>

          <div className="text-zinc-600 text-[10px]">
            Designed &amp; Engineered with Next.js 15, React 19 &amp; Framer Motion
          </div>
        </div>

      </div>
    </section>
  );
};
