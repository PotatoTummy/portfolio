"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PROFILE } from "@/data/portfolioData";
import { ArrowUp } from "lucide-react";

export const ContactStory: React.FC = () => {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [timeStr, setTimeStr] = useState("Gorakhpur 19:48");

  const GREETINGS = ["Hello.", "Bonjour.", "Hola.", "Ciao.", "Hej.", "Olá.", "नमस्ते."];

  useEffect(() => {
    const timer = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 2200);
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
        setTimeStr(`Gorakhpur ${time}`);
      } catch {
        setTimeStr("Gorakhpur 19:48");
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="contact"
      data-nav="Contact"
      className="relative min-h-[100svh] w-full px-4 sm:px-12 md:px-16 pt-20 sm:pt-24 pb-6 sm:pb-8 bg-[#0B0B0A] text-[#00D4FF] flex flex-col justify-between z-20 select-none overflow-x-clip"
      style={{
        background: "radial-gradient(1100px 500px at 50% 0%, rgba(0, 212, 255, 0.16), transparent 75%), #0B0B0A",
      }}
    >
      <div>
        {/* Top Header Strip: Left Category + Right Time */}
        <div className="flex items-center justify-between font-mono text-xs text-[#00D4FF] mb-6 sm:mb-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00D4FF]" />
            <span className="uppercase tracking-wider">Contact</span>
          </div>
          <span className="tracking-wider">{timeStr}</span>
        </div>

        {/* Large Headline */}
        <h2 className="font-grotesk text-[clamp(38px,8vw,130px)] font-medium leading-[0.92] text-[#00D4FF] tracking-tight max-w-4xl">
          A project<br />in mind?
        </h2>

        {/* Full-width Horizontal Hairline Divider */}
        <div className="w-full border-t border-[#00D4FF]/30 my-6 sm:my-10" />

        {/* 3-Column Content Grid: Exactly matching reference layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 text-[#00D4FF]">
          
          {/* Column 1 (Left): Email & Start Project */}
          <div className="md:col-span-5 space-y-2 sm:space-y-3">
            <a
              href={`mailto:${PROFILE.email}`}
              className="text-[clamp(19px,2.6vw,40px)] font-grotesk font-semibold text-[#00D4FF] hover:text-white underline decoration-[#00D4FF]/40 hover:decoration-white transition-colors duration-200 block truncate"
            >
              {PROFILE.email}
            </a>

            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-1.5 text-sm sm:text-base text-[#00D4FF] hover:text-white transition-colors duration-200 pt-1 font-medium group"
            >
              <span>Start a project</span>
              <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
          </div>

          {/* Column 2 (Middle): Vertical Navigation Links */}
          <div className="md:col-span-3 space-y-1.5 text-sm sm:text-base font-grotesk">
            <div>
              <Link href="#hero" className="text-[#00D4FF] hover:text-white transition-colors inline-block py-0.5">
                Home
              </Link>
            </div>
            <div>
              <Link href="#studio" className="text-[#00D4FF] hover:text-white transition-colors inline-block py-0.5">
                Studio
              </Link>
            </div>
            <div>
              <Link href="#work" className="text-[#00D4FF] hover:text-white transition-colors inline-block py-0.5">
                Work
              </Link>
            </div>
            <div>
              <Link href="#contact" className="text-[#00D4FF] hover:text-white transition-colors inline-block py-0.5">
                Contact
              </Link>
            </div>
          </div>

          {/* Column 3 (Right): Address, Socials & Meta */}
          <div className="md:col-span-4 space-y-3 sm:space-y-4 font-mono text-xs text-[#00D4FF] leading-relaxed">
            <div>
              <div>Gorakhpur, UP, India</div>
              <div>Open to Remote / Hybrid</div>
              <div>+91 7317368358</div>
            </div>

            <div className="space-y-1 pt-1 sm:pt-2">
              <div>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-block py-0.5"
                >
                  GitHub · @PotatoTummy ↗
                </a>
              </div>
              <div>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-block py-0.5"
                >
                  LinkedIn Profile ↗
                </a>
              </div>
              <div>TypeScript · React 19 · NestJS</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Giant Greeting (Left) & Back to Top + Copyright (Right) */}
      <div className="pt-6 sm:pt-10 flex flex-col sm:flex-row items-start sm:items-end justify-between border-t border-[#00D4FF]/25 mt-6 sm:mt-8 gap-4">
        {/* Giant Left Typography (Hello.) */}
        <div className="overflow-hidden font-grotesk font-semibold text-[clamp(48px,13vw,210px)] leading-[0.84] text-[#00D4FF] tracking-tight">
          <span key={greetingIndex} className="block animate-[greetingSlide_0.6s_cubic-bezier(0.16,1,0.3,1)]">
            {GREETINGS[greetingIndex]}
          </span>
        </div>

        {/* Bottom Right Controls */}
        <div className="font-mono text-xs text-[#00D4FF] flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 pb-1 sm:pb-2">
          <button
            onClick={scrollToTop}
            className="hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer font-medium"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3 w-3" />
          </button>
          <div className="text-[#00D4FF]/80">
            &copy; 2026 {PROFILE.name}
          </div>
        </div>
      </div>
    </section>
  );
};
