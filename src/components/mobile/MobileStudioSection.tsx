"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Zap, ShieldCheck, Heart, MessageCircle, Share2, Music, Bookmark } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/useDeviceTier";

interface ReelItem {
  id: string;
  videoSrc: string;
  fallbackImage: string;
  handle: string;
  tag: string;
  caption: string;
  likes: string;
  comments: string;
  shares: string;
  audioTrack: string;
  principle: {
    number: string;
    lead: string;
    highlight: string;
    detail: string;
  };
}

const REELS: ReelItem[] = [
  {
    id: "01",
    videoSrc: "/videos/reel-aurora.mp4",
    fallbackImage: "/projects/screens/scrollr-white-screen.png",
    handle: "craft.design",
    tag: "Design & Craft",
    caption: "Thoughtful visual aesthetics & pixel-perfect craft under one roof ✨",
    likes: "24.8k",
    comments: "842",
    shares: "1.9k",
    audioTrack: "Original Audio — Studio Soundscape",
    principle: {
      number: "01",
      lead: "Design & Craft",
      highlight: "Design and code under one roof.",
      detail:
        "Great digital products happen when visual aesthetics and technical craft work together from day one. No awkward handoffs — just thoughtful design and clean, maintainable code.",
    },
  },
  {
    id: "02",
    videoSrc: "/videos/reel-galaxy.mp4",
    fallbackImage: "/projects/screens/scrollr-white-screen.png",
    handle: "fluid.motion",
    tag: "Speed & Fluidity",
    caption: "Tactile 60fps gesture animations & micro-interactions with Framer Motion ⚡",
    likes: "42.1k",
    comments: "1.2k",
    shares: "3.8k",
    audioTrack: "Synthesizer Flow — 128 BPM",
    principle: {
      number: "02",
      lead: "Speed & Fluidity",
      highlight: "2,500 items. 60fps. Zero stutter.",
      detail:
        "Smart list windowing keeps 2,500+ videos playing at 60fps on a mid-range Android. No frame drops measured on-device — hardware acceleration plus a custom virtualization layer.",
    },
  },
  {
    id: "03",
    videoSrc: "/videos/reel-eclipse.mp4",
    fallbackImage: "/projects/screens/scrollr-white-screen.png",
    handle: "scale.modern",
    tag: "Modern Standards",
    caption: "Clean typed foundations & zero bloated abstractions built to last 🛡️",
    likes: "67.4k",
    comments: "2.4k",
    shares: "8.6k",
    audioTrack: "Ambient Chill — Deep Focus",
    principle: {
      number: "03",
      lead: "Modern Standards",
      highlight: "Typed end to end. Zero unverified `any`.",
      detail:
        "Strict TypeScript across every layer — Zod-validated API contracts, Prisma-typed queries, end-to-end. No runtime surprises from silent `any` casts.",
    },
  },
];

