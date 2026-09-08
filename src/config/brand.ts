export interface BrandContactConfig {
  enabled: boolean;
  phoneDisplay: string;
  phoneDial: string;
  whatsappDisplay: string;
  whatsappDial: string;
  whatsappLink: string;
  email: string;
  address: string;
}

export interface BrandConfig {
  status: "pending" | "active";
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  domain: string;
  domainHost: string;
  contact: BrandContactConfig;
  socials: {
    whatsappLink: string;
  };
}

const envSiteUrl =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_URL) ||
  (typeof process !== "undefined" && process.env?.VITE_SITE_URL) ||
  "";

const envBrandName =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_BRAND_NAME) ||
  (typeof process !== "undefined" && process.env?.VITE_BRAND_NAME) ||
  "";

export const BRAND_CONFIG: BrandConfig = {
  status: envBrandName ? "active" : "pending",
  name: envBrandName || "",
  legalName: envBrandName || "",
  tagline: "Architectural Invisible Grills & Safety Solutions",
  description:
    "Bespoke architectural safety solutions: invisible grills, precision safety netting, and bird protection across Telangana & Andhra Pradesh.",
  domain: envSiteUrl ? envSiteUrl.replace(/\/$/, "") : "",
  domainHost: envSiteUrl ? envSiteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "") : "",

  contact: {
    enabled: false,
    phoneDisplay: "",
    phoneDial: "",
    whatsappDisplay: "",
    whatsappDial: "",
    whatsappLink: "",
    email: "",
    address:
      "Operational Hubs: Telangana & Andhra Pradesh (Hyderabad, Visakhapatnam, Vijayawada, Amaravati, Tirupati, Warangal, Hanamkonda)",
  },

  socials: {
    whatsappLink: "",
  },
};
