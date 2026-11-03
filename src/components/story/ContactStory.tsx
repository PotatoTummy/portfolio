"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PROFILE } from "@/data/portfolioData";

export const ContactStory: React.FC = () => {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [timeStr, setTimeStr] = useState("IST 16:00");

  const GREETINGS = ["Hello.", "Hallo.", "Bonjour.", "Hola.", "Ciao.", "Hej.", "Olá.", "नमस्ते."];

  useEffect(() => {
    const timer = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 1600);
    return () => clearInterval(timer);
  }, [GREETINGS.length]);

  useEffect(() => {
    const updateTime = () => {
      try {
        const time = new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
        });
        setTimeStr(`IST ${time}`);
      } catch {
        setTimeStr("IST 16:00");
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="contact"
      data-nav="Contact"
      className="relative min-h-[100svh] px-4 sm:px-8 md:px-12 pt-[16vh] bg-[#0B0B0A] overflow-hidden flex flex-col justify-between z-20 select-none"
      style={{
        background: "radial-gradient(900px 420px at 50% -10%, rgba(255,85,51,0.35), transparent 70%), #0B0B0A",
      }}
    >
      <div>
        <p className="font-mono text-xs text-[#FF5533] uppercase tracking-wider mb-6 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#FF5533]" />
          <span>Contact</span>
        </p>

        <h2 className="font-grotesk text-[clamp(56px,8.4vw,136px)] font-medium leading-[0.88] text-[#FF5533] mb-[5vh] pb-[5vh] border-b border-[#FF5533]/45">
          A project<br />in mind?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-8 text-[#FF5533] text-[15px]">
          <div>
            <a
              href={`mailto:${PROFILE.email}`}
              className="text-[clamp(20px,2.5vw,36px)] underline hover:opacity-80 transition-opacity block"
            >
              {PROFILE.email}
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="mt-3.5 inline-block text-sm hover:underline"
            >
              Start a project &rarr;
            </a>
          </div>

          <div className="flex flex-col gap-1.5">
            <Link href="#hero" className="hover:underline">Home</Link>
            <Link href="#studio" className="hover:underline">Studio</Link>
            <Link href="#approach" className="hover:underline">Approach</Link>
            <Link href="#work" className="hover:underline">Selected Work</Link>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
              GitHub ↗
            </a>
          </div>

          <div className="font-mono text-xs opacity-85 leading-relaxed">
            Local time<br />
            {timeStr}
          </div>
        </div>
      </div>

      {/* Cycling Bottom Greeting & Copyright */}
      <div className="mt-auto flex items-end justify-between pb-6 pt-12">
        <div className="overflow-hidden font-grotesk font-medium text-[clamp(80px,22vw,360px)] leading-[0.84] text-[#FF5533] tracking-tight">
          <span key={greetingIndex} className="block animate-[greetingSlide_0.75s_cubic-bezier(0.16,1,0.3,1)]">
            {GREETINGS[greetingIndex]}
          </span>
        </div>

        <div className="font-mono text-xs text-[#FF5533] text-right leading-relaxed">
          &copy; 2026 {PROFILE.name}<br />
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:underline mt-1"
          >
            Back to top &uarr;
          </button>
        </div>
      </div>
    </section>
  );
};
