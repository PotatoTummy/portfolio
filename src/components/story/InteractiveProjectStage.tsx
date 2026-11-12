"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useSpring } from "framer-motion";
import { MacBookProMockup } from "@/components/devices/MacBookProMockup";
import { IPhoneMockup } from "@/components/devices/IPhoneMockup";
import { WoKataaBattleScreen } from "@/components/story/WoKataaBattleScreen";
import { ScrollrReelsScreen } from "@/components/story/ScrollrReelsScreen";
import { Project } from "@/data/portfolioData";
import { Layers, Network, X } from "lucide-react";

interface InteractiveProjectStageProps {
  project: Project;
  index: number;
}

const SCREEN_IMAGES: Record<string, string> = {
  nestys: "/projects/screens/nestys-white-screen.png",
  scrollr: "/projects/screens/scrollr-white-screen.png",
  wokataa: "/projects/screens/wokataa-white-screen.png",
  "earth-air": "/projects/screens/earthair-white-screen.png",
  "urban-arena": "/projects/screens/urbanarena-mobile.png",
};

export const InteractiveProjectStage: React.FC<InteractiveProjectStageProps> = ({ project }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showArch, setShowArch] = useState(false);

  // Keyboard shortcut: Press "D" to toggle Architecture Diagram
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "d" || e.key === "D") {
        setShowArch((prev) => {
          const next = !prev;
          if (next) {
            window.dispatchEvent(new CustomEvent("sk:egg", { detail: "diagram" }));
          }
          return next;
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Smooth mouse tilt spring physics
  const rotateX = useSpring(0, { stiffness: 220, damping: 25 });
  const rotateY = useSpring(0, { stiffness: 220, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt (max 7 degrees)
    const tiltY = ((x - centerX) / centerX) * 7;
    const tiltX = -((y - centerY) / centerY) * 7;

    rotateX.set(tiltX);
    rotateY.set(tiltY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  const isPhone = project.mockupType === "phone";
  const screenImage = SCREEN_IMAGES[project.slug] || SCREEN_IMAGES["nestys"];

  const getImageClasses = (slug: string) => {
    if (slug === "wokataa") {
      return "object-contain object-center scale-[0.98]";
    }
    return "object-cover object-top";
  };

  const renderScreenContent = () => {
    if (showArch) {
      return (
        <div className="relative w-full h-full bg-[#0B0B0A] text-[#F3F3EE] p-4 sm:p-6 overflow-y-auto font-mono text-left select-text">
          <div className="flex items-center justify-between border-b border-white/[0.1] pb-2 mb-3">
            <div className="flex items-center gap-2">
              <Network className="w-3.5 h-3.5 text-[#00D4FF]" />
              <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                System Architecture
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowArch(false);
              }}
              className="text-zinc-500 hover:text-white p-1"
              title="Close Diagram"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[10px] text-zinc-400 mb-3 leading-relaxed">
            {project.architecture.overview}
          </p>

          <div className="space-y-2 mb-3">
            <div className="text-[9px] uppercase tracking-wider text-[#00D4FF] font-semibold">
              Topology Nodes
            </div>
            {project.architecture.nodes.map((node, i) => (
              <div
                key={i}
                className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[10px]"
              >
                <div className="font-bold text-white flex items-center justify-between">
                  <span>{node.name}</span>
                  <span className="text-[9px] text-[#00D4FF] font-normal">{node.tech}</span>
                </div>
                <div className="text-zinc-400 text-[9px] mt-0.5">{node.role}</div>
              </div>
            ))}
          </div>

          <div className="space-y-1.5 pt-2 border-t border-white/[0.08]">
            <div className="text-[9px] uppercase tracking-wider text-zinc-500 font-semibold">
              Data Flow Sequence
            </div>
            {project.architecture.dataFlow.map((flow, i) => (
              <div key={i} className="text-[9px] text-zinc-400 flex items-start gap-1.5 leading-snug">
                <span className="text-[#00D4FF] font-bold shrink-0">{i + 1}.</span>
                <span>{flow}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (project.slug === "wokataa") {
      return <WoKataaBattleScreen />;
    }

    if (project.slug === "scrollr") {
      return <ScrollrReelsScreen />;
    }

    return (
      <div className="relative w-full h-full bg-white overflow-hidden select-none">
        <Image
          src={screenImage}
          alt={`${project.title} Interface`}
          fill
          sizes={isPhone ? "320px" : "640px"}
          className={getImageClasses(project.slug)}
          priority
        />
        {/* Subtle realistic screen glass reflection */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 40%, transparent 60%)",
          }}
        />
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full flex items-center justify-center py-1 sm:py-6 perspective-1000 group"
    >
      {/* Ambient Depth Radial Spotlight behind device */}
      <div
        className="absolute w-[260px] sm:w-[440px] h-[180px] sm:h-[320px] rounded-full blur-[70px] sm:blur-[90px] pointer-events-none opacity-30 -translate-y-4"
        style={{
          background: `radial-gradient(circle, ${project.accentColor} 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Floating 3D Device Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: isHovered ? -6 : [-3, 3, -3],
        }}
        transition={{
          y: isHovered
            ? { duration: 0.25 }
            : { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
        className={`relative z-10 w-full flex items-center justify-center ${
          isPhone ? "max-w-[210px] xs:max-w-[260px] sm:max-w-[310px]" : "max-w-[320px] xs:max-w-[440px] sm:max-w-[620px]"
        }`}
      >
        {isPhone ? (
          <div className="relative transform-gpu drop-shadow-[0_20px_45px_rgba(0,0,0,0.65)]">
            <IPhoneMockup
              projectName={project.title}
              scrollProgress={0.4}
              baseRotateY={0}
              baseRotateX={0}
              className="scale-[0.80] xs:scale-[0.88] sm:scale-[0.95] origin-center"
            >
              {renderScreenContent()}
            </IPhoneMockup>
          </div>
        ) : (
          <div className="relative transform-gpu drop-shadow-[0_25px_50px_rgba(0,0,0,0.75)] w-full">
            <MacBookProMockup
              projectName={project.title}
              scrollProgress={0.35}
              straight={true}
              className="w-full scale-[0.85] xs:scale-[0.92] sm:scale-100 origin-center"
            >
              {renderScreenContent()}
            </MacBookProMockup>
          </div>
        )}

        {/* Floating Feature & Architecture Toggle Pill */}
        <div className="absolute -bottom-2 sm:-bottom-3 right-0.5 sm:right-6 font-mono text-[9px] sm:text-[11px] flex items-center gap-2 z-20">
          <button
            type="button"
            onClick={() => {
              setShowArch((prev) => {
                const next = !prev;
                if (next) {
                  window.dispatchEvent(new CustomEvent("sk:egg", { detail: "diagram" }));
                }
                return next;
              });
            }}
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/90 backdrop-blur-md border border-white/20 text-white hover:border-[#00D4FF] hover:text-[#00D4FF] flex items-center gap-1.5 sm:gap-2 shadow-xl transition-all cursor-pointer"
            title="Press 'D' key to toggle Architecture Diagram"
          >
            <span
              className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full"
              style={{ backgroundColor: showArch ? "#00D4FF" : project.accentColor }}
            />
            <span>{showArch ? "Show UI Preview" : "Architecture [D]"}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
