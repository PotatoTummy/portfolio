"use client";

import { useEffect, useState, RefObject } from "react";

export function useSectionScroll(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;

      // 0 when section enters bottom of viewport, 0.5 when centered, 1 when leaves top
      const totalDist = rect.height + windowH;
      const currentDist = windowH - rect.top;
      const p = Math.min(1, Math.max(0, currentDist / totalDist));
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref]);

  return progress;
}

