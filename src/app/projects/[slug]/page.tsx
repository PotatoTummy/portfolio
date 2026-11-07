import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { 
  getProjectBySlug, 
  getAdjacentProjects, 
  ALL_PROJECTS 
} from "@/data/portfolioData";
import { MacBookProMockup } from "@/components/devices/MacBookProMockup";
import { IPhoneMockup } from "@/components/devices/IPhoneMockup";
import { 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink, 
  Network, 
  CheckCircle2, 
  Video, 
  Monitor 
} from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Samad Kausar`,
    description: project.overview,
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0B0A]" />}>
      <ProjectDetailContent params={params} />
    </Suspense>
  );
}

async function ProjectDetailContent({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = getAdjacentProjects(project.slug);

  const SCREEN_IMAGES: Record<string, string> = {
    nestys: "/projects/screens/nestys-white-screen.png",
    scrollr: "/projects/screens/scrollr-white-screen.png",
    wokataa: "/projects/screens/wokataa-white-screen.png",
    "earth-air": "/projects/screens/earthair-white-screen.png",
    "urban-arena": "/projects/screens/urbanarena-white-screen.png",
  };

  const isPhone = project.mockupType === "phone";
  const screenImage = SCREEN_IMAGES[project.slug] || SCREEN_IMAGES["nestys"];

  const getImageClasses = (slug: string) => {
    if (slug === "wokataa") return "object-contain object-center scale-[0.98]";
    return "object-cover object-top";
  };

  const renderScreenImage = () => (
    <div className="relative w-full h-full bg-white select-none overflow-hidden">
      <Image
        src={screenImage}
        alt={`${project.title} Interface`}
        fill
        sizes={isPhone ? "320px" : "800px"}
        className={getImageClasses(project.slug)}
        priority
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 40%, transparent 60%)",
        }}
      />
    </div>
  );

  // Render the appropriate photorealistic UI mockup
  const renderDeviceMockup = () => {
    if (isPhone) {
      return (
        <IPhoneMockup projectName={project.title} videoUrl={project.media?.videoUrl}>
          {renderScreenImage()}
        </IPhoneMockup>
      );
    }
    return (
      <MacBookProMockup projectName={project.title} videoUrl={project.media?.videoUrl}>
        {renderScreenImage()}
      </MacBookProMockup>
    );
  };

  return (
    <div className="min-h-screen bg-[#0B0B0A] text-[#F3F3EE] font-sans antialiased selection:bg-[#00D4FF] selection:text-[#0B0B0A]">
      {/* Top Floating Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0B0B0A]/85 border-b border-white/[0.08] px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform text-[#00D4FF]" />
            <span>Back to Work</span>
          </Link>

          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full animate-pulse"
              style={{ backgroundColor: project.accentColor }}
            />
            <span className="font-mono text-xs text-zinc-300 font-medium">
              {project.shortName} Case Study
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
              >
                <span>Live Site</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
              >
                <GithubIcon className="h-3 w-3" />
                <span className="hidden sm:inline">Source</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-10 sm:pt-16 pb-28 space-y-16 sm:space-y-24">
        {/* Project Hero Header */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span
              className="px-3 py-1 rounded-full border font-semibold"
              style={{
                borderColor: `${project.accentColor}40`,
                backgroundColor: `${project.accentColor}15`,
                color: project.accentColor,
              }}
            >
              {project.badge}
            </span>
            <span className="text-zinc-400">{project.timeline}</span>
            <span className="text-zinc-500">•</span>
            <span className="text-zinc-400">{project.category}</span>
          </div>

          <h1 className="font-grotesk text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.05]">
            {project.title}
          </h1>

          <p className="text-base sm:text-xl text-zinc-300 max-w-3xl leading-relaxed font-sans font-normal">
            {project.tagline}
          </p>

          {/* Metadata Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
            <div className="p-4 rounded-xl border border-white/[0.08] bg-[#121211]/80 backdrop-blur-sm">
              <div className="text-xs font-mono text-zinc-400">Engineering Role</div>
              <div className="text-sm font-semibold text-white mt-1">{project.role}</div>
            </div>
            <div className="p-4 rounded-xl border border-white/[0.08] bg-[#121211]/80 backdrop-blur-sm">
              <div className="text-xs font-mono text-zinc-400">Deployment Status</div>
              <div className="text-sm font-semibold text-white mt-1">{project.whereToSee}</div>
            </div>
            <div className="p-4 rounded-xl border border-white/[0.08] bg-[#121211]/80 backdrop-blur-sm">
              <div className="text-xs font-mono text-zinc-400">Core Benchmark</div>
              <div className="text-sm font-semibold text-[#00D4FF] mt-1">
                {project.metrics[0].value} ({project.metrics[0].label})
              </div>
            </div>
          </div>
        </section>

        {/* Photorealistic Device Showcase Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00D4FF]">
                <Monitor className="h-3.5 w-3.5" />
                <span>Photorealistic Hardware Simulation</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-grotesk text-white mt-1">
                Live Interface Execution
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08]">
                {project.mockupType === "phone" ? "iPhone 16 Pro Frame" : "MacBook Pro Liquid Retina XDR"}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Pixel-Perfect UI
              </span>
            </div>
          </div>

          {/* Device Mockup Stage */}
          <div className="py-6 sm:py-10 px-2 sm:px-8 rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#141413]/70 to-[#0C0C0B]/90 shadow-2xl relative overflow-hidden">
            {/* Ambient Lighting Gradients */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[120px] pointer-events-none opacity-25"
              style={{ backgroundColor: project.accentColor }}
            />

            {/* Hardware Mockup Component */}
            {renderDeviceMockup()}

            {/* Media Drop-in Notice */}
            <div className="mt-8 text-center">
              <p className="text-xs font-mono text-zinc-400 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 border border-white/5">
                <Video className="h-3.5 w-3.5 text-[#00D4FF]" />
                <span>Custom Media Slot Ready: Drop real video recordings or screenshots anytime.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Feature Breakdown Section */}
        <section className="space-y-6">
          <div className="border-b border-white/[0.08] pb-4">
            <span className="text-xs font-mono text-[#00D4FF]">System Capabilities</span>
            <h2 className="text-2xl sm:text-3xl font-grotesk text-white mt-1">
              What It Delivers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.features.map((feature, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border border-white/[0.08] bg-[#121211] space-y-2.5 hover:border-white/[0.18] transition-colors"
              >
                <div className="h-7 w-7 rounded-lg bg-[#00D4FF]/15 text-[#00D4FF] border border-[#00D4FF]/30 flex items-center justify-center font-mono font-bold text-xs">
                  0{i + 1}
                </div>
                <h3 className="font-semibold text-white text-base">{feature.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Step-by-Step Architecture Pipeline */}
        <section className="space-y-6">
          <div className="border-b border-white/[0.08] pb-4">
            <span className="text-xs font-mono text-[#00D4FF]">End-to-End Systems Engineering</span>
            <h2 className="text-2xl sm:text-3xl font-grotesk text-white mt-1">
              How It Fits Together
            </h2>
            <p className="mt-1 text-xs text-zinc-400 max-w-2xl font-mono">
              {project.architecture.overview}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Architecture Nodes Flow */}
            <div className="lg:col-span-7 space-y-3">
              {project.architecture.nodes.map((node, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-white/[0.08] bg-[#121211] flex items-start gap-3.5 relative"
                >
                  <div className="h-6 w-6 rounded-full bg-[#00D4FF]/20 border border-[#00D4FF]/40 text-[#00D4FF] flex items-center justify-center font-mono text-xs shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-white">{node.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300">
                        {node.tech}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{node.role}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Data Flow Trace */}
            <div className="lg:col-span-5 p-5 rounded-2xl border border-white/[0.08] bg-[#141413] space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <Network className="h-4 w-4" />
                <span>Deterministic Dataflow Protocol</span>
              </div>
              <ol className="space-y-3 text-xs text-zinc-300 font-sans divide-y divide-white/[0.05]">
                {project.architecture.dataFlow.map((step, i) => (
                  <li key={i} className="pt-2.5 first:pt-0 flex items-start gap-2.5">
                    <span className="font-mono text-[#00D4FF] font-bold text-xs shrink-0">→</span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Key Engineering Wins */}
        <section className="space-y-6">
          <div className="border-b border-white/[0.08] pb-4">
            <span className="text-xs font-mono text-[#00D4FF]">Verified Achievements</span>
            <h2 className="text-2xl sm:text-3xl font-grotesk text-white mt-1">
              Engineering Breakthroughs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.keyEngineeringWins.map((win, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border border-white/[0.08] bg-[#121211] flex items-start gap-3 hover:border-white/[0.18] transition-colors"
              >
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">{win}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack Matrix */}
        <section className="space-y-6">
          <div className="border-b border-white/[0.08] pb-4">
            <span className="text-xs font-mono text-[#00D4FF]">Technologies & Tooling</span>
            <h2 className="text-2xl sm:text-3xl font-grotesk text-white mt-1">
              Built With
            </h2>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] text-xs font-mono text-zinc-200 hover:border-[#00D4FF] hover:text-white transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Next / Previous Project Navigation */}
        <nav className="border-t border-white/[0.1] pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href={`/projects/${prev.slug}`}
            className="group flex flex-col items-start gap-1 p-4 rounded-xl border border-white/5 hover:border-white/15 bg-white/[0.02] w-full sm:w-1/2 transition-colors"
          >
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-1 group-hover:-translate-x-1 transition-transform">
              <ArrowLeft className="h-3 w-3" /> Previous Project
            </span>
            <span className="font-grotesk text-xl sm:text-2xl text-white group-hover:text-[#00D4FF] transition-colors">
              {prev.title}
            </span>
          </Link>

          <Link
            href={`/projects/${next.slug}`}
            className="group flex flex-col items-end gap-1 p-4 rounded-xl border border-white/5 hover:border-white/15 bg-white/[0.02] w-full sm:w-1/2 text-right transition-colors"
          >
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Next Project <ArrowRight className="h-3 w-3" />
            </span>
            <span className="font-grotesk text-xl sm:text-2xl text-white group-hover:text-[#00D4FF] transition-colors">
              {next.title}
            </span>
          </Link>
        </nav>
      </main>
    </div>
  );
}
