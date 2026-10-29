import type { CSSProperties } from "react";
import { BrandLogo } from "./brand-logo";
import { BrandStandardAnimation } from "./brand-standard-animation";
import { siteConfig, type StandardIcon } from "@/config/site.config";
import { hexToRgb, resolveThemeColor } from "@/lib/theme";

function PrincipleIcon({ type }: { type: StandardIcon }) {
  if (type === "heating") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M28 12v27a10 10 0 1 0 8 0V12a4 4 0 0 0-8 0Z" />
        <path d="M32 43V25M47 13c6 8 5 14-2 20M53 23c4 5 3 10-2 14" />
      </svg>
    );
  }

  if (type === "plumbing") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M10 18h25v10h13v20H34V37H10V18Z" />
        <path d="M45 9v16M37 17h16" />
        <path d="M22 45c-5 7-7 10-7 14a7 7 0 0 0 14 0c0-4-2-7-7-14Z" />
      </svg>
    );
  }

  if (type === "air-quality") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M9 22h29c8 0 8-11 1-11-4 0-6 2-7 5M8 32h39c9 0 10 12 1 12-5 0-7-3-7-6M10 43h21" />
      </svg>
    );
  }

  if (type === "electrical") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M36 5 16 35h15l-4 24 21-33H33l3-21Z" />
      </svg>
    );
  }

  if (type === "maintenance") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M41 10a13 13 0 0 0-16 16L10 41l13 13 15-15a13 13 0 0 0 16-16l-9 9-10-3-3-10 9-9Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="8" />
      <path d="M32 24c-2-9 1-15 8-16 5 7 3 14-4 20M40 32c9-2 15 1 16 8-7 5-14 3-20-4M32 40c2 9-1 15-8 16-5-7-3-14 4-20M24 32c-9 2-15-1-16-8 7-5 14-3 20 4" />
      <circle cx="32" cy="32" r="22" opacity=".35" />
    </svg>
  );
}

export function BrandResponseSection() {
  const standard = siteConfig.brandStandard;
  const accents = [
    resolveThemeColor("service1"),
    resolveThemeColor("service2"),
    resolveThemeColor("service3"),
  ];

  return (
    <section className="brand-standard-section" id="brand-response">
      <BrandStandardAnimation sectionId="brand-response" />

      <div className="brand-standard__wash" aria-hidden="true" />
      <div className="brand-standard__wordmark" aria-hidden="true">
        {siteConfig.brand.shortName}
      </div>

      <div className="brand-standard__inner">
        <div className="brand-standard__topline" data-standard-topline>
          <span className="brand-standard__eyebrow">{standard.eyebrow}</span>
          <div className="brand-standard__region">
            <i aria-hidden="true" />
            <span>{siteConfig.brand.region}</span>
          </div>
        </div>

        <div className="brand-standard__statement">
          <h2 className="brand-standard__title">
            <span className="brand-standard__title-mask">
              <span data-standard-headline>{standard.titleLine1}</span>
            </span>
            <span className="brand-standard__title-mask brand-standard__title-mask--accent">
              <span data-standard-headline>{standard.titleLine2}</span>
            </span>
          </h2>

          <div className="brand-standard__intro" data-standard-intro>
            <span>{standard.bodyTitle}</span>
            <p>{standard.body}</p>
          </div>
        </div>

        <div className="brand-standard__principles" data-standard-principles>
          {standard.items.slice(0, 3).map((item, index) => {
            const accent = accents[index] ?? resolveThemeColor("brandPrimary");
            return (
              <article
                className="brand-standard-card"
                data-standard-card
                key={`${item.label}-${index}`}
                style={{
                  "--standard-accent": accent,
                  "--standard-accent-rgb": hexToRgb(accent),
                } as CSSProperties}
              >
                <div className="brand-standard-card__meta">
                  <span>0{index + 1}</span>
                  <i aria-hidden="true" />
                </div>
                <div className="brand-standard-card__icon">
                  <PrincipleIcon type={item.icon} />
                </div>
                <h3>{item.label}</h3>
                <p>{item.detail}</p>
              </article>
            );
          })}
        </div>

        <div className="brand-standard__rail" data-standard-rail aria-hidden="true">
          <span />
          <i />
          <b />
        </div>

        <div className="brand-standard__footer" data-standard-footer>
          <div className="brand-standard__identity">
            <div className="brand-standard__logo-shell">
              <BrandLogo variant="light" />
            </div>
            <div>
              <span>{siteConfig.brand.shortName}</span>
              <strong>{standard.availabilityLabel}</strong>
            </div>
          </div>

          <a className="brand-standard__call" href={siteConfig.contact.phoneHref}>
            <span>{standard.callLabel}</span>
            <strong>{siteConfig.contact.phoneDisplay}</strong>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </a>
        </div>
      </div>

      <div className="brand-standard__handoff" data-standard-handoff aria-hidden="true">
        <span>{standard.handoff}</span>
        <i />
      </div>
    </section>
  );
}
