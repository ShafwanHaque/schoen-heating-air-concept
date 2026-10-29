import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const templateMode = process.argv.includes("--template");
const configPath = path.join(root, "src/config/site.config.ts");
const config = fs.readFileSync(configPath, "utf8");
const placeholderPattern = /\[\[[^\]]+\]\]/g;

function placeholdersIn(text) {
  return [...text.matchAll(placeholderPattern)].map((match) => match[0]);
}

const openingStart = config.lastIndexOf("  opening: {");
const openingEnd = config.indexOf("\n\n  // One hero system", openingStart);
const openingBlock = openingStart >= 0 && openingEnd > openingStart
  ? config.slice(openingStart, openingEnd)
  : "";
const configWithoutOpening = openingBlock
  ? `${config.slice(0, openingStart)}${config.slice(openingEnd)}`
  : config;
const requiredPlaceholders = new Set(placeholdersIn(configWithoutOpening));
const openingEnabled = /enabled:\s*true/.test(openingBlock);
if (openingEnabled) {
  [
    "[[OPENING_EYEBROW]]",
    "[[OPENING 1]]",
    "[[OPENING 2]]",
    "[[OPENING_DETAIL]]",
    "[[OPENING_LOCATION]]",
  ].forEach((field) => {
    if (openingBlock.includes(field)) requiredPlaceholders.add(field);
  });
}

const configuredAssetUrls = [
  config.match(/logo:\s*"([^"]+)"/)?.[1],
  config.match(/logoLight:\s*"([^"]+)"/)?.[1],
  ...[...config.matchAll(/image:\s*"(\/services\/[^"]+)"/g)].map((match) => match[1]),
].filter(Boolean);

const requiredAssets = configuredAssetUrls.map((url) =>
  path.join("public", url.replace(/^\//, "")),
);
const missingAssets = requiredAssets.filter((file) => !fs.existsSync(path.join(root, file)));
const serviceCount = configuredAssetUrls.filter((url) => url.startsWith("/services/")).length;

const heroPath = path.join(root, "src/heroes/custom-hero.tsx");
const heroSource = fs.existsSync(heroPath) ? fs.readFileSync(heroPath, "utf8") : "";
const heroStillPlaceholder = /UNIQUE HERO SLOT|Design this section separately for each outreach prospect/i.test(heroSource);
const heroBlockStart = config.lastIndexOf("  hero: {");
const heroBlockEnd = config.indexOf("\n\n  seo:", heroBlockStart);
const heroBlock = heroBlockStart >= 0 && heroBlockEnd > heroBlockStart ? config.slice(heroBlockStart, heroBlockEnd) : "";
const requiredHeroFields = ["eyebrow", "headlineLine1", "headlineLine2", "description", "primaryCta", "secondaryCta", "locationLabel", "locationValue", "edgeLabel", "bottomStatement", "sillLabel", "discoverLabel", "primarySrc"];
const missingHeroFields = requiredHeroFields.filter((field) => !new RegExp(`\\b${field}:\\s*\"[^\"]+\"`).test(heroBlock));
const imageFields = ["primarySrc"];
const heroAssetPaths = imageFields.map((field) => heroBlock.match(new RegExp(`${field}:\\s*\"([^\"]+)\"`))?.[1]).filter(Boolean);
const heroMissingAssets = heroAssetPaths.filter((url) => !url.startsWith("/") || !fs.existsSync(path.join(root, "public", url.slice(1))));
const heroUsesPlaceholderAssets = heroAssetPaths.some((url) => url.includes("placeholder"));
const heroPhotoFit = heroBlock.match(/\bfit:\s*"(contain|cover)"/)?.[1];
const heroLayout = heroBlock.match(/\blayout:\s*"(service-craft|climate-chamber|open-door|picture-window|keepsake)"/)?.[1];
const heroBackdrop = heroBlock.match(/\bbackdrop:\s*"(matte|blur)"/)?.[1];

const untouchedPlaceholderAssets = [];
for (const file of requiredAssets) {
  const absolute = path.join(root, file);
  if (!fs.existsSync(absolute) || path.extname(file).toLowerCase() !== ".svg") continue;
  const text = fs.readFileSync(absolute, "utf8");
  if (/REPLACE|image placeholder|Replace with brand logo/i.test(text)) {
    untouchedPlaceholderAssets.push(file);
  }
}

const themeStart = config.lastIndexOf("  theme: {");
const themeEnd = config.indexOf("\n\n  /**\n   * PERSONALIZED OPENING", themeStart);
const themeBlock = themeStart >= 0 && themeEnd > themeStart
  ? config.slice(themeStart, themeEnd)
  : "";
const themeColorsBlock = themeBlock.match(/colors:\s*\{([\s\S]*?)\n\s*\},/)?.[1] ?? "";
const invalidThemeColors = [];
for (const [, key, value] of themeColorsBlock.matchAll(/(\w+):\s*"([^"]+)"/g)) {
  if (value.includes("[[")) continue;
  if (!/^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(value)) {
    invalidThemeColors.push(`${key}: ${value}`);
  }
}

const coverageStart = config.lastIndexOf("  coverage: {");
const coverageEnd = config.indexOf("\n\n  contactSection:", coverageStart);
const coverageBlock = coverageStart >= 0 && coverageEnd > coverageStart
  ? config.slice(coverageStart, coverageEnd)
  : "";
const coverageLocations = [...coverageBlock.matchAll(/\{\s*name:\s*"([^"]+)"([\s\S]*?)\}/g)].map((match) => {
  const body = match[2];
  const lat = Number(body.match(/lat:\s*(-?\d+(?:\.\d+)?)/)?.[1]);
  const lng = Number(body.match(/lng:\s*(-?\d+(?:\.\d+)?)/)?.[1]);
  return {
    name: match[1],
    lat,
    lng,
    hub: /hub:\s*true/.test(body),
  };
});
const invalidCoverageCoordinates = coverageLocations.filter((area) =>
  !Number.isFinite(area.lat)
  || !Number.isFinite(area.lng)
  || Math.abs(area.lat) > 90
  || Math.abs(area.lng) > 180,
);
const coverageHubCount = coverageLocations.filter((area) => area.hub).length;

