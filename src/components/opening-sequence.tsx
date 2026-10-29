"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BrandLogo } from "./brand-logo";
import { siteConfig } from "@/config/site.config";

/**
 * V9 / THRESHOLD
 * A short typographic statement becomes a continuous horizontal rule;
 * the entire page rises away to reveal the hero beneath. No orbital graphics,
 * random shapes, scanlines, or the old left/right curtains.
 */
export function OpeningSequence() {
  const opening = siteConfig.opening;
  const [phase, setPhase] = useState<"enter" | "exit" | "hidden">("enter");
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    setPhase("hidden");
    document.body.classList.remove("is-intro-locked");
    window.dispatchEvent(new Event("site:opening-complete"));
  }, []);

  useEffect(() => {
    if (!opening.enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timer = window.setTimeout(finish, 30);
      return () => window.clearTimeout(timer);
    }

    document.body.classList.add("is-intro-locked");
    const duration = Math.max(1800, Math.min(opening.durationMs, 4800));
    const exitDelay = duration - 820;
    const exitTimer = window.setTimeout(() => setPhase("exit"), exitDelay);
    const endTimer = window.setTimeout(finish, duration);
    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(endTimer);
      document.body.classList.remove("is-intro-locked");
    };
  }, [finish, opening.durationMs, opening.enabled]);

  if (!opening.enabled || phase === "hidden") return null;

  return (
    <div className={`opening-sequence threshold-opening${phase === "exit" ? " is-exiting" : ""}`} role="presentation">
      <div className="threshold-opening__top">
        <span className="threshold-opening__brand"><BrandLogo variant="light" /></span>
        <span className="threshold-opening__eyebrow">{opening.eyebrow}</span>
      </div>
      <div className="threshold-opening__center">
        <div className="threshold-opening__intro-mark" aria-hidden="true">/</div>
        <h2 className="threshold-opening__words">
          <span>{opening.line1}</span>
          <strong>{opening.line2}</strong>
        </h2>
        <p className="threshold-opening__detail">{opening.detail}</p>
      </div>
      <div className="threshold-opening__bottom">
        <div className="threshold-opening__progress" aria-hidden="true"><span /></div>
        <span className="threshold-opening__place">{opening.location}</span>
        <span className="threshold-opening__credit">{siteConfig.brand.shortName}</span>
      </div>
      <button className="threshold-opening__skip" onClick={finish} type="button" aria-label={opening.skipLabel}>
        {opening.skipLabel}<span aria-hidden="true">↗</span>
      </button>
    </div>
  );
}
