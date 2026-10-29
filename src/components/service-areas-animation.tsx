"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ServiceAreasAnimation() {
  useLayoutEffect(() => {
    const section = document.getElementById("service-areas");
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 901px)").matches;

    if (reducedMotion || !desktop) {
      section.classList.add("is-coverage-static");
      return;
    }

    const context = gsap.context(() => {
      const transitionLine = section.querySelector<HTMLElement>("[data-coverage-transition-line]");
      const transitionNode = section.querySelector<HTMLElement>("[data-coverage-transition-node]");
      const copy = section.querySelector<HTMLElement>(".coverage-v2-copy");
      const sculpture = section.querySelector<HTMLElement>(".coverage-v2-sculpture");
      const strip = section.querySelector<HTMLElement>(".coverage-v2-area-strip");
      const frame = section.querySelector<HTMLElement>(".coverage-v2-frame");

      if (!transitionLine || !transitionNode || !copy || !sculpture || !strip || !frame) return;

      gsap.set(transitionLine, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(transitionNode, { autoAlpha: 0, scale: 0.76 });
      gsap.set(copy.children, { autoAlpha: 0, y: 18 });
      gsap.set(sculpture, { autoAlpha: 0, y: 30, rotate: 0.6, scale: 0.985 });
      gsap.set(frame, { transformOrigin: "50% 50%" });
      gsap.set(strip, { autoAlpha: 0, y: 12 });

      const reveal = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.out" },
        onComplete: () => {
          gsap.set([sculpture, strip, ...Array.from(copy.children)], { clearProps: "willChange,transform" });
        },
      });

      reveal
        .to(transitionLine, { scaleY: 1, duration: 0.36, ease: "power1.out" }, 0)
        .to(transitionNode, { autoAlpha: 1, scale: 1, duration: 0.28, ease: "back.out(1.5)" }, 0.2)
        .to(copy.children, { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.05 }, 0.28)
        .to(sculpture, { autoAlpha: 1, y: 0, rotate: 0, scale: 1, duration: 0.64, ease: "power3.out" }, 0.24)
        .fromTo(frame, { clipPath: "polygon(8% 0, 92% 0, 100% 9%, 100% 91%, 92% 100%, 8% 100%, 0 91%, 0 9%)" }, { clipPath: "polygon(2.6% 0, 96.8% 0, 100% 5.8%, 100% 92%, 95.8% 100%, 3.8% 100%, 0 94.2%, 0 7%)", duration: 0.7 }, 0.24)
        .to(strip, { autoAlpha: 1, y: 0, duration: 0.32 }, 0.62);

      ScrollTrigger.create({
        trigger: section,
        start: "top 88%",
        once: true,
        onEnter: () => reveal.play(),
      });
    }, section);

    return () => context.revert();
  }, []);

  return null;
}
