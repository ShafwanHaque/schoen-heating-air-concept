"use client";

import { useSyncExternalStore } from "react";

function subscribeToMediaQuery(query: string, callback: () => void) {
  const mediaQuery = window.matchMedia(query);
  mediaQuery.addEventListener("change", callback);

  return () => mediaQuery.removeEventListener("change", callback);
}

export function useMediaQuery(query: string, serverSnapshot = false) {
  return useSyncExternalStore(
    (callback: () => void) => subscribeToMediaQuery(query, callback),
    () => window.matchMedia(query).matches,
    () => serverSnapshot,
  );
}

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)", true);
}
