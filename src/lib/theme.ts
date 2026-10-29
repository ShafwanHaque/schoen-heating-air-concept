import type { CSSProperties } from "react";
import { siteConfig, type ThemeColors } from "@/config/site.config";

const PLACEHOLDER_PATTERN = /^\[\[.*\]\]$/;

// Neutral preview palette ONLY. All real brand colors are [[...]] tokens in site.config.ts.
// The design should look intentional even before a prospect is personalized.
const fallbackTheme: ThemeColors = {
  brandPrimary: "#677D70",
  brandSecondary: "#B6C8B9",
  brandAccent: "#DAC7AB",
  page: "#182824",
  surfaceDark: "#182824",
  surfaceDarkAlt: "#23352D",
  surfaceElevated: "#32483C",
  surfaceSoft: "#F3F0E8",
  textPrimary: "#FBFAF5",
  textSecondary: "#E3E6E0",
  textMuted: "#B1BAB0",
  textOnBrand: "#FFFFFF",
  borderSubtle: "#42574C",
  borderStrong: "#697E70",
  glowPrimary: "#8C9D8C",
  glowSecondary: "#B6C8B9",
  networkLine: "#879785",
  success: "#A4B8A5",
  service1: "#9DAF9D",
  service2: "#98ACAE",
  service3: "#C9BB9C",
  service4: "#B4C6AA",
  service5: "#BFBCC0",
};

export function isTemplatePlaceholder(value: string) {
  return PLACEHOLDER_PATTERN.test(value.trim());
}

export function resolveThemeColor<K extends keyof ThemeColors>(key: K) {
  const candidate = siteConfig.theme.colors[key]?.trim();
  if (!candidate || isTemplatePlaceholder(candidate)) return fallbackTheme[key];
  return candidate;
}

export function hexToRgb(hex: string) {
  const value = hex.replace("#", "");
  const normalized = value.length === 3
    ? value.split("").map((char) => `${char}${char}`).join("")
    : value;
  const parsed = Number.parseInt(normalized, 16);

  if (!Number.isFinite(parsed) || normalized.length !== 6) return "95, 124, 255";

  return `${(parsed >> 16) & 255}, ${(parsed >> 8) & 255}, ${parsed & 255}`;
}

const resolved = Object.fromEntries(
  (Object.keys(fallbackTheme) as Array<keyof ThemeColors>).map((key) => [
    key,
    resolveThemeColor(key),
  ]),
) as Record<keyof ThemeColors, string>;

export const templateThemeStyle = {
  "--brand-primary": resolved.brandPrimary,
  "--brand-primary-rgb": hexToRgb(resolved.brandPrimary),
  "--brand-secondary": resolved.brandSecondary,
  "--brand-secondary-rgb": hexToRgb(resolved.brandSecondary),
  "--brand-accent": resolved.brandAccent,
  "--brand-accent-rgb": hexToRgb(resolved.brandAccent),

  "--page-bg": resolved.page,
  "--page-bg-rgb": hexToRgb(resolved.page),
  "--surface-dark": resolved.surfaceDark,
  "--surface-dark-rgb": hexToRgb(resolved.surfaceDark),
  "--surface-dark-alt": resolved.surfaceDarkAlt,
  "--surface-dark-alt-rgb": hexToRgb(resolved.surfaceDarkAlt),
  "--surface-elevated": resolved.surfaceElevated,
  "--surface-elevated-rgb": hexToRgb(resolved.surfaceElevated),
  "--surface-soft": resolved.surfaceSoft,
  "--surface-soft-rgb": hexToRgb(resolved.surfaceSoft),

  "--text-primary": resolved.textPrimary,
  "--text-primary-rgb": hexToRgb(resolved.textPrimary),
  "--text-secondary": resolved.textSecondary,
  "--text-secondary-rgb": hexToRgb(resolved.textSecondary),
  "--text-muted": resolved.textMuted,
  "--text-muted-rgb": hexToRgb(resolved.textMuted),
  "--text-on-brand": resolved.textOnBrand,
  "--text-on-brand-rgb": hexToRgb(resolved.textOnBrand),

  "--border-subtle": resolved.borderSubtle,
  "--border-subtle-rgb": hexToRgb(resolved.borderSubtle),
  "--border-strong": resolved.borderStrong,
  "--border-strong-rgb": hexToRgb(resolved.borderStrong),
  "--glow-primary": resolved.glowPrimary,
  "--glow-primary-rgb": hexToRgb(resolved.glowPrimary),
  "--glow-secondary": resolved.glowSecondary,
  "--glow-secondary-rgb": hexToRgb(resolved.glowSecondary),
  "--network-line": resolved.networkLine,
  "--network-line-rgb": hexToRgb(resolved.networkLine),
  "--success": resolved.success,
  "--success-rgb": hexToRgb(resolved.success),

  "--service-1": resolved.service1,
  "--service-1-rgb": hexToRgb(resolved.service1),
  "--service-2": resolved.service2,
  "--service-2-rgb": hexToRgb(resolved.service2),
  "--service-3": resolved.service3,
  "--service-3-rgb": hexToRgb(resolved.service3),
  "--service-4": resolved.service4,
  "--service-4-rgb": hexToRgb(resolved.service4),
  "--service-5": resolved.service5,
  "--service-5-rgb": hexToRgb(resolved.service5),

  "--ink": resolved.page,
  "--paper": resolved.textPrimary,
  "--muted": resolved.textMuted,
  "--red": resolved.brandPrimary,
  "--red-bright": resolved.brandPrimary,
  "--cyan": resolved.brandSecondary,
} as CSSProperties;
