"use client";

import React, { useState, useEffect, useRef } from "react";
import { Home, Compass, Briefcase, Mail, Menu } from "lucide-react";

interface MobileBottomBarProps {
  onOpenMenu: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOpenMenu }) => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  // Auto-hide on scroll down, reveal on scroll up
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const diff = currentScrollY - lastScrollYRef.current;

          // Only trigger if scroll delta is significant (> 8px)
          if (Math.abs(diff) > 8) {
            if (currentScrollY > 120 && diff > 0) {
              // Scrolling down
              setIsVisible(false);
            } else {
              // Scrolling up or at the very top
              setIsVisible(true);
            }
            lastScrollYRef.current = currentScrollY;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed bottom-3 left-3 right-3 z-40 max-w-md mx-auto transition-transform duration-300 ease-out pb-[env(safe-area-inset-bottom)] ${
        isVisible ? "translate-y-0" : "translate-y-[130%]"
      }`}
      aria-label="Mobile Bottom Navigation"
    >
      <div className="flex items-center justify-between px-3 py-2 rounded-2xl bg-[#121211]/95 border border-white/15 shadow-2xl text-[11px] font-mono text-zinc-300">
        
        <button
          type="button"
          onClick={() => scrollTo("hero")}
          className="flex flex-col items-center gap-0.5 px-2.5 py-1 rounded-xl hover:text-white active:scale-90 transition-all text-center"
        >
          <Home className="w-4 h-4 text-[#00D4FF]" />
          <span>Home</span>
        </button>

        <button
          type="button"
          onClick={() => scrollTo("studio")}
          className="flex flex-col items-center gap-0.5 px-2.5 py-1 rounded-xl hover:text-white active:scale-90 transition-all text-center"
        >
          <Compass className="w-4 h-4 text-amber-400" />
          <span>Studio</span>
        </button>

        <button
          type="button"
          onClick={() => scrollTo("work")}
          className="flex flex-col items-center gap-0.5 px-2.5 py-1 rounded-xl hover:text-white active:scale-90 transition-all text-center"
        >
          <Briefcase className="w-4 h-4 text-emerald-400" />
          <span>Work</span>
        </button>

        <button
          type="button"
          onClick={() => scrollTo("contact")}
          className="flex flex-col items-center gap-0.5 px-2.5 py-1 rounded-xl hover:text-white active:scale-90 transition-all text-center"
        >
          <Mail className="w-4 h-4 text-purple-400" />
          <span>Contact</span>
        </button>

        <div className="w-px h-6 bg-white/15 mx-0.5" />

        <button
          type="button"
          onClick={onOpenMenu}
          className="flex flex-col items-center gap-0.5 px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white active:scale-90 transition-all font-semibold"
        >
          <Menu className="w-4 h-4 text-[#00D4FF]" />
          <span>Menu</span>
        </button>

      </div>
    </nav>
  );
};
