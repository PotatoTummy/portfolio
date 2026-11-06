/**
 * DESIGN SYSTEM & THEME TOKENS
 * Single Source of Truth for Colors, Typography, Spacing, and Project Themes
 */

export const THEME_TOKENS = {
  // Global Core Palette
  colors: {
    bgDark: "#0B0B0A",
    bgWarmCream: "#EFEAE4",
    textDark: "#121211",
    textLight: "#F3F3EE",
    textMutedDark: "rgba(18, 18, 17, 0.72)",
    textMutedLight: "rgba(243, 243, 238, 0.70)",
    
    // Core Accent Colors
    primaryBlue: "#00D4FF", // Electric Cyan / Primary Brand
    primaryBlueHover: "#FFFFFF",
    deepBlue: "#0284C7",
    accentEmerald: "#10B981",
    accentAmber: "#F59E0B",
    accentPurple: "#A855F7",
    accentRose: "#FF007A",
    
    // Borders & Dividers
    borderDark: "rgba(255, 255, 255, 0.12)",
    borderLight: "rgba(18, 18, 17, 0.14)",
  },

  // Bespoke Thematic Palettes for Projects (Selected Work)
  projectThemes: {
    nestys: {
      id: "nestys",
      name: "Nestys Multi-Portal Ecosystem",
      bgGradient: "linear-gradient(135deg, #021226 0%, #07294D 45%, #0A4373 80%, #00D4FF 130%)",
      glowColor: "rgba(0, 212, 255, 0.35)",
      primaryAccent: "#00D4FF",
      badgeBg: "rgba(0, 212, 255, 0.15)",
      badgeText: "#00D4FF",
      cardBorder: "rgba(0, 212, 255, 0.3)",
    },
    scrollr: {
      id: "scrollr",
      name: "Scrollr (LinkPlay)",
      bgGradient: "linear-gradient(135deg, #18022B 0%, #3B0D59 45%, #6B1668 80%, #FF007A 130%)",
      glowColor: "rgba(255, 0, 122, 0.35)",
      primaryAccent: "#FF2E93",
      badgeBg: "rgba(255, 46, 147, 0.15)",
      badgeText: "#FF70B8",
      cardBorder: "rgba(255, 46, 147, 0.3)",
    },
    wokataa: {
      id: "wokataa",
      name: "WoKataa (Kite Clash)",
      bgGradient: "linear-gradient(135deg, #012217 0%, #064E3B 45%, #0B6B4D 80%, #10B981 130%)",
      glowColor: "rgba(16, 185, 129, 0.35)",
      primaryAccent: "#10B981",
      badgeBg: "rgba(16, 185, 129, 0.15)",
      badgeText: "#34D399",
      cardBorder: "rgba(16, 185, 129, 0.3)",
    },
    "earth-air": {
      id: "earth-air",
      name: "Earth Air Condition",
      bgGradient: "linear-gradient(135deg, #261102 0%, #5C2B04 45%, #8C4307 80%, #F59E0B 130%)",
      glowColor: "rgba(245, 158, 11, 0.35)",
      primaryAccent: "#F59E0B",
      badgeBg: "rgba(245, 158, 11, 0.15)",
      badgeText: "#FBBF24",
      cardBorder: "rgba(245, 158, 11, 0.3)",
    },
    "urban-arena": {
      id: "urban-arena",
      name: "UrbanArena Platform",
      bgGradient: "linear-gradient(135deg, #17042B 0%, #3B0D66 45%, #581C87 80%, #A855F7 130%)",
      glowColor: "rgba(168, 85, 247, 0.35)",
      primaryAccent: "#A855F7",
      badgeBg: "rgba(168, 85, 247, 0.15)",
      badgeText: "#C084FC",
      cardBorder: "rgba(168, 85, 247, 0.3)",
    },
  },

  // Contact Page Theme (All-blue text with pure white on hover)
  contactTheme: {
    textColor: "#00D4FF",
    textHoverColor: "#FFFFFF",
    bgDark: "#070B12",
    accentGlow: "rgba(0, 212, 255, 0.25)",
  },

  // Typography Scales
  typography: {
    fontGrotesk: "var(--font-grotesk), -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    fontMono: "var(--font-mono), 'JetBrains Mono', monospace",
  },
} as const;

export type ProjectThemeKey = keyof typeof THEME_TOKENS.projectThemes;

