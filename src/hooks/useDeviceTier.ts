"use client";

import { useSyncExternalStore } from "react";

function subscribeTouch(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(hover: none) and (pointer: coarse)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getTouchSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}

export function useIsTouch(): boolean {
  return useSyncExternalStore(subscribeTouch, getTouchSnapshot, () => false);
}

function subscribeMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribeMotion, getMotionSnapshot, () => false);
}

export type DeviceTier = "high" | "low";

function getTierSnapshot(): DeviceTier {
  if (typeof window === "undefined") return "high";

  // Check prefers-reduced-motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "low";
  }

  // Check hardware concurrency (CPU cores)
  const nav = navigator as Navigator & { deviceMemory?: number };
  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency < 4) {
    return "low";
  }

  // Check device memory (RAM in GB) if supported (Chrome/Android)
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4) {
    return "low";
  }

  return "high";
}

export function useDeviceTier(): DeviceTier {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    getTierSnapshot,
    () => "high"
  );
}
