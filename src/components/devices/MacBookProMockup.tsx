"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useIsMounted } from "@/hooks/useIsMounted";
import { Volume2, VolumeX, RotateCcw, Move3d } from "lucide-react";

interface MacBookProMockupProps {
  children?: React.ReactNode;
  videoUrl?: string;
  screenshotUrl?: string;
  projectName?: string;
  className?: string;
  scrollProgress?: number;
  floatingChips?: Array<{ text: string; position: "tl" | "tr" | "bl" | "br" }>;
  straight?: boolean;
}

export const MacBookProMockup: React.FC<MacBookProMockupProps> = ({
  children,
  videoUrl,
  screenshotUrl,
  projectName = "System Preview",
  className = "",
  scrollProgress: _scrollProgress = 0.5,
  floatingChips = [],
  straight = false,
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const mounted = useIsMounted();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 360° Orbit Drag State
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [orbitRotX, setOrbitRotX] = useState(0);
  const [orbitRotY, setOrbitRotY] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Hover & Glare State
  const [hoverTiltX, setHoverTiltX] = useState(0);
  const [hoverTiltY, setHoverTiltY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 30, opacity: 0.15 });
  const [isHovered, setIsHovered] = useState(false);
  const [trackpadPressed, setTrackpadPressed] = useState(false);

  // Laptop Display Lid: Fully opened upright facing the viewer (0° hinge angle)
  const lidHingeDeg = 0;

  // Fully straight, upright display facing the user directly with responsive subtle mouse hover physics
  const totalRotX = isDragging
    ? orbitRotX
    : straight
    ? hoverTiltX * 0.12
    : 2 + hoverTiltX * 0.12;

  const totalRotY = isDragging
    ? orbitRotY
    : straight
    ? hoverTiltY * 0.12
    : -2 + hoverTiltY * 0.12;

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
      setOrbitRotY((prev) => (prev + deltaX * 0.5) % 360);
      setOrbitRotX((prev) => Math.max(-45, Math.min(45, prev - deltaY * 0.4)));
      setDragStart({ x: e.clientX, y: e.clientY });
    } else if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setHoverTiltX(-y * 16);
      setHoverTiltY(x * 20);
      setGlarePos({
        x: Math.round((x + 0.5) * 100),
        y: Math.round((y + 0.5) * 100),
        opacity: 0.25,
      });
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

  const reset3DView = (e: React.MouseEvent) => {
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoverTiltX(0);
        setHoverTiltY(0);
        setGlarePos({ x: 50, y: 30, opacity: 0.12 });
      }}
      className={`relative mx-auto w-full max-w-4xl select-none [perspective:1500px] ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      } ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* 360° Drag & Scroll Indicator Bar */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 pointer-events-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-black/75 backdrop-blur-md text-[10px] font-mono text-zinc-300 shadow-xl">
          <Move3d className="h-3 w-3 text-[#00D4FF]" />
          <span>Drag 360° to rotate • Scroll to open</span>
        </div>
        {hasInteracted && (
          <button
            onClick={reset3DView}
            className="p-1 rounded-full border border-white/10 bg-black/80 hover:bg-white/10 text-zinc-300 transition-colors"
            title="Reset 3D Angle"
          >
            <RotateCcw className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* 3D Floating Rig (Apple 16" MacBook Pro Specifications) */}
      <div
        className="relative transition-transform duration-200 ease-out will-change-transform"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${totalRotX}deg) rotateY(${totalRotY}deg) translateZ(${
            isHovered || isDragging ? "25px" : "0px"
          })`,
        }}
      >
        {/* Dynamic Floor Ambient Shadow */}
        <div
          className="absolute -bottom-10 left-[10%] right-[10%] h-14 bg-black/90 blur-2xl rounded-full transform pointer-events-none transition-transform duration-300"
          style={{
            transform: `translate3d(${-totalRotY * 1.5}px, ${totalRotX * 0.8}px, -50px) scaleY(0.4)`,
          }}
        />
        <div
          className="absolute -bottom-4 left-[20%] right-[20%] h-10 bg-[#00D4FF]/15 blur-3xl rounded-full pointer-events-none"
          style={{ transform: "translateZ(-40px)" }}
        />

        {/* Floating 3D Technology Chips */}
        {floatingChips.map((chip, idx) => {
          const posMap = {
            tl: "-top-4 -left-4 sm:-left-8",
            tr: "-top-4 -right-4 sm:-right-8",
            bl: "-bottom-4 -left-4 sm:-left-8",
            br: "-bottom-4 -right-4 sm:-right-8",
          };
          const zDepth = 65 + idx * 15;
          return (
            <div
              key={idx}
              className={`absolute ${posMap[chip.position]} z-40 px-3 py-1.5 rounded-full border border-white/15 bg-black/80 backdrop-blur-md text-xs font-mono text-zinc-200 shadow-xl pointer-events-none transition-transform duration-300`}
              style={{
                transform: `translateZ(${zDepth}px)`,
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF] inline-block mr-2 animate-pulse" />
              {chip.text}
            </div>
          );
        })}

        {/* Screen Lid Assembly (Liquid Retina XDR) */}
        <div
          className="relative rounded-[22px] p-[10px] sm:p-[13px] bg-gradient-to-b from-[#2E2E2C] via-[#1B1B19] to-[#111110] border border-[#424240] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.08)] transition-transform duration-500 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "bottom center",
            transform: `rotateX(${lidHingeDeg}deg)`,
          }}
        >
          {/* Subtle Outer Aluminum Perimeter Chamfer */}
          <div className="absolute inset-0 rounded-[22px] pointer-events-none border border-white/[0.09] shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.22)]" />

          {/* Precision Display Glass Frame */}
          <div
            className="relative overflow-hidden rounded-[12px] bg-[#000000] border border-black/90 shadow-2xl"
            style={{ transform: "translateZ(15px)" }}
          >
            {/* Apple Camera Notch & Green LED */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 h-[14px] w-[96px] sm:h-[16px] sm:w-[124px] bg-[#000000] rounded-b-[9px] flex items-center justify-center gap-2 border-b border-black">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0F141C] ring-1 ring-[#1E2330] relative">
                <span className="absolute inset-0.5 rounded-full bg-[#1A3A5A]/60" />
              </span>
              <span className="h-1 w-1 rounded-full bg-[#00FF66]/50 shadow-[0_0_4px_#00FF66]" />
            </div>

            {/* Specular Light Reflection Glare */}
            <div
              className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-200"
              style={{
                background: `radial-gradient(circle 500px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glarePos.opacity}) 0%, transparent 60%)`,
                mixBlendMode: "screen",
              }}
            />

            {/* Interactive Screen Viewport */}
            <div className="screen-content-area relative aspect-[16/10] w-full overflow-hidden bg-white pointer-events-auto">
              {videoUrl ? (
                mounted ? (
                  <div className="relative h-full w-full">
                    <video
                      src={videoUrl}
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      suppressHydrationWarning
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-3 right-3 z-30 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[11px] text-zinc-300">
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-0.5 hover:text-white transition-colors"
                        title={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                      </button>
                      <span className="font-mono text-[10px] text-zinc-400">60 FPS</span>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-full w-full bg-black" />
                )
              ) : screenshotUrl ? (
                <div className="relative h-full w-full">
                  <Image
                    src={screenshotUrl}
                    alt={`${projectName} Screen Preview`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 900px"
                    priority
                  />
                </div>
              ) : (
                children
              )}
            </div>
          </div>
        </div>

        {/* Apple MacBook Pro Aluminum Bottom Base with Recessed Well & Speaker Grills */}
        <div
          className="relative -mt-1 mx-auto w-[106%] -left-[3%] h-[18px] sm:h-[22px] bg-gradient-to-b from-[#343432] via-[#20201E] to-[#141413] rounded-b-[22px] border-t border-[#464644] shadow-[0_16px_32px_rgba(0,0,0,0.95),inset_0_1px_1.5px_rgba(255,255,255,0.18)] flex items-start justify-center cursor-pointer"
          style={{ transform: "translateZ(5px)" }}
          onClick={() => {
            setTrackpadPressed(true);
            setTimeout(() => setTrackpadPressed(false), 150);
          }}
          title="Click Trackpad"
        >
          {/* Opener Notch & Click Feedback */}
          <div
            className={`h-[4px] sm:h-[5px] w-16 sm:w-22 bg-[#0A0A09] rounded-b-md shadow-inner border-t border-black/80 transition-transform ${
              trackpadPressed ? "scale-95 bg-[#00D4FF]" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
};
