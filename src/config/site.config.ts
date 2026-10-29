export type StandardIcon =
  | "cooling"
  | "heating"
  | "plumbing"
  | "air-quality"
  | "electrical"
  | "maintenance";

export type ThemeStyle = "clean" | "technical" | "industrial" | "warm";

export type ThemeColors = {
  brandPrimary: string;
  brandSecondary: string;
  brandAccent: string;
  page: string;
  surfaceDark: string;
  surfaceDarkAlt: string;
  surfaceElevated: string;
  surfaceSoft: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textOnBrand: string;
  borderSubtle: string;
  borderStrong: string;
  glowPrimary: string;
  glowSecondary: string;
  networkLine: string;
  success: string;
  service1: string;
  service2: string;
  service3: string;
  service4: string;
  service5: string;
};

export type CoverageLocation = {
  name: string;
  kind: "city" | "county" | "community";
  lat?: number;
  lng?: number;
  hub?: boolean;
  note?: string;
  href?: string;
};

export type ContactSubmissionMode = "demo" | "endpoint";

export type SiteConfig = {
  brand: {
    name: string;
    shortName: string;
    logo: string;
    logoLight: string;
    region: string;
  };
  theme: {
    style: ThemeStyle;
    colors: ThemeColors;
  };
  header: {
    navServices: string;
    navAreas: string;
    navContact: string;
    helpLabel: string;
    ctaLabel: string;
    mobileEyebrow: string;
    mobileCallLabel: string;
  };
  opening: {
    enabled: boolean;
    /** Total screen time including the final one-sheet lift reveal. */
    durationMs: number;
    eyebrow: string;
    line1: string;
    line2: string;
    detail: string;
    location: string;
    skipLabel: string;
  };
  hero: {
    /** The Climate Chamber is the new signature, with photo-based legacy layouts retained. */
    layout: "service-craft" | "climate-chamber" | "open-door" | "picture-window" | "keepsake";
    eyebrow: string;
    headlineLine1: string;
    headlineLine2: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    locationLabel: string;
    locationValue: string;
    edgeLabel: string;
    bottomStatement: string;
    sillLabel: string;
    serviceLabels: [string, string, string];
    discoverLabel: string;
    motion: {
      /** Turn off when capturing zero-animation QA screenshots or when desired for a prospect. */
      enabled: boolean;
      /** Balanced is more cinematic; gentle has the same choreography at a slower pace. */
      pace: "balanced" | "gentle";
      /** Very slight hovering of the inset media after the one-time entrance. */
      ambient: boolean;
      /** Small image-depth shift on scroll, disabled automatically for reduced motion. */
    };
    system?: {
      eyebrow: string;
      modes: [
        { id: "cool"; label: string; detail: string },
        { id: "warm"; label: string; detail: string },
        { id: "pure"; label: string; detail: string },
      ];
    };
    media: {
      primarySrc: string;
      primaryAlt: string;
      primaryPosition: string;
      /** For picture-window/keepsake only. Open-door always displays the entire image without cropping. */
      fit: "contain" | "cover";
      /** Backdrop for the alternate fixed-window layouts only. */
      backdrop: "matte" | "blur";
    };
  };
  seo: {
    title: string;
    description: string;
  };
  contact: {
    phoneDisplay: string;
    phoneHref: string;
    email: string;
    address: string;
    contactUrl: string;
    servicesUrl: string;
  };
  brandStandard: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    bodyTitle: string;
    body: string;
    callLabel: string;
    availabilityLabel: string;
    panelEyebrow: string;
    panelTitle: string;
    panelFooter: string;
    handoff: string;
    items: Array<{
      icon: StandardIcon;
      label: string;
      detail: string;
    }>;
  };
  services: {
    eyebrow: string;
    introLine1: string;
    introLine2: string;
    summaryEyebrow: string;
    summaryTitle: string;
    summaryBody: string;
    summaryCta: string;
    items: [
      ServiceConfig,
      ServiceConfig,
      ServiceConfig,
      ServiceConfig,
      ServiceConfig,
    ];
  };
  coverage: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    featuredLocation: string;
    locationDetail: string;
    ctaLabel: string;
    networkLabel: string;
    regionLabel: string;
    metrics: [
      { value: string; label: string },
      { value: string; label: string },
      { value: string; label: string },
    ];
    locations: CoverageLocation[];
  };
  contactSection: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
    submissionMode: ContactSubmissionMode;
    formEndpoint: string;
    successMessage: string;
  };
};

export type ServiceConfig = {
  name: string;
  shortName: string;
  image: string;
  description?: string;
};

