"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface ArchiveEntry {
  id: string;
  name: string;
  codename: string;
  file: string;
  year: string;
  what: string;
  why: string;
  tech: string[];
}

const ENTRIES: ArchiveEntry[] = [
  {
    id: "descent-v1",
    name: "Descent v1",
    codename: "portfolio-3d.html",
    file: "/archive/descent-v1.html",
    year: "2026 · Draft 01",
    what: "One WebGL canvas where the camera drops through abstract 3D objects: a torus knot, a service graph for Nestys, a helix of film frames for Scrollr, interlocked rings for WoKataa, an airflow vortex for Earth Air, and rising blocks for Servotech.",
    why: "Visually stunning but impossible to skim. A recruiter with 20 seconds sees a rotating torus knot, not a full-stack engineer. The abstract shapes needed captions, and captions killed the mystique.",
    tech: ["Three.js", "WebGL", "Procedural geometry", "No text above the fold"],
  },
  {
    id: "descent-v2",
    name: "Descent v2",
    codename: "portfolio-3d-v2.html",
    file: "/archive/descent-v2.html",
    year: "2026 · Draft 02",
    what: "Same descent concept, but the camera flies past real 3D laptops and phones whose screens are drawn live on HTML5 Canvas. Includes hash-routed case-study pages so you can navigate deep into each project without leaving the WebGL world.",
    why: "Better — the screens showed real UI instead of geometry. But the frame rate on a mid-range laptop dropped below 30fps with four canvas textures rendering simultaneously. Performance is a first-class feature; a janky portfolio is a contradiction.",
    tech: ["Three.js", "Canvas 2D live textures", "Hash routing", "MeshStandardMaterial"],
  },
  {
    id: "visual",
    name: "CSS-3D Visual",
    codename: "portfolio-visual.html",
    file: "/archive/visual.html",
    year: "2026 · Draft 03",
    what: "CSS-3D device rigs — a ring of phones orbiting the hero section, floating tech chips and a full ⌘K command palette. No WebGL. All CSS transforms and perspective.",
    why: "Reached the limits of CSS-3D fast. Backface artifacts on Firefox, perspective flattening on Safari, z-fighting between overlapping cards. Pure CSS 3D is a great party trick but a liability for a production portfolio.",
    tech: ["CSS 3D transforms", "perspective()", "⌘K palette", "Zero JavaScript rendering"],
  },
  {
    id: "story",
    name: "Film Story",
    codename: "portfolio-story.html",
    file: "/archive/story.html",
    year: "2026 · Draft 04",
    what: "Reel-numbered chapters, a word-by-word manifesto that types itself in, architecture diagrams drawn in SVG, stat counters and a horizontal tech marquee. Narrated structure borrowed from the film industry.",
    why: "Great for storytelling, wrong medium for scanning. Technical reviewers want density and specificity, not a guided tour. The word-by-word typing animation felt clever the first time and exhausting by the fifth scroll.",
    tech: ["SVG architecture diagrams", "Word-by-word animation", "Chapter navigation", "Stat counters"],
  },
  {
    id: "inspired",
    name: "Pixels Move / Radar",
    codename: "portfolio-inspired.html",
    file: "/archive/inspired.html",
    year: "2026 · Draft 05",
    what: "The origin of 'Pixels move. Systems hold.', with live x/y pointer coordinates, studio text scrub, 3D laptop zoom portal, and duotone project slides. Direct ancestor of the current production site.",
    why: "Strongest foundation of the drafts. Kept the bold typography, live clock, and hardware perspective, while refactoring into high-performance Next.js and eliminating slow canvas redraws.",
    tech: ["Pointer tracking", "Coordinate radar", "Hardware perspective", "Duotone slides"],
  },
];

