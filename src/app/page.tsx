"use client";

import React, { useState, useEffect } from "react";
import { SpatialCanvas } from "@/components/canvas/SpatialCanvas";
import { FilmRail } from "@/components/story/FilmRail";
import { HeroStory } from "@/components/story/HeroStory";
import { ManifestoStory } from "@/components/story/ManifestoStory";
import { SpatialProjectReel } from "@/components/story/SpatialProjectReel";
import { StatsStory } from "@/components/story/StatsStory";
import { TechMarqueeStory } from "@/components/story/TechMarqueeStory";
import { ContactStory } from "@/components/story/ContactStory";
import { CommandPalette } from "@/components/CommandPalette";

export default function Home() {
  const [currentReel, setCurrentReel] = useState("Reel 00 · Opening");
  const [isCmdKOpen, setIsCmdKOpen] = useState(false);

  // Keyboard shortcut listener for Cmd + K / Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCmdKOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Track active chapter for the FilmRail HUD
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-chap]");
      const threshold = window.innerHeight * 0.45;
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= threshold && rect.bottom >= threshold) {
          const chap = section.getAttribute("data-chap");
          if (chap) setCurrentReel(chap);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0B0B0A] text-[#F3F3EE] selection:bg-[#FF5533] selection:text-[#0B0B0A] overflow-x-clip">
      {/* Interactive 3D WebGL Background Canvas */}
      <SpatialCanvas />

      {/* Cinematic Film Grain Overlay */}
      <div className="film-grain" aria-hidden="true" />

      {/* Film-Strip Rail & Floating Bottom Reel Indicator */}
      <FilmRail currentReel={currentReel} onOpenCmdK={() => setIsCmdKOpen(true)} />

      {/* Main Story Flow */}
      <main className="relative z-10 md:pl-6">
        {/* Reel 00: Opening Hero */}
        <HeroStory />

        {/* Reel 01: Premise Manifesto */}
        <ManifestoStory />

        {/* Reels 02 - 06: Spatial Featured Projects (Nestys, Scrollr, WoKataa, Earth Air, UrbanArena) */}
        <SpatialProjectReel />

        {/* Reel 07: Verified Impact & Numbers */}
        <StatsStory />

        {/* Infinite Tech Stack Marquee */}
        <TechMarqueeStory />

        {/* Reel 08: Credits & Direct Contact Channel */}
        <ContactStory />
      </main>

      {/* Quick Search & Jump Command Palette */}
      <CommandPalette
        isOpen={isCmdKOpen}
        onClose={() => setIsCmdKOpen(false)}
      />
    </div>
  );
}
