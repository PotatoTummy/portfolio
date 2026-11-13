/**
 * Shared Motion System for Mobile Architecture
 * Strict Constraints:
 * 1. Animate ONLY transform and opacity. No animating width/height/top/left.
 * 2. Reduced motion fallback: opacity-only, zero translation.
 * 3. 60 FPS spring physics with high damping.
 */

import { Variants, Transition } from "framer-motion";

export const mobileEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const springSoft: Transition = {
  type: "spring",
  stiffness: 280,
  damping: 26,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: (custom?: { delay?: number; reducedMotion?: boolean }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom?.reducedMotion ? 0.2 : 0.5,
      delay: custom?.delay ?? 0,
      ease: mobileEase,
    },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (custom?: { delay?: number }) => ({
    opacity: 1,
    transition: {
      duration: 0.35,
      delay: custom?.delay ?? 0,
      ease: mobileEase,
    },
  }),
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const pressScale = {
  scale: 0.97,
  transition: { duration: 0.1 },
};