export const ArchivePage: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    setLoaded(true);
    // Mark as visited
    try {
      const eggs = JSON.parse(localStorage.getItem("sk_eggs") || "[]") as string[];
      if (!eggs.includes("archive")) {
        eggs.push("archive");
        localStorage.setItem("sk_eggs", JSON.stringify(eggs));
      }
    } catch {}
  }, []);

  const reduced = typeof window !== "undefined" && matchMedia("(prefers-reduced-motion:reduce)").matches;

  return (
    <div
      className="min-h-screen bg-[#0B0B0A] text-[#F3F3EE]"
      style={{ fontFamily: "'Geist', system-ui, sans-serif" }}
    >
      {/* Header */}
      <header className="border-b border-white/[0.08] px-6 sm:px-16 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-xs text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
        >
          ← Back to portfolio
        </Link>
        <span className="font-mono text-xs text-zinc-600">The Cutting Room Floor</span>
      </header>

      {/* Hero */}
      <div
        className="px-6 sm:px-16 pt-16 pb-12 border-b border-white/[0.08]"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "none" : "translateY(20px)",
          transition: reduced ? "none" : "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div className="font-mono text-xs text-zinc-500 mb-4 uppercase tracking-widest">Archive</div>
        <h1
          className="text-[clamp(48px,8vw,120px)] font-medium leading-[0.9] tracking-tight mb-6"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          The Cutting<br />Room Floor
        </h1>
        <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
          Five design drafts that didn&apos;t ship. Each one is a live, scaled-down preview — with a short note on what it tried and why it lost.
        </p>
        <p className="font-mono text-xs text-zinc-600 mt-4">
          Showing your design decisions and trade-offs is itself an engineering signal.
        </p>
        <div className="mt-6 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-zinc-400">
            Unlock: Konami code · type &quot;archive&quot; · click Hello. five times
          </span>
        </div>
      </div>

      {/* Entries */}
      <div className="px-6 sm:px-16 py-12 space-y-0 divide-y divide-white/[0.06]">
        {ENTRIES.map((entry, i) => (
          <div
            key={entry.id}
            className="py-10"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(16px)",
              transition: reduced ? "none" : `opacity 0.6s ${i * 0.1 + 0.3}s ease, transform 0.6s ${i * 0.1 + 0.3}s ease`,
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
              {/* Left: Text */}
              <div className="lg:col-span-5">
                <div className="font-mono text-xs text-zinc-600 mb-2 flex items-center gap-3">
                  <span>0{i + 1}/0{ENTRIES.length}</span>
                  <span>·</span>
                  <span>{entry.year}</span>
                </div>
                <h2
                  className="text-[clamp(32px,4vw,56px)] font-medium leading-[0.95] tracking-tight mb-1"
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                >
                  {entry.name}
                </h2>
                <div className="font-mono text-xs text-zinc-600 mb-5">{entry.codename}</div>

                <div className="space-y-4 text-sm text-zinc-400 leading-relaxed">
                  <div>
                    <div className="text-zinc-300 font-medium mb-1 text-xs uppercase tracking-wider font-mono">What it tried</div>
                    <p>{entry.what}</p>
                  </div>
                  <div>
                    <div className="text-zinc-300 font-medium mb-1 text-xs uppercase tracking-wider font-mono">Why it lost</div>
                    <p className="text-zinc-500">{entry.why}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-5">
                  {entry.tech.map(t => (
                    <span key={t} className="font-mono text-[11px] px-2.5 py-1 border border-white/[0.1] rounded-full text-zinc-500">
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={entry.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 font-mono text-xs text-[#00D4FF] hover:text-white transition-colors border border-[#00D4FF]/30 hover:border-white/30 px-4 py-2 rounded-full"
                >
                  Open live preview ↗
                </a>
              </div>

              {/* Right: Iframe preview */}
              <div className="lg:col-span-7">
                <div
                  className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-black"
                  style={{ aspectRatio: "16/10" }}
                >
                  {active === entry.id ? (
                    <iframe
                      src={entry.file}
                      className="w-full h-full border-0"
                      title={`${entry.name} preview`}
                      style={{ transform: "scale(1)", transformOrigin: "0 0" }}
                    />
                  ) : (
                    <button
                      onClick={() => setActive(entry.id)}
                      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-3 hover:bg-white/[0.03] transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full border border-white/[0.15] flex items-center justify-center group-hover:border-[#00D4FF]/50 transition-colors">
                        <span className="text-lg">▶</span>
                      </div>
                      <span className="font-mono text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
                        Click to load preview
                      </span>
                      <span className="font-mono text-[10px] text-zinc-700">
                        (loads Three.js — may take a moment)
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 sm:px-16 py-10 border-t border-white/[0.06] flex items-center justify-between font-mono text-xs text-zinc-600">
        <span>The live site chose clarity over spectacle.</span>
        <Link href="/" className="hover:text-zinc-400 transition-colors">
          Back to portfolio →
        </Link>
      </div>
    </div>
  );
};
