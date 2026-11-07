"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IPhoneMockup } from "@/components/devices/IPhoneMockup";
import { Sparkles, Zap, ShieldCheck, Heart, MessageCircle, Share2, Bookmark, Music, CheckCircle2 } from "lucide-react";

interface StudioStoryProps {
  progress?: number;
}

interface ReelItem {
  id: string;
  videoSrc: string;
  fallbackImage: string;
  handle: string;
  caption: string;
  tag: string;
  likes: string;
  comments: string;
  shares: string;
  audioTrack: string;
}

const REELS: ReelItem[] = [
  {
    id: "01",
    videoSrc: "/videos/reel-1.mp4",
    fallbackImage: "/projects/screens/scrollr-white-screen.png",
    handle: "craft.design",
    tag: "Design & Craft",
    caption: "Thoughtful visual aesthetics & pixel-perfect craft under one roof ✨",
    likes: "24.8k",
    comments: "842",
    shares: "1.9k",
    audioTrack: "Original Audio — Studio Soundscape",
  },
  {
    id: "02",
    videoSrc: "/videos/reel-2.mp4",
    fallbackImage: "/projects/screens/scrollr-white-screen.png",
    handle: "fluid.motion",
    tag: "Speed & Fluidity",
    caption: "Tactile 60fps gesture animations & micro-interactions with Framer Motion ⚡",
    likes: "42.1k",
    comments: "1.2k",
    shares: "3.8k",
    audioTrack: "Synthesizer Flow — 128 BPM",
  },
  {
    id: "03",
    videoSrc: "/videos/reel-3.mp4",
    fallbackImage: "/projects/screens/scrollr-white-screen.png",
    handle: "scale.modern",
    tag: "Modern Standards",
    caption: "Clean typed foundations & zero bloated abstractions built to last 🛡️",
    likes: "67.4k",
    comments: "2.4k",
    shares: "8.6k",
    audioTrack: "Ambient Chill — Deep Focus",
  },
];

