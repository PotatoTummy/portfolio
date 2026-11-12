import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — RouteNotFoundError · Samad Kausar",
};

const SIMILAR_ROUTES = [
  { path: "/", label: "Home — portfolio root (/)" },
  { path: "/projects/urban-arena", label: "/projects/urban-arena — booking platform & QR passes" },
  { path: "/projects/scrollr", label: "/projects/scrollr — Android 60fps media player" },
  { path: "/projects/wokataa", label: "/projects/wokataa — real-time multiplayer game" },
  { path: "/projects/earth-air", label: "/projects/earth-air — 95+ Vitals client platform" },
  { path: "/projects/nestys", label: "/projects/nestys — enterprise multi-portal suite" },
  { path: "/archive", label: "/archive — the cutting room floor (5 drafts)" },
  { path: "/cv.pdf", label: "/cv.pdf — resume / CV document" },
];

export default function NotFound() {
  return (
    <div
      className="min-h-screen bg-[#0B0B0A] text-[#F3F3EE] flex flex-col items-center justify-center px-4 sm:px-8 py-16 selection:bg-[#FF5533] selection:text-[#0B0B0A]"
      style={{ fontFamily: "'Geist Mono', ui-monospace, monospace" }}
    >
      <div className="w-full max-w-2xl border border-white/[0.12] rounded-2xl bg-[#121211]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5533]/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#F5B700]/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#18C38A]/80 inline-block" />
            <span className="text-zinc-500 text-xs ml-2">node_runtime::exception</span>
          </div>
          <span className="text-[11px] text-[#FF5533] uppercase tracking-wider font-semibold">HTTP 404</span>
        </div>

        {/* Stack Trace */}
        <div className="space-y-2 mb-6">
          <div className="text-[#FF5533] text-lg sm:text-xl font-bold font-mono">
            RouteNotFoundError: ENOENT
          </div>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            The requested URI path could not be resolved by the router pipeline.
          </p>
          <div className="p-3.5 rounded-lg bg-black/60 border border-white/[0.06] text-xs text-zinc-500 space-y-1 font-mono">
            <div>at Router.resolve (next/dist/server/lib/router.ts:148:12)</div>
            <div>at async RequestPipeline.execute (next/dist/server/app-render.tsx:412:9)</div>
            <div className="text-zinc-400">↳ Target path unmapped in active workspace tree</div>
          </div>
        </div>

        {/* Nearest Valid Routes */}
        <div className="border border-white/[0.08] rounded-xl p-4 sm:p-5 mb-6 bg-white/[0.02]">
          <div className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-3 flex items-center justify-between">
            <span>Nearest Valid Endpoints</span>
            <span className="text-[10px] text-zinc-600 font-normal">8 available</span>
          </div>
          <div className="space-y-1.5 text-xs">
            {SIMILAR_ROUTES.map((r) => (
              <Link
                key={r.path}
                href={r.path}
                className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md hover:bg-white/[0.06] text-zinc-300 hover:text-[#00D4FF] transition-colors group"
              >
                <span className="text-zinc-600 group-hover:text-[#00D4FF]">→</span>
                <span className="font-medium text-white group-hover:text-[#00D4FF]">{r.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Terminal Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/[0.08] text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span>Try pressing</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] border border-white/[0.12] text-zinc-300 text-[11px]">⌘K</kbd>
            <span>to search anywhere</span>
          </div>
          <Link
            href="/"
            className="px-3.5 py-1.5 rounded-full bg-[#00D4FF] text-[#0B0B0A] font-semibold text-xs hover:bg-white transition-colors"
          >
            cd / (Return Home)
          </Link>
        </div>
      </div>
    </div>
  );
}

