"use client";

import React, { useState } from "react";
import { 
  ShoppingBag, Users, ShieldAlert, TrendingUp, CheckCircle2, 
  Play, Pause, Heart, MessageCircle, Share2, Music2, Wifi, Zap, 
  QrCode, Sparkles, Search, Check, RefreshCw, FileSpreadsheet
} from "lucide-react";

// ==========================================
// 1. NESTYS: Enterprise Multi-Portal Platform
// ==========================================
export const NestysScreen: React.FC<{ scrollProgress?: number }> = ({ scrollProgress = 0.5 }) => {
  const [activePortal, setActivePortal] = useState<"seller" | "eureka" | "reels">("seller");

  return (
    <div className="h-full w-full bg-[#0C0D0E] text-[#ECEFF1] flex flex-col font-sans select-none overflow-hidden text-[11px]">
      {/* Top Console Bar */}
      <div className="h-10 border-b border-white/[0.08] bg-[#111315] px-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 font-bold tracking-tight text-white">
            <span className="h-4 w-4 rounded bg-[#00D4FF] flex items-center justify-center text-[9px] font-mono text-black font-extrabold">N</span>
            <span>Nestys Ecosystem</span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Platform
          </span>
        </div>

        <div className="flex items-center gap-2 text-zinc-400">
          <span className="px-2 py-0.5 rounded bg-[#00D4FF]/20 text-[#00D4FF] font-mono text-[9px] font-semibold border border-[#00D4FF]/30">
            Enterprise Ready
          </span>
        </div>
      </div>

      {/* Main Dashboard Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Clickable Sidebar */}
        <div className="w-14 sm:w-36 border-r border-white/[0.06] bg-[#0E1012] p-2 flex flex-col justify-between">
          <div className="space-y-1">
            <button
              onClick={() => setActivePortal("seller")}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded font-mono text-[10px] transition-colors text-left ${
                activePortal === "seller"
                  ? "bg-[#00D4FF]/15 text-[#00D4FF] font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <ShoppingBag className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden sm:inline">Seller Central</span>
            </button>

            <button
              onClick={() => setActivePortal("eureka")}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded font-mono text-[10px] transition-colors text-left ${
                activePortal === "eureka"
                  ? "bg-[#00D4FF]/15 text-[#00D4FF] font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Users className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden sm:inline">Eureka Jobs</span>
            </button>

            <button
              onClick={() => setActivePortal("reels")}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded font-mono text-[10px] transition-colors text-left ${
                activePortal === "reels"
                  ? "bg-[#00D4FF]/15 text-[#00D4FF] font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden sm:inline">Reel Mod</span>
            </button>
          </div>

          <div className="hidden sm:block p-1.5 rounded bg-black/30 border border-white/5 text-[8px] text-zinc-400 font-mono">
            <div>BullMQ Queue</div>
            <div className="text-emerald-400 font-bold">100% Processed</div>
          </div>
        </div>

        {/* Dynamic Center Workspace */}
        <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 bg-[#0B0C0E]/95">
          {activePortal === "seller" && (
            <>
              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 sm:p-2.5 rounded-lg border border-white/[0.07] bg-[#121417]">
                  <div className="text-zinc-400 text-[9px]">Gross Volume (24h)</div>
                  <div className="text-xs sm:text-base font-bold font-mono text-white mt-0.5">$84,920.00</div>
                  <div className="text-[8px] text-emerald-400 flex items-center gap-0.5 mt-0.5">
                    <TrendingUp className="h-2.5 w-2.5" /> +14.2%
                  </div>
                </div>
                <div className="p-2 sm:p-2.5 rounded-lg border border-white/[0.07] bg-[#121417]">
                  <div className="text-zinc-400 text-[9px]">Inventory SKUs</div>
                  <div className="text-xs sm:text-base font-bold font-mono text-cyan-400 mt-0.5">1,248</div>
                  <div className="text-[8px] text-zinc-400 mt-0.5">Live Matrix</div>
                </div>
                <div className="p-2 sm:p-2.5 rounded-lg border border-white/[0.07] bg-[#121417]">
                  <div className="text-zinc-400 text-[9px]">HLS Streams</div>
                  <div className="text-xs sm:text-base font-bold font-mono text-cyan-400 mt-0.5">48 Mod Queued</div>
                  <div className="text-[8px] text-zinc-400 mt-0.5">Adaptive Bitrate</div>
                </div>
              </div>

              {/* Scroll-Driven Dynamic Chart */}
              <div className="p-2.5 rounded-lg border border-white/[0.07] bg-[#121417]">
                <div className="text-[9px] font-mono text-zinc-400 mb-2 flex justify-between">
                  <span>Real-Time Activity</span>
                  <span className="text-[#00D4FF]">Live Sync</span>
                </div>
                <div className="h-16 flex items-end gap-1.5 border-b border-white/10 pb-1">
                  {[0.4, 0.7, 0.5, 0.9, 0.6, 0.85, 0.45, 1.0, 0.75, 0.8, 0.95, 0.65].map((h, i) => {
                    const scrollScale = Math.min(1, Math.max(0.3, scrollProgress * 1.6));
                    return (
                      <div
                        key={i}
                        className="flex-1 rounded-t transition-all duration-300"
                        style={{
                          height: `${h * 100 * scrollScale}%`,
                          backgroundColor: i % 3 === 1 ? "#00D4FF" : "rgba(0,212,255,0.35)",
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {activePortal === "eureka" && (
            <div className="p-3 rounded-lg border border-white/[0.07] bg-[#121417] space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-white">
                <span>Eureka Recruitment & Candidate Matching</span>
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Async Parsers</span>
              </div>
              <p className="text-[10px] text-zinc-300">
                Multi-parameter candidate matching with asynchronous bulk CSV/Excel upload parsers.
              </p>
              <div className="p-2 rounded bg-black/40 border border-white/5 font-mono text-[9px] text-zinc-400 flex items-center gap-2">
                <FileSpreadsheet className="h-3.5 w-3.5 text-cyan-400" />
                <span>candidates_batch_2026.csv parsed (142 matched)</span>
              </div>
            </div>
          )}

          {activePortal === "reels" && (
            <div className="p-3 rounded-lg border border-white/[0.07] bg-[#121417] space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-white">
                <span>Super Admin Reel Content Moderation</span>
                <span className="text-[9px] font-mono text-[#00D4FF] bg-[#00D4FF]/10 px-2 py-0.5 rounded">HLS.js Stream</span>
              </div>
              <div className="h-20 rounded bg-black/60 border border-white/10 flex items-center justify-center font-mono text-zinc-400 text-[10px]">
                Adaptive HLS buffer synced • Zero latency playback
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// ==========================================
// 2. SCROLLR: Native Mobile Video Engine (Full Reel Swipe)
// ==========================================
export const ScrollrScreen: React.FC<{ scrollProgress?: number }> = ({ scrollProgress = 0.5 }) => {
  const [likes, setLikes] = useState([14820, 24390, 48120]);
  const [hasLiked, setHasLiked] = useState([false, false, false]);
  const [isPlaying, setIsPlaying] = useState(true);

  // Map 0 -> 1 progress to a full 0% -> -200% vertical reel swipe
  // Uses smooth interpolation between discrete reel stops
  const pClamped = Math.min(1, Math.max(0, scrollProgress));
  const rawIdx = pClamped * 2; // Range 0 to 2
  const activeReel = Math.min(2, Math.round(rawIdx));
  
  // Smoothly swipe translateY from 0% to -200%
  const translateYPercent = -pClamped * 200;

  const toggleLike = (idx: number) => {
    setHasLiked((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
    setLikes((prev) => {
      const next = [...prev];
      next[idx] += hasLiked[idx] ? -1 : 1;
      return next;
    });
  };

  const REELS_DATA = [
    {
      id: 1,
      badge: "60 FPS Virtualized",
      subBadge: "Fisher-Yates 0-Algo",
      bgGrad: "from-[#19052E] via-[#0D1836] to-[#1F0818]",
      title: "Algorithmic-Free Reel Player",
      author: "@potato_dev",
      audio: "Hermes 60fps Native Audio",
      desc: "Scroll down to swipe reels • Full vertical feed gesture physics",
      accent: "#00D4FF",
    },
    {
      id: 2,
      badge: "HTTP 206 Byte-Range",
      subBadge: "Fastify Edge Proxy",
      bgGrad: "from-[#051E38] via-[#0A2E4C] to-[#120B2E]",
      title: "Universal Media Streaming API",
      author: "@linkplay_api",
      audio: "yt-dlp Stream Proxy • 0-SSRF",
      desc: "Fastify chunk-by-chunk caching with two-tier LRU memory buffers",
      accent: "#38BDF8",
    },
    {
      id: 3,
      badge: "Reanimated 3 Motion",
      subBadge: "Zero Dropped Frames",
      bgGrad: "from-[#022419] via-[#064E3B] to-[#0A1A2F]",
      title: "2,500+ Items FlatList Window",
      author: "@potato_dev",
      audio: "Synthesized UI Haptics",
      desc: "Virtualized hardware video instances with instant release cycles",
      accent: "#10B981",
    },
  ];

  return (
    <div className="h-full w-full bg-black text-white flex flex-col justify-between font-sans select-none overflow-hidden relative">
      {/* Scroll-Driven Full-Swipe Vertical Reels Container */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform flex flex-col"
        style={{ transform: `translateY(${translateYPercent}%)` }}
      >
        {REELS_DATA.map((reel, rIdx) => (
          <div
            key={reel.id}
            className={`h-full w-full shrink-0 bg-gradient-to-br ${reel.bgGrad} relative flex flex-col justify-between p-3.5`}
          >
            {/* Reel Central Ambient Visualizer Art */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-44 h-44 rounded-full border border-white/10 flex items-center justify-center shadow-2xl transition-transform duration-500"
                style={{
                  background: `radial-gradient(circle, ${reel.accent}25 0%, transparent 70%)`,
                  transform: activeReel === rIdx ? "scale(1)" : "scale(0.85)",
                }}
              >
                <div className="w-28 h-28 rounded-full border border-white/15 bg-black/40 backdrop-blur-md flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="h-16 w-16 rounded-full border border-white/20 bg-white/10 flex items-center justify-center hover:scale-105 transition-transform pointer-events-auto"
                  >
                    {isPlaying ? (
                      <Play className="h-6 w-6 text-white fill-white translate-x-0.5" />
                    ) : (
                      <Pause className="h-6 w-6 text-white fill-white" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Reel Top Bar */}
            <div className="relative z-10 pt-1 flex items-center justify-between text-[10px] font-mono">
              <span
                className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md font-semibold border"
                style={{ color: reel.accent, borderColor: `${reel.accent}40` }}
              >
                {reel.badge}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white/80 border border-white/10">
                {reel.subBadge}
              </span>
            </div>

            {/* Reel Right Action Rail */}
            <div className="relative z-10 self-end mr-1 flex flex-col items-center gap-3">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => toggleLike(rIdx)}
                  className={`h-9 w-9 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center transition-transform active:scale-125 ${
                    hasLiked[rIdx] ? "text-red-500 border-red-500/40" : "text-white"
                  }`}
                >
                  <Heart className={`h-4 w-4 ${hasLiked[rIdx] ? "fill-red-500 text-red-500" : ""}`} />
                </button>
                <span className="text-[10px] font-mono mt-0.5 font-bold">
                  {(likes[rIdx] / 1000).toFixed(1)}k
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="h-9 w-9 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-mono mt-0.5 font-bold">428</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="h-9 w-9 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white">
                  <Share2 className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-mono mt-0.5 font-bold">1.8k</span>
              </div>
            </div>

            {/* Reel Bottom Caption & Author Meta */}
            <div className="relative z-10 p-2 rounded-lg bg-black/65 backdrop-blur-md border border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#2B6CFF] flex items-center justify-center text-[8px] font-bold">
                    SK
                  </div>
                  <span className="text-xs font-bold text-white">{reel.author}</span>
                </div>
                <span className="font-mono text-[9px] text-zinc-400">Reel {rIdx + 1}/3</span>
              </div>

              <div className="text-[11px] font-semibold text-white/90 truncate">
                {reel.title}
              </div>

              <p className="text-[10px] text-zinc-300 line-clamp-1">
                {reel.desc}
              </p>

              <div className="flex items-center gap-1.5 pt-0.5 text-[9px] font-mono text-cyan-300">
                <Music2 className="h-2.5 w-2.5 shrink-0 animate-pulse" />
                <span className="truncate">{reel.audio}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Persistent Bottom Video Scrub Progress Bar */}
      <div className="absolute bottom-0 inset-x-0 z-20 h-1 bg-white/20">
        <div
          className="h-full bg-[#00D4FF] transition-all duration-150"
          style={{ width: `${Math.min(100, Math.max(8, pClamped * 100))}%` }}
        />
      </div>
    </div>
  );
};

// ==========================================
// 3. WOKATAA: Real-Time Multiplayer Clash
// ==========================================
export const WoKataaScreen: React.FC<{ scrollProgress?: number }> = ({ scrollProgress = 0.5 }) => {
  const [score, setScore] = useState(4850);
  const [isSwiped, setIsSwiped] = useState(false);

  // Scroll drives the token card swipe offset!
  const scrollSwipeX = (scrollProgress - 0.5) * 160;
  const scrollSwipeRot = (scrollProgress - 0.5) * 35;

  const triggerSwipe = () => {
    setIsSwiped(true);
    setScore((s) => s + 350);
    setTimeout(() => setIsSwiped(false), 900);
  };

  return (
    <div className="h-full w-full bg-[#0A0D14] text-white flex flex-col justify-between p-3 font-sans select-none overflow-hidden relative text-[11px]">
      {/* Top Match Status */}
      <div className="relative z-10 pt-1 flex items-center justify-between font-mono text-[10px]">
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#18C38A]/15 text-[#18C38A] border border-[#18C38A]/30">
          <Wifi className="h-3 w-3" />
          <span>18ms Ping (Ably)</span>
        </div>
        <span className="font-bold text-cyan-400 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
          Live Duel
        </span>
      </div>

      {/* Perspective Dynamic Scoreboard */}
      <div className="relative z-10 grid grid-cols-2 gap-2 mt-2">
        <div className="p-2 rounded-xl bg-gradient-to-br from-[#18C38A]/20 to-[#0A2016] border border-[#18C38A]/40 text-left">
          <div className="text-[8px] font-mono text-[#18C38A] uppercase font-bold">Your Score</div>
          <div className="text-base font-extrabold font-mono text-white mt-0.5">{score}</div>
        </div>

        <div className="p-2 rounded-xl bg-gradient-to-br from-[#00D4FF]/20 to-[#0A1A2E] border border-[#00D4FF]/40 text-right">
          <div className="text-[8px] font-mono text-[#00D4FF] uppercase font-bold">Opponent</div>
          <div className="text-base font-extrabold font-mono text-white mt-0.5">3,920</div>
        </div>
      </div>

      {/* Center 3D Battle Arena Deck (Swipes on Scroll or Click!) */}
      <div className="relative flex-1 my-3 flex items-center justify-center cursor-pointer" onClick={triggerSwipe}>
        {/* Background Card */}
        <div className="absolute w-36 h-48 rounded-2xl bg-gradient-to-br from-indigo-900 to-indigo-950 border border-indigo-500/40 transform -rotate-6 translate-x-2 translate-y-2 opacity-50 shadow-lg" />
        
        {/* Active Swipeable Token Card */}
        <div
          className="relative w-40 h-52 rounded-2xl bg-gradient-to-br from-[#18C38A] via-[#0D5C40] to-[#06291C] border border-emerald-400/60 p-3 shadow-2xl flex flex-col justify-between transition-transform duration-200"
          style={{
            transform: isSwiped
              ? "translateX(120px) rotate(25deg) scale(0.9)"
              : `translateX(${scrollSwipeX}px) rotate(${scrollSwipeRot}deg)`,
          }}
        >
          <div className="flex justify-between items-center text-[9px] font-mono">
            <span className="font-bold bg-black/40 px-1.5 py-0.5 rounded text-emerald-300">Wind Blade</span>
            <span className="text-white font-extrabold">+1,200 ATK</span>
          </div>

          <div className="my-auto text-center">
            <div className="text-2xl font-serif italic text-white drop-shadow-md">Kite Clash</div>
            <div className="text-[8px] font-mono text-emerald-200 mt-1">Tap or scroll to swipe</div>
          </div>

          <div className="flex justify-between items-center text-[8px] font-mono text-zinc-300 border-t border-white/20 pt-1">
            <span>Reanimated 3</span>
            <Zap className="h-3 w-3 text-amber-300" />
          </div>
        </div>
      </div>

      {/* Match Control Rail */}
      <div className="relative z-10 bg-black/60 backdrop-blur-md rounded-xl p-2 border border-white/10 flex items-center justify-between text-[9px] font-mono">
        <span className="text-zinc-300">Swipe Card: +350 pts</span>
        <button
          onClick={triggerSwipe}
          className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
        >
          Tap to Attack
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 4. EARTH AIR: Commercial Platform & CWV
// ==========================================
export const EarthAirScreen: React.FC<{ scrollProgress?: number }> = ({ scrollProgress = 0.5 }) => {
  // Scroll moves the live page content inside the laptop screen
  const siteScrollY = (scrollProgress - 0.5) * 60;
  const dialPct = Math.min(100, Math.max(30, Math.round(scrollProgress * 120)));

  return (
    <div className="h-full w-full bg-[#0E1116] text-[#E6EDF3] flex flex-col font-sans select-none overflow-hidden text-[11px]">
      {/* Top Navbar */}
      <div className="h-10 border-b border-white/[0.08] bg-[#141922] px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-serif italic text-sm text-[#F5B700] font-bold">Earth Air Condition</span>
          <span className="text-[9px] font-mono text-zinc-400 border border-white/10 px-1.5 py-0.5 rounded">HVAC Commercial</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-mono">
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
            0s Downtime CI/CD
          </span>
        </div>
      </div>

      {/* Main Content Showcase */}
      <div
        className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-12 gap-3 overflow-hidden transition-transform duration-200 ease-out"
        style={{ transform: `translateY(${-siteScrollY}px)` }}
      >
        <div className="sm:col-span-7 space-y-3">
          <div className="p-3.5 rounded-xl border border-white/[0.08] bg-[#161D28] space-y-2">
            <span className="text-[9px] font-mono text-[#F5B700] uppercase font-bold tracking-wider">Industrial HVAC Contractor</span>
            <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
              Commercial Climate Control Engineered For Uninterrupted Uptime
            </h4>
            <p className="text-[10px] text-zinc-300 leading-relaxed">
              Custom theme replacing bloated visual builders. Instant LCP, zero CLS, and automated FTPS deploys.
            </p>
          </div>

          <div className="p-2.5 rounded-lg border border-white/[0.06] bg-[#11161F] flex items-center justify-between text-[10px] font-mono">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>CI/CD: GitHub Actions &rarr; Hostinger FTPS</span>
            </div>
            <span className="text-emerald-400">Deployed</span>
          </div>
        </div>

        {/* Core Web Vitals Dial (Draws on Scroll!) */}
        <div className="sm:col-span-5 space-y-2">
          <div className="p-3 rounded-xl border border-white/[0.08] bg-[#161D28] flex flex-col items-center justify-center text-center">
            <div className="relative h-16 w-16 rounded-full border-4 border-emerald-400/20 flex items-center justify-center">
              <div className="text-xl font-bold font-mono text-emerald-400">98</div>
              <svg className="absolute inset-0 h-full w-full -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="#2FD27A"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray="175"
                  strokeDashoffset={175 - (175 * Math.min(100, dialPct)) / 100}
                  className="transition-all duration-300"
                />
              </svg>
            </div>
            <div className="text-xs font-bold text-white mt-1">Core Web Vitals</div>
            <div className="text-[8px] text-zinc-400 font-mono">LCP 0.6s · 0 CLS</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. URBAN ARENA: Sports Facility Reservation
// ==========================================
export const UrbanArenaScreen: React.FC<{ scrollProgress?: number }> = ({ scrollProgress = 0.5 }) => {
  const [selectedSlot, setSelectedSlot] = useState("19:00");
  const [isTurnstileScanned, setIsTurnstileScanned] = useState(false);

  // Scroll automatically progresses the reservation status
  const slots = ["17:00", "18:00", "19:00", "20:00"];

  return (
    <div className="h-full w-full bg-[#0D0B12] text-[#EDE7F6] flex flex-col font-sans select-none overflow-hidden text-[11px]">
      {/* Top Navigation */}
      <div className="h-10 border-b border-white/[0.08] bg-[#13101C] px-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-[#B04DFF] flex items-center justify-center font-bold text-black text-[9px] font-mono">U</div>
          <span className="font-bold tracking-tight text-white">UrbanArena</span>
          <span className="text-[9px] font-mono text-[#B04DFF] border border-[#B04DFF]/30 px-1.5 py-0.2 rounded bg-[#B04DFF]/10">
            Multi-Tenant Suite
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-400">
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Redis Mutex Active
          </span>
        </div>
      </div>

      {/* Main Reservation Console */}
      <div className="flex-1 p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-12 gap-3 overflow-y-auto">
        <div className="sm:col-span-8 space-y-2.5">
          <div className="p-3 rounded-xl border border-white/[0.08] bg-[#161224] space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-bold text-white text-xs">Centennial Badminton Arena — Court 03</h4>
                <p className="text-[9px] text-zinc-400">Indoor Wooden Deck · Select slot below</p>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#B04DFF]/20 text-[#B04DFF] font-mono font-bold text-[10px]">
                $35 / hr
              </span>
            </div>

            {/* Clickable Slot Buttons */}
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {slots.map((slot) => {
                const isSelected = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-1.5 rounded text-center border transition-all ${
                      isSelected
                        ? "bg-[#B04DFF] text-black font-bold border-white shadow-md scale-105"
                        : "bg-white/5 text-zinc-300 border-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className="font-mono text-[10px]">{slot}</div>
                    <div className="text-[8px] opacity-80">{isSelected ? "Selected" : "Available"}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Real-Time Mutex Guard Status */}
          <div className="p-2.5 rounded-lg border border-white/[0.07] bg-[#141021] flex items-center justify-between text-[10px] font-mono">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#B04DFF] animate-ping" />
              <span>Redis Mutex: Slot [{selectedSlot}] locked</span>
            </div>
            <span className="text-emerald-400">0 Race Conditions</span>
          </div>
        </div>

        {/* Dynamic QR Validation Pass */}
        <div className="sm:col-span-4 p-3 rounded-xl border border-white/[0.08] bg-[#161224] flex flex-col items-center justify-between text-center">
          <div>
            <div className="text-[8px] font-mono text-[#B04DFF] uppercase font-bold">Dynamic Gate Pass</div>
            <div className="text-xs font-bold text-white mt-0.5">Instant Check-In</div>
          </div>

          {/* Interactive QR Code Pass */}
          <button
            onClick={() => setIsTurnstileScanned((s) => !s)}
            className="my-1.5 p-2 rounded-lg bg-white shadow-xl hover:scale-105 transition-transform"
            title="Click to simulate turnstile gate scan"
          >
            <QrCode className="h-16 w-16 text-black" />
          </button>

          <div className="w-full text-[9px] font-mono text-zinc-400 border-t border-white/10 pt-1">
            <div className="text-emerald-400 font-bold flex items-center justify-center gap-1">
              {isTurnstileScanned ? <Check className="h-3 w-3" /> : <RefreshCw className="h-3 w-3 animate-spin" />}
              <span>{isTurnstileScanned ? "Gate Opened" : "Tap QR to scan"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 6. SERVOTECH: Mission-Critical Enterprise Tools
// ==========================================
export const ServotechScreen: React.FC<{ scrollProgress?: number }> = () => {
  const [activeTab, setActiveTab] = useState<"pm" | "hrms" | "assets" | "ats">("pm");

  return (
    <div className="h-full w-full bg-[#0B0D0E] text-[#E2E8F0] flex flex-col font-sans select-none overflow-hidden text-[11px]">
      {/* Top Header */}
      <div className="h-10 border-b border-white/[0.08] bg-[#101416] px-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-[#10B981] flex items-center justify-center font-bold text-black text-[9px] font-mono">S</div>
          <span className="font-bold tracking-tight text-white">Servotech Enterprise</span>
          <span className="text-[9px] font-mono text-[#10B981] border border-[#10B981]/30 px-1.5 py-0.5 rounded bg-[#10B981]/10">
            W3villa Technologies
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-400">
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            SSO Authenticated
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-white/[0.06] bg-[#0E1113] px-3 gap-2">
        {(["pm", "hrms", "assets", "ats"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 border-b-2 font-mono text-[10px] uppercase transition-colors ${
              activeTab === tab
                ? "border-[#10B981] text-[#10B981] font-semibold"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            {tab === "pm" ? "PM Board" : tab === "hrms" ? "HRMS Workplace" : tab === "assets" ? "Asset Management" : "ATS Suite"}
          </button>
        ))}
      </div>

      {/* Main Kanban Content */}
      <div className="flex-1 p-3 overflow-hidden">
        <div className="grid grid-cols-4 gap-2.5 h-full">
          {[
            { name: "Backlog", count: 4, tasks: ["Auth Token Refresh", "Asset Export CSV", "ATS Resume Parser"] },
            { name: "In Progress", count: 3, tasks: ["Sprint Burndown Sync", "Leave Approval Workflow"] },
            { name: "Code Review", count: 2, tasks: ["Cucumber E2E Gate"] },
            { name: "Done", count: 8, tasks: ["RBAC Middleware", "Asset Assignation"] }
          ].map((col, idx) => (
            <div key={idx} className="rounded-lg border border-white/[0.06] bg-[#111618] p-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-2">
                  <span className="font-semibold text-white">{col.name}</span>
                  <span className="px-1 rounded bg-white/5">{col.count}</span>
                </div>
                <div className="space-y-1.5">
                  {col.tasks.map((task, tIdx) => (
                    <div
                      key={tIdx}
                      className="p-1.5 rounded border border-white/[0.05] bg-[#161D20] text-[10px] text-zinc-300 shadow-sm"
                    >
                      <div className="font-medium text-white">{task}</div>
                      <div className="text-[8px] font-mono text-zinc-500 mt-0.5">SERV-{idx * 10 + tIdx + 101}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-1 border-t border-white/5 text-[8px] font-mono text-emerald-400/80">
                ● 0 Dropped Frames
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
