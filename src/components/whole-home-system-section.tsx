import type { CSSProperties } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";
import { WholeHomeSystemAnimation } from "./whole-home-system-animation";
import {
  CENTRAL_HOME,
  VIEWBOX_HEIGHT,
  VIEWBOX_WIDTH,
  services,
  type WholeHomeService,
} from "./whole-home-system-data";

const serviceProgressNavigation = services.map((service, index) => ({
  label: service.shortTitle,
  serviceIndex: index,
}));

function routePath(routePoints: Array<[number, number]>) {
  return routePoints
    .map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`)
    .join(" ");
}


function points(values: Array<[number, number]>) {
  return values.map(([x, y]) => `${x},${y}`).join(" ");
}

function Platform({
  width = 142,
  depth = 82,
  height = 28,
}: {
  width?: number;
  depth?: number;
  height?: number;
}) {
  const halfWidth = width / 2;
  const halfDepth = depth / 2;

  return (
    <g className="whole-system-platform">
      <polygon
        className="whole-system-platform__left"
        points={points([
          [-halfWidth, halfDepth],
          [0, depth],
          [0, depth + height],
          [-halfWidth, halfDepth + height],
        ])}
      />
      <polygon
        className="whole-system-platform__right"
        points={points([
          [halfWidth, halfDepth],
          [0, depth],
          [0, depth + height],
          [halfWidth, halfDepth + height],
        ])}
      />
      <polygon
        className="whole-system-platform__top"
        points={points([
          [0, 0],
          [halfWidth, halfDepth],
          [0, depth],
          [-halfWidth, halfDepth],
        ])}
      />
    </g>
  );
}

function CentralHome() {
  return (
    <g
      className="whole-system-home-anchor"
      transform={`translate(${CENTRAL_HOME.x} ${CENTRAL_HOME.y})`}
    >
      <g className="whole-system-home whole-system-office" data-system-home>
        <ellipse className="whole-system-home__shadow" cx="0" cy="154" rx="160" ry="58" />
        <Platform width={298} depth={172} height={48} />

        <g className="whole-system-office__building" transform="translate(0 -58)">
          <polygon className="whole-system-office__podium-left" points="-124,104 0,176 0,238 -124,167" />
          <polygon className="whole-system-office__podium-right" points="124,104 0,176 0,238 124,167" />
          <polygon className="whole-system-office__podium-top" points="0,90 -124,162 0,234 124,162" />

          <polygon className="whole-system-office__terrace-left" points="-112,96 0,161 0,182 -112,117" />
          <polygon className="whole-system-office__terrace-right" points="112,96 0,161 0,182 112,117" />

          <polygon className="whole-system-office__tower-left" points="-98,54 0,111 0,216 -98,159" />
          <polygon className="whole-system-office__tower-right" points="98,54 0,111 0,216 98,159" />
          <polygon className="whole-system-office__tower-glass-left" points="-84,68 -9,111 -9,206 -84,163" />
          <polygon className="whole-system-office__tower-glass-right" points="84,68 9,111 9,206 84,163" />
          <polygon className="whole-system-office__side-fin-left" points="-110,90 -98,96 -98,170 -110,163" />
          <polygon className="whole-system-office__side-fin-right" points="110,90 98,96 98,170 110,163" />

          <polygon className="whole-system-office__roof-left" points="0,-30 -108,32 0,94" />
          <polygon className="whole-system-office__roof-right" points="0,-30 108,32 0,94" />
          <polygon className="whole-system-office__roof-under-left" points="0,94 -108,32 -98,54 0,111" />
          <polygon className="whole-system-office__roof-under-right" points="0,94 108,32 98,54 0,111" />
          <polygon className="whole-system-office__roof-cap" points="0,-44 -18,-32 0,-20 18,-32" />

          <g className="whole-system-office__roof-units" aria-hidden="true">
            <polygon points="-54,34 -29,48 -54,62 -79,48" />
            <polygon points="54,34 29,48 54,62 79,48" />
            <rect x="-66" y="42" width="21" height="12" rx="2" transform="rotate(-30 -55.5 48)" />
            <rect x="45" y="42" width="21" height="12" rx="2" transform="rotate(30 55.5 48)" />
          </g>

          <g className="whole-system-office__window-bands" aria-hidden="true">
            <polygon points="-79,92 -14,129 -14,143 -79,106" />
            <polygon points="-79,117 -14,154 -14,168 -79,131" />
            <polygon points="-79,142 -14,179 -14,193 -79,156" />
            <polygon points="79,92 14,129 14,143 79,106" />
            <polygon points="79,117 14,154 14,168 79,131" />
            <polygon points="79,142 14,179 14,193 79,156" />
          </g>

          <g className="whole-system-office__mullions" aria-hidden="true">
            <path d="M-64 85 -64 157M-44 96 -44 168M-24 108 -24 180" />
            <path d="M64 85 64 157M44 96 44 168M24 108 24 180" />
          </g>

          <g className="whole-system-office__entrance" aria-hidden="true">
            <polygon className="whole-system-office__entrance-left" points="-28,162 0,178 0,236 -28,220" />
            <polygon className="whole-system-office__entrance-right" points="28,162 0,178 0,236 28,220" />
            <polygon className="whole-system-office__entrance-canopy" points="0,150 -40,173 0,196 40,173" />
            <polygon className="whole-system-office__entrance-top" points="0,141 -31,159 0,176 31,159" />
            <path className="whole-system-office__entrance-glass" d="M-14 176V223M0 184V232M14 176V223" />
          </g>

          <g className="whole-system-office__roof-sign" aria-hidden="true">
            <polygon className="whole-system-office__roof-sign-base" points="-48,-7 0,21 48,-7 0,-35" />
            <svg
              x="-37"
              y="-20"
              width="74"
              height="28"
              viewBox="0 0 215.6 82"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <image href={siteConfig.brand.logoLight} width="215.6" height="82" />
            </svg>
          </g>
        </g>

        <g className="whole-system-office__forecourt" transform="translate(0 170)">
          <polygon className="whole-system-office__driveway" points="-62,4 0,40 62,4 0,-32" />
          <g className="whole-system-office__van" transform="translate(0 -2)">
            <ellipse className="whole-system-office__van-shadow" cx="0" cy="24" rx="38" ry="11" />
            <polygon className="whole-system-office__van-left" points="-42,4 -2,27 -2,7 -20,-4" />
            <polygon className="whole-system-office__van-right" points="42,4 2,27 2,7 20,-4" />
            <polygon className="whole-system-office__van-top" points="-20,-4 0,7 20,-4 0,-15" />
            <polygon className="whole-system-office__van-cab-left" points="-10,-8 0,-3 0,7 -10,1" />
            <polygon className="whole-system-office__van-cab-right" points="10,-8 0,-3 0,7 10,1" />
            <polygon className="whole-system-office__van-window-left" points="-7,-6 0,-2 0,4 -7,0" />
            <polygon className="whole-system-office__van-window-right" points="7,-6 0,-2 0,4 7,0" />
            <polygon className="whole-system-office__van-stripe-left" points="-34,8 -14,19 -14,15 -34,4" />
            <polygon className="whole-system-office__van-stripe-right" points="34,8 14,19 14,15 34,4" />
            <ellipse className="whole-system-office__van-wheel" cx="-18" cy="23" rx="6.5" ry="4.5" />
            <ellipse className="whole-system-office__van-wheel" cx="18" cy="23" rx="6.5" ry="4.5" />
            <ellipse className="whole-system-office__van-rim" cx="-18" cy="23" rx="2.6" ry="1.7" />
            <ellipse className="whole-system-office__van-rim" cx="18" cy="23" rx="2.6" ry="1.7" />
          </g>
        </g>

        <g className="whole-system-office__ports" aria-hidden="true">
          <circle cx="-82" cy="149" r="7" />
          <circle cx="82" cy="149" r="7" />
          <circle cx="-88" cy="179" r="7" />
          <circle cx="88" cy="179" r="7" />
          <circle cx="0" cy="190" r="7" />
        </g>

        <g className="whole-system-home__pulse" aria-hidden="true">
          <ellipse cx="0" cy="137" rx="146" ry="80" />
          <ellipse cx="0" cy="137" rx="174" ry="96" />
        </g>
      </g>
    </g>
  );
}

function ServiceTileArtwork({ service, index }: { service: WholeHomeService; index: number }) {
  const clipId = `service-image-clip-${index}`;

  return (
    <g className="whole-system-hub-art">
      <defs>
        <clipPath id={clipId}>
          <rect x="-54" y="0" width="108" height="84" rx="15" />
        </clipPath>
      </defs>

      <ellipse
        className="whole-system-service-hub__ambient"
        cx="0"
        cy="78"
        rx="126"
        ry="58"
        data-service-highlight
      />

      <Platform width={190} depth={108} height={36} />

      <g className="whole-system-service-hub__accent" data-service-highlight aria-hidden="true">
        <polygon points="0,0 95,54 0,108 -95,54" />
        <path d="M-86 54 0 102 86 54" />
      </g>

      <g className="whole-system-service-hub__monument" transform="translate(0 -10)">
        <rect className="whole-system-service-hub__monument-shell" x="-62" y="-8" width="124" height="100" rx="20" />
        <rect className="whole-system-service-hub__monument-screen" x="-54" y="0" width="108" height="84" rx="15" />
        <g data-service-icon>
          <image
            className="whole-system-service-hub__image"
            href={service.image}
            x="-54"
            y="0"
            width="108"
            height="84"
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${clipId})`}
          />
          <rect className="whole-system-service-hub__image-tint" x="-54" y="0" width="108" height="84" rx="15" />
        </g>
        <path className="whole-system-service-hub__monument-base" d="M-42 92h84l15 9H-57Z" />
      </g>
    </g>
  );
}

