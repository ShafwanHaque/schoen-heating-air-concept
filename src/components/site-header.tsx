"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { BrandLogo } from "./brand-logo";
import { siteConfig } from "@/config/site.config";

const navigation = [
  { label: siteConfig.header.navServices, href: "#services" },
  { label: siteConfig.header.navAreas, href: "#service-areas" },
  { label: siteConfig.header.navContact, href: "#contact" },
] as const;

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;

    (menu as HTMLDivElement & { inert: boolean }).inert = !menuOpen;
    menu.setAttribute("aria-hidden", String(!menuOpen));

    if (!menuOpen) {
      if (wasOpenRef.current) menuButtonRef.current?.focus();
      wasOpenRef.current = false;
      return;
    }

    wasOpenRef.current = true;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const menuFocusables = Array.from(
      menu.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    ).filter((element) => !element.hasAttribute("disabled"));
    const focusable = [menuButtonRef.current, ...menuFocusables].filter(
      (element): element is HTMLElement => Boolean(element),
    );

    (menuFocusables[0] ?? menuButtonRef.current)?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const desktopViewport = window.matchMedia("(min-width: 1021px)");
    const closeOnDesktop = () => {
      if (desktopViewport.matches) setMenuOpen(false);
    };
    desktopViewport.addEventListener("change", closeOnDesktop);
    return () => desktopViewport.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <header
      className={`site-header${menuOpen ? " site-header--menu-open" : ""}`}
      role={menuOpen ? "dialog" : undefined}
      aria-modal={menuOpen ? "true" : undefined}
      aria-label={menuOpen ? "Mobile navigation" : undefined}
    >
      <div className="site-header__inner">
        <div className="site-header__identity">
          <a className="site-header__brand" href="#top" aria-label={`${siteConfig.brand.name} home`}>
            <BrandLogo priority variant={menuOpen || siteConfig.hero.layout === "climate-chamber" ? "light" : "default"} />
          </a>
        </div>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.label} href={item.href}>
              <span aria-hidden="true">•</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <a className="header-help" href={siteConfig.contact.phoneHref}>
            {siteConfig.header.helpLabel}
          </a>

          <a className="header-cta" href={siteConfig.contact.contactUrl}>
            <span className="header-cta__icon" aria-hidden="true">
              <ArrowIcon />
            </span>
            {siteConfig.header.ctaLabel}
          </a>

          <button
            ref={menuButtonRef}
            className="menu-button menu-button--mobile"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        ref={mobileMenuRef}
        id="mobile-navigation"
        className={`mobile-menu${menuOpen ? " mobile-menu--open" : ""}`}
        onMouseDown={(event: MouseEvent<HTMLDivElement>) => {
          if (event.target === event.currentTarget) setMenuOpen(false);
        }}
      >
        <div className="mobile-menu__inner">
          <p className="mobile-menu__eyebrow">{siteConfig.header.mobileEyebrow}</p>

          <nav aria-label="Menu navigation">
            {navigation.map((item, index) => (
              <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.label}</strong>
                <ArrowIcon />
              </a>
            ))}
          </nav>

          <div className="mobile-menu__actions">
            <a href={siteConfig.contact.phoneHref} onClick={() => setMenuOpen(false)}>
              {siteConfig.header.mobileCallLabel} {siteConfig.contact.phoneDisplay}
            </a>
            <a href={siteConfig.contact.contactUrl} onClick={() => setMenuOpen(false)}>
              {siteConfig.header.ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