export const MobileStudioSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [likedReels, setLikedReels] = useState<Record<string, boolean>>({});

  // IntersectionObserver to detect active snap slide without JS scroll listeners
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const indexStr = entry.target.getAttribute("data-slide-index");
            if (indexStr !== null) {
              setActiveSlide(Number(indexStr));
            }
          }
        });
      },
      {
        root: carousel,
        threshold: 0.6,
      }
    );

    slideRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSlide = (idx: number) => {
    const el = slideRefs.current[idx];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  };

  const toggleLike = (id: string) => {
    setLikedReels((prev) => ({ ...prev, [id]: !prev[id] }));
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(20);
    }
  };

  return (
    <section
      id="studio"
      className="w-full py-12 px-4 bg-[#EFEAE4] text-[#121211] select-none border-t border-[#121211]/15"
    >
      <div className="max-w-lg mx-auto w-full space-y-6">
        
        {/* Section Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#0284C7] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
            <span>02 / Philosophy &amp; Studio</span>
          </div>
          <h2 className="font-grotesk text-3xl font-medium tracking-tight text-[#121211]">
            Engineering Philosophy
          </h2>
          <p className="text-xs text-[#121211]/80 font-sans leading-relaxed">
            Swipe the phone reel to explore principles in motion.
          </p>
        </div>

        {/* Realistic Smartphone Frame with Native CSS Scroll-Snap */}
        <div className="mx-auto w-full max-w-[320px] rounded-[40px] p-2.5 bg-[#1F1F1E] border border-[#3A3A38] shadow-2xl relative">
          
          {/* Outer Metal Rim Highlight */}
          <div className="relative rounded-[32px] overflow-hidden bg-black text-white aspect-[9/16] flex flex-col justify-between">
            
            {/* Top Phone Status Bar: 9:41 / Island / 5G */}
            <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-5 pt-3 pb-2 text-[10px] font-mono text-white/90 pointer-events-none">
              <span className="font-bold">9:41</span>
              {/* Dynamic Island / Notch */}
              <div className="w-20 h-4 bg-black rounded-full border border-white/10 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-emerald-500/80 mr-1.5" />
                <span className="text-[8px] font-mono text-zinc-400">craft.os</span>
              </div>
              <div className="flex items-center gap-1 text-[9px]">
                <span>5G</span>
                <span>100%</span>
              </div>
            </div>

            {/* Horizontal CSS Scroll-Snap Carousel */}
            <div
              ref={carouselRef}
              className="flex-1 w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-none"
              style={{
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {REELS.map((reel, idx) => {
                const isLiked = likedReels[reel.id];

                return (
                  <div
                    key={reel.id}
                    ref={(el) => {
                      slideRefs.current[idx] = el;
                    }}
                    data-slide-index={idx}
                    className="w-full h-full shrink-0 snap-center relative overflow-hidden"
                  >
                    {/* Background Video */}
                    <video
                      src={reel.videoSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Gradient Scrims for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none" />

                    {/* Top Slide Tag */}
                    <div className="absolute top-12 left-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/15 text-[9px] font-mono text-white/90">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
                      <span>{reel.tag}</span>
                    </div>

                    {/* Right Action Icons Column */}
                    <div className="absolute right-3 bottom-14 z-20 flex flex-col items-center gap-3">
                      {/* Heart Button */}
                      <button
                        type="button"
                        onClick={() => toggleLike(reel.id)}
                        className="flex flex-col items-center gap-0.5 active:scale-125 transition-transform"
                      >
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center border transition-colors ${
                            isLiked
                              ? "bg-rose-600/30 border-rose-500 text-rose-500"
                              : "bg-black/50 border-white/20 text-white"
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? "fill-rose-500" : ""}`} />
                        </div>
                        <span className="text-[9px] font-mono font-bold text-white/90">
                          {reel.likes}
                        </span>
                      </button>

                      {/* Comments */}
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-9 h-9 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white">
                          <MessageCircle className="w-4 h-4" />
                        </div>
                        <span className="text-[9px] font-mono font-bold text-white/90">
                          {reel.comments}
                        </span>
                      </div>

                      {/* Share */}
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-9 h-9 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white">
                          <Share2 className="w-4 h-4" />
                        </div>
                        <span className="text-[9px] font-mono font-bold text-white/90">
                          {reel.shares}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Handle & Caption */}
                    <div className="absolute left-3.5 right-14 bottom-4 z-20 space-y-1">
                      <div className="flex items-center gap-1.5 font-grotesk font-bold text-xs text-white">
                        <span>@{reel.handle}</span>
                        <span className="w-1 h-1 rounded-full bg-white/40" />
                        <span className="text-[10px] font-mono text-[#00D4FF]">Verified</span>
                      </div>

                      <p className="text-[11px] font-sans text-white/90 leading-tight line-clamp-2">
                        {reel.caption}
                      </p>

                      {/* Audio Track Marquee */}
                      <div className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-300 pt-0.5">
                        <Music className="w-3 h-3 text-[#00D4FF] shrink-0" />
                        <span className="truncate">{reel.audioTrack}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Carousel Dot Indicators */}
            <div className="absolute bottom-1 left-0 right-0 z-30 flex items-center justify-center gap-1.5 py-1">
              {REELS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeSlide ? "w-5 bg-[#00D4FF]" : "w-1.5 bg-white/40"
                  }`}
                  aria-label={`Jump to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </div>

        {/* 3 Principles Cards Linked to Active Slide */}
        <div className="space-y-2.5 pt-1">
          {REELS.map((reel, idx) => {
            const p = reel.principle;
            const isActive = idx === activeSlide;

            return (
              <div
                key={p.number}
                onClick={() => scrollToSlide(idx)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isActive
                    ? "bg-white border-[#0284C7] shadow-md scale-[1.01]"
                    : "bg-white/60 border-[#121211]/10 opacity-75"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-[10px] font-bold uppercase tracking-wider ${
                      isActive ? "text-[#0284C7]" : "text-[#121211]/60"
                    }`}
                  >
                    Principle 0{idx + 1} · {p.lead}
                  </span>
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                      isActive
                        ? "bg-[#0284C7]/10 text-[#0284C7]"
                        : "bg-black/5 text-[#121211]/60"
                    }`}
                  >
                    Slide 0{idx + 1}/03
                  </span>
                </div>

                <h3 className="font-grotesk text-base font-bold text-[#121211] tracking-tight pt-1">
                  {p.highlight}
                </h3>

                <p className="text-xs text-[#121211]/80 font-sans leading-relaxed pt-0.5">
                  {p.detail}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
