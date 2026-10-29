"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { siteConfig } from "@/config/site.config";
import { isTemplatePlaceholder } from "@/lib/theme";

type ChamberMode = "cool" | "warm" | "pure";

const FALLBACK_MODES: ReadonlyArray<{ id: ChamberMode; label: string; detail: string }> = [
  { id: "cool", label: "Cooling", detail: "A considered path from warm intake to balanced, conditioned air." },
  { id: "warm", label: "Heating", detail: "Steady circulation, carefully controlled for colder days." },
  { id: "pure", label: "Air quality", detail: "A focus on filtration and the air moving through every room." },
];

function copy(value: string, example: string) {
  return isTemplatePlaceholder(value) ? example : value;
}

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d={diagonal ? "M4.5 15.5 15.5 4.5M7.5 4.5h8v8" : "M3 10h14m-5.5-5.5L17 10l-5.5 5.5"} stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** A deliberately illustrative cross-section, not equipment specifications or live sensor data. */
function ClimateInstrument() {
  const [mode, setMode] = useState<ChamberMode>("cool");
  const configured = siteConfig.hero.system?.modes ?? FALLBACK_MODES;
  const active = configured.find((item) => item.id === mode) ?? configured[0] ?? FALLBACK_MODES[0];
  const modeLabels = siteConfig.hero.system;

  return (
    <div className="climate-instrument" data-mode={mode}>
      <div className="climate-instrument__topline" aria-hidden="true">
        <span><i className="climate-instrument__status" /> {copy(modeLabels?.eyebrow ?? "", "THE COMFORT ENGINE")}</span>
        <span>SECTION / 01—03</span>
      </div>

      <div className="climate-instrument__canvas">
        <svg viewBox="0 0 760 594" role="img" aria-label="Stylized air-handling system cross-section showing airflow moving through an intake, circular blower and supply louvers" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ch-face" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#243238" />
              <stop offset=".44" stopColor="#101c21" />
              <stop offset="1" stopColor="#27373b" />
            </linearGradient>
            <linearGradient id="ch-steel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#748489" />
              <stop offset=".16" stopColor="#323e43" />
              <stop offset=".68" stopColor="#142328" />
              <stop offset="1" stopColor="#596b6e" />
            </linearGradient>
            <linearGradient id="ch-draft" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="var(--brand-secondary)" stopOpacity="0" />
              <stop offset=".45" stopColor="var(--ch-active)" stopOpacity=".83" />
              <stop offset="1" stopColor="var(--ch-active)" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="ch-core">
              <stop offset="0" stopColor="#586f71" />
              <stop offset=".42" stopColor="#263d43" />
              <stop offset="1" stopColor="#0c171c" />
            </radialGradient>
            <filter id="ch-diffuse" x="-35%" y="-40%" width="170%" height="180%">
              <feGaussianBlur stdDeviation="12" />
            </filter>
          </defs>

          {/* Single continuous metal housing; detail references real air-handling components. */}
          <rect x="35" y="88" width="692" height="420" rx="28" fill="#071015" stroke="#5d7377" strokeOpacity=".3" strokeWidth="1.5" />
          <rect x="45" y="98" width="672" height="400" rx="21" fill="url(#ch-face)" stroke="#a4b8b7" strokeOpacity=".16" />
          <path d="M69 146H692M69 453H692" stroke="#a8b6b4" strokeOpacity=".14" />
          <path d="M82 155H675V445H82Z" fill="#09161a" stroke="#7b9294" strokeOpacity=".22" />
          <path d="M240 155V445M523 155V445" stroke="#a0b5b0" strokeOpacity=".19" strokeWidth="2" />

          {/* Intake bay: protective slats and air return plenum. */}
          <rect x="94" y="186" width="119" height="226" rx="9" fill="#111f24" stroke="#6f8787" strokeOpacity=".45" />
          {Array.from({ length: 12 }, (_, index) => (
            <g key={`intake-${index}`}>
              <rect x={106 + index * 8} y="197" width="4.3" height="203" rx="1.2" fill={index % 2 ? "#586a70" : "#77878c"} opacity={index % 2 ? ".64" : ".79"} />
              <path d={`M${110 + index * 8} 200v197`} stroke="#03090c" strokeOpacity=".68" strokeWidth="1.3" />
            </g>
          ))}
          <rect x="98" y="184" width="111" height="7" rx="2" fill="#889b99" opacity=".35" />
          <rect x="98" y="406" width="111" height="7" rx="2" fill="#172d31" />

          {/* Air exchange coil: physical zig-zag refrigerant path. */}
          <path d="M252 209H281L267 237H281L267 265H281L267 293H281L267 321H281L267 349H281L267 377H302" fill="none" stroke="#b2bab3" strokeOpacity=".35" strokeWidth="6" strokeLinejoin="round" />
          <path d="M252 209H281L267 237H281L267 265H281L267 293H281L267 321H281L267 349H281L267 377H302" fill="none" stroke="#d9ece0" strokeOpacity=".29" strokeWidth="1.4" strokeLinejoin="round" />
          {Array.from({ length: 15 }, (_, index) => (
            <path key={`coil-fin-${index}`} d={`M247 ${211 + index * 12}h45`} stroke="#8caaa5" strokeOpacity=".25" strokeWidth="1" />
          ))}

          {/* Blower housing and subtle rim illumination, not a cartoon fan. */}
          <circle cx="409" cy="297" r="133" fill="var(--ch-active)" opacity=".08" filter="url(#ch-diffuse)" />
          <circle cx="409" cy="297" r="128" fill="#060f13" stroke="#97adae" strokeOpacity=".25" strokeWidth="5" />
          <circle cx="409" cy="297" r="113" fill="url(#ch-steel)" stroke="#d3dcd4" strokeOpacity=".2" strokeWidth="1.5" />
          <circle cx="409" cy="297" r="100" fill="url(#ch-core)" stroke="#0b1519" strokeWidth="10" />
          <circle cx="409" cy="297" r="82" fill="#112329" stroke="var(--ch-active)" strokeOpacity=".3" strokeWidth="1.2" />
          <g className="climate-instrument__rotor">
            {Array.from({ length: 11 }, (_, index) => (
              <g key={`rotor-${index}`} transform={`rotate(${index * (360 / 11)} 409 297)`}>
                <path d="M408 287C423 276 438 258 433 216C447 240 448 266 433 285L422 303Z" fill="url(#ch-steel)" stroke="#b0c1bf" strokeOpacity=".28" strokeWidth=".75" />
              </g>
            ))}
            <circle cx="409" cy="297" r="29" fill="#182a30" stroke="#9aaead" strokeOpacity=".53" strokeWidth="3" />
            <circle cx="409" cy="297" r="14" fill="#050c10" stroke="#bec9c3" strokeOpacity=".45" strokeWidth="1" />
            <circle cx="409" cy="297" r="4" fill="var(--ch-active)" />
          </g>
          <circle cx="409" cy="297" r="118" stroke="#b6c7c0" strokeOpacity=".28" strokeDasharray="2 13" fill="none" />

          {/* Supply bay: duct, louvers, and real geometry. */}
          <rect x="542" y="193" width="156" height="207" rx="8" fill="#081317" stroke="#7e9995" strokeOpacity=".45" />
          {Array.from({ length: 13 }, (_, index) => (
            <g key={`supply-${index}`}>
              <path d={`M554 ${207 + index * 14.5}h131`} stroke="#9cafaf" strokeOpacity=".2" strokeWidth="8" strokeLinecap="square" />
              <path d={`M554 ${203 + index * 14.5}h131`} stroke="#b8ccca" strokeOpacity=".55" strokeWidth="2" strokeLinecap="square" />
            </g>
          ))}
          <rect x="533" y="190" width="8" height="213" rx="2" fill="url(#ch-steel)" />

          {/* Three air streams run through the real HVAC path, not random scribbles. */}
          <g className="climate-instrument__airflow">
            <path d="M110 248C195 248 229 236 271 251S320 253 328 252" />
            <path d="M110 296C195 296 229 286 275 296S323 300 338 298" />
            <path d="M110 348C192 348 231 353 278 339S321 340 337 341" />
            <path d="M490 246C542 242 592 242 669 242" />
            <path d="M493 297C542 297 598 296 669 296" />
            <path d="M490 349C543 355 601 347 669 347" />
          </g>
          <g className="climate-instrument__airflow-shine">
            <path d="M110 248C195 248 229 236 271 251S320 253 328 252" />
            <path d="M110 296C195 296 229 286 275 296S323 300 338 298" />
            <path d="M110 348C192 348 231 353 278 339S321 340 337 341" />
            <path d="M490 246C542 242 592 242 669 242" />
            <path d="M493 297C542 297 598 296 669 296" />
            <path d="M490 349C543 355 601 347 669 347" />
          </g>

          <g fill="#b7c9c3" fillOpacity=".8" fontSize="10.5" fontWeight="700" letterSpacing="2.3" fontFamily="Arial, Helvetica, sans-serif">
            <text x="91" y="131">RETURN</text>
            <text x="342" y="131">CONDITION</text>
            <text x="575" y="131">SUPPLY</text>
            <text x="91" y="477" fontSize="9" letterSpacing="1.7" fillOpacity=".49">01 / INTAKE</text>
            <text x="342" y="477" fontSize="9" letterSpacing="1.7" fillOpacity=".49">02 / AIR HANDLING</text>
            <text x="575" y="477" fontSize="9" letterSpacing="1.7" fillOpacity=".49">03 / DELIVERY</text>
          </g>
          {[[62,116],[700,116],[62,477],[700,477]].map(([x,y],i) => (
            <g key={`bolt-${i}`}>
              <circle cx={x} cy={y} r="4" fill="#667c7e" opacity=".55" />
              <path d={`M${x-2} ${y+2}l4 -4`} stroke="#122125" strokeWidth="1" />
            </g>
          ))}
          <path d="M42 527H718" stroke="#a9c3bd" strokeOpacity=".24" />
          <g fill="#b9ccc5" fillOpacity=".55" fontSize="10" letterSpacing="2.2" fontFamily="Arial, Helvetica, sans-serif">
            <text x="46" y="550">ENGINEERED AIR MOVEMENT</text>
            <text x="713" y="550" textAnchor="end">ILLUSTRATIVE SYSTEM VIEW</text>
          </g>
        </svg>
      </div>

      <div className="climate-instrument__bottom">
        <div className="climate-instrument__controls" role="group" aria-label="Explore comfort system functions">
          {configured.map((item) => (
            <button type="button" key={item.id} aria-pressed={item.id === mode} onClick={() => setMode(item.id)}>
              <span className="climate-instrument__control-light" aria-hidden="true" />
              {item.label}
            </button>
          ))}
        </div>
        <p className="climate-instrument__detail" aria-live="polite">{active.detail}</p>
      </div>
    </div>
  );
}

