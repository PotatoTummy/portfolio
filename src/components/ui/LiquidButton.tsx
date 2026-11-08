"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface LiquidButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "accent";
  accentColor?: string;
  className?: string;
  icon?: boolean;
}

export const LiquidButton: React.FC<LiquidButtonProps> = ({
  href,
  onClick,
  children,
  variant = "primary",
  accentColor = "#00D4FF",
  className = "",
  icon = true,
}) => {
  const buttonRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic spring physics
  const x = useSpring(0, { stiffness: 250, damping: 20 });
  const y = useSpring(0, { stiffness: 250, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Mild magnetic pull within the button bounds
    const pullDistanceX = (e.clientX - centerX) * 0.18;
    const pullDistanceY = (e.clientY - centerY) * 0.18;
    x.set(pullDistanceX);
    y.set(pullDistanceY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Color mappings based on variant
  const getColors = () => {
    if (variant === "primary") {
      return {
        border: "border-transparent",
        bg: "bg-[#00D4FF]",
        text: "text-[#0B0B0A]",
        liquid: "bg-[#38BDF8]",
        textHover: "text-[#0B0B0A]",
        shadow: "shadow-[0_0_24px_rgba(0,212,255,0.35)]",
      };
    }
    if (variant === "accent") {
      return {
        border: "border-slate-900/10",
        bg: "bg-[#0F172A]",
        text: "text-white font-medium",
        liquid: accentColor,
        textHover: "text-[#0B0B0A]",
        shadow: "shadow-[0_4px_14px_rgba(0,0,0,0.12)]",
      };
    }
    if (variant === "secondary") {
      return {
        border: "border-white/20",
        bg: "bg-white/[0.05]",
        text: "text-[#F3F3EE]",
        liquid: "bg-white",
        textHover: "text-[#0B0B0A]",
        shadow: "",
      };
    }
    // outline / default
    return {
      border: "border-white/25",
      bg: "bg-transparent",
      text: "text-[#F3F3EE]",
      liquid: "bg-[#00D4FF]",
      textHover: "text-[#0B0B0A]",
      shadow: "",
    };
  };

  const colors = getColors();

  const content = (
    <motion.span
      ref={buttonRef}
      style={{ x, y }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-flex items-center justify-between gap-3 px-5 py-3 rounded-xl border ${colors.border} ${colors.bg} overflow-hidden group select-none font-sans font-semibold text-sm transition-shadow duration-300 ${colors.shadow} ${className}`}
    >
      {/* Liquid expanding fill layer */}
      <span
        className="absolute inset-0 rounded-xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none origin-bottom"
        style={{
          backgroundColor: variant === "accent" ? accentColor : undefined,
          transform: isHovered ? "translateY(0%) scale(1)" : "translateY(102%) scale(0.95)",
        }}
        aria-hidden="true"
      />

      {/* Button text with color inversion */}
      <span
        className={`relative z-10 transition-colors duration-200 ${colors.text} ${
          isHovered ? colors.textHover : ""
        }`}
      >
        {children}
      </span>

      {/* Awwwards 45° double-arrow slide */}
      {icon && (
        <span
          className={`relative z-10 w-4 h-4 overflow-hidden shrink-0 transition-colors duration-200 ${colors.text} ${
            isHovered ? colors.textHover : ""
          }`}
          aria-hidden="true"
        >
          {/* Primary arrow sliding up-right on hover */}
          <ArrowUpRight
            className={`w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isHovered ? "translate-x-4 -translate-y-4 opacity-0" : "translate-x-0 translate-y-0 opacity-100"
            }`}
          />
          {/* Incoming arrow sliding in from bottom-left */}
          <ArrowUpRight
            className={`w-4 h-4 absolute top-0 left-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isHovered ? "translate-x-0 translate-y-0 opacity-100" : "-translate-x-4 translate-y-4 opacity-0"
            }`}
          />
        </span>
      )}
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block" onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className="inline-block bg-transparent p-0 border-0">
      {content}
    </button>
  );
};