export const StudioStory: React.FC<StudioStoryProps> = ({ progress = 0 }) => {
  // Simple, human, clear principles inspired by modern design studios (Webdrift)
  const principles = [
    {
      id: "01",
      icon: Sparkles,
      lead: "Design & Craft",
      highlight: "Design and code under one roof.",
      detail:
        "Great digital products happen when visual aesthetics and technical craft work together from day one. No awkward handoffs — just thoughtful design and clean, maintainable code.",
    },
    {
      id: "02",
      icon: Zap,
      lead: "Speed & Fluidity",
      highlight: "Fast, smooth, and delightful.",
      detail:
        "Instant page loads, smooth transitions, and tactile animations powered by Framer Motion. Every interaction is carefully tuned to feel natural across all devices.",
    },
    {
      id: "03",
      icon: ShieldCheck,
      lead: "Modern Standards",
      highlight: "Clean foundations built to last.",
      detail:
        "Modern TypeScript, scalable architecture, and maintainable standards designed to grow with your product without slowing down.",
    },
  ];

  // Manual reel select override or scroll-driven active step
  const [manualStep, setManualStep] = useState<number | null>(null);
  const scrollStep = Math.min(2, Math.floor(progress * 2.99));
  const activeStep = manualStep !== null ? manualStep : scrollStep;

  // Reset manual override when user resumes scrolling significantly
  const prevProgressRef = useRef(progress);
  useEffect(() => {
    if (Math.abs(progress - prevProgressRef.current) > 0.08) {
      setManualStep(null);
      prevProgressRef.current = progress;
    }
  }, [progress]);

  return (
    <section
      id="studio"
      data-nav="Studio"
      className="relative min-h-[220vh] w-full bg-[#EFEAE4] text-[#121211] select-none z-10 transition-colors"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden px-6 sm:px-12 md:px-16 pt-20 sm:pt-22 pb-4 sm:pb-6 flex flex-col justify-between max-w-7xl mx-auto">
        
        {/* Top Header Badge & Meta Status */}
        <div className="flex items-center justify-between border-b border-[#121211]/15 pb-3">
          <span className="font-mono text-xs uppercase tracking-wider text-[#121211]/85 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
            <span className="font-bold text-[#0284C7]">02 / Philosophy & Studio</span>
          </span>

          <span className="font-mono text-xs text-[#121211]/70 hidden sm:inline-block">
            Scroll drives live reel swipe • Framer Motion
          </span>
        </div>

        {/* Main Content Stage: Shifted comfortably upwards */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6 lg:gap-12 items-start mt-2 sm:mt-4 mb-auto">
          
          {/* Left Column: Clean, High-Contrast Principles */}
          <div className="space-y-3 sm:space-y-3.5 max-w-2xl">
            {principles.map((p, idx) => {
              const isActive = idx === activeStep;
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.id}
                  onClick={() => setManualStep(idx)}
                  animate={{
                    scale: isActive ? 1.01 : 0.99,
                    x: isActive ? 4 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`p-4 sm:p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-white/95 border-[#0284C7]/50 shadow-[0_12px_28px_rgba(2,132,199,0.12)]"
                      : "bg-white/40 border-[#121211]/10 opacity-75 hover:opacity-95"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-[#0284C7]" />
                      <span className="font-mono text-[11px] font-bold text-[#0284C7] uppercase tracking-wider">
                        Principle {p.id} · {p.lead}
                      </span>
                    </div>
                    {isActive && (
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#0284C7]/10 text-[#0284C7]">
                        Active Reel 0{idx + 1}
                      </span>
                    )}
                  </div>

                  <h3 className="font-grotesk text-[clamp(18px,1.8vw,26px)] font-bold tracking-tight text-[#121211] leading-snug">
                    {p.highlight}
                  </h3>

                  <p className="mt-1 text-xs sm:text-sm text-[#121211]/80 font-sans leading-relaxed">
                    {p.detail}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: 3D Phone Mockup with Dynamic Scroll-Driven Video Reels */}
          <div className="hidden lg:flex flex-col items-center justify-center relative pt-2">
            
            {/* Ambient Soft Glow */}
            <div
              className="absolute w-64 h-64 rounded-full bg-[#0284C7]/15 blur-3xl pointer-events-none -top-6"
              aria-hidden="true"
            />

            {/* Realistic 3D Mockup Device with full vertical reel swipe */}
            <div className="relative w-[230px] transform-gpu drop-shadow-[0_20px_45px_rgba(0,0,0,0.18)]">
              <IPhoneMockup
                projectName="Scrollr App"
                scrollProgress={progress}
                baseRotateY={-6}
                baseRotateX={4}
                className="scale-[0.84] origin-top"
              >
                {/* Scroll-Driven Reels Carousel Viewport */}
                <div className="relative w-full h-full bg-black overflow-hidden select-none">
                  <motion.div
                    className="w-full h-full flex flex-col"
                    animate={{ y: `-${activeStep * 100}%` }}
                    transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  >
                    {REELS.map((reel, rIdx) => (
                      <div
                        key={reel.id}
                        className="relative w-full h-full flex-shrink-0 overflow-hidden bg-black text-white"
                      >
                        {/* Looping Ambient Video */}
                        <video
                          src={reel.videoSrc}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover"
                        />

                        {/* Gentle cinematic scrim for readability */}
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 30%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.85) 100%)",
                          }}
                        />

                        {/* Top Reel Counter Tag */}
                        <div className="absolute top-10 left-3 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[9px] font-mono text-white/90">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] animate-pulse" />
                          <span>Reel {reel.id}/03</span>
                        </div>

                        {/* Right Social Actions Column */}
                        <div className="absolute right-2.5 bottom-16 z-20 flex flex-col items-center gap-3">
                          <div className="flex flex-col items-center gap-0.5">
                            <div className="w-7 h-7 rounded-full bg-black/45 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/90 hover:text-white transition-colors">
                              <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                            </div>
                            <span className="text-[8px] font-mono text-white/90">{reel.likes}</span>
                          </div>

                          <div className="flex flex-col items-center gap-0.5">
                            <div className="w-7 h-7 rounded-full bg-black/45 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/90">
                              <MessageCircle className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-[8px] font-mono text-white/90">{reel.comments}</span>
                          </div>

                          <div className="flex flex-col items-center gap-0.5">
                            <div className="w-7 h-7 rounded-full bg-black/45 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/90">
                              <Share2 className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-[8px] font-mono text-white/90">{reel.shares}</span>
                          </div>

                          <div className="w-7 h-7 rounded-full bg-black/45 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/90">
                            <Bookmark className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        {/* Bottom Information Overlay */}
                        <div className="absolute left-3 right-12 bottom-4 z-20 space-y-1 text-left">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-bold text-white tracking-tight flex items-center gap-1">
                              @{reel.handle}
                              <CheckCircle2 className="w-3 h-3 text-[#0284C7] fill-[#0284C7]" />
                            </span>
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/20 text-white/90">
                              {reel.tag}
                            </span>
                          </div>

                          <p className="text-[10px] text-white/90 font-sans leading-tight line-clamp-2">
                            {reel.caption}
                          </p>

                          <div className="flex items-center gap-1.5 text-[8px] font-mono text-white/70 pt-0.5">
                            <Music className="w-2.5 h-2.5 text-[#0284C7]" />
                            <span className="truncate">{reel.audioTrack}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </IPhoneMockup>
            </div>

            {/* Active Reel Navigation Indicator (clickable to jump) */}
            <div className="flex items-center gap-3 mt-4 pt-2.5 font-mono text-[11px] text-[#121211]/80 border-t border-[#121211]/15">
              <span>Swipe Reel:</span>
              {[0, 1, 2].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setManualStep(r)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                    activeStep === r
                      ? "bg-[#0284C7] text-white shadow-sm scale-105"
                      : "bg-[#121211]/10 text-[#121211]/60 hover:bg-[#121211]/20"
                  }`}
                >
                  0{r + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Meta Strip with generous margin from the 3rd principle */}
        <div className="flex items-center justify-between border-t border-[#121211]/15 pt-3 font-mono text-xs text-[#121211]/70 mt-2">
          <span>Fig. 02 · Studio Principles</span>
          <span>Core Stack: Next.js · React 19 · TypeScript · Tailwind CSS</span>
        </div>
      </div>
    </section>
  );
};
