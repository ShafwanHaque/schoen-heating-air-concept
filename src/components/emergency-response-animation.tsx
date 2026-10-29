"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function EmergencyResponseAnimation({ sectionId = "emergency" }: { sectionId?: string }) {
  useLayoutEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compactLayout = window.matchMedia("(max-width: 900px)").matches;
    if (reducedMotion || compactLayout) {
      section.classList.add("is-emergency-static");
      return;
    }

    const context = gsap.context(() => {
      const eyebrow = section.querySelector<HTMLElement>("[data-emergency-eyebrow]");
      const headline = gsap.utils.toArray<HTMLElement>("[data-emergency-headline]", section);
      const body = section.querySelector<HTMLElement>("[data-emergency-body]");
      const actions = section.querySelector<HTMLElement>("[data-emergency-actions]");
      const consolePanel = section.querySelector<HTMLElement>("[data-emergency-console]");
      const issueRows = gsap.utils.toArray<HTMLElement>("[data-emergency-row]", section);
      const route = section.querySelector<SVGPathElement>("[data-emergency-route]");
      const arrival = section.querySelector<HTMLElement>("[data-emergency-arrival]");
      const handoff = section.querySelector<HTMLElement>("[data-emergency-handoff]");

      if (!eyebrow || !body || !actions || !consolePanel || !route || !arrival || !handoff) return;

      const routeLength = route.getTotalLength();
      gsap.set(route, { strokeDasharray: routeLength, strokeDashoffset: routeLength });
      gsap.set(eyebrow, { autoAlpha: 0, y: 16 });
      gsap.set(headline, { autoAlpha: 0, yPercent: 105 });
      gsap.set(body, { autoAlpha: 0, y: 20 });
      gsap.set(actions, { autoAlpha: 0, y: 18 });
      gsap.set(consolePanel, { autoAlpha: 0, x: 36, clipPath: "inset(0 0 0 22% round 30px)" });
      gsap.set(issueRows, { autoAlpha: 0, x: 28 });
      gsap.set(arrival, { autoAlpha: 0, scale: 0.86, transformOrigin: "center" });
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
        .to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.42 })
        .to(headline, { autoAlpha: 1, yPercent: 0, duration: 0.7, stagger: 0.09 }, "-=0.2")
        .to(body, { autoAlpha: 1, y: 0, duration: 0.48 }, "-=0.36")
        .to(actions, { autoAlpha: 1, y: 0, duration: 0.45 }, "-=0.28")
        .to(
          consolePanel,
          { autoAlpha: 1, x: 0, clipPath: "inset(0 0 0 0% round 30px)", duration: 0.76 },
          "-=0.7",
        )
        .to(issueRows, { autoAlpha: 1, x: 0, duration: 0.42, stagger: 0.1 }, "-=0.42")
        .to(route, { strokeDashoffset: 0, duration: 0.72, ease: "power1.inOut" }, "-=0.35")
        .to(arrival, { autoAlpha: 1, scale: 1, duration: 0.38, ease: "back.out(1.7)" }, "-=0.1")
        .to(handoff, { autoAlpha: 1, scaleY: 1, duration: 0.45 }, "-=0.2");
    }, section);

    return () => context.revert();
  }, [sectionId]);

  return null;
}