function serviceAccentStyle(service: WholeHomeService) {
  return {
    "--service-accent": service.accent,
    "--service-accent-rgb": service.accentRgb,
  } as CSSProperties;
}

function ServiceHub({ service, index }: { service: WholeHomeService; index: number }) {
  return (
    <g
      className="whole-system-service-hub-anchor"
      transform={`translate(${service.x} ${service.y})`}
    >
      <g
        className={`whole-system-service-hub whole-system-service-hub--slot-${index + 1}`}
        data-system-tile
        data-service-index={index}
        style={serviceAccentStyle(service)}
      >
        <ellipse className="whole-system-service-hub__shadow" cx="0" cy="119" rx="108" ry="40" />
        <ServiceTileArtwork service={service} index={index} />
        <g className="whole-system-service-hub__dock" transform="translate(0 136)" aria-hidden="true">
          <line x1="0" y1="-20" x2="0" y2="0" />
          <circle r="12" />
        </g>
        <g
          className="whole-system-service-hub__label"
          data-service-label
          transform="translate(0 174)"
        >
          <rect x="-108" y="-20" width="216" height="40" rx="20" />
          <text textAnchor="middle" dominantBaseline="middle">{service.shortTitle}</text>
        </g>
      </g>
    </g>
  );
}

function ServiceImage({ service }: { service: WholeHomeService }) {
  return (
    <Image
      src={service.image}
      alt=""
      width={64}
      height={64}
      unoptimized
    />
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

export function WholeHomeSystemSection() {


  return (
    <section className="whole-system-section" id="services">
      <WholeHomeSystemAnimation />
      <div className="whole-system-stage">
        <div className="whole-system-stage__shade" aria-hidden="true" />
        <div className="whole-system-stage__grain" aria-hidden="true" />

        <div className="whole-system-kicker">
          <span aria-hidden="true" />
          {siteConfig.services.eyebrow}
        </div>

        <div className="whole-system-intro" data-system-intro>
          <p>Inside every comfortable home</p>
          <h2>
            {siteConfig.services.introLine1}
            <span>{siteConfig.services.introLine2}</span>
          </h2>
          <div className="whole-system-intro__line" data-system-intro-line aria-hidden="true" />
        </div>

        <div className="whole-system-scene" aria-label="A connected whole-home service network">
          <div className="whole-system-scene__camera" data-system-camera>
            <svg
              className="whole-system-scene__svg"
              viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
              preserveAspectRatio="xMidYMid slice"
              role="img"
              aria-label={`An isometric service network connecting five ${siteConfig.brand.shortName} home services`}
            >
              <defs>
                <linearGradient id="system-platform-top" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="var(--surface-elevated)" />
                  <stop offset="0.55" stopColor="var(--surface-dark-alt)" />
                  <stop offset="1" stopColor="var(--surface-dark)" />
                </linearGradient>
                <linearGradient id="system-home-roof" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="var(--brand-primary)" />
                  <stop offset="0.55" stopColor="var(--brand-primary)" />
                  <stop offset="1" stopColor="var(--brand-primary)" />
                </linearGradient>
                <linearGradient id="system-home-side" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="var(--brand-secondary)" />
                  <stop offset="1" stopColor="var(--brand-secondary)" />
                </linearGradient>
                <linearGradient id="system-home-left" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="color-mix(in srgb, var(--surface-elevated) 82%, var(--brand-secondary))" />
                  <stop offset="0.6" stopColor="color-mix(in srgb, var(--surface-dark-alt) 86%, var(--brand-secondary))" />
                  <stop offset="1" stopColor="var(--surface-dark-alt)" />
                </linearGradient>
                <linearGradient id="system-home-base" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="var(--surface-dark)" />
                  <stop offset="1" stopColor="var(--page-bg)" />
                </linearGradient>
                <linearGradient id="system-home-sign" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="var(--text-primary)" />
                  <stop offset="0.45" stopColor="var(--surface-soft)" />
                  <stop offset="1" stopColor="color-mix(in srgb, var(--surface-soft) 72%, var(--network-line))" />
                </linearGradient>
                <linearGradient id="system-office-glass-left" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="color-mix(in srgb, var(--surface-elevated) 78%, var(--brand-secondary))" />
                  <stop offset="0.42" stopColor="color-mix(in srgb, var(--surface-elevated) 58%, var(--brand-secondary))" />
                  <stop offset="1" stopColor="color-mix(in srgb, var(--surface-dark-alt) 78%, var(--brand-secondary))" />
                </linearGradient>
                <linearGradient id="system-office-glass-right" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="var(--brand-secondary)" />
                  <stop offset="0.45" stopColor="var(--brand-secondary)" />
                  <stop offset="1" stopColor="var(--brand-secondary)" />
                </linearGradient>
                <linearGradient id="system-office-podium-top" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="var(--surface-elevated)" />
                  <stop offset="0.6" stopColor="var(--surface-dark-alt)" />
                  <stop offset="1" stopColor="var(--surface-dark)" />
                </linearGradient>
                <linearGradient id="system-route-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="var(--brand-secondary)" />
                  <stop offset="0.5" stopColor="var(--brand-primary)" />
                  <stop offset="1" stopColor="var(--brand-accent)" />
                </linearGradient>
              </defs>

              <g className="whole-system-network">
                <g className="whole-system-route-beds" aria-hidden="true">
                  {services.map((service) => (
                    <path key={service.key} d={routePath(service.routePoints)} pathLength="1" />
                  ))}
                </g>

                <g className="whole-system-routes" aria-hidden="true">
                  {services.map((service, index) => (
                    <g key={service.key}>
                      <path
                        className="whole-system-route whole-system-route--halo"
                        d={routePath(service.routePoints)}
                        data-system-route
                        data-service-index={index}
                      />
                      <path className="whole-system-route whole-system-route--core" d={routePath(service.routePoints)} />
                    </g>
                  ))}
                </g>

                <g className="whole-system-route-heads" aria-hidden="true">
                  {services.map((service, index) => {
                    const [startX, startY] = service.routePoints[0];
                    return (
                      <g
                        key={service.key}
                        className="whole-system-route-head"
                        data-route-head
                        data-service-index={index}
                        transform={`translate(${startX} ${startY})`}
                      >
                        <circle className="whole-system-route-head__halo" r="19" />
                        <circle className="whole-system-route-head__ring" r="10" />
                        <circle className="whole-system-route-head__core" r="4.5" />
                      </g>
                    );
                  })}
                </g>

                <g className="whole-system-route-starts" aria-hidden="true">
                  {services.map((service) => {
                    const [startX, startY] = service.routePoints[0];
                    return (
                      <g key={service.key} transform={`translate(${startX} ${startY})`}>
                        <circle className="whole-system-route-start__outer" r="11" />
                        <circle className="whole-system-route-start__inner" r="4" />
                      </g>
                    );
                  })}
                </g>

                <CentralHome />

                {services.map((service, index) => (
                  <ServiceHub key={service.key} service={service} index={index} />
                ))}

                <g className="whole-system-route-nodes" aria-hidden="true">
                  {services.map((service, index) => (
                    <g
                      key={service.key}
                      className="whole-system-route-node-anchor"
                      transform={`translate(${service.dockX} ${service.dockY})`}
                    >
                      <g
                        className={`whole-system-route-node whole-system-route-node--slot-${index + 1}`}
                        style={serviceAccentStyle(service)}
                        data-route-node
                        data-service-index={index}
                      >
                        <circle className="whole-system-route-node__glow" r="31" />
                        <circle className="whole-system-route-node__outer" r="18" />
                        <circle className="whole-system-route-node__inner" r="5" />
                      </g>
                    </g>
                  ))}
                </g>
              </g>
            </svg>
          </div>
        </div>

        <div className="whole-system-cards" aria-live="polite">
          {services.map((service, index) => (
            <article
              key={service.key}
              className={`whole-system-card ${service.cardClass}`}
              style={serviceAccentStyle(service)}
              data-system-card
              data-service-index={index}
            >
              <div className="whole-system-card__topline">
                <span>{service.number}</span>
                <div className="whole-system-card__icon">
                  <ServiceImage service={service} />
                </div>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="whole-system-card__signal" aria-hidden="true">
                <span />
                Connected to the whole home
              </div>
            </article>
          ))}
        </div>

        <aside className="whole-system-progress" aria-label="Whole-home services">
          <span className="whole-system-progress__label">Services</span>
          {serviceProgressNavigation.map((service, index) => (
            <div
              key={service.label}
              data-system-progress
              data-service-index={service.serviceIndex}
            >
              <span>{service.label}</span>
              <i aria-hidden="true"><b /></i>
              <em>{String(index + 1).padStart(2, "0")}</em>
            </div>
          ))}
        </aside>

        <div className="whole-system-summary" data-system-summary>
          <span>{siteConfig.services.summaryEyebrow}</span>
          <h3>{siteConfig.services.summaryTitle}</h3>
          <p>{siteConfig.services.summaryBody}</p>
          <a href={siteConfig.contact.servicesUrl}>
            {siteConfig.services.summaryCta}
            <ArrowIcon />
          </a>
        </div>

        <div className="whole-system-scroll-cue" aria-hidden="true">
          <span />
          Follow the connections
        </div>
      </div>

      <div className="whole-system-static-list" aria-label={`${siteConfig.brand.shortName} whole-home services`}>
        {services.map((service) => (
          <article
            key={service.key}
            className={`whole-system-static-item whole-system-static-item--slot-${Number(service.number)}`}
            style={serviceAccentStyle(service)}
          >
            <div><ServiceImage service={service} /></div>
            <span>{service.number}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