export function ClimateChamberHero() {
  const hero = siteConfig.hero;
  const rootRef = useRef<HTMLElement>(null);
  const speed = hero.motion.pace === "gentle" ? 1.22 : 1;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !hero.motion.enabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const q = gsap.utils.selector(root);
    let timeline: gsap.core.Timeline | null = null;
    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .fromTo(q(".climate-hero__eyebrow, .climate-hero__index"), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: .65 * speed }, .04)
        .fromTo(q(".climate-hero__headline span"), { autoAlpha: 0, yPercent: 90 }, { autoAlpha: 1, yPercent: 0, stagger: .14, duration: 1 * speed, ease: "expo.out" }, .17)
        .fromTo(q(".climate-hero__description, .climate-hero__actions, .climate-hero__smallprint"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, stagger: .12, duration: .72 * speed }, .42)
        .fromTo(q(".climate-instrument"), { autoAlpha: 0, y: 24, scale: .975 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.15 * speed, ease: "expo.out" }, .32)
        .fromTo(q(".climate-hero__rail"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: .65 * speed }, 1.1);
    };
    const introActive = siteConfig.opening.enabled && (
      document.querySelector(".opening-sequence") || document.body.classList.contains("is-intro-locked")
    );
    if (introActive) window.addEventListener("site:opening-complete", play);
    else play();
    return () => {
      window.removeEventListener("site:opening-complete", play);
      timeline?.kill();
      gsap.set(q(".climate-hero__eyebrow, .climate-hero__index, .climate-hero__headline span, .climate-hero__description, .climate-hero__actions, .climate-hero__smallprint, .climate-instrument, .climate-hero__rail"), { clearProps: "all" });
    };
  }, [hero.motion.enabled, speed]);

  return (
    <section className={`climate-hero${hero.motion.ambient ? " climate-hero--ambient" : ""}`} id="top" ref={rootRef} aria-labelledby="home-hero-heading">
      <div className="climate-hero__inner">
        <div className="climate-hero__opening">
          <span className="climate-hero__eyebrow"><i aria-hidden="true" /> {copy(hero.eyebrow, "COMFORT IS AN EXACT SCIENCE")}</span>
          <span className="climate-hero__index">THE CLIMATE CHAMBER <span>·</span> 001</span>
        </div>
        <div className="climate-hero__main">
          <div className="climate-hero__story">
            <p className="climate-hero__pretitle">{copy(hero.sillLabel, "BUILT AROUND BETTER AIR")}</p>
            <h1 className="climate-hero__headline" id="home-hero-heading"><span>{copy(hero.headlineLine1, "Comfort,")}</span><span className="climate-hero__headline-accent">{copy(hero.headlineLine2, "engineered.")}</span></h1>
            <p className="climate-hero__description">{copy(hero.description, "Thoughtful service. Precise systems. A better feeling in every room, all year long.")}</p>
            <div className="climate-hero__actions">
              <a href={siteConfig.contact.contactUrl} className="climate-hero__primary">{copy(hero.primaryCta, "Schedule service")}<ArrowIcon diagonal /></a>
              <a href={siteConfig.contact.phoneHref} className="climate-hero__secondary">{copy(hero.secondaryCta, "Speak with our team")}<ArrowIcon /></a>
            </div>
            <div className="climate-hero__smallprint"><span className="climate-hero__location-mark" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="M16 28s10-8.3 10-17a10 10 0 0 0-20 0c0 8.7 10 17 10 17Z" stroke="currentColor" strokeWidth="1.3"/><circle cx="16" cy="11" r="3.1" stroke="currentColor" strokeWidth="1.3"/></svg></span><div><small>{copy(hero.locationLabel, "PROUDLY SERVING")}</small><strong>{copy(hero.locationValue, "YOUR COMMUNITY")}</strong></div></div>
          </div>
          <div className="climate-hero__machine"><ClimateInstrument /></div>
        </div>
        <div className="climate-hero__rail">
          <div className="climate-hero__rail-label">{copy(hero.edgeLabel, "EVERY DETAIL. EVERY DEGREE.")}</div>
          <nav aria-label="Highlighted services">{hero.serviceLabels.map((item, index) => <a href={siteConfig.contact.servicesUrl} key={`${item}-${index}`}><small>0{index+1}</small>{copy(item, FALLBACK_MODES[index]?.label ?? "Service")}</a>)}</nav>
          <a className="climate-hero__discover" href="#services">{copy(hero.discoverLabel, "Explore our services")}<ArrowIcon diagonal /></a>
        </div>
      </div>
    </section>
  );
}
