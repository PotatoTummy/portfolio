"use client";

import React from "react";
import Link from "next/link";
import { ArrowDown, Mail, FileText, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { PROFILE } from "@/data/portfolioData";

export const HeroStory: React.FC = () => {
  const firstName = "Samad";
  const lastName = "Kausar";

  return (
    <section
      id="hero"
      data-chap="Reel 00 · Opening"
      className="relative min-h-[92svh] flex flex-col items-center justify-center text-center px-4 pt-16 pb-12 select-none overflow-hidden"
    >
      {/* Subtle Top Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md px-3.5 py-1 text-xs font-mono text-zinc-300 mb-6 shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-[#FF5533] animate-ping" />
        <span>Full Stack Developer · Frontend Heavy</span>
      </div>

      {/* Main Expressive Headline */}
      <h1
        aria-label="Samad Kausar"
        className="font-serif text-6xl sm:text-8xl md:text-9xl lg:text-[140px] font-normal tracking-tight text-[#F3F3EE] leading-[0.88] max-w-5xl mx-auto"
      >
        <span className="block overflow-hidden pb-1 sm:pb-3">
          {firstName.split("").map((char, i) => (
            <span
              key={i}
              className="inline-block transition-transform hover:-translate-y-2 hover:text-[#FF5533] duration-300"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {char}
            </span>
          ))}
          {" "}
          {lastName.split("").map((char, i) => (
            <span
              key={i}
              className="inline-block transition-transform hover:-translate-y-2 hover:text-[#FF5533] duration-300"
              style={{ transitionDelay: `${(i + 5) * 30}ms` }}
            >
              {char}
            </span>
          ))}
        </span>
      </h1>

      {/* Tagline */}
      <p className="mt-6 sm:mt-8 font-sans text-base sm:text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto leading-relaxed font-normal">
        I build interfaces that feel <em className="italic text-[#FF5533] font-serif font-normal">finished</em>, on backends that don&apos;t flinch.
      </p>

      {/* Current Role Indicator */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 font-mono text-xs text-zinc-400">
        <span>Stack-IT Technologies</span>
        <span>•</span>
        <span>9 Microservices</span>
        <span>•</span>
        <span>60 FPS Mobile Reels</span>
        <span>•</span>
        <span>Sub-40ms Sync</span>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3">
        <a
          href="#projects"
          className="inline-flex items-center gap-2 rounded-full bg-[#FF5533] px-6 py-3 text-xs sm:text-sm font-semibold text-[#0B0B0A] hover:scale-105 transition-all shadow-[0_0_25px_rgba(255,85,51,0.35)]"
        >
          <span>Explore Featured Reels</span>
          <ArrowDown className="h-4 w-4" />
        </a>

        <a
          href={`mailto:${PROFILE.email}`}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-xs sm:text-sm font-medium text-zinc-200 hover:bg-white/[0.08] hover:text-white transition-all backdrop-blur-md"
        >
          <Mail className="h-4 w-4 text-[#FF5533]" />
          <span>Start Conversation</span>
        </a>

        <a
          href={PROFILE.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] p-3 text-zinc-300 hover:text-white hover:border-white/25 transition-all"
          title="GitHub Profile"
        >
          <GithubIcon className="h-4 w-4" />
        </a>
      </div>

      {/* Vertical Drip Indicator */}
      <div className="mt-12 flex flex-col items-center gap-2 text-[10px] font-mono text-zinc-400">
        <span>Scroll to enter story</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-[#FF5533] to-transparent animate-pulse" />
      </div>
    </section>
  );
};
