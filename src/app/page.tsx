"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { SpatialCanvas } from "@/components/canvas/SpatialCanvas";
import { HeroStory } from "@/components/story/HeroStory";
import { StudioStory } from "@/components/story/StudioStory";
import { LaptopZoomPortal } from "@/components/story/LaptopZoomPortal";
import { WorkStory } from "@/components/story/WorkStory";
import { CraftStatementStory } from "@/components/story/CraftStatementStory";
import { ContactStory } from "@/components/story/ContactStory";
import { CommandPalette } from "@/components/CommandPalette";
import { CursorSpotlight } from "@/components/ui/CursorSpotlight";
import { useEasterEggs, PerfHUD, EggCounter } from "@/components/EasterEggs";
import { ArchitectureModal } from "@/components/ArchitectureModal";
import { Project } from "@/data/portfolioData";
import { useIsMobile } from "@/hooks/useIsMobile";

// Mobile dedicated components
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { MobileHero } from "@/components/mobile/MobileHero";
import { MobileWorkSection } from "@/components/mobile/MobileWorkSection";
import { MobileApproachSection } from "@/components/mobile/MobileApproachSection";
import { MobileStudioSection } from "@/components/mobile/MobileStudioSection";
import { MobileContactSection } from "@/components/mobile/MobileContactSection";
import { MobileArcadePad } from "@/components/mobile/MobileArcadePad";
import { MobileDevConsole } from "@/components/mobile/MobileDevConsole";
import { MobileSecretsSheet } from "@/components/mobile/MobileSecretsSheet";
import { MobileBottomBar } from "@/components/mobile/MobileBottomBar";

