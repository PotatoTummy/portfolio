"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export const CursorSpotlight: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Smooth spring coordinates
  const mouseX = useSpring(-500, { stiffness: 400, damping: 28 });
  const mouseY = useSpring(-500, { stiffness: 400, damping: 28 });

  useEffect(() => {
    // Only enable on pointer-capable devices (not touch screens)
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const handlePointerMove = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-30 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 mix-blend-screen"
      style={{
        left: mouseX,
        top: mouseY,
        background: "radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, rgba(2, 132, 199, 0.03) 45%, transparent 70%)",
      }}
      aria-hidden="true"
    />
  );
};

