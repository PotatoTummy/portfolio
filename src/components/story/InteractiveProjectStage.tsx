"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useSpring } from "framer-motion";
import { MacBookProMockup } from "@/components/devices/MacBookProMockup";
import { IPhoneMockup } from "@/components/devices/IPhoneMockup";
import { WoKataaBattleScreen } from "@/components/story/WoKataaBattleScreen";
import { ScrollrReelsScreen } from "@/components/story/ScrollrReelsScreen";
import { Project } from "@/data/portfolioData";

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
      className="relative w-full flex items-center justify-center py-1 sm:py-6 perspective-1000"
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

        {/* Floating Feature Chip Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute -bottom-2 sm:-bottom-3 right-0.5 sm:right-6 font-mono text-[9px] sm:text-[11px] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-white flex items-center gap-1.5 sm:gap-2 shadow-xl z-20 pointer-events-none"
        >
          <span
            className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full animate-pulse"
            style={{ backgroundColor: project.accentColor }}
          />
          <span>Interactive Preview</span>
        </motion.div>
      </motion.div>
    </div>
  );
};
