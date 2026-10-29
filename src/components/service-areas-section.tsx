"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { siteConfig, type CoverageLocation } from "@/config/site.config";
import { resolveThemeColor } from "@/lib/theme";
import { ServiceAreasAnimation } from "./service-areas-animation";

const FALLBACK_POSITIONS = [
  [50, 48], [29, 29], [70, 28], [19, 55], [82, 54],
  [34, 73], [67, 74], [49, 17], [17, 31], [84, 30],
  [18, 78], [84, 77],
] as const;

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 10c0 5.4-8 11-8 11S4 15.4 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

function isValidCoordinate(area: CoverageLocation) {
  return Number.isFinite(area.lat) && Number.isFinite(area.lng)
    && Math.abs(area.lat ?? 999) <= 90
    && Math.abs(area.lng ?? 999) <= 180;
}

function shortName(name: string) {
  return name.split(",")[0]?.trim() || name;
}

export function ServiceAreasSection() {
  const config = siteConfig.coverage;
  const areas = useMemo(
    () => config.locations.filter((location) => location.name.trim().length > 0),
    [config.locations],
  );
  const hubIndex = Math.max(0, areas.findIndex((area) => area.hub));
  const initialIndex = Math.max(0, areas.findIndex((area) => area.name === config.featuredLocation));
  const [activeIndex, setActiveIndex] = useState(initialIndex >= 0 ? initialIndex : hubIndex);
  const [mapReady, setMapReady] = useState(false);
  const [tileError, setTileError] = useState(false);
  const mapRootRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);
  const markersRef = useRef<Array<import("leaflet").Marker>>([]);
  const activeRouteRef = useRef<import("leaflet").Polyline | null>(null);
  const networkRouteRef = useRef<import("leaflet").Polyline | null>(null);

  const geoAreas = useMemo(() => areas.filter(isValidCoordinate), [areas]);
  const hasRealMap = geoAreas.length >= 2 && geoAreas.length === areas.length;
  const active = areas[activeIndex] ?? areas[hubIndex] ?? areas[0];
  const hub = areas[hubIndex] ?? areas[0];
  const cityCount = areas.filter((area) => area.kind !== "county").length;
  const countyCount = areas.filter((area) => area.kind === "county").length;

  useEffect(() => {
    if (!hasRealMap) return;

    let disposed = false;
    let observer: ResizeObserver | null = null;

    const boot = async () => {
      const container = mapRootRef.current;
      if (!container || mapInstanceRef.current) return;

      const L = await import("leaflet");
      if (disposed || !mapRootRef.current) return;

      const map = L.map(container, {
        zoomControl: false,
        attributionControl: true,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: true,
        dragging: true,
        zoomSnap: 0.25,
        minZoom: 4,
        maxZoom: 14,
      });
      mapInstanceRef.current = map;

      // Keyless raster basemap for lightweight preview sites. Do not prefetch tiles.
      // Respect OpenStreetMap's attribution, browser caching, and tile-use policy.
      let consecutiveTileErrors = 0;
      const baseLayer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>',
        className: "template-map-tiles",
      });
      baseLayer.on("tileload", () => {
        consecutiveTileErrors = 0;
        if (!disposed) setTileError(false);
      });
      baseLayer.on("tileerror", () => {
        consecutiveTileErrors += 1;
        if (!disposed && consecutiveTileErrors >= 3) setTileError(true);
      });
      baseLayer.addTo(map);

      const bounds = L.latLngBounds(
        areas.map((area) => [area.lat as number, area.lng as number] as [number, number]),
      );
      map.fitBounds(bounds, {
        paddingTopLeft: [46, 58],
        paddingBottomRight: [46, 76],
        animate: false,
      });

      const networkColor = resolveThemeColor("networkLine");
      networkRouteRef.current = L.polyline(
        areas.map((area) => [area.lat as number, area.lng as number] as [number, number]),
        {
          color: networkColor,
          weight: 1.2,
          opacity: 0.24,
          dashArray: "3 9",
          interactive: false,
          className: "template-map-network-line",
        },
      ).addTo(map);

      markersRef.current = areas.map((area, index) => {
        const isHub = index === hubIndex;
        const isCounty = area.kind === "county";
        const iconClass = isHub
          ? "template-map-icon template-map-icon--hub"
          : isCounty
            ? "template-map-icon template-map-icon--county"
            : "template-map-icon template-map-icon--area";
        const html = isHub
          ? `<div class="template-map-marker template-map-marker--hub"><span></span><img src="${siteConfig.brand.logoLight}" alt="" /></div>`
          : isCounty
            ? `<div class="template-map-marker template-map-marker--county"><span></span></div>`
            : `<div class="template-map-marker template-map-marker--area"><span></span></div>`;

        const icon = L.divIcon({
          className: iconClass,
          html,
          iconSize: isHub ? [78, 78] : isCounty ? [42, 42] : [36, 36],
          iconAnchor: isHub ? [39, 39] : isCounty ? [21, 21] : [18, 18],
        });

        const marker = L.marker([area.lat as number, area.lng as number], {
          icon,
          keyboard: true,
          title: area.name,
          riseOnHover: true,
        }).addTo(map);

        marker.on("mouseover", () => setActiveIndex(index));
        marker.on("focus", () => setActiveIndex(index));
        marker.on("click", () => setActiveIndex(index));
        marker.bindTooltip(shortName(area.name), {
          permanent: false,
          direction: "right",
          offset: isHub ? [26, 0] : [11, 0],
          className: isCounty ? "template-map-tooltip template-map-tooltip--county" : "template-map-tooltip",
          opacity: 1,
        });

        return marker;
      });

      observer = new ResizeObserver(() => map.invalidateSize({ animate: false }));
      observer.observe(container);
      window.requestAnimationFrame(() => map.invalidateSize({ animate: false }));
      setMapReady(true);
    };

    void boot();

    return () => {
      disposed = true;
      observer?.disconnect();
      activeRouteRef.current?.remove();
      networkRouteRef.current?.remove();
      markersRef.current = [];
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
      setMapReady(false);
    };
  }, [areas, hasRealMap, hubIndex]);

  useEffect(() => {
    if (!hasRealMap || !mapReady || !active || !hub) return;
    const map = mapInstanceRef.current;
    if (!map) return;

    const renderActiveRoute = async () => {
      const L = await import("leaflet");
      activeRouteRef.current?.remove();
      activeRouteRef.current = null;

      if (activeIndex !== hubIndex) {
        activeRouteRef.current = L.polyline(
          [
            [hub.lat as number, hub.lng as number],
            [active.lat as number, active.lng as number],
          ],
          {
            color: resolveThemeColor("brandPrimary"),
            weight: 3,
            opacity: 0.92,
            dashArray: "8 9",
            lineCap: "round",
            interactive: false,
            className: "template-map-active-route",
          },
        ).addTo(map);
      }

      markersRef.current.forEach((marker, index) => {
        marker.getElement()?.classList.toggle("is-active", index === activeIndex);
      });
    };

    void renderActiveRoute();
  }, [active, activeIndex, hasRealMap, hub, hubIndex, mapReady]);

  const activateArea = (index: number) => {
    setActiveIndex(index);
    const map = mapInstanceRef.current;
    const area = areas[index];
    if (!map || !area || !isValidCoordinate(area)) return;
    map.panTo([area.lat as number, area.lng as number], {
      animate: true,
      duration: 0.45,
      easeLinearity: 0.24,
    });
  };

  const resetMap = async () => {
    setActiveIndex(hubIndex);
    const map = mapInstanceRef.current;
    if (!map || !hasRealMap) return;
    const L = await import("leaflet");
    map.fitBounds(
      L.latLngBounds(areas.map((area) => [area.lat as number, area.lng as number])),
      {
        paddingTopLeft: [46, 58],
        paddingBottomRight: [46, 76],
        animate: true,
        duration: 0.55,
      },
    );
  };

  if (!active) return null;

  const activeNote = active.note?.trim()
    || (active.name === config.featuredLocation ? config.locationDetail : "")
    || `${active.name} sits inside ${siteConfig.brand.shortName}'s ${config.regionLabel} service footprint.`;
  const activeHref = active.href?.trim() || siteConfig.contact.contactUrl;

  return (
    <section className="coverage-section" id="service-areas" aria-label={`${siteConfig.brand.name} service areas`}>
      <ServiceAreasAnimation />
      <div className="coverage-transition" aria-hidden="true">
        <span data-coverage-transition-line />
        <i data-coverage-transition-node><LocationIcon /></i>
        <p>{config.eyebrow}</p>
      </div>

      <div className="coverage-section__container">
        <div className="coverage-v2-shell">
          <div className="coverage-v2-copy">
            <span className="coverage-v2-eyebrow">{config.eyebrow}</span>
            <h2>{config.titleLine1}<span>{config.titleLine2}</span></h2>
            <p className="coverage-v2-description">{config.description}</p>

            <div className="coverage-v2-summary" aria-label="Coverage summary">
              <div>
                <strong>{areas.length}</strong>
                <span>listed service areas</span>
              </div>
              {config.metrics.slice(0, 2).map((metric) => (
                <div key={`${metric.value}-${metric.label}`}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>

            <article className="coverage-v2-focus">
              <div className="coverage-v2-focus__topline">
                <span>In focus</span>
                <button type="button" onClick={() => void resetMap()}>View all</button>
              </div>
              <div className="coverage-v2-focus__meta">
                {active.kind === "county" ? "COUNTY COVERAGE" : active.kind === "community" ? "COMMUNITY" : "CITY / SERVICE AREA"}
              </div>
              <h3>{active.name}</h3>
              <p>{activeNote}</p>
              <a href={activeHref}>{active.href ? "View service area" : config.ctaLabel}<ArrowIcon /></a>
            </article>
          </div>

          <div className="coverage-v2-map-column">
            <div className="coverage-v2-sculpture">
              <div className="coverage-v2-layer coverage-v2-layer--back" aria-hidden="true" />
              <div className="coverage-v2-layer coverage-v2-layer--mid" aria-hidden="true" />

              <div className="coverage-v2-frame">
                <div className="coverage-v2-map-topbar">
                  <div>
                    <span>{config.networkLabel}</span>
                    <strong>Actual geography. Local coverage.</strong>
                  </div>
                  <div className="coverage-v2-map-key" aria-label="Map legend">
                    <span><i className="is-hub" /> Hub</span>
                    {cityCount > 0 ? <span><i className="is-area" /> City</span> : null}
                    {countyCount > 0 ? <span><i className="is-county" /> County</span> : null}
                  </div>
                </div>

                <div className={`coverage-v2-map-viewport${hasRealMap ? " has-real-map" : " is-preview"}`}>
                  {hasRealMap ? (
                    <>
                      <div ref={mapRootRef} className="coverage-v2-map-root" aria-label={`Interactive map of ${siteConfig.brand.name} service areas`} />
                      {tileError ? (
                        <p className="coverage-v2-map-warning" role="status">
                          Map imagery is temporarily unavailable. Service-area markers and the location list remain interactive.
                        </p>
                      ) : null}
                    </>
                  ) : (
                    <div className="coverage-v2-fallback-map" aria-label="Service-area preview">
                      <div className="coverage-v2-fallback-grid" aria-hidden="true" />
                      <svg viewBox="0 0 1000 600" aria-hidden="true">
                        <path className="coverage-v2-fallback-region" d="M92 170 238 74 454 107 612 63 872 157 921 326 826 506 624 546 448 492 246 536 89 390Z" />
                        <path className="coverage-v2-fallback-route" d="M180 410 305 260 493 290 680 176 826 330 648 454 437 442 260 512" />
                      </svg>
                      {areas.slice(0, FALLBACK_POSITIONS.length).map((area, index) => (
                        <button
                          key={`${area.name}-${index}`}
                          type="button"
                          className={`coverage-v2-fallback-point${index === hubIndex ? " is-hub" : ""}${index === activeIndex ? " is-active" : ""}`}
                          style={{ left: `${FALLBACK_POSITIONS[index][0]}%`, top: `${FALLBACK_POSITIONS[index][1]}%` }}
                          onClick={() => activateArea(index)}
                          aria-label={`Focus ${area.name}`}
                        >
                          <i />
                          {index === hubIndex ? <span>{shortName(area.name)}</span> : null}
                        </button>
                      ))}
                      <div className="coverage-v2-preview-note">
                        <span>MAP PREVIEW</span>
                        <strong>{config.regionLabel}</strong>
                      </div>
                    </div>
                  )}

                  <div className="coverage-v2-map-overlay" aria-hidden="true">
                    <span>Service field</span>
                    <strong>{config.regionLabel}</strong>
                  </div>
                </div>

                <div className="coverage-v2-map-footer">
                  <span>{hasRealMap ? "Interactive map · drag to explore" : "Schematic preview · add coordinates to activate real geography"}</span>
                  <button type="button" onClick={() => void resetMap()}>Reset map</button>
                </div>
              </div>
            </div>
          </div>

          <div className="coverage-v2-area-strip" role="group" aria-label="All service areas">
            <span>All service areas</span>
            <div>
              {areas.map((area, index) => (
                <button
                  key={`${area.name}-${index}`}
                  type="button"
                  className={activeIndex === index ? "is-active" : undefined}
                  aria-pressed={activeIndex === index}
                  onClick={() => activateArea(index)}
                >
                  {shortName(area.name)}
                  {index === hubIndex ? <i>HUB</i> : null}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