export default function Home() {
  const isMobile = useIsMobile();
  const [activeSection, setActiveSection] = useState("Intro");
  const [isCmdKOpen, setIsCmdKOpen] = useState(false);
  const [heroProg, setHeroProg] = useState(0);
  const [studioProg, setStudioProg] = useState(0);
  const [portalProg, setPortalProg] = useState(0);
  const [workProg, setWorkProg] = useState(0);
  const [pageProg, setPageProg] = useState(0);

  // Mobile modal states
  const [selectedArchProject, setSelectedArchProject] = useState<Project | null>(null);
  const [isSecretsSheetOpen, setIsSecretsSheetOpen] = useState(false);
  const [isArcadePadOpen, setIsArcadePadOpen] = useState(false);
  const [isDevConsoleOpen, setIsDevConsoleOpen] = useState(false);

  const {
    foundEggs,
    perfMode,
    setPerfMode,
    blueprintMode,
    setBlueprintMode,
    handleHelloClick,
  } = useEasterEggs();

  // Listen for perf command from CommandPalette custom event
  useEffect(() => {
    const handler = () => setPerfMode((p) => !p);
    window.addEventListener("sk:perf", handler);
    return () => window.removeEventListener("sk:perf", handler);
  }, [setPerfMode]);

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

  // Section Scroll Tracking (Runs strictly on Desktop to eliminate mobile layout thrashing)
  useEffect(() => {
    if (isMobile) return;

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
  }, [isMobile]);

  return (
    <div className="relative min-h-screen bg-[#0B0B0A] text-[#F3F3EE] selection:bg-[#00D4FF] selection:text-[#0B0B0A] overflow-x-clip">
      
      {/* =========================================================================
          MOBILE-FIRST TAILORED EXPERIENCE (< 840px / Touch)
          Buttery smooth 60fps natural touch scrolling with 0 scrub lag
         ========================================================================= */}
      {isMobile ? (
        <>
          {/* Mobile Header with Double-Tap HUD & Long-Press Blueprint support */}
          <MobileHeader
            onOpenCmdK={() => setIsCmdKOpen(true)}
            onOpenSecrets={() => setIsSecretsSheetOpen(true)}
            onOpenConsole={() => setIsDevConsoleOpen(true)}
            onTogglePerf={() => setPerfMode((p) => !p)}
            onToggleBlueprint={() => {
              const next = !blueprintMode;
              setBlueprintMode(next);
              document.documentElement.classList.toggle("blueprint-mode", next);
            }}
            foundEggsCount={foundEggs.size}
            totalEggsCount={7}
          />

          <main className="w-full">
            {/* 1. Mobile Hero: High contrast, instant proof points, live 10fps FPS graph, gyroscope tilt */}
            <MobileHero />

            {/* 2. Mobile Studio: CSS scroll-snap reel carousel, 9:41 dynamic notch, 3 studio principles */}
            <MobileStudioSection />

            {/* 3. Mobile Engineering Approach: Stacked overlapping sticky cards & code typewriter */}
            <MobileApproachSection />

            {/* 4. Mobile Selected Work: Swipeable horizontal snap cards, accordion receipts, architecture [D] */}
            <MobileWorkSection
              onSelectArchitecture={(project) => setSelectedArchProject(project)}
            />

            {/* 5. Mobile Contact: Large email CTA, experience, cycling greetings, easter egg */}
            <MobileContactSection
              onHelloClick={handleHelloClick}
              onArchiveClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("sk:egg", { detail: "archive" }));
                  window.location.href = "/archive";
                }
              }}
            />
          </main>

          {/* Sticky Bottom Action Navigation Bar (Auto-hides on scroll-down, reveals on scroll-up) */}
          <MobileBottomBar onOpenMenu={() => setIsCmdKOpen(true)} />

          {/* Mobile Interactive Easter Egg Sheets & Modals */}
          <MobileSecretsSheet
            isOpen={isSecretsSheetOpen}
            onClose={() => setIsSecretsSheetOpen(false)}
            foundSet={foundEggs}
            onOpenArcade={() => {
              setIsSecretsSheetOpen(false);
              setIsArcadePadOpen(true);
            }}
            onOpenConsole={() => {
              setIsSecretsSheetOpen(false);
              setIsDevConsoleOpen(true);
            }}
            onTogglePerf={() => {
              setIsSecretsSheetOpen(false);
              setPerfMode((p) => !p);
            }}
            onToggleBlueprint={() => {
              setIsSecretsSheetOpen(false);
              const next = !blueprintMode;
              setBlueprintMode(next);
              document.documentElement.classList.toggle("blueprint-mode", next);
            }}
            onGoToArchive={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("sk:egg", { detail: "archive" }));
                window.location.href = "/archive";
              }
            }}
          />

          {/* Virtual Arcade D-Pad Modal (Mobile Konami Code) */}
          <MobileArcadePad
            isOpen={isArcadePadOpen}
            onClose={() => setIsArcadePadOpen(false)}
            onSuccess={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("sk:egg", { detail: "konami" }));
                window.location.href = "/archive";
              }
            }}
          />

          {/* Mobile In-App Dev Terminal Console */}
          <MobileDevConsole
            isOpen={isDevConsoleOpen}
            onClose={() => setIsDevConsoleOpen(false)}
          />

          {/* Architecture Modal */}
          <ArchitectureModal
            project={selectedArchProject}
            onClose={() => setSelectedArchProject(null)}
          />
        </>
      ) : (
        /* =========================================================================
            DESKTOP SPATIAL STAGE (>= 840px / Fine Pointer)
            Full 3D narrative, hardware portals, and spatial starfield
           ========================================================================= */
        <>
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
            {/* 1. Hero: Clean typography, direct value proposition, floating MacBook Pro */}
            <HeroStory progress={heroProg} />

            {/* 2. Studio: Studio Principles */}
            <StudioStory progress={studioProg} />

            {/* 3. Hardware Portal: MacBook Pro opens with genuine production UI preview */}
            <LaptopZoomPortal progress={portalProg} />

            {/* 4. Selected Work: High-impact portfolio showcase */}
            <WorkStory progress={workProg} />

            {/* 5. Craft Statement: Minimal kinetic typography */}
            <CraftStatementStory />

            {/* 6. Contact: Clean, high-contrast contact section */}
            <ContactStory onHelloClick={handleHelloClick} />
          </main>

          {/* Desktop Easter Egg Counter */}
          <EggCounter foundSet={foundEggs} />
        </>
      )}

      {/* Shared Command Palette (Cmd + K) */}
      <CommandPalette
        isOpen={isCmdKOpen}
        onClose={() => setIsCmdKOpen(false)}
      />

      {/* Shared Web Vitals HUD */}
      {perfMode && <PerfHUD onClose={() => setPerfMode(false)} />}
    </div>
  );
}
