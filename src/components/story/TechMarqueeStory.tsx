"use client";

import React from "react";

export const TechMarqueeStory: React.FC = () => {
  const stack = [
    "React 19", "Next.js 15", "TypeScript", "NestJS", "Fastify", 
    "React Native", "Expo SDK 54", "Prisma ORM", "Redis 7", "BullMQ", 
    "Socket.IO", "Ably Realtime", "HLS.js", "Tailwind CSS v4", "Docker", "AWS RDS"
  ];

  return (
    <div className="overflow-hidden border-y border-white/[0.08] py-8 sm:py-10 select-none bg-[#0B0B0A]/60 backdrop-blur-sm">
      <div className="flex w-max animate-marquee space-x-8 font-serif italic text-3xl sm:text-5xl md:text-6xl text-white/30 tracking-tight">
        {stack.concat(stack).map((item, idx) => (
          <span
            key={idx}
            className={`whitespace-nowrap transition-colors hover:text-white ${
              idx % 3 === 0 ? "text-white font-normal" : "text-transparent [-webkit-text-stroke:1px_rgba(243,243,238,0.35)]"
            }`}
          >
            {item} <span className="text-[#FF5533] mx-3">/</span>
          </span>
        ))}
      </div>
    </div>
  );
};

