"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function BrandStandardAnimation({ sectionId = "brand-standard" }: { sectionId?: string }) {
  useLayoutEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compactLayout = window.matchMedia("(max-width: 900px)").matches;

    if (reducedMotion || compactLayout) {
      section.classList.add("is-brand-standard-static");
      return;
    }

    const context = gsap.context(() => {
      const eyebrow = section.querySelector<HTMLElement>("[data-standard-eyebrow]");
      const headline = gsap.utils.toArray<HTMLElement>("[data-standard-headline]", section);
      const body = section.querySelector<HTMLElement>("[data-standard-body]");
      const actions = section.querySelector<HTMLElement>("[data-standard-actions]");
      const lightPanel = section.querySelector<HTMLElement>("[data-standard-panel]");
      const rows = gsap.utils.toArray<HTMLElement>("[data-standard-row]", section);
      const seam = section.querySelector<HTMLElement>("[data-standard-seam]");
      const handoff = section.querySelector<HTMLElement>("[data-standard-handoff]");

      if (!eyebrow || !body || !actions || !lightPanel || !seam || !handoff) return;

      gsap.set(eyebrow, { autoAlpha: 0, y: 14 });
      gsap.set(headline, { autoAlpha: 0, yPercent: 108 });
      gsap.set(body, { autoAlpha: 0, y: 22 });
      gsap.set(actions, { autoAlpha: 0, y: 18 });
      gsap.set(lightPanel, { autoAlpha: 0, xPercent: 7, clipPath: "inset(0 0 0 15%)" });
      gsap.set(rows, { autoAlpha: 0, x: 34 });
      gsap.set(seam, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(handoff, { autoAlpha: 0, scaleY: 0.2, transformOrigin: "top center" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      timeline
        .to(seam, { scaleY: 1, duration: 0.65, ease: "power2.inOut" })
        .to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.4 }, "-=0.45")
        .to(headline, { autoAlpha: 1, yPercent: 0, duration: 0.72, stagger: 0.09 }, "-=0.22")
        .to(body, { autoAlpha: 1, y: 0, duration: 0.48 }, "-=0.36")
        .to(actions, { autoAlpha: 1, y: 0, duration: 0.44 }, "-=0.26")
        .to(lightPanel, { autoAlpha: 1, xPercent: 0, clipPath: "inset(0 0 0 0%)", duration: 0.76 }, "-=0.72")
        .to(rows, { autoAlpha: 1, x: 0, duration: 0.48, stagger: 0.11 }, "-=0.38")
        .to(handoff, { autoAlpha: 1, scaleY: 1, duration: 0.42 }, "-=0.18");
    }, section);

    return () => context.revert();
  }, [sectionId]);

  return null;
}
