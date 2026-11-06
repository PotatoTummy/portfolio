"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, FolderGit2, Mail, Phone, Download, ArrowRight, Sparkles } from "lucide-react";
import { FEATURED_PROJECTS, PROFILE } from "@/data/portfolioData";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProject,
}) => {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
        setQuery("");
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Light dismiss
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleDialogClick = (event: MouseEvent) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isInside =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;

      if (!isInside) {
        onClose();
      }
    };

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener("click", handleDialogClick);
    dialog.addEventListener("cancel", handleCancel);

    return () => {
      dialog.removeEventListener("click", handleDialogClick);
      dialog.removeEventListener("cancel", handleCancel);
    };
  }, [onClose]);

  const filteredProjects = FEATURED_PROJECTS.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.shortName.toLowerCase().includes(query.toLowerCase()) ||
      p.tagline.toLowerCase().includes(query.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 1800);
  };

  const handleNavigateProject = (slug: string) => {
    onClose();
    router.push(`/projects/${slug}`);
  };

  const handleJumpToSection = (id: string) => {
    onClose();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="cmd-palette-title"
      className="backdrop:bg-black/80 backdrop:backdrop-blur-md fixed inset-0 z-50 m-auto w-full max-w-xl rounded-2xl border border-white/[0.15] bg-[#121211] p-0 text-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
    >
      {/* Search Input Bar */}
      <div className="flex items-center border-b border-white/[0.1] px-4 py-3 bg-white/[0.02]">
        <Search className="h-4 w-4 text-zinc-400 mr-2.5 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search project reels, tech stack, shortcuts..."
          className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none font-sans"
          autoFocus
        />
        <button
          onClick={onClose}
          className="rounded p-1 text-zinc-400 hover:text-white hover:bg-white/[0.08]"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Results Container */}
      <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4 text-xs font-mono">
        {/* Projects Section */}
        <div>
          <div className="px-2 py-1 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
            Project Reels & Dedicated Case Studies
          </div>
          <div className="space-y-1 mt-1">
            {filteredProjects.length === 0 ? (
              <div className="px-3 py-2 text-zinc-500">No matching projects found</div>
            ) : (
              filteredProjects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleNavigateProject(p.slug)}
                  className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-white/[0.06] text-zinc-300 hover:text-white transition-colors group"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <FolderGit2 className="h-3.5 w-3.5 text-[#00D4FF] shrink-0" />
                    <span className="font-semibold text-white">{p.title}</span>
                    <span className="text-zinc-500 text-[11px] truncate hidden sm:inline">
                      {p.tagline}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#00D4FF] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <span>Reel Case Study</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Story Jump Navigation */}
        <div>
          <div className="px-2 py-1 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
            Quick Navigation
          </div>
          <div className="space-y-1 mt-1">
            {[
              { id: "hero", label: "01 · Intro" },
              { id: "studio", label: "02 · Studio & Philosophy" },
              { id: "portal", label: "03 · Interactive Preview" },
              { id: "work", label: "04 · Selected Work" },
              { id: "contact", label: "05 · Contact" },
            ].map((ch) => (
              <button
                key={ch.id}
                onClick={() => handleJumpToSection(ch.id)}
                className="w-full flex items-center justify-between rounded-lg px-3 py-1.5 text-left hover:bg-white/[0.06] text-zinc-300 hover:text-white transition-colors"
              >
                <span>{ch.label}</span>
                <span className="text-zinc-500 text-[10px]">Jump ↓</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="px-2 py-1 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
            Quick Actions & Contact
          </div>
          <div className="space-y-1 mt-1">
            <button
              onClick={() => copyToClipboard(PROFILE.email, "email")}
              className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-white/[0.06] text-zinc-300 hover:text-white"
            >
              <div className="flex items-center gap-2.5">
                <Mail className="h-3.5 w-3.5 text-[#00D4FF]" />
                <span>Copy Email ({PROFILE.email})</span>
              </div>
              <span className="text-[10px] text-[#00D4FF]">
                {copied === "email" ? "Copied!" : "Press to copy"}
              </span>
            </button>

            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-white/[0.06] text-zinc-300 hover:text-white"
            >
              <div className="flex items-center gap-2.5">
                <Download className="h-3.5 w-3.5 text-cyan-400" />
                <span>Download Master CV / Resume (PDF)</span>
              </div>
              <ArrowRight className="h-3 w-3 text-zinc-500" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between border-t border-white/[0.08] px-4 py-2 bg-black/40 text-[11px] text-zinc-500 font-mono">
        <span>Press Esc to close</span>
        <span className="text-[#00D4FF]">Samad Kausar Portfolio</span>
      </div>
    </dialog>
  );
};
