"use client";

import React from "react";

interface ProjectArtworkBackdropProps {
  slug: string;
}

export const ProjectArtworkBackdrop: React.FC<ProjectArtworkBackdropProps> = ({ slug }) => {
  if (slug === "nestys") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {/* Isometric Engineering Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.14]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="nestys-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#0284C7" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="80" cy="0" r="2.5" fill="#0284C7" />
              <circle cx="0" cy="80" r="2.5" fill="#0284C7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#nestys-grid)" />
        </svg>

        {/* Distributed Architecture Topology Nodes */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 opacity-25">
          <svg viewBox="0 0 400 400" className="w-full h-full stroke-sky-600 fill-none" strokeWidth="1.5">
            <circle cx="200" cy="200" r="160" strokeDasharray="6 6" />
            <circle cx="200" cy="200" r="90" strokeDasharray="4 4" />
            <line x1="200" y1="40" x2="200" y2="360" />
            <line x1="40" y1="200" x2="360" y2="200" />
            <line x1="86" y1="86" x2="314" y2="314" />
            <line x1="86" y1="314" x2="314" y2="86" />
            <circle cx="200" cy="40" r="6" className="fill-sky-500" />
            <circle cx="360" cy="200" r="6" className="fill-sky-500" />
            <circle cx="200" cy="360" r="6" className="fill-sky-500" />
            <circle cx="40" cy="200" r="6" className="fill-sky-500" />
          </svg>
        </div>

        {/* System Meta Watermark */}
        <div className="absolute bottom-16 right-16 hidden xl:block font-mono text-[10px] text-sky-800/40 tracking-widest uppercase">
          <div>TOPOLOGY: 3 WEB PORTALS · REST/WS GATEWAY · REDIS QUEUES</div>
          <div className="text-[9px] text-sky-700/30">SCALE: 124.5K REQ/S · 99.98% HEALTHY</div>
        </div>
      </div>
    );
  }

  if (slug === "scrollr") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {/* 35mm Celluloid Film Sprocket Margin Left */}
        <div className="absolute left-4 top-0 bottom-0 w-8 hidden md:flex flex-col justify-between py-6 opacity-20">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="w-5 h-7 rounded-[3px] border border-amber-800 bg-amber-900/10" />
          ))}
        </div>

        {/* 35mm Celluloid Film Sprocket Margin Right */}
        <div className="absolute right-4 top-0 bottom-0 w-8 hidden md:flex flex-col justify-between py-6 opacity-20">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="w-5 h-7 rounded-[3px] border border-amber-800 bg-amber-900/10" />
          ))}
        </div>

        {/* Cinematic Reticle Aperture Vectors */}
        <div className="absolute top-1/3 right-1/4 w-80 h-80 opacity-25">
          <svg viewBox="0 0 300 300" className="w-full h-full stroke-amber-700 fill-none" strokeWidth="1.2">
            <rect x="30" y="30" width="240" height="240" rx="12" strokeDasharray="8 8" />
            <circle cx="150" cy="150" r="90" />
            <line x1="150" y1="10" x2="150" y2="40" />
            <line x1="150" y1="260" x2="150" y2="290" />
            <line x1="10" y1="150" x2="40" y2="150" />
            <line x1="260" y1="150" x2="290" y2="150" />
            <circle cx="150" cy="150" r="4" className="fill-amber-600" />
          </svg>
        </div>

        {/* Film Technical Metadata */}
        <div className="absolute bottom-16 right-16 hidden xl:block font-mono text-[10px] text-amber-900/40 tracking-widest uppercase">
          <div>FORMAT: 9:16 VERTICAL CINEMATOGRAPHY · 60 FPS HARDWARE REEL</div>
          <div className="text-[9px] text-amber-800/30">VIRTUALIZATION: 2,500+ VIDEOS WINDOWED · 0ms JANK</div>
        </div>
      </div>
    );
  }

  if (slug === "wokataa") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {/* Kinetic Arena Diagonal Laser Striping */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wokataa-pattern" width="60" height="60" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="60" stroke="#059669" strokeWidth="1.5" strokeDasharray="6 6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wokataa-pattern)" />
        </svg>

        {/* Multiplayer Radar Crosshairs */}
        <div className="absolute top-1/4 right-1/4 w-88 h-88 opacity-25">
          <svg viewBox="0 0 320 320" className="w-full h-full stroke-emerald-700 fill-none" strokeWidth="1.5">
            <circle cx="160" cy="160" r="140" strokeDasharray="5 5" />
            <circle cx="160" cy="160" r="80" />
            <polygon points="160,20 180,60 140,60" className="fill-emerald-600/30" />
            <polygon points="160,300 180,260 140,260" className="fill-emerald-600/30" />
            <polygon points="20,160 60,180 60,140" className="fill-emerald-600/30" />
            <polygon points="300,160 260,180 260,140" className="fill-emerald-600/30" />
          </svg>
        </div>

        {/* Realtime Engine Meta */}
        <div className="absolute bottom-16 right-16 hidden xl:block font-mono text-[10px] text-emerald-900/40 tracking-widest uppercase">
          <div>ENGINE: REAL-TIME WEBSOCKETS + ABLY PUBSUB</div>
          <div className="text-[9px] text-emerald-800/30">LATENCY: &lt;40ms MOVE SYNCHRONIZATION · 2 PLAYERS SYNCED</div>
        </div>
      </div>
    );
  }

  if (slug === "earth-air") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {/* Dynamic Airflow Isotherm Curves */}
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 1440 900" preserveAspectRatio="none" className="w-full h-full stroke-sky-700 fill-none" strokeWidth="1.5">
            <path d="M 0,300 C 300,200 600,450 900,350 C 1200,250 1350,320 1440,300" strokeDasharray="8 6" />
            <path d="M 0,450 C 350,380 650,520 1000,420 C 1250,360 1380,480 1440,450" />
            <path d="M 0,600 C 250,550 550,680 950,580 C 1200,500 1360,620 1440,600" strokeDasharray="10 4" />
          </svg>
        </div>

        {/* HVAC Technical Core Meter */}
        <div className="absolute top-1/4 right-1/4 w-80 h-80 opacity-25">
          <svg viewBox="0 0 300 300" className="w-full h-full stroke-sky-700 fill-none" strokeWidth="1.5">
            <circle cx="150" cy="150" r="130" strokeDasharray="4 4" />
            <circle cx="150" cy="150" r="70" />
            <path d="M 150,20 A 130,130 0 0,1 280,150" strokeWidth="4" className="stroke-sky-600" />
          </svg>
        </div>

        {/* Web Performance Meta */}
        <div className="absolute bottom-16 right-16 hidden xl:block font-mono text-[10px] text-sky-900/40 tracking-widest uppercase">
          <div>CORE WEB VITALS: 98/100 GOOGLE PAGESPEED · 0.6s LCP</div>
          <div className="text-[9px] text-sky-800/30">INFRASTRUCTURE: GITHUB ACTIONS · 0s DOWNTIME FTPS PIPELINE</div>
        </div>
      </div>
    );
  }

  // urban-arena
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Stadium Pitch Geometry: Midfield Circle & Penalty Lines */}
      <div className="absolute inset-0 opacity-[0.16]">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="none" className="w-full h-full stroke-emerald-700 fill-none" strokeWidth="2">
          {/* Halfway Line */}
          <line x1="720" y1="0" x2="720" y2="900" />
          {/* Center Circle */}
          <circle cx="720" cy="450" r="180" />
          <circle cx="720" cy="450" r="5" className="fill-emerald-700" />
          {/* Right Penalty Area */}
          <rect x="1100" y="240" width="340" height="420" />
          <rect x="1280" y="340" width="160" height="220" />
          <circle cx="1200" cy="450" r="4" className="fill-emerald-700" />
          {/* Corner Arcs */}
          <path d="M 0,60 A 60,60 0 0,1 60,0" />
          <path d="M 1380,0 A 60,60 0 0,1 1440,60" />
          <path d="M 0,840 A 60,60 0 0,0 60,900" />
          <path d="M 1380,900 A 60,60 0 0,0 1440,840" />
        </svg>
      </div>

      {/* Turf Grass Subtle Texture Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="turf-stripes" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="20" height="40" fill="#15803D" />
            <rect x="20" width="20" height="40" fill="#16A34A" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#turf-stripes)" />
      </svg>

      {/* Booking Concurrency Meta */}
      <div className="absolute bottom-16 right-16 hidden xl:block font-mono text-[10px] text-emerald-900/40 tracking-widest uppercase">
        <div>CONCURRENCY: REDIS LOCKS · ZERO DOUBLE-BOOKINGS</div>
        <div className="text-[9px] text-emerald-800/30">VALIDATION: AUTOMATED DIGITAL QR PASSES ON CONFIRMATION</div>
      </div>
    </div>
  );
};
