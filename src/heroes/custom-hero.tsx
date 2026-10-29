"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { siteConfig } from "@/config/site.config";
import { ClimateChamberHero } from "./climate-chamber-hero";
import { ServiceCraftHero } from "./service-craft-hero";

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {diagonal ? <path d="M6 18 18 6M9 6h9v9" /> : <path d="M4 12h16m-6-6 6 6-6 6" />}
    </svg>
  );
}

function HomeIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 11 9-8 9 8v10H3zM9 21v-7h6v7" /></svg>;
}

/**
 * An image-first hero. For "open-door", the actual image forms the entire frame:
 * natural aspect ratio, rounded corners on the image itself, no mats, letterboxing,
 * cropping, or distortion. Alternative layouts retain their selectable fit modes.
 */
export function CustomHero() {
  if (siteConfig.hero.layout === "service-craft") return <ServiceCraftHero />;
  return siteConfig.hero.layout === "climate-chamber" ? <ClimateChamberHero /> : <LegacyHero />;
}

function LegacyHero() {
  const hero = siteConfig.hero;
  const rootRef = useRef<HTMLElement>(null);
  const isPlaceholder = hero.media.primarySrc.includes("placeholder");

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !hero.motion.enabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const select = gsap.utils.selector(root);
    let timeline: gsap.core.Timeline | undefined;
    let begun = false;
    const pace = hero.motion.pace === "gentle" ? 1.23 : 1;
    const begin = () => {
      if (begun) return;
      begun = true;
      timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (hero.layout === "open-door") {
        // The threshold opens once, then the original photo remains untouched.
        // The door is a real structural part of this layout, not arbitrary decoration.
        timeline
          .fromTo(select(".home-hero__copy"),
            { autoAlpha: 0, rotationY: -13, x: -18, transformOrigin: "100% 50%" },
            { autoAlpha: 1, rotationY: 0, x: 0, duration: .95 * pace, ease: "expo.out" }, 0)
          .fromTo(select(".home-hero__media"),
            { autoAlpha: 0, clipPath: "inset(0 0 0 14%)" },
            { autoAlpha: 1, clipPath: "inset(0 0 0 0%)", duration: .95 * pace, ease: "power3.out" }, .16);
      }
      timeline
        .fromTo(select(".home-hero__eyebrow,.home-hero__counter"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: .45 * pace, stagger: .12 }, 0)
        .fromTo(select(".home-hero__title span"), { autoAlpha: 0, yPercent: 70 }, { autoAlpha: 1, yPercent: 0, stagger: .14, ease: "expo.out", duration: .85 * pace }, .1)
        .fromTo(select(".home-hero__description,.home-hero__actions,.home-hero__location"), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, stagger: .09, duration: .6 * pace }, .46)
        .fromTo(select(".home-hero__photo-wrap"), { autoAlpha: 0, y: 22, scale: .985 }, { autoAlpha: 1, y: 0, scale: 1, duration: .86 * pace, ease: "expo.out" }, .24)
        .fromTo(select(".home-hero__photo-main"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.25 * pace }, .4)
        .fromTo(select(".home-hero__caption,.home-hero__service-band"), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, stagger: .12, duration: .55 * pace }, .9);
    };
    const introActive = siteConfig.opening.enabled &&
      (document.querySelector(".opening-sequence") || document.body.classList.contains("is-intro-locked"));
    if (introActive) window.addEventListener("site:opening-complete", begin);
    else begin();
    return () => {
      window.removeEventListener("site:opening-complete", begin);
      timeline?.kill();
      gsap.set(select(".home-hero__copy,.home-hero__media,.home-hero__eyebrow,.home-hero__counter,.home-hero__title span,.home-hero__description,.home-hero__actions,.home-hero__location,.home-hero__photo-wrap,.home-hero__photo-main,.home-hero__caption,.home-hero__service-band"), { clearProps: "all" });
    };
  }, [hero.layout, hero.motion.enabled, hero.motion.pace]);

  const media = (
    <div className="home-hero__media">
      <div className="home-hero__photo-wrap">
        {hero.layout === "open-door" ? (
          // The photo is the frame: its natural aspect ratio determines the visible
          // bounds, so even arbitrary company-provided images reach every corner.
          // Width/height provide initial image dimensions; the decoded image's own
          // intrinsic ratio determines its rendered size via width/height: auto.
          <Image
            className="home-hero__photo-main home-hero__photo-main--natural"
            src={hero.media.primarySrc}
            alt={hero.media.primaryAlt}
            width={1600}
            height={1200}
            preload
            sizes="(max-width: 900px) 100vw, 54vw"
            style={{ objectPosition: hero.media.primaryPosition }}
          />
        ) : (
          <div className="home-hero__mat">
            <div className={`home-hero__photo home-hero__photo--${hero.media.fit}`}>
              {!isPlaceholder && hero.media.fit === "contain" && hero.media.backdrop === "blur" && (
                <Image className="home-hero__photo-blur" src={hero.media.primarySrc} alt="" aria-hidden="true" fill sizes="(max-width: 980px) 100vw, 54vw" style={{ objectPosition: hero.media.primaryPosition }} />
              )}
              <div className="home-hero__photo-content">
                <Image className="home-hero__photo-main" src={hero.media.primarySrc} alt={hero.media.primaryAlt} fill preload sizes="(max-width: 980px) 100vw, 54vw" style={{ objectFit: hero.media.fit, objectPosition: hero.media.primaryPosition }} />
              </div>
            </div>
          </div>
        )}
        {isPlaceholder && (
          <div className="home-hero__placeholder" aria-hidden="true">
            <small>[[PHOTO SLOT]]</small><strong>[[ANY IMAGE RATIO]]</strong>
            <span>[[CREW / VAN / HOME / INSTALLATION]]</span>
          </div>
        )}
      </div>
      <div className="home-hero__caption"><span>{hero.edgeLabel}</span><span>{hero.bottomStatement}</span></div>
    </div>
  );

  const copy = (
    <div className="home-hero__copy">
      <div className="home-hero__door-seam" aria-hidden="true"><i /><i /><i /></div>
      <span className="home-hero__door-title" aria-hidden="true">{hero.sillLabel}</span>
      <h1 className="home-hero__title" id="home-hero-heading"><span>{hero.headlineLine1}</span><span className="home-hero__title-accent">{hero.headlineLine2}</span></h1>
      <p className="home-hero__description">{hero.description}</p>
      <div className="home-hero__actions">
        <a className="home-hero__primary" href={siteConfig.contact.contactUrl}>{hero.primaryCta}<ArrowIcon diagonal /></a>
        <a className="home-hero__secondary" href={siteConfig.contact.phoneHref}>{hero.secondaryCta}<ArrowIcon /></a>
      </div>
      <div className="home-hero__location"><span className="home-hero__home-icon"><HomeIcon /></span><div><small>{hero.locationLabel}</small><strong>{hero.locationValue}</strong></div></div>
    </div>
  );

  return (
    <section className={`home-hero home-hero--${hero.layout} home-hero--${hero.media.backdrop}`} id="top" ref={rootRef} aria-labelledby="home-hero-heading">
      <div className="home-hero__inner">
        <div className="home-hero__topline"><span className="home-hero__eyebrow"><i />{hero.eyebrow}</span><span className="home-hero__counter">{hero.sillLabel} / 01</span></div>
        <div className="home-hero__composition">{copy}{media}</div>
        <div className="home-hero__service-band"><span className="home-hero__band-label">{hero.sillLabel}</span><nav aria-label="Featured services">{hero.serviceLabels.map((service, index) => <a key={`${index}-${service}`} href={siteConfig.contact.servicesUrl}><small>0{index+1}</small>{service}</a>)}</nav><a className="home-hero__discover" href={siteConfig.contact.servicesUrl}>{hero.discoverLabel}<ArrowIcon diagonal /></a></div>
      </div>
    </section>
  );
}