export const siteConfig: SiteConfig = {
  "brand": {
    "name": "Schoen Heating & Air Conditioning Inc",
    "shortName": "Schoen",
    "logo": "/brand/schoen-wordmark.png",
    "logoLight": "/brand/schoen-wordmark.png",
    "region": "Foley · Serving Baldwin County, Alabama"
  },
  "theme": {
    "style": "warm",
    "colors": {
      "brandPrimary": "#C82032",
      "brandSecondary": "#F5D63A",
      "brandAccent": "#16365C",
      "page": "#101B29",
      "surfaceDark": "#172231",
      "surfaceDarkAlt": "#202F40",
      "surfaceElevated": "#2B3F55",
      "surfaceSoft": "#F5F3EA",
      "textPrimary": "#FCFCF9",
      "textSecondary": "#E4E8EC",
      "textMuted": "#A4AFB9",
      "textOnBrand": "#FFFFFF",
      "borderSubtle": "#344253",
      "borderStrong": "#58697A",
      "glowPrimary": "#C82032",
      "glowSecondary": "#F5D63A",
      "networkLine": "#16365C",
      "success": "#6FA67B",
      "service1": "#C82032",
      "service2": "#F5D63A",
      "service3": "#16365C",
      "service4": "#D86B43",
      "service5": "#738092"
    }
  },
  "header": {
    "navServices": "Services",
    "navAreas": "Service areas",
    "navContact": "Contact",
    "helpLabel": "Call (251) 943-5215",
    "ctaLabel": "Request a free estimate",
    "mobileEyebrow": "FOLEY · SERVING BALDWIN COUNTY, ALABAMA",
    "mobileCallLabel": "Call now"
  },
  "opening": {
    "enabled": false,
    "durationMs": 1400,
    "eyebrow": "FAMILY OWNED · OPERATING SINCE 1960",
    "line1": "Foley comfort.",
    "line2": "Since 1960.",
    "detail": "Schoen Heating & Air Conditioning Inc · Foley · Serving Baldwin County, Alabama",
    "location": "Family owned since 1960",
    "skipLabel": "Skip intro"
  },
  "hero": {
    "layout": "service-craft",
    "eyebrow": "FAMILY OWNED & OPERATED · FOLEY, ALABAMA",
    "headlineLine1": "Foley comfort,",
    "headlineLine2": "since 1960.",
    "description": "Family-owned heating and air service built around careful repairs, honest estimates, and respect for your home.",
    "primaryCta": "Request a free estimate",
    "secondaryCta": "Call Schoen",
    "locationLabel": "FOLEY · SERVING BALDWIN COUNTY, ALABAMA",
    "locationValue": "FOLEY · GULF SHORES · BALDWIN COUNTY",
    "edgeLabel": "PROUDLY SERVING FOLEY SINCE 1960",
    "bottomStatement": "Foley, Alabama · Licensed · Insured · Bonded",
    "sillLabel": "REPAIRS OVER REPLACEMENTS",
    "serviceLabels": [
      "AC repair",
      "Heating",
      "Ductwork"
    ],
    "discoverLabel": "Explore services",
    "motion": {
      "enabled": true,
      "pace": "balanced",
      "ambient": false
    },
    "system": {
      "eyebrow": "LOCAL COMFORT / IN MOTION",
      "modes": [
        {
          "id": "cool",
          "label": "Cooling",
          "detail": "A considered path from warm intake to balanced, conditioned air."
        },
        {
          "id": "warm",
          "label": "Heating",
          "detail": "Steady circulation, carefully controlled for colder days."
        },
        {
          "id": "pure",
          "label": "Air quality",
          "detail": "A focus on filtration and the air moving through every room."
        }
      ]
    },
    "media": {
      "primarySrc": "/hero/schoen-service-van.png",
      "primaryAlt": "Schoen Heating & Air’s red service van, showing the company wordmark and phone number.",
      "primaryPosition": "center center",
      "fit": "cover",
      "backdrop": "matte"
    }
  },
  "seo": {
    "title": "Schoen Heating & Air Conditioning | Foley, AL",
    "description": "Family-owned HVAC service in Foley, Alabama since 1960. Heating, air conditioning, repairs, ductwork and free estimates. Call 251-943-5215."
  },
  "contact": {
    "phoneDisplay": "(251) 943-5215",
    "phoneHref": "tel:+12519435215",
    "email": "",
    "address": "911 Irwin St, Foley, AL 36535",
    "contactUrl": "#contact",
    "servicesUrl": "#services"
  },
  "brandStandard": {
    "eyebrow": "REPAIRS OVER REPLACEMENTS.",
    "titleLine1": "A Foley family business, here for the long haul.",
    "titleLine2": "Repairs over replacements.",
    "bodyTitle": "A Foley family business, here for the long haul.",
    "body": "Family owned and operated since 1960, Schoen Heating & Air Conditioning serves Foley and nearby communities with licensed, insured, and bonded technicians. The company prioritizes repair when it is the right choice and offers free, no-obligation estimates.",
    "callLabel": "Call now",
    "availabilityLabel": "Foley · Serving Baldwin County, Alabama",
    "panelEyebrow": "SCHOEN HEATING & AIR CONDITIONING INC",
    "panelTitle": "Experienced local technicians for heating, cooling, ductwork, and sheet metal service—with a repair-first mindset.",
    "panelFooter": "Foley, Alabama · Licensed · Insured · Bonded",
    "handoff": "Explore Schoen services.",
    "items": [
      {
        "icon": "cooling",
        "label": "Cooling service",
        "detail": "Prompt diagnostics and dependable AC repairs before considering replacement."
      },
      {
        "icon": "heating",
        "label": "Heating & installation",
        "detail": "System selection and installation for comfortable, efficient homes."
      },
      {
        "icon": "maintenance",
        "label": "Local expertise",
        "detail": "Heating repair and maintenance from experienced local technicians."
      }
    ]
  },
  "services": {
    "eyebrow": "YEAR-ROUND HOME COMFORT",
    "introLine1": "Service shaped",
    "introLine2": "around your home.",
    "summaryEyebrow": "SCHOEN HEATING & AIR CONDITIONING INC",
    "summaryTitle": "Experienced local technicians for heating, cooling, ductwork, and sheet metal service—with a repair-first mindset.",
    "summaryBody": "Family owned and operated since 1960, Schoen Heating & Air Conditioning serves Foley and nearby communities with licensed, insured, and bonded technicians. The company prioritizes repair when it is the right choice and offers free, no-obligation estimates.",
    "summaryCta": "Talk to the team",
    "items": [
      {
        "name": "Air conditioning repair",
        "shortName": "Cooling",
        "image": "/services/01.svg",
        "description": "Prompt diagnostics and dependable AC repairs before considering replacement."
      },
      {
        "name": "Air conditioning installation",
        "shortName": "Heating",
        "image": "/services/02.svg",
        "description": "System selection and installation for comfortable, efficient homes."
      },
      {
        "name": "Heating repair",
        "shortName": "Installation",
        "image": "/services/03.svg",
        "description": "Heating repair and maintenance from experienced local technicians."
      },
      {
        "name": "Ductwork & sheet metal",
        "shortName": "Maintenance",
        "image": "/services/04.svg",
        "description": "Custom sheet metal and ductwork service for residential and commercial needs."
      },
      {
        "name": "Maintenance & estimates",
        "shortName": "Air quality",
        "image": "/services/05.svg",
        "description": "Seasonal system care and straightforward estimates."
      }
    ]
  },
  "coverage": {
    "eyebrow": "LOCAL SERVICE AREA",
    "titleLine1": "Close to home.",
    "titleLine2": "Here when you need us.",
    "description": "Foley · Serving Baldwin County, Alabama — Foley, AL, Gulf Shores, AL, Orange Beach, AL, Elberta, AL, Robertsdale, AL, Fairhope, AL.",
    "featuredLocation": "Foley, AL",
    "locationDetail": "Proud to serve Foley · Serving Baldwin County, Alabama.",
    "ctaLabel": "Request a free estimate",
    "networkLabel": "THE LOCAL SERVICE NETWORK",
    "regionLabel": "Foley · Serving Baldwin County, Alabama",
    "metrics": [
      {
        "value": "6 communities",
        "label": "Service area"
      },
      {
        "value": "Family owned since 1960",
        "label": "Local commitment"
      },
      {
        "value": "Local team",
        "label": "Foley · Serving Baldwin County, Alabama"
      }
    ],
    "locations": [
      {
        "name": "Foley, AL",
        "kind": "city",
        "lat": 30.4066,
        "lng": -87.6836,
        "hub": true
      },
      {
        "name": "Gulf Shores, AL",
        "kind": "city",
        "lat": 30.246,
        "lng": -87.7008,
        "hub": false
      },
      {
        "name": "Orange Beach, AL",
        "kind": "city",
        "lat": 30.2944,
        "lng": -87.5736,
        "hub": false
      },
      {
        "name": "Elberta, AL",
        "kind": "city",
        "lat": 30.4144,
        "lng": -87.5978,
        "hub": false
      },
      {
        "name": "Robertsdale, AL",
        "kind": "city",
        "lat": 30.5538,
        "lng": -87.7111,
        "hub": false
      },
      {
        "name": "Fairhope, AL",
        "kind": "city",
        "lat": 30.5227,
        "lng": -87.9033,
        "hub": false
      }
    ]
  },
  "contactSection": {
    "eyebrow": "TALK WITH A LOCAL TEAM",
    "titleLine1": "Let’s get your",
    "titleLine2": "comfort back.",
    "body": "Tell Schoen what you need, or call the team directly to get started.",
    "primaryCta": "Request a free estimate",
    "secondaryCta": "Call Schoen",
    "submissionMode": "demo",
    "formEndpoint": "",
    "successMessage": "Thanks for reaching out. This concept form is a preview and is not connected yet; call (251) 943-5215 to contact Schoen directly."
  }
};
