import { siteConfig } from "@/config/site.config";
import { hexToRgb, resolveThemeColor } from "@/lib/theme";

export type WholeHomeService = {
  key: string;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  x: number;
  y: number;
  dockX: number;
  dockY: number;
  cardClass: string;
  routePoints: Array<[number, number]>;
  cameraX: number;
  cameraY: number;
  cameraScale: number;
  accent: string;
  accentRgb: string;
};

export const VIEWBOX_WIDTH = 1600;
export const VIEWBOX_HEIGHT = 900;
export const CENTRAL_HOME = { x: 800, y: 365 };

const SERVICE_SLOTS = [
  {
    x: 470,
    y: 160,
    dockX: 470,
    dockY: 296,
    cardClass: "whole-system-card--slot-1",
    routePoints: [
      [718, 514], [650, 553], [582, 514], [582, 430],
      [518, 394], [518, 314], [470, 314], [470, 296],
    ] as Array<[number, number]>,
    cameraX: 38,
    cameraY: 28,
    cameraScale: 1.055,
  },
  {
    x: 1130,
    y: 160,
    dockX: 1130,
    dockY: 296,
    cardClass: "whole-system-card--slot-2",
    routePoints: [
      [882, 514], [950, 553], [1018, 514], [1018, 430],
      [1082, 394], [1082, 314], [1130, 314], [1130, 296],
    ] as Array<[number, number]>,
    cameraX: -38,
    cameraY: 28,
    cameraScale: 1.055,
  },
  {
    x: 1210,
    y: 505,
    dockX: 1210,
    dockY: 641,
    cardClass: "whole-system-card--slot-3",
    routePoints: [
      [888, 544], [958, 585], [1028, 545], [1097, 585],
      [1164, 547], [1210, 600], [1210, 641],
    ] as Array<[number, number]>,
    cameraX: -52,
    cameraY: -22,
    cameraScale: 1.07,
  },
  {
    x: 390,
    y: 505,
    dockX: 390,
    dockY: 641,
    cardClass: "whole-system-card--slot-4",
    routePoints: [
      [712, 544], [642, 585], [572, 545], [503, 585],
      [436, 547], [390, 600], [390, 641],
    ] as Array<[number, number]>,
    cameraX: 52,
    cameraY: -22,
    cameraScale: 1.07,
  },
  {
    x: 800,
    y: 660,
    dockX: 800,
    dockY: 796,
    cardClass: "whole-system-card--slot-5",
    routePoints: [
      [800, 555], [800, 622], [842, 646], [842, 710],
      [800, 754], [800, 796],
    ] as Array<[number, number]>,
    cameraX: 0,
    cameraY: -46,
    cameraScale: 1.075,
  },
] as const;

const SERVICE_ACCENTS = [
  resolveThemeColor("service1"),
  resolveThemeColor("service2"),
  resolveThemeColor("service3"),
  resolveThemeColor("service4"),
  resolveThemeColor("service5"),
] as const;

export const services: WholeHomeService[] = siteConfig.services.items.map(
  (service, index) => {
    const slot = SERVICE_SLOTS[index];
    const accent = SERVICE_ACCENTS[index];

    return {
      key: `service-${index + 1}`,
      number: String(index + 1).padStart(2, "0"),
      title: service.name,
      shortTitle: service.shortName,
      description:
        service.description ??
        `${service.name} service delivered with clear recommendations, careful workmanship and dependable support.`,
      image: service.image,
      ...slot,
      accent,
      accentRgb: hexToRgb(accent),
    };
  },
);
