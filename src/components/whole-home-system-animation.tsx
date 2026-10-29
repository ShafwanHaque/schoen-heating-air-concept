"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "./whole-home-system-data";

gsap.registerPlugin(ScrollTrigger);

export function WholeHomeSystemAnimation() {
  useLayoutEffect(() => {
    const section = document.getElementById("services");
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compactLayout = window.matchMedia("(max-width: 900px)").matches;
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 600);

    if (reduceMotion) {
      section.classList.add("is-system-static");
      section
        .querySelector<SVGSVGElement>(".whole-system-scene__svg")
        ?.setAttribute("preserveAspectRatio", "xMidYMid meet");
      return () => window.clearTimeout(refreshTimer);
    }

    if (compactLayout) {
      section
        .querySelector<SVGSVGElement>(".whole-system-scene__svg")
        ?.setAttribute("preserveAspectRatio", "xMidYMid meet");
    }

    section.classList.add("is-system-animated");

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => section.classList.toggle("is-system-visible", entry.isIntersecting),
      { rootMargin: "18% 0px 18% 0px" },
    );
    visibilityObserver.observe(section);

    const context = gsap.context(() => {
      const camera = section.querySelector<HTMLDivElement>("[data-system-camera]");
      const intro = section.querySelector<HTMLElement>("[data-system-intro]");
      const introLine = section.querySelector<HTMLElement>("[data-system-intro-line]");
      const routePaths = gsap.utils.toArray<SVGPathElement>("[data-system-route]", section);
      const routeHeads = gsap.utils.toArray<SVGGElement>("[data-route-head]", section);
      const routeNodes = gsap.utils.toArray<SVGGElement>("[data-route-node]", section);
      const serviceTiles = gsap.utils.toArray<SVGGElement>("[data-system-tile]", section);
      const serviceHighlights = gsap.utils.toArray<SVGGraphicsElement>("[data-service-highlight]", section);
      const serviceIcons = gsap.utils.toArray<SVGGElement>("[data-service-icon]", section);
      const serviceLabels = gsap.utils.toArray<SVGGElement>("[data-service-label]", section);
      const cards = gsap.utils.toArray<HTMLElement>("[data-system-card]", section);
      const progressItems = gsap.utils.toArray<HTMLElement>("[data-system-progress]", section);
      const summary = section.querySelector<HTMLElement>("[data-system-summary]");
      const home = section.querySelector<SVGGElement>("[data-system-home]");

      const routeLengths = routePaths.map((route) => route.getTotalLength());
      const routeProgress = routePaths.map(() => ({ value: 0 }));

      routePaths.forEach((route, index) => {
        const length = routeLengths[index];
        const startPoint = route.getPointAtLength(0);
        route.style.strokeDasharray = `${length} ${length}`;
        route.style.strokeDashoffset = `${length}`;
        route.style.opacity = "1";

        const head = routeHeads[index];
        head.setAttribute("transform", `translate(${startPoint.x} ${startPoint.y})`);
        head.style.opacity = "0";
        head.style.visibility = "hidden";
      });

      gsap.set(routeNodes, { autoAlpha: 0.2, scale: 1, transformOrigin: "50% 50%" });
      gsap.set(serviceTiles, {
        autoAlpha: 0.46,
        y: 0,
        scale: 1,
        transformOrigin: "50% 65%",
      });
      gsap.set(serviceHighlights, {
        autoAlpha: 0,
        scale: 1,
        transformOrigin: "50% 55%",
      });
      gsap.set(serviceIcons, { color: "rgba(255,255,255,0.68)" });
      gsap.set(serviceLabels, { color: "rgba(255,255,255,0.7)" });
      gsap.set(cards, { autoAlpha: 0, y: 28, scale: 0.965 });
      gsap.set(progressItems, { opacity: 0.34 });
      gsap.set(summary, { autoAlpha: 0, y: 28 });
      gsap.set(introLine, { scaleX: 0, transformOrigin: "50% 50%" });
      gsap.set(home, { y: 10, scale: 0.96, transformOrigin: "50% 65%" });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.38,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(home, { y: 0, scale: 1.03, duration: 0.65, ease: "power2.out" }, 0)
        .to(introLine, { scaleX: 1, duration: 0.55, ease: "power2.out" }, 0.08)
        .to(camera, { scale: 1.018, x: 0, y: 3, duration: 0.8, force3D: true }, 0)
        .to(intro, { autoAlpha: 0, y: -34, duration: 0.28, ease: "power1.in" }, 0.62);

      const serviceStep = 1.28;
      const routeDrawDuration = 0.98;

      services.forEach((service, index) => {
        const route = routePaths[index];
        const routeHead = routeHeads[index];
        const routeLength = routeLengths[index];
        const drawState = routeProgress[index];
        const routeNode = routeNodes[index];
        const tile = serviceTiles[index];
        const highlight = tile.querySelectorAll<SVGGraphicsElement>("[data-service-highlight]");
        const icon = tile.querySelector<SVGGElement>("[data-service-icon]")!;
        const label = tile.querySelector<SVGGElement>("[data-service-label]")!;
        const card = cards[index];
        const progress = progressItems.filter(
          (item) => Number(item.dataset.serviceIndex) === index,
        );
        const stepStart = 0.82 + index * serviceStep;
        const arrival = stepStart + 0.04 + routeDrawDuration;

        timeline
          .to(
            camera,
            {
              x: service.cameraX,
              y: service.cameraY,
              scale: 1 + (service.cameraScale - 1) * 0.72,
              duration: 0.72,
              force3D: true,
              ease: "power1.inOut",
            },
            stepStart,
          )
          .to(
            drawState,
            {
              value: 1,
              duration: routeDrawDuration,
              ease: "none",
              onUpdate: () => {
                const value = drawState.value;
                const travelled = routeLength * value;
                const point = route.getPointAtLength(travelled);

                route.style.strokeDashoffset = `${routeLength - travelled}`;
                routeHead.setAttribute("transform", `translate(${point.x} ${point.y})`);

                const showHead = value > 0.002 && value < 0.995;
                routeHead.style.opacity = showHead ? "1" : "0";
                routeHead.style.visibility = showHead ? "visible" : "hidden";
              },
            },
            stepStart + 0.04,
          )
          .to(routeNode, { autoAlpha: 1, duration: 0.12, ease: "none" }, arrival)
          .to(tile, { autoAlpha: 1, duration: 0.18, ease: "none" }, arrival)
          .to(
            highlight,
            { autoAlpha: 1, duration: 0.22, ease: "power1.out" },
            arrival,
          )
          .to(icon, { color: service.accent, duration: 0.2, ease: "none" }, arrival)
          .to(label, { color: service.accent, duration: 0.2, ease: "none" }, arrival)
          .to(progress, { opacity: 1, duration: 0.14, ease: "none" }, arrival)
          .to(
            card,
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.28, ease: "power1.out" },
            arrival + 0.04,
          );

        if (index < services.length - 1) {
          timeline
            .to(
              card,
              { autoAlpha: 0, y: -18, scale: 0.985, duration: 0.18, ease: "power1.in" },
              stepStart + 1.18,
            )
            .to(progress, { opacity: 0.52, duration: 0.14 }, stepStart + 1.18);
        }
      });

      const finalStart = 0.82 + services.length * serviceStep;
      timeline
        .to(cards[cards.length - 1], { autoAlpha: 0, y: -22, duration: 0.23 }, finalStart - 0.1)
        .to(serviceTiles, { autoAlpha: 1, scale: 1.02, duration: 0.34 }, finalStart)
        .to(progressItems, { opacity: 0.72, duration: 0.25 }, finalStart)
        .to(camera, { x: 0, y: -8, scale: 1.01, duration: 0.52, ease: "power1.inOut", force3D: true }, finalStart)
        .to(summary, { autoAlpha: 1, y: 0, duration: 0.42, ease: "power2.out" }, finalStart + 0.24)
        .to({}, { duration: 0.55 });
    }, section);

    return () => {
      window.clearTimeout(refreshTimer);
      visibilityObserver.disconnect();
      context.revert();
    };
  }, []);

  return null;
}
