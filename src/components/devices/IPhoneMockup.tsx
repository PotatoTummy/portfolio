"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useIsMounted } from "@/hooks/useIsMounted";
import { Wifi, BatteryMedium, Volume2, VolumeX, Move3d, RotateCcw } from "lucide-react";

interface IPhoneMockupProps {
  children?: React.ReactNode;
  videoUrl?: string;
  screenshotUrl?: string;
  projectName?: string;
  className?: string;
  baseRotateY?: number;
  baseRotateX?: number;
  scrollProgress?: number;
  floatingChips?: Array<{ text: string; position: "tl" | "tr" | "bl" | "br" }>;
}

export const IPhoneMockup: React.FC<IPhoneMockupProps> = ({
  children,
  videoUrl,
  screenshotUrl,
  projectName = "Mobile App",
  className = "",
  baseRotateY = 0,
  baseRotateX = 0,
  scrollProgress = 0.5,
  floatingChips = [],
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const mounted = useIsMounted();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 360° Drag Orbit State
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [orbitRotX, setOrbitRotX] = useState(baseRotateX);
  const [orbitRotY, setOrbitRotY] = useState(baseRotateY);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Hover & Glare State
  const [hoverTiltX, setHoverTiltX] = useState(0);
  const [hoverTiltY, setHoverTiltY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 30, opacity: 0.15 });
  const [isHovered, setIsHovered] = useState(false);

  // Scroll driven subtle pitch
  const scrollPitch = (scrollProgress - 0.5) * 14;

  const totalRotX = isDragging ? orbitRotX : baseRotateX + hoverTiltX - scrollPitch;
  const totalRotY = isDragging ? orbitRotY : baseRotateY + hoverTiltY;

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
      setOrbitRotX((prev) => Math.max(-55, Math.min(55, prev - deltaY * 0.5)));
      setDragStart({ x: e.clientX, y: e.clientY });
    } else if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setHoverTiltX(-y * 24);
      setHoverTiltY(x * 28);
      setGlarePos({
        x: Math.round((x + 0.5) * 100),
        y: Math.round((y + 0.5) * 100),
        opacity: 0.3,
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
    setOrbitRotX(baseRotateX);
    setOrbitRotY(baseRotateY);
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
      className={`relative mx-auto w-[275px] sm:w-[310px] select-none [perspective:1400px] ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      } ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* 360° Drag Hint & Reset */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 pointer-events-auto">
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-white/10 bg-black/70 backdrop-blur-md text-[9px] font-mono text-zinc-300 shadow-lg">
          <Move3d className="h-2.5 w-2.5 text-[#2B6CFF]" />
          <span>Drag 360°</span>
        </div>
        {hasInteracted && (
          <button
            onClick={reset3DView}
            className="p-1 rounded-full border border-white/10 bg-black/80 hover:bg-white/10 text-zinc-300 transition-colors"
            title="Reset"
          >
            <RotateCcw className="h-2.5 w-2.5" />
          </button>
        )}
      </div>

      {/* 3D Floating Rig */}
      <div
        className="relative transition-transform duration-200 ease-out will-change-transform"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${totalRotX}deg) rotateY(${totalRotY}deg) translateZ(${
            isHovered || isDragging ? "30px" : "0px"
          })`,
        }}
      >
        {/* Dynamic 3D Contact Shadow */}
        <div
          className="absolute -bottom-8 left-[12%] right-[12%] h-10 bg-black/85 blur-2xl rounded-full transform pointer-events-none transition-transform duration-300"
          style={{
            transform: `translate3d(${-totalRotY * 1.8}px, ${totalRotX}px, -40px) scaleY(0.4)`,
          }}
        />
        <div
          className="absolute -bottom-4 left-[20%] right-[20%] h-8 bg-[#2B6CFF]/20 blur-3xl rounded-full pointer-events-none"
          style={{ transform: "translateZ(-30px)" }}
        />

        {/* Floating 3D Chips */}
        {floatingChips.map((chip, idx) => {
          const posMap = {
            tl: "-top-3 -left-6",
            tr: "-top-3 -right-6",
            bl: "-bottom-3 -left-6",
            br: "-bottom-3 -right-6",
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
              <span className="h-1.5 w-1.5 rounded-full bg-[#2B6CFF] inline-block mr-2 animate-pulse" />
              {chip.text}
            </div>
          );
        })}

        {/* Titanium Outer Frame */}
        <div
          className="relative rounded-[50px] p-[10px] bg-gradient-to-b from-[#3E3E3C] via-[#242422] to-[#141413] border border-[#50504E] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.12),inset_0_1px_2px_rgba(255,255,255,0.3)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Antenna Bands */}
          <div className="absolute left-0 top-24 w-1 h-1.5 bg-[#141413]/90 rounded-r" />
          <div className="absolute right-0 top-24 w-1 h-1.5 bg-[#141413]/90 rounded-l" />
          <div className="absolute left-0 bottom-24 w-1 h-1.5 bg-[#141413]/90 rounded-r" />
          <div className="absolute right-0 bottom-24 w-1 h-1.5 bg-[#141413]/90 rounded-l" />

          {/* Super Retina XDR OLED Display Assembly */}
          <div
            className="relative overflow-hidden rounded-[40px] bg-[#000000] aspect-[9/19.5] border border-black shadow-inner flex flex-col justify-between"
            style={{ transform: "translateZ(18px)", transformStyle: "preserve-3d" }}
          >
            {/* iOS Dynamic Island & Status Bar */}
            <div
              className="relative z-30 pt-3 px-6 flex items-center justify-between text-white text-[11px] font-sans font-medium"
              style={{ transform: "translateZ(20px)" }}
            >
              <span className="tracking-tight font-semibold">9:41</span>

              {/* Dynamic Island Capsule */}
              <div className="absolute left-1/2 -translate-x-1/2 top-2.5 h-[24px] w-[88px] bg-black rounded-full flex items-center justify-between px-2.5 shadow-md border border-white/5">
                <span className="h-2 w-2 rounded-full bg-[#080B10] ring-1 ring-white/10 relative">
                  <span className="absolute inset-0.5 rounded-full bg-[#1A3A5A]/60" />
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#00FF66]/50 shadow-[0_0_4px_#00FF66]" />
              </div>

              <div className="flex items-center gap-1.5 opacity-90">
                <span className="text-[10px] font-bold">5G</span>
                <Wifi className="h-3 w-3" />
                <BatteryMedium className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Specular Light Reflection Layer */}
            <div
              className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-200"
              style={{
                background: `radial-gradient(circle 380px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glarePos.opacity}) 0%, transparent 60%)`,
                mixBlendMode: "screen",
              }}
            />

            {/* Interactive Screen Content Viewport */}
            <div className="screen-content-area relative flex-1 w-full overflow-hidden bg-white pointer-events-auto">
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
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="absolute bottom-4 right-4 z-30 p-2 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10"
                    >
                      {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                ) : (
                  <div className="relative h-full w-full bg-black" />
                )
              ) : screenshotUrl ? (
                <div className="relative h-full w-full">
                  <Image
                    src={screenshotUrl}
                    alt={`${projectName} Screen`}
                    fill
                    className="object-cover"
                    sizes="310px"
                    priority
                  />
                </div>
              ) : (
                children
              )}
            </div>

            {/* iOS Home Indicator Bar */}
            <div
              className="relative z-30 pb-2 flex justify-center bg-gradient-to-t from-black/80 to-transparent"
              style={{ transform: "translateZ(10px)" }}
            >
              <div className="h-[4px] w-28 rounded-full bg-white/60" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
