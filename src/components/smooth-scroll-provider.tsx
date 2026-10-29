"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";
import { usePrefersReducedMotion } from "./use-media-query";

gsap.registerPlugin(ScrollTrigger);

function ScrollTriggerBridge() {
  useLenis(() => ScrollTrigger.update());

  useEffect(() => {
    let resizeTimer: number | undefined;

    const refresh = () => ScrollTrigger.refresh();
    const scheduleRefresh = () => {
      if (resizeTimer !== undefined) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(refresh, 140);
    };

    const frame = window.requestAnimationFrame(refresh);
    window.addEventListener("load", refresh, { once: true });
    window.addEventListener("resize", scheduleRefresh, { passive: true });

    void document.fonts?.ready.then(refresh).catch(() => undefined);

    return () => {
      window.cancelAnimationFrame(frame);
      if (resizeTimer !== undefined) window.clearTimeout(resizeTimer);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", scheduleRefresh);
    };
  }, []);

  return null;
}

type SmoothScrollProviderProps = {
  children: ReactNode;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        anchors: true,
        autoRaf: true,
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1,
        wheelMultiplier: 0.92,
      }}
    >
      <ScrollTriggerBridge />
      {children}
    </ReactLenis>
  );
}
