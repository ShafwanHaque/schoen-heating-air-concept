"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { siteConfig } from "@/config/site.config";
import { isTemplatePlaceholder } from "@/lib/theme";

const TEMPLATE_PHOTO = "/hero/hvac-service-craft.webp";

function content(value: string, fallback: string) {
  return !value || isTemplatePlaceholder(value) ? fallback : value;
}

function href(value: string, fallback: string) {
  return !value || isTemplatePlaceholder(value) || value.includes("[[") ? fallback : value;
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {diagonal ? <path d="M5 19 19 5M9 5h10v10" /> : <path d="M4 12h16m-7-7 7 7-7 7" />}
    </svg>
  );
}

/**
 * Signature HVAC hero: one cinematic, unmistakable field-service photograph and
 * large editorial type, not an abstract mechanism or a generic image card.
 * The source file is representative imagery, not a photograph of any specific
 * company's employees. Replace with a company-approved photograph when needed.
 */
export function ServiceCraftHero() {
  const rootRef = useRef<HTMLElement>(null);
  const hero = siteConfig.hero;
  const companyImage = hero.media.primarySrc;
  const photo = !companyImage || isTemplatePlaceholder(companyImage) || companyImage.includes("placeholder")
    ? TEMPLATE_PHOTO
    : companyImage;
  const serviceLabels = hero.serviceLabels.map((item, index) =>
    content(item, ["Air conditioning", "Heating systems", "Maintenance"][index]),
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !hero.motion.enabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {}, root);
    const play = () => {
      ctx.add(() => {
        gsap.timeline({ defaults: { ease: "power3.out" } })
          .fromTo(".service-craft__eyebrow,.service-craft__eyebrow-right", { y: 13, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .7, stagger: .09 })
          .fromTo(".service-craft__headline span", { yPercent: 75, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: .85, ease: "expo.out", stagger: .13 }, .08)
          .fromTo(".service-craft__copy,.service-craft__actions,.service-craft__area", { y: 23, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .75, stagger: .12 }, .42)
          .fromTo(".service-craft__photo img", { scale: 1.065 }, { scale: 1, duration: 1.95, ease: "power2.out" }, 0)
          .fromTo(".service-craft__lower", { y: 15, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .7 }, .8);
      });
    };
    const introActive = siteConfig.opening.enabled &&
      (document.querySelector(".opening-sequence") || document.body.classList.contains("is-intro-locked"));
    if (introActive) window.addEventListener("site:opening-complete", play, { once: true });
    else play();
    return () => {
      window.removeEventListener("site:opening-complete", play);
      ctx.revert();
    };
  }, [hero.motion.enabled]);

  return (
    <section className="service-craft" id="top" aria-labelledby="service-craft-title" ref={rootRef}>
      <div className="service-craft__inner">
        <div className="service-craft__kicker">
          <span><i /> {content(hero.eyebrow, "HEATING & AIR CONDITIONING EXPERTS")}</span>
          <span>{content(hero.locationValue, "LOCAL SERVICE. REAL PEOPLE.")}</span>
        </div>

        <div className="service-craft__stage">
          <div className="service-craft__photo">
            <Image
              src={photo}
              alt={photo === TEMPLATE_PHOTO ? "Representative HVAC technician inspecting and servicing an outdoor air-conditioning condenser beside a home" : content(hero.media.primaryAlt, "HVAC technician and equipment")}
              fill
              preload
              sizes="(max-width: 700px) 100vw, (max-width: 1440px) 95vw, 1540px"
              style={{ objectPosition: photo === TEMPLATE_PHOTO ? "60% 50%" : hero.media.primaryPosition }}
            />
          </div>
          <div className="service-craft__shade" aria-hidden="true" />

          <div className="service-craft__story">
            <div className="service-craft__eyebrow"><span className="service-craft__number">01</span> <span>THE WORK BEHIND COMFORT</span></div>
            <h1 className="service-craft__headline" id="service-craft-title">
              <span>{content(hero.headlineLine1, "The work")}</span>
              <span className="service-craft__headline-last">{content(hero.headlineLine2, "behind comfort.")}</span>
            </h1>
            <p className="service-craft__copy">{content(hero.description, "Heating, cooling, and the hands-on expertise that keeps your home feeling just right. Real solutions, delivered with care.")}</p>
            <div className="service-craft__actions">
              <a className="service-craft__primary" href={href(siteConfig.contact.contactUrl, "#contact")}>{content(hero.primaryCta, "Schedule service")} <Arrow diagonal /></a>
              <a className="service-craft__secondary" href={href(siteConfig.contact.phoneHref, "#contact")}>{content(hero.secondaryCta, "Talk to our team")} <Arrow /></a>
            </div>
          </div>

          <div className="service-craft__eyebrow-right" aria-hidden="true"><span>THE PEOPLE.</span> <span>THE TOOLS.</span> <span>THE FOLLOW-THROUGH.</span></div>

          <div className="service-craft__lower">
            <span className="service-craft__photo-label">HVAC / SERVICE • INSTALLATION • CARE</span>
            <span className="service-craft__area"><span className="service-craft__area-mark" /> {content(hero.locationValue, "COMFORT IN YOUR NEIGHBORHOOD")}</span>
          </div>
        </div>

        <div className="service-craft__services">
          <div className="service-craft__services-intro">
            <span>WHEN IT MATTERS, WE SHOW UP.</span>
            <strong>{content(hero.sillLabel, "Every season. Every system.")}</strong>
          </div>
          <nav aria-label="Featured heating and cooling services">
            {serviceLabels.map((label, index) => (
              <a key={`${index}-${label}`} href={href(siteConfig.contact.servicesUrl, "#services")}>
                <span className="service-craft__service-number">0{index + 1}</span>
                <span>{label}</span>
                <Arrow diagonal />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
