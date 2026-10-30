"use client";

import React, { useEffect, useRef } from "react";
import { X, Network, ArrowRight, Layers } from "lucide-react";
import { Project } from "@/data/portfolioData";

interface ArchitectureModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ project, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [project]);

  // Fallback for browsers that do not support declarative light-dismiss via closedby="any"
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleDialogClick = (event: MouseEvent) => {
      // If clicking directly on the dialog backdrop
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

  if (!project) return null;

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      aria-labelledby="architecture-modal-title"
      className="backdrop:bg-black/80 backdrop:backdrop-blur-sm fixed inset-0 z-50 m-auto w-full max-w-3xl rounded-2xl border border-white/[0.12] bg-[#111110] p-0 text-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
    >
      <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4 bg-white/[0.02]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Network className="h-4 w-4" />
          </div>
          <div>
            <h2 id="architecture-modal-title" className="text-base font-semibold text-white">
              System Architecture & Flow: {project.title}
            </h2>
            <p className="text-xs text-zinc-400">
              Distributed components, data pipelines & concurrency guards
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/[0.08] hover:text-white transition-colors"
          aria-label="Close architecture modal"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="max-h-[80vh] overflow-y-auto p-6 space-y-6">
        {/* Architecture Overview */}
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-sm text-zinc-300 leading-relaxed">
          <span className="font-semibold text-amber-400 font-mono text-xs block mb-1">
            TOPOLOGY SUMMARY
          </span>
          {project.architecture.overview}
        </div>

        {/* Node Breakdown */}
        <div>
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-amber-400" />
            Infrastructure Nodes & Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {project.architecture.nodes.map((node, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <span>{node.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      Tier {i + 1}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-400">
                    {node.role}
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-white/[0.06] text-[11px] font-mono text-zinc-400">
                  <span className="text-zinc-500">Tech:</span> {node.tech}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sequential Data Flow */}
        <div>
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
            <ArrowRight className="h-3.5 w-3.5 text-amber-400" />
            End-to-End Data Pipeline
          </h3>
          <div className="space-y-2 rounded-xl border border-white/[0.08] bg-black/40 p-4 font-mono text-xs text-zinc-300">
            {project.architecture.dataFlow.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-amber-400 font-bold select-none">
                  0{idx + 1}.
                </span>
                <span className="leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div>
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 mb-2.5">
            Integrated Stack
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-xs font-mono text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </dialog>
  );
};
