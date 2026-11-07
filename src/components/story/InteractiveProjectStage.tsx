"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { MacBookProMockup } from "@/components/devices/MacBookProMockup";
import { IPhoneMockup } from "@/components/devices/IPhoneMockup";
import { NestysScreen, ScrollrScreen, WoKataaScreen, EarthAirScreen, UrbanArenaScreen } from "@/components/devices/RealisticScreenUI";
import { Project } from "@/data/portfolioData";
import { Sparkles, ExternalLink } from "lucide-react";

interface InteractiveProjectStageProps {
  project: Project;
  index: number;
}

export const InteractiveProjectStage: React.FC<InteractiveProjectStageProps> = ({ project, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth mouse tilt spring physics
  const rotateX = useSpring(0, { stiffness: 200, damping: 25 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt (max 8 degrees)
    const tiltY = ((x - centerX) / centerX) * 8;
    const tiltX = -((y - centerY) / centerY) * 8;

    rotateX.set(tiltX);
    rotateY.set(tiltY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  const renderScreen = () => {
    switch (project.slug) {
      case "nestys":
        return <NestysScreen scrollProgress={0.4} />;
      case "scrollr":
        return <ScrollrScreen scrollProgress={0.5} />;
      case "wokataa":
        return <WoKataaScreen scrollProgress={0.5} />;
      case "earth-air":
        return <EarthAirScreen scrollProgress={0.5} />;
      case "urban-arena":
      default:
        return <UrbanArenaScreen scrollProgress={0.5} />;
    }
  };

  const isPhone = project.mockupType === "phone";

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full flex items-center justify-center py-6 sm:py-10 perspective-1000"
    >
      {/* Ambient Depth Radial Spotlight behind device */}
      <div
        className="absolute w-[450px] h-[350px] rounded-full blur-[100px] pointer-events-none opacity-25 -translate-y-6"
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
          y: isHovered ? -6 : [-4, 4, -4],
        }}
        transition={{
          y: isHovered
            ? { duration: 0.3 }
            : { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        className={`relative z-10 w-full flex items-center justify-center ${
          isPhone ? "max-w-[320px]" : "max-w-[640px]"
        }`}
      >
        {isPhone ? (
          <div className="relative transform-gpu drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)]">
            <IPhoneMockup
              projectName={project.title}
              scrollProgress={0.4}
              baseRotateY={0}
              baseRotateX={0}
              className="scale-[0.88] sm:scale-[0.95] origin-center"
            >
              {renderScreen()}
            </IPhoneMockup>
          </div>
        ) : (
          <div className="relative transform-gpu drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)] w-full">
            <MacBookProMockup
              projectName={project.title}
              scrollProgress={0.35}
              straight={true}
              className="w-full origin-center"
            >
              {renderScreen()}
            </MacBookProMockup>
          </div>
        )}

        {/* Floating Feature Chip Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute -bottom-4 right-2 sm:right-6 font-mono text-[10px] sm:text-[11px] px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center gap-2 shadow-xl z-20 pointer-events-none"
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: project.accentColor }}
          />
          <span>Interactive Preview · 60 FPS</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

