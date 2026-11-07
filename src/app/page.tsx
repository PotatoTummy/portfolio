"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { SpatialCanvas } from "@/components/canvas/SpatialCanvas";
import { HeroStory } from "@/components/story/HeroStory";
import { StudioStory } from "@/components/story/StudioStory";
import { LaptopZoomPortal } from "@/components/story/LaptopZoomPortal";
import { WorkStory } from "@/components/story/WorkStory";
import { ContactStory } from "@/components/story/ContactStory";
import { CommandPalette } from "@/components/CommandPalette";
import { CursorSpotlight } from "@/components/ui/CursorSpotlight";

export default function Home() {
  const [activeSection, setActiveSection] = useState("Intro");
  const [isCmdKOpen, setIsCmdKOpen] = useState(false);
  const [heroProg, setHeroProg] = useState(0);
  const [studioProg, setStudioProg] = useState(0);
  const [portalProg, setPortalProg] = useState(0);
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

      setHeroProg(computeProg("hero"));
      setStudioProg(computeProg("studio"));
      setPortalProg(computeProg("portal"));
      setWorkProg(computeProg("work"));

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
    <div className="relative min-h-screen bg-[#0B0B0A] text-[#F3F3EE] selection:bg-[#00D4FF] selection:text-[#0B0B0A] overflow-x-clip">
      {/* Top Scroll Indicator */}
      <div
        className="fixed top-0 left-0 h-[2px] w-full bg-[#00D4FF] origin-left z-50 pointer-events-none transition-transform duration-75"
        style={{ transform: `scaleX(${pageProg})` }}
        aria-hidden="true"
      />

      {/* Ambient Interactive Cursor Spotlight */}
      <CursorSpotlight />

      {/* Persistent HUD Navigation */}
      <Header
        activeSection={activeSection}
        onOpenCmdK={() => setIsCmdKOpen(true)}
      />

      {/* Ambient Depth Starfield */}
      <SpatialCanvas heroProgress={heroProg} />

      {/* Subtle Film Grain Texture */}
      <div className="film-grain" aria-hidden="true" />

      {/* Main Narrative Flow */}
      <main className="relative z-10 w-full">
        {/* 1. Hero: Clean typography, direct value proposition, floating MacBook Pro with genuine preview */}
        <HeroStory progress={heroProg} />

        {/* 2. Studio: Studio Principles shifted upwards, Framer Motion animations, no dock clipping */}
        <StudioStory progress={studioProg} />

        {/* 3. Hardware Portal: MacBook Pro opens with genuine production UI preview */}
        <LaptopZoomPortal progress={portalProg} />

        {/* 4. Selected Work: High-impact portfolio showcase */}
        <WorkStory progress={workProg} />

        {/* 5. Contact: Clean, high-contrast, effortless contact section */}
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
