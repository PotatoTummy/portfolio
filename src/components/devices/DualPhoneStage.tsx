"use client";

import React, { useState, useRef } from "react";
import { IPhoneMockup } from "./IPhoneMockup";
import { Move3d, RotateCcw } from "lucide-react";

interface DualPhoneStageProps {
  primaryChild: React.ReactNode;
  secondaryChild: React.ReactNode;
  primaryProjectName?: string;
  secondaryProjectName?: string;
  className?: string;
  mode?: "staggered" | "clash";
  scrollProgress?: number;
}

export const DualPhoneStage: React.FC<DualPhoneStageProps> = ({
  primaryChild,
  secondaryChild,
  primaryProjectName = "Primary App",
  secondaryProjectName = "Secondary App",
  className = "",
  mode = "staggered",
  scrollProgress = 0.5,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 360° Orbit Drag State
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [orbitRotX, setOrbitRotX] = useState(0);
  const [orbitRotY, setOrbitRotY] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Hover Tilt
  const [hoverX, setHoverX] = useState(0);
  const [hoverY, setHoverY] = useState(0);

  // Scroll pitch
  const scrollPitch = (scrollProgress - 0.5) * 16;

  const totalRotX = isDragging ? orbitRotX : -hoverY * 18 - scrollPitch;
  const totalRotY = isDragging ? orbitRotY : hoverX * 24;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest(".screen-content-area")) return;

    setIsDragging(true);
    setHasInteracted(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      setOrbitRotY((prev) => (prev + deltaX * 0.6) % 360);
      setOrbitRotX((prev) => Math.max(-50, Math.min(50, prev - deltaY * 0.5)));
      setDragStart({ x: e.clientX, y: e.clientY });
    } else if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setHoverX((e.clientX - rect.left) / rect.width - 0.5);
      setHoverY((e.clientY - rect.top) / rect.height - 0.5);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  const reset3D = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOrbitRotX(0);
    setOrbitRotY(0);
    setHasInteracted(false);
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseLeave={() => {
        setHoverX(0);
        setHoverY(0);
      }}
      className={`relative mx-auto w-full max-w-xl flex items-center justify-center min-h-[540px] select-none [perspective:1400px] ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      } ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* 360° Drag & Scroll Indicator */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 pointer-events-auto">
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-white/10 bg-black/70 backdrop-blur-md text-[10px] font-mono text-zinc-300 shadow-lg">
          <Move3d className="h-3 w-3 text-[#FF5533]" />
          <span>Drag 360° to rotate • Scroll to animate</span>
        </div>
        {hasInteracted && (
          <button
            onClick={reset3D}
            className="p-1 rounded-full border border-white/10 bg-black/80 hover:bg-white/10 text-zinc-300 transition-colors"
            title="Reset"
          >
            <RotateCcw className="h-3 w-3" />
          </button>
        )}
      </div>

      {mode === "clash" ? (
        // WoKataa Clashing Duel Phones
        <div
          className="relative w-full flex items-center justify-center gap-4 sm:gap-8 transition-transform duration-200 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${totalRotX}deg) rotateY(${totalRotY}deg)`,
          }}
        >
          {/* Player 1 Phone */}
          <div
            className="transition-transform duration-300"
            style={{
              transform: `rotateY(16deg) rotateX(4deg) translateZ(25px)`,
              transformStyle: "preserve-3d",
            }}
          >
            <IPhoneMockup
              projectName={primaryProjectName}
              scrollProgress={scrollProgress}
              className="w-[220px] sm:w-[260px]"
            >
              {primaryChild}
            </IPhoneMockup>
          </div>

          {/* Player 2 Phone */}
          <div
            className="transition-transform duration-300"
            style={{
              transform: `rotateY(-16deg) rotateX(4deg) translateZ(-15px)`,
              transformStyle: "preserve-3d",
            }}
          >
            <IPhoneMockup
              projectName={secondaryProjectName}
              scrollProgress={scrollProgress}
              className="w-[220px] sm:w-[260px]"
            >
              {secondaryChild}
            </IPhoneMockup>
          </div>
        </div>
      ) : (
        // Scrollr Staggered Vertical Reel Phones
        <div
          className="relative w-full flex items-center justify-center transition-transform duration-200 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${totalRotX}deg) rotateY(${totalRotY}deg)`,
          }}
        >
          {/* Back Phone (Deep Z) */}
          <div
            className="absolute -right-2 sm:right-6 -top-4 opacity-75 blur-[0.5px] scale-90 transition-transform duration-300"
            style={{
              transform: `translate3d(0, 0, -80px) rotateY(-18deg) rotateZ(3deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <IPhoneMockup
              projectName={secondaryProjectName}
              scrollProgress={scrollProgress}
              className="w-[230px] sm:w-[270px]"
            >
              {secondaryChild}
            </IPhoneMockup>
          </div>

          {/* Front Phone (Elevated Z) */}
          <div
            className="relative z-20 sm:-left-8 transition-transform duration-300"
            style={{
              transform: `translate3d(0, 0, 45px) rotateY(6deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <IPhoneMockup
              projectName={primaryProjectName}
              scrollProgress={scrollProgress}
              className="w-[250px] sm:w-[290px]"
            >
              {primaryChild}
            </IPhoneMockup>
          </div>
        </div>
      )}
    </div>
  );
};
