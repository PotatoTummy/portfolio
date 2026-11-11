"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const STATEMENTS = [
  {
    tag: "01 / 04",
    word: "One developer.",
    lead: "Design, development, and motion under one roof.",
    color: "#0F172A",
  },
  {
    tag: "02 / 04",
    word: "Design.",
    lead: "Thoughtful visual systems crafted for clarity and conversion.",
    color: "#0284C7",
  },
  {
    tag: "03 / 04",
    word: "Development.",
    lead: "Clean typed code, robust APIs, and scalable PostgreSQL architectures.",
    color: "#059669",
  },
  {
    tag: "04 / 04",
    word: "Motion.",
    lead: "Sub-second load times and delightful 60fps tactile micro-interactions.",
    color: "#D97706",
  },
];

export const CraftStatementStory: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-cycle through the core craft values or allow manual click
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % STATEMENTS.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const current = STATEMENTS[activeIndex];

  return (
    <section className="relative w-full bg-[#EFEAE4] text-[#121211] py-14 sm:py-32 px-4 sm:px-12 md:px-16 border-t border-[#121211]/12 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[44vh] sm:min-h-[58vh]">
        {/* Top Editorial Status Strip */}
        <div className="flex items-center justify-between border-b border-[#121211]/12 pb-3 sm:pb-4 font-mono text-[11px] sm:text-xs">
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-xs bg-[#0F172A]" />
            <span className="uppercase tracking-wider text-[#121211]/70">Full-Stack Craft</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1.5">
              {STATEMENTS.map((s, idx) => (
                <button
                  key={s.tag}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === activeIndex ? "w-6 sm:w-8 bg-[#0F172A]" : "w-1.5 sm:w-2 bg-[#121211]/20 hover:bg-[#121211]/40"
                  }`}
                  aria-label={`Statement ${idx + 1}`}
                />
              ))}
            </div>
            <span className="font-bold text-[#0F172A]">{current.tag}</span>
          </div>
        </div>

        {/* Center: Massive Kinetic Typography */}
        <div className="my-auto py-8 sm:py-16">
          <div className="overflow-hidden min-h-[70px] sm:min-h-[180px] md:min-h-[220px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.h2
                key={current.word}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -60, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-grotesk text-[clamp(34px,8.5vw,130px)] font-bold tracking-tight leading-[0.92] break-words"
                style={{ color: current.color }}
              >
                {current.word}
              </motion.h2>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Strip: Description & Action Link */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 border-t border-[#121211]/12 pt-4 sm:pt-6">
          <div className="max-w-xl">
            <AnimatePresence mode="wait">
              <motion.p
                key={current.lead}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-sm sm:text-xl font-sans font-normal text-[#121211]/80 leading-relaxed"
              >
                {current.lead}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 shrink-0">
            <Link
              href="#contact"
              className="inline-flex items-center gap-1.5 sm:gap-2 font-mono text-xs font-semibold text-[#121211] hover:text-[#0284C7] transition-colors border-b border-[#121211] pb-0.5 hover:border-[#0284C7]"
            >
              <span>Start a project</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 sm:gap-2 font-mono text-xs font-medium text-[#121211]/60 hover:text-[#121211] transition-colors"
            >
              <span>View all projects</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

