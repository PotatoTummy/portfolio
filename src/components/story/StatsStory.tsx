"use client";

import React, { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/data/portfolioData";

export const StatsStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: "2,500", suffix: "+", label: "items in a virtualized feed that holds 60fps" },
    { value: "95", suffix: "+", label: "Core Web Vitals score on live commercial client site" },
    { value: "3", suffix: "", label: "production portals sharing one NestJS microservices backend" },
    { value: "<40", suffix: "ms", label: "real-time multiplayer game state sync latency via Ably" },
  ];

  return (
    <section
      ref={containerRef}
      id="numbers"
      data-chap="Reel 07 · Numbers"
      className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto select-none"
    >
      <div className="border-t border-white/[0.08] pt-12 sm:pt-16">
        <div className="text-xs font-mono text-[#FF5533] uppercase tracking-wider mb-2">
          Reel 07 · Verified Numbers
        </div>
        <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight mb-16">
          What the work <em className="italic text-[#FF5533] font-normal">measures</em> to.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`space-y-3 pt-6 border-t border-white/[0.08] transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal text-white leading-none">
                {stat.value}
                <sup className="text-2xl sm:text-3xl font-serif text-[#FF5533] ml-0.5">
                  {stat.suffix}
                </sup>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

