"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { SpatialCanvas } from "@/components/canvas/SpatialCanvas";
import { HeroStory } from "@/components/story/HeroStory";
import { StudioStory } from "@/components/story/StudioStory";
import { ApproachStory } from "@/components/story/ApproachStory";
import { WorkStory } from "@/components/story/WorkStory";
import { ContactStory } from "@/components/story/ContactStory";
import { CommandPalette } from "@/components/CommandPalette";

export default function Home() {
  const [activeSection, setActiveSection] = useState("Intro");
  const [isCmdKOpen, setIsCmdKOpen] = useState(false);
  const [heroProg, setHeroProg] = useState(0);
  const [studioProg, setStudioProg] = useState(0);
  const [approachProg, setApproachProg] = useState(0);
  const [approachStep, setApproachStep] = useState(0);
  const [approachStepProg, setApproachStepProg] = useState(0);
  const [workProg, setWorkProg] = useState(0);
  const [pageProg, setPageProg] = useState(0);

  // Command Palette Keyboard Listener
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

  // Section Scroll Tracking
  useEffect(() => {
    const clamp = (v: number) => Math.min(1, Math.max(0, v));

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const winH = window.innerHeight;
      const docH = document.documentElement.scrollHeight;
      setPageProg(clamp(scrollY / Math.max(1, docH - winH)));

      const computeProg = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        return clamp(-r.top / Math.max(1, r.height - winH));
      };

      const hp = computeProg("hero");
      const sp = computeProg("studio");
      const ap = computeProg("approach");
      const wp = computeProg("work");

      setHeroProg(hp);
      setStudioProg(sp);
      setApproachProg(ap);
      setWorkProg(wp);

      // Approach 4-step logic
      const a4 = clamp(ap / 0.78) * 4;
      const aStep = Math.min(3, Math.floor(a4));
      setApproachStep(aStep);
      setApproachStepProg(clamp((a4 - aStep) / 0.85));

      // Active Section Label for Nav
      const sections = document.querySelectorAll("[data-nav]");
      sections.forEach((sec) => {
        const r = sec.getBoundingClientRect();
        if (r.top <= winH * 0.5 && r.bottom >= winH * 0.5) {
          const navName = sec.getAttribute("data-nav");
          if (navName) setActiveSection(navName);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0B0B0A] text-[#F3F3EE] selection:bg-[#FF5533] selection:text-[#0B0B0A] overflow-x-clip">
      {/* Top Scroll Indicator */}
      <div
        className="fixed top-0 left-0 h-[2px] w-full bg-[#FF5533] origin-left z-50 pointer-events-none transition-transform duration-75"
        style={{ transform: `scaleX(${pageProg})` }}
        aria-hidden="true"
      />

      {/* Persistent HUD Navigation */}
      <Header
        activeSection={activeSection}
        onOpenCmdK={() => setIsCmdKOpen(true)}
      />

      {/* 3D Hardware Canvas (Phone & Laptop) */}
      <SpatialCanvas
        heroProgress={heroProg}
        approachProgress={approachProg}
        approachStep={approachStep}
        approachStepProgress={approachStepProg}
      />

      {/* Subtle Film Grain Texture */}
      <div className="film-grain" aria-hidden="true" />

      {/* Main Narrative Flow */}
      <main className="relative z-10 w-full">
        {/* 1. Hero: Dark, "Pixels move. Systems hold.", Radar Crosshairs */}
        <HeroStory progress={heroProg} />

        {/* 2. Studio: Flips to warm cream, word scrub illumination, Fig. 02 */}
        <StudioStory progress={studioProg} />

        {/* 3. Approach: Dark pinned, drifting words, 4 engineering phases, screen dolly portal */}
        <ApproachStory progress={approachProg} activeStep={approachStep} />

        {/* 4. Selected Work: Cream intro, full-bleed duotone pinned slides with dwell & wipe */}
        <WorkStory progress={workProg} />

        {/* 5. Contact: Ambient top red glow, underlined email, multi-language greeting */}
        <ContactStory />
      </main>

      {/* Command Palette (Cmd + K) */}
      <CommandPalette
        isOpen={isCmdKOpen}
        onClose={() => setIsCmdKOpen(false)}
      />
    </div>
  );
}