const contactStart = config.lastIndexOf("  contactSection: {");
const contactEnd = config.indexOf("\n  },\n};", contactStart);
const contactBlock = contactStart >= 0 && contactEnd > contactStart
  ? config.slice(contactStart, contactEnd)
  : "";
const contactSubmissionMode = contactBlock.match(/submissionMode:\s*"([^"]+)"/)?.[1] ?? "demo";
const contactFormEndpoint = contactBlock.match(/formEndpoint:\s*"([^"]*)"/)?.[1]?.trim() ?? "";

let failed = false;

if (!templateMode && requiredPlaceholders.size) {
  failed = true;
  console.error("\nUnfilled required client placeholders:");
  [...requiredPlaceholders].sort().forEach((placeholder) => console.error(`  - ${placeholder}`));

  if (openingEnabled) {
    console.error("\nThreshold opening is enabled. Fill its text placeholders before prospect outreach.");
  }
}

if (serviceCount !== 5) {
  failed = true;
  console.error(`\nExpected exactly 5 services, found ${serviceCount}.`);
}

if (missingAssets.length) {
  failed = true;
  console.error("\nMissing required assets:");
  missingAssets.forEach((file) => console.error(`  - ${file}`));
}

if (!heroPhotoFit) {
  failed = true;
  console.error("\nHero media.fit must be either contain or cover.");
}
if (!heroLayout || !heroBackdrop) {
  failed = true;
  console.error("\nHero layout must be service-craft, climate-chamber, open-door, picture-window, or keepsake; hero media.backdrop must be matte or blur.");
}

if (missingHeroFields.length || heroMissingAssets.length) {
  failed = true;
  console.error("\nHero schema or media assets incomplete:", missingHeroFields.join(", "), heroMissingAssets.join(", "));
}
if (!templateMode && heroLayout !== "climate-chamber" && heroLayout !== "service-craft" && heroUsesPlaceholderAssets) {
  failed = true;
  console.error("\nReplace the placeholder hero media assets with prospect-specific photos before outreach.");
}
if (heroStillPlaceholder) {
  failed = true;
  console.error("\nThe custom hero is still the master-template placeholder:");
  console.error("  - src/heroes/custom-hero.tsx");
}

if (!templateMode && untouchedPlaceholderAssets.length) {
  failed = true;
  console.error("\nTemplate placeholder assets are still in use:");
  untouchedPlaceholderAssets.forEach((file) => console.error(`  - ${file}`));
}

if (invalidThemeColors.length) {
  failed = true;
  console.error("\nTheme colors must be 3- or 6-digit hex values because RGB glow channels are generated automatically:");
  invalidThemeColors.forEach((item) => console.error(`  - ${item}`));
}

if (coverageLocations.length < 2) {
  failed = true;
  console.error("\nService-area map needs at least 2 configured locations.");
}

if (!templateMode && invalidCoverageCoordinates.length) {
  failed = true;
  console.error("\nService-area map coordinates are missing or still using the master sentinel values:");
  invalidCoverageCoordinates.forEach((area) => console.error(`  - ${area.name}: lat=${area.lat}, lng=${area.lng}`));
}

if (coverageHubCount !== 1) {
  failed = true;
  console.error(`\nService-area map must have exactly one hub:true location; found ${coverageHubCount}.`);
}

if (contactSubmissionMode === "endpoint" && (!contactFormEndpoint || contactFormEndpoint.includes("[["))) {
  failed = true;
  console.error("\nContact form is in endpoint mode but contactSection.formEndpoint is empty or still a placeholder.");
}

if (failed) {
  console.error("\nTemplate validation failed. Fill/fix the items above before outreach.\n");
  process.exit(1);
}

console.log(`${templateMode ? "Master template structure" : "Personalized client configuration"} passed. Threshold opening: ${openingEnabled ? "enabled" : "disabled"}.`);
console.log(templateMode
  ? "Placeholder tokens intentionally retained. Hero media, service slots, branding assets, and structure verified."
  : "Five services, map coordinates, contact mode, hero/media assets and theme-color checks passed.");
