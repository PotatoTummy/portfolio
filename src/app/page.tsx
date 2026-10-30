"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { ArchitectureModal } from "@/components/ArchitectureModal";
import { LiveTerminal } from "@/components/LiveTerminal";
import { CommandPalette } from "@/components/CommandPalette";
import { Footer } from "@/components/Footer";
import { PROJECTS, SKILL_CATEGORIES, Project } from "@/data/portfolioData";
import { Layers, Code2, Network } from "lucide-react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeArchProject, setActiveArchProject] = useState<Project | null>(null);
  const [isCmdKOpen, setIsCmdKOpen] = useState(false);

  // Keyboard shortcut for Cmd + K / Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCmdKOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const categories = ["All", "Enterprise", "Mobile & Media", "Real-Time Gaming", "Client Infrastructure", "Full-Stack Platform"];

  const filteredProjects = selectedCategory === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  const handleSelectFromCmdK = (projectId: string) => {
    const proj = PROJECTS.find((p) => p.id === projectId);
    if (proj) {
      setActiveArchProject(proj);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a09] text-white selection:bg-amber-400 selection:text-zinc-950 font-sans antialiased">
      {/* Top Fixed Header */}
      <Header onOpenCmdK={() => setIsCmdKOpen(true)} />

      {/* Hero Section */}
      <Hero />

      {/* Projects Showcase Section */}
      <section id="projects" className="py-16 sm:py-24 border-b border-white/[0.08] relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Heading & Category Filter */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-mono text-amber-400 mb-3">
                <Layers className="h-3.5 w-3.5" />
                Production Software & Engineering Showcase
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                Featured Architectures & Products
              </h2>
              <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
                A selection of enterprise consoles, low-latency gaming backends, mobile video engines, and client platforms engineered with rigorous standards.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-mono whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-amber-400 text-zinc-950 font-bold shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                      : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenArchitecture={(p) => setActiveArchProject(p)}
                onTriggerTerminal={() => {
                  const el = document.getElementById("terminal");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* System Architecture Philosophy Section */}
      <section id="architecture" className="py-16 sm:py-24 border-b border-white/[0.08] bg-[#0c0c0b]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-mono text-cyan-400 mb-3">
              <Network className="h-3.5 w-3.5" />
              Engineering Mindset & Systems Design
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              How I Architect Scalable Software
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed">
              Software shouldn’t just look good in mockups—it must endure concurrency spikes, packet drops, state drift, and edge failures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#121211] p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono font-bold text-sm">
                01
              </div>
              <h3 className="text-lg font-bold text-white">Predictable State & Zero Bleed</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                In complex UIs like Nestys Seller Central and mobile video reels (Scrollr), stale state leaks destroy user trust. I structure stores with optimistic updates, strict normalized slices, and atomic cache invalidations.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#121211] p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono font-bold text-sm">
                02
              </div>
              <h3 className="text-lg font-bold text-white">Sub-50ms Low Latency Streams</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Whether proxying byte-range MP4 chunks in Fastify with yt-dlp or synchronizing multiplayer token scores over Ably and WebSockets, I design systems with minimal intermediary hops and hardware-accelerated buffers.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#121211] p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold text-sm">
                03
              </div>
              <h3 className="text-lg font-bold text-white">Resilient Async Queues & CI/CD</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Critical tasks like streak calculation, leaderboards, and video transcode moderation never run synchronously in request paths. BullMQ workers backed by Redis ensure fault-tolerant idempotency with automated GitHub Actions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live API Terminal Simulator */}
      <LiveTerminal />

      {/* Skills Matrix Section */}
      <section id="skills" className="py-16 sm:py-24 border-b border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-mono text-purple-400 mb-3">
              <Code2 className="h-3.5 w-3.5" />
              Verified Competencies
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Technical Arsenal
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-xl">
              Battle-tested tools and frameworks utilized across production enterprise consoles and client applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/[0.08] bg-[#111110] p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-amber-400 mb-3">
                    {cat.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs font-mono text-zinc-300 hover:border-amber-400/40 hover:text-white transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Architecture Detail Modal */}
      <ArchitectureModal
        project={activeArchProject}
        onClose={() => setActiveArchProject(null)}
      />

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isCmdKOpen}
        onClose={() => setIsCmdKOpen(false)}
        onSelectProject={handleSelectFromCmdK}
      />
    </div>
  );
}
