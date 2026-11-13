"use client";

import React, { useEffect, useState, useCallback } from "react";

// Easter egg IDs for tracking
const EGG_IDS = ["konami", "perf", "archive", "blueprint", "diagram", "hello", "console"] as const;
type EggId = typeof EGG_IDS[number];

interface EasterEggsProps {
  onPerfMode?: (active: boolean) => void;
  onBlueprintMode?: (active: boolean) => void;
}

// Konami code sequence
const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

export function useEasterEggs(props?: EasterEggsProps) {
  const [foundEggs, setFoundEggs] = useState<Set<EggId>>(new Set());
  const [perfMode, setPerfMode] = useState(false);
  const [blueprintMode, setBlueprintMode] = useState(false);
  const [helloClicks, setHelloClicks] = useState(0);

  const markFound = useCallback((id: EggId) => {
    setFoundEggs(prev => {
      const next = new Set(prev);
      next.add(id);
      try {
        localStorage.setItem("sk_eggs", JSON.stringify([...next]));
      } catch {}
      return next;
    });
  }, []);

  // Load from localStorage on mount and listen to custom egg events
  useEffect(() => {
    try {
      const stored = localStorage.getItem("sk_eggs");
      if (stored) {
        const parsed = JSON.parse(stored) as EggId[];
        setFoundEggs(new Set(parsed));
      }
    } catch {}

    const handleCustomEgg = (e: Event) => {
      const customEvent = e as CustomEvent<EggId>;
      if (customEvent.detail) {
        markFound(customEvent.detail);
      }
    };

    const handleCustomPerf = () => {
      markFound("perf");
      setPerfMode(prev => {
        const next = !prev;
        props?.onPerfMode?.(next);
        return next;
      });
    };

    const handleCustomBlueprint = () => {
      markFound("blueprint");
      setBlueprintMode(prev => {
        const next = !prev;
        props?.onBlueprintMode?.(next);
        document.documentElement.classList.toggle("blueprint-mode", next);
        return next;
      });
    };

    const handleCustomArchive = () => {
      markFound("archive");
      window.location.href = "/archive";
    };

    const handleCustomKonami = () => {
      markFound("konami");
      window.location.href = "/archive";
    };

    window.addEventListener("sk:egg", handleCustomEgg);
    window.addEventListener("sk:perf", handleCustomPerf);
    window.addEventListener("sk:blueprint", handleCustomBlueprint);
    window.addEventListener("sk:archive", handleCustomArchive);
    window.addEventListener("sk:konami", handleCustomKonami);

    return () => {
      window.removeEventListener("sk:egg", handleCustomEgg);
      window.removeEventListener("sk:perf", handleCustomPerf);
      window.removeEventListener("sk:blueprint", handleCustomBlueprint);
      window.removeEventListener("sk:archive", handleCustomArchive);
      window.removeEventListener("sk:konami", handleCustomKonami);
    };
  }, [markFound, props]);

  // Konami code listener
  useEffect(() => {
    let pos = 0;
    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI[pos]) {
        pos++;
        if (pos === KONAMI.length) {
          pos = 0;
          markFound("konami");
          window.location.href = "/archive";
        }
      } else {
        pos = e.key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [markFound]);

  // Type "archive" or "blueprint" listener
  useEffect(() => {
    let buf = "";
    const handler = (e: KeyboardEvent) => {
      // Don't fire when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      buf = (buf + e.key).toLowerCase().slice(-10);
      if (buf.includes("archive")) {
        buf = "";
        markFound("archive");
        window.location.href = "/archive";
      }
      if (buf.includes("blueprint")) {
        buf = "";
        markFound("blueprint");
        const next = !blueprintMode;
        setBlueprintMode(next);
        props?.onBlueprintMode?.(next);
        document.documentElement.classList.toggle("blueprint-mode", next);
      }
      if (buf.includes("perf")) {
        buf = "";
        markFound("perf");
        const next = !perfMode;
        setPerfMode(next);
        props?.onPerfMode?.(next);
      }
      if (e.key === "d" || e.key === "D") {
        markFound("diagram");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [markFound, blueprintMode, perfMode, props]);

  // Console message
  useEffect(() => {
    markFound("console");
    console.log(
      "%c👋 Hey there, inspector.",
      "font-size:20px;font-weight:bold;color:#00D4FF;background:#0B0B0A;padding:10px 18px;border-radius:8px;"
    );
    console.log(
      "%cYou found the console egg. Nice instincts.\n\nI'm Samad — I build the kind of interfaces that make people look twice, backed by systems that don't fall over.\n\nIf you're hiring: samadkausar786@gmail.com\nGitHub: github.com/PotatoTummy",
      "font-size:13px;color:#F3F3EE;background:#0B0B0A;padding:8px 18px 14px;border-radius:0 0 8px 8px;line-height:1.6;"
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleHelloClick = useCallback(() => {
    setHelloClicks(prev => {
      const next = prev + 1;
      if (next >= 5) {
        markFound("hello");
        window.location.href = "/archive";
        return 0;
      }
      return next;
    });
  }, [markFound]);

  return { foundEggs, perfMode, blueprintMode, helloClicks, handleHelloClick, setPerfMode, setBlueprintMode };
}

// Web Vitals HUD overlay
export const PerfHUD: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [vitals, setVitals] = useState<Record<string, number>>({});

  useEffect(() => {
    // Use PerformanceObserver if available
    if (typeof window === "undefined") return;
    
    // Collect paint timing
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === "first-contentful-paint") {
          setVitals(v => ({ ...v, FCP: Math.round(entry.startTime) }));
        }
        if (entry.entryType === "largest-contentful-paint") {
          setVitals(v => ({ ...v, LCP: Math.round((entry as PerformanceEventTiming).startTime || entry.startTime) }));
        }
        if (entry.entryType === "layout-shift" && !(entry as unknown as { hadRecentInput: boolean }).hadRecentInput) {
          setVitals(v => ({ ...v, CLS: parseFloat(((v.CLS || 0) + (entry as unknown as { value: number }).value).toFixed(4)) }));
        }
        if (entry.entryType === "first-input") {
          setVitals(v => ({ ...v, FID: Math.round((entry as PerformanceEventTiming).processingStart - entry.startTime) }));
        }
      }
    });

    try {
      observer.observe({ type: "paint", buffered: true });
      observer.observe({ type: "largest-contentful-paint", buffered: true });
      observer.observe({ type: "layout-shift", buffered: true });
      observer.observe({ type: "first-input", buffered: true });
    } catch {}

    // Also get navigation timing
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (nav) {
      setVitals(v => ({
        ...v,
        TTFB: Math.round(nav.responseStart - nav.requestStart),
        DOM: Math.round(nav.domContentLoadedEventEnd - nav.fetchStart),
      }));
    }

    return () => observer.disconnect();
  }, []);

  const score = (metric: string, val: number) => {
    const thresholds: Record<string, [number, number]> = {
      LCP: [2500, 4000], FCP: [1800, 3000], FID: [100, 300], CLS: [0.1, 0.25], TTFB: [800, 1800], DOM: [1000, 2000],
    };
    const [good, poor] = thresholds[metric] || [1000, 2000];
    if (val <= good) return "#18C38A";
    if (val <= poor) return "#F5B700";
    return "#FF5533";
  };

  return (
    <div
      style={{
        position: "fixed", bottom: 20, right: 20, zIndex: 9999,
        background: "rgba(11,11,10,0.95)", border: "1px solid rgba(243,243,238,0.15)",
        borderRadius: 14, padding: "16px 20px", fontFamily: "ui-monospace,monospace",
        fontSize: 12, color: "#F3F3EE", backdropFilter: "blur(16px)",
        maxWidth: "calc(100vw - 32px)", width: 260,
        boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ color: "#00D4FF", fontWeight: 600, fontSize: 11, letterSpacing: "0.08em" }}>⚡ LIVE WEB VITALS</span>
        <button
          onClick={onClose}
          aria-label="Close Web Vitals HUD"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 6,
            color: "#F3F3EE",
            cursor: "pointer",
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>
      {Object.keys(vitals).length === 0 ? (
        <div style={{ color: "rgba(243,243,238,0.5)" }}>Collecting…</div>
      ) : (
        Object.entries(vitals).map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid rgba(243,243,238,0.07)" }}>
            <span style={{ color: "rgba(243,243,238,0.6)" }}>{k}</span>
            <span style={{ color: score(k, v), fontWeight: 700 }}>
              {k === "CLS" ? v.toFixed(3) : `${v}ms`}
            </span>
          </div>
        ))
      )}
      <div style={{ marginTop: 10, fontSize: 10, color: "rgba(243,243,238,0.35)", textAlign: "center" }}>
        Close with Esc or type perf
      </div>
    </div>
  );
};

