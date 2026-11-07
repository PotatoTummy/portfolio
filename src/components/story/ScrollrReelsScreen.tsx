"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Bookmark, Music, Film, CheckCircle2 } from "lucide-react";

interface ScrollrReelsScreenProps {
  activeIndex?: number;
  onSelectIndex?: (idx: number) => void;
}

const SCROLLR_REELS = [
  {
    id: "01",
    video: "/videos/scrollr-reel.mp4",
    title: "Cinematic Cinema #1",
    handle: "cinema_vault",
    curator: "Private Screening",
    caption: "35mm analog film scans & high-contrast monochrome cinematography.",
    likes: "31.4k",
    comments: "940",
  },
  {
    id: "02",
    video: "/videos/reel-3.mp4",
    title: "Atmospheric Visuals",
    handle: "noir_archive",
    curator: "Curated Rooms",
    caption: "High frame-rate golden hour visual threads curated from private rooms.",
    likes: "48.2k",
    comments: "1.5k",
  },
  {
    id: "03",
    video: "/videos/reel-2.mp4",
    title: "Motion Rhythms",
    handle: "motion_craft",
    curator: "Film Masters",
    caption: "Lossless streaming audio with sub-50ms playback latency across devices.",
    likes: "62.9k",
    comments: "2.8k",
  },
];

export const ScrollrReelsScreen: React.FC<ScrollrReelsScreenProps> = ({
  activeIndex: controlledIndex,
  onSelectIndex,
}) => {
  const [internalIndex, setInternalIndex] = useState(0);
  const activeIdx = controlledIndex !== undefined ? controlledIndex : internalIndex;

  const handleSelect = (idx: number) => {
    setInternalIndex(idx);
    if (onSelectIndex) onSelectIndex(idx);
  };

  return (
    <div className="relative w-full h-full bg-black text-white overflow-hidden select-none flex flex-col justify-between font-sans">
      {/* Reel Vertical Swiping Stack */}
      <motion.div
        className="w-full h-full flex flex-col"
        animate={{ y: `-${activeIdx * 100}%` }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
      >
        {SCROLLR_REELS.map((reel) => (
          <div key={reel.id} className="relative w-full h-full flex-shrink-0 bg-black">
            {/* Active Video Player */}
            <video
              src={reel.video}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Readability Scrim */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 25%, rgba(0,0,0,0.2) 65%, rgba(0,0,0,0.9) 100%)",
              }}
            />

            {/* Top Bar: Scrollr Branding & Room Pill */}
            <div className="absolute top-9 left-3 right-3 z-20 flex items-center justify-between">
              <span className="font-serif text-sm font-bold tracking-tight text-white drop-shadow">
                scrollr
              </span>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono text-zinc-300">
                <Film className="w-2.5 h-2.5 text-[#00D4FF]" />
                <span>{reel.title}</span>
              </div>
            </div>

            {/* Right Side Social Actions */}
            <div className="absolute right-2.5 bottom-16 z-20 flex flex-col items-center gap-3">
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white">
                  <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                </div>
                <span className="text-[8px] font-mono text-zinc-300">{reel.likes}</span>
              </div>

              <div className="flex flex-col items-center gap-0.5">
                <div className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white">
                  <MessageCircle className="w-3.5 h-3.5" />
                </div>
                <span className="text-[8px] font-mono text-zinc-300">{reel.comments}</span>
              </div>

              <div className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white">
                <Share2 className="w-3.5 h-3.5" />
              </div>

              <div className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white">
                <Bookmark className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Bottom Caption & Audio */}
            <div className="absolute left-3 right-12 bottom-4 z-20 space-y-1 text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-white tracking-tight flex items-center gap-1">
                  @{reel.handle}
                  <CheckCircle2 className="w-3 h-3 text-[#00D4FF] fill-[#00D4FF]" />
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/20 text-white/90">
                  {reel.curator}
                </span>
              </div>

              <p className="text-[10px] text-zinc-200 font-sans leading-tight line-clamp-2">
                {reel.caption}
              </p>

              <div className="flex items-center gap-1.5 text-[8px] font-mono text-zinc-400 pt-0.5">
                <Music className="w-2.5 h-2.5 text-[#00D4FF]" />
                <span className="truncate">Lossless Room Audio — 48kHz</span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Interactive Reel Indicator Dots (Clickable) */}
      <div className="absolute top-16 left-3 z-30 flex items-center gap-1.5">
        {SCROLLR_REELS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleSelect(i)}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              activeIdx === i ? "w-5 bg-[#00D4FF]" : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
            title={`Jump to Reel 0${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
