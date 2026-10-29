"use client";

import { FormEvent, useMemo, useState } from "react";
import { siteConfig } from "@/config/site.config";
import { BrandLogo } from "./brand-logo";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m4 11 8-7 8 7v9H4Z" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}

function RouteIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M8 12h8M12 8v8" />
    </svg>
  );
}

type SubmitState = "idle" | "sending" | "success" | "error";

export function ContactSection() {
  const config = siteConfig.contactSection;
  const serviceOptions = useMemo(
    () => [...siteConfig.services.items.map((service) => service.name), "Other"],
    [],
  );
  const [status, setStatus] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");
  const [service, setService] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    if (!service) {
      setStatus("error");
      setFeedback("Choose the service you need before sending your request.");
      return;
    }

    const form = event.currentTarget;
    const payload = {
      ...Object.fromEntries(new FormData(form).entries()),
      service,
    };

    if (config.submissionMode === "demo" || !config.formEndpoint.trim()) {
      setStatus("success");
      setFeedback(config.successMessage);
      form.reset();
      setService("");
      return;
    }

    setStatus("sending");
    setFeedback("Sending your request…");

    try {
      const response = await fetch(config.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as { ok?: boolean; message?: string } | null;
      if (!response.ok || result?.ok === false) {
        throw new Error(result?.message || "We could not send the request.");
      }

      setStatus("success");
      setFeedback(result?.message || config.successMessage);
      form.reset();
      setService("");
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : `We could not send the request. Please call ${siteConfig.contact.phoneDisplay}.`,
      );
    }
  };

  return (
    <section className="contact-section" id="contact" aria-label={`Contact ${siteConfig.brand.name}`}>
      <div className="contact-v2-bg-line" aria-hidden="true" />
      <div className="contact-v2-shell">
        <header className="contact-v2-header">
          <a href="#top" aria-label={`${siteConfig.brand.name} home`}>
            <BrandLogo variant="light" />
          </a>
          <div className="contact-v2-availability">
            <i aria-hidden="true" />
            <span>{siteConfig.brandStandard.availabilityLabel}</span>
          </div>
        </header>

        <div className="contact-v2-card">
          <aside className="contact-v2-brand-panel">
            <div className="contact-v2-brand-copy">
              <span className="contact-v2-eyebrow">{config.eyebrow}</span>
              <h2>{config.titleLine1}<em>{config.titleLine2}</em></h2>
              <p>{config.body}</p>
            </div>

            <div className="contact-v2-route" aria-label="Service request route">
              <span className="contact-v2-route__track" aria-hidden="true" />
              <span className="contact-v2-route__pulse" aria-hidden="true" />

              <div className="contact-v2-route__stop">
                <span className="contact-v2-route__node"><HomeIcon /></span>
                <div><small>01</small><strong>Your home</strong><em>Tell us where.</em></div>
              </div>

              <div className="contact-v2-route__stop">
                <span className="contact-v2-route__node is-match"><RouteIcon /></span>
                <div><small>02</small><strong>Right service</strong><em>We route the request.</em></div>
              </div>

              <div className="contact-v2-route__stop">
                <span className="contact-v2-route__node is-brand"><BrandLogo variant="light" /></span>
                <div><small>03</small><strong>{siteConfig.brand.shortName} ready</strong><em>The team follows up.</em></div>
              </div>
            </div>

            <a className="contact-v2-call" href={siteConfig.contact.phoneHref}>
              <span>
                <small>{config.secondaryCta}</small>
                <strong>{siteConfig.contact.phoneDisplay}</strong>
              </span>
              <b>CALL ↗</b>
            </a>
          </aside>

          <form className="contact-v2-form-panel" onSubmit={handleSubmit}>
            <div className="contact-v2-form-intro">
              <span>SERVICE REQUEST</span>
              <h3>Tell us where to help.</h3>
              <p>Just the details needed to reach the right home and understand what changed.</p>
            </div>

            <div className="contact-v2-form-grid">
              <div className="contact-v2-group-label">Your details</div>

              <label className="contact-v2-field is-half">
                <span>Name *</span>
                <input name="name" type="text" autoComplete="name" maxLength={100} required placeholder="Your name" />
              </label>

              <label className="contact-v2-field is-half">
                <span>Phone *</span>
                <input name="phone" type="tel" autoComplete="tel" maxLength={40} required placeholder="Best phone number" />
              </label>

              <label className="contact-v2-field is-full">
                <span>Email *</span>
                <input name="email" type="email" autoComplete="email" maxLength={160} required placeholder="you@example.com" />
              </label>

              <div className="contact-v2-group-label is-spaced">Where we&apos;re headed</div>

              <label className="contact-v2-field is-address">
                <span>Street address *</span>
                <input name="streetAddress" type="text" autoComplete="street-address" maxLength={180} required placeholder="123 Example Street" />
              </label>

              <label className="contact-v2-field is-unit">
                <span>Apt / Unit</span>
                <input name="unit" type="text" autoComplete="address-line2" maxLength={60} placeholder="Unit 4B" />
              </label>

              <label className="contact-v2-field is-city">
                <span>City *</span>
                <input name="city" type="text" autoComplete="address-level2" maxLength={100} required placeholder="City" />
              </label>

              <label className="contact-v2-field is-state">
                <span>State *</span>
                <input name="state" type="text" autoComplete="address-level1" maxLength={40} required placeholder="State" />
              </label>

              <label className="contact-v2-field is-zip">
                <span>ZIP *</span>
                <input name="zip" type="text" inputMode="numeric" autoComplete="postal-code" maxLength={12} required placeholder="ZIP" />
              </label>

              <div className="contact-v2-group-label is-spaced">What you need</div>

              <label className="contact-v2-field is-service">
                <span>Service *</span>
                <span className="contact-v2-select-wrap">
                  <select name="service" value={service} onChange={(event) => setService(event.target.value)} required>
                    <option value="" disabled>Choose service</option>
                    {serviceOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                  <i aria-hidden="true" />
                </span>
              </label>

              <fieldset className="contact-v2-timing">
                <legend>When?</legend>
                <div>
                  {["Today", "Soon", "Planning"].map((label, index) => (
                    <label key={label}>
                      <input type="radio" name="timing" value={label.toLowerCase()} defaultChecked={index === 0} />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="contact-v2-field is-message">
                <span>What&apos;s happening? *</span>
                <textarea name="message" rows={4} minLength={10} maxLength={1800} required placeholder="A short note is enough — no cooling, unusual noise, maintenance, system age…" />
              </label>
            </div>

            <div className="contact-v2-form-footer">
              <button type="submit" disabled={status === "sending"}>
                <span>{status === "sending" ? "Sending…" : config.primaryCta}</span>
                <ArrowIcon />
              </button>
              <p className={`contact-v2-feedback${status === "error" ? " is-error" : status === "success" ? " is-success" : ""}`} aria-live="polite">
                {feedback || "No account needed. Just enough information to start the conversation."}
              </p>
            </div>
          </form>
        </div>
      </div>

      <footer className="template-footer contact-v2-footer">
        <a href="#top" aria-label={`${siteConfig.brand.name} home`}><BrandLogo variant="light" /></a>
        <p>{siteConfig.brand.region}</p>
        <nav aria-label="Footer navigation">
          <a href="#services">Services</a>
          <a href="#service-areas">Service areas</a>
          <a href="#contact">Contact</a>
        </nav>
        <span>© {new Date().getFullYear()} {siteConfig.brand.name}</span>
      </footer>
    </section>
  );
}