// Egg counter badge with interactive hints modal
export const EggCounter: React.FC<{ found?: number; total?: number; foundSet?: Set<string> }> = ({ foundSet }) => {
  const [showHints, setShowHints] = useState(false);

  const HINTS = [
    { id: "konami", hint: "Classic 80s arcade code (↑↑↓↓←→←→BA)" },
    { id: "perf", hint: "Type 'perf' or search in ⌘K for live Web Vitals HUD" },
    { id: "archive", hint: "Type 'archive' or find the Cutting Room Floor" },
    { id: "blueprint", hint: "Type 'blueprint' for layout bounds and render tokens" },
    { id: "diagram", hint: "Press 'D' key while viewing any project device" },
    { id: "hello", hint: "Click the footer greeting 'Hello.' five times" },
    { id: "console", hint: "Open browser DevTools Console (F12) for developer message" },
  ];

  const foundCount = HINTS.filter((h) => foundSet?.has(h.id)).length;
  const totalCount = HINTS.length;

  return (
    <>
      <div
        className="fixed bottom-5 left-5 z-[9998] hidden sm:flex items-center gap-2 bg-[#0B0B0A]/90 border border-white/15 rounded-full px-3.5 py-1.5 font-mono text-xs text-zinc-300 backdrop-blur-md shadow-lg select-none cursor-pointer hover:border-[#00D4FF]/60 hover:text-white transition-all"
        onClick={() => setShowHints((prev) => !prev)}
        title="Click to view Easter Egg hints"
      >
        <span>{foundCount}/{totalCount} secrets found</span>
        <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-[#00D4FF] font-bold">
          ?
        </span>
      </div>

      {showHints && (
        <div
          className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowHints(false)}
        >
          <div
            className="w-full max-w-md bg-[#121211] border border-white/15 rounded-2xl p-6 font-mono text-xs text-zinc-300 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm">🎯</span>
                <span className="font-bold text-white uppercase tracking-wider text-xs">
                  Portfolio Secrets &amp; Tools ({foundCount}/{totalCount})
                </span>
              </div>
              <button
                onClick={() => setShowHints(false)}
                className="text-zinc-500 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-zinc-400 text-[11px] leading-relaxed">
              Designed as engineering tools rather than jokes. Can you discover all of them?
            </p>

            <div className="space-y-2">
              {HINTS.map((h, i) => {
                const isFound = foundSet?.has(h.id);
                return (
                  <div
                    key={h.id}
                    className={`p-2.5 rounded-lg border flex items-center justify-between gap-3 ${
                      isFound
                        ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-200"
                        : "bg-white/[0.02] border-white/[0.08] text-zinc-400"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] opacity-60">0{i + 1}.</span>
                      <span className="text-[11px]">{h.hint}</span>
                    </div>
                    <span className="text-[10px] font-bold shrink-0">
                      {isFound ? "✓ Found" : "Locked"}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="text-[10px] text-zinc-600 text-center pt-2">
              Click anywhere outside to close
            </div>
          </div>
        </div>
      )}
    </>
  );
};
