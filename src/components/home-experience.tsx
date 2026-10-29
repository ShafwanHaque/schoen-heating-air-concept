import { BrandStandardSection } from "./brand-standard-section";
import { ContactSection } from "./contact-section";
import { OpeningSequence } from "./opening-sequence";
import { ServiceAreasSection } from "./service-areas-section";
import { SiteHeader } from "./site-header";
import { SmoothScrollProvider } from "./smooth-scroll-provider";
import { WholeHomeSystemSection } from "./whole-home-system-section";
import { CustomHero } from "@/heroes/custom-hero";
import { templateThemeStyle } from "@/lib/theme";
import { siteConfig } from "@/config/site.config";

import headerStyles from "@/styles/header.module.css";
import customHeroStyles from "@/styles/custom-hero.module.css";
import climateHeroStyles from "@/styles/climate-chamber.module.css";
import serviceCraftStyles from "@/styles/service-craft.module.css";
import openingStyles from "@/styles/opening.module.css";
import brandStandardStyles from "@/styles/brand-standard.module.css";
import wholeHomeStyles from "@/styles/whole-home.module.css";
import coverageStyles from "@/styles/coverage.module.css";
import contactStyles from "@/styles/contact.module.css";
import handoffStyles from "@/styles/handoffs.module.css";
import wholeHomeRefinementStyles from "@/styles/whole-home-refinements.module.css";
import responsiveRefinementStyles from "@/styles/responsive-refinements.module.css";
import coveragePerformanceStyles from "@/styles/coverage-performance.module.css";

const pageStyleScopes = [
  headerStyles.scope,
  customHeroStyles.scope,
  openingStyles.scope,
  brandStandardStyles.scope,
  wholeHomeStyles.scope,
  coverageStyles.scope,
  contactStyles.scope,
  handoffStyles.scope,
  wholeHomeRefinementStyles.scope,
  responsiveRefinementStyles.scope,
  coveragePerformanceStyles.scope,
  climateHeroStyles.scope,
  serviceCraftStyles.scope,
].join(" ");

export function HomeExperience() {
  return (
    <SmoothScrollProvider>
      <div className={pageStyleScopes} style={templateThemeStyle} data-theme-style={siteConfig.theme.style} data-hero-layout={siteConfig.hero.layout}>
        <OpeningSequence />
        <SiteHeader />
        <CustomHero />
        <BrandStandardSection />
        <WholeHomeSystemSection />
        <ServiceAreasSection />
        <ContactSection />
      </div>
    </SmoothScrollProvider>
  );
}
