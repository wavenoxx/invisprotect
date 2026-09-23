import { BUSINESS, hubCityList } from "./business.ts";

/**
 * ============================================================================
 * BRAND IDENTITY & CONTACT — edit this block for each new business owner.
 * ============================================================================
 * Environment variables (see .env.example) override these defaults at build
 * time. Areas served, reviews and the price guide live in ./business.ts; the
 * brand colour lives in src/styles.css (--brand, --brand-deep).
 */
export const DEFAULT_BRAND_NAME = "InvisProtect";
const DEFAULT_SITE_URL = "https://invisprotect.in";
const DEFAULT_TAGLINE = "Architectural Invisible Grills & Safety Solutions";
const DEFAULT_PHONE_DISPLAY = "9154626354";
const DEFAULT_PHONE_DIAL = "+919154626354";
const DEFAULT_WHATSAPP_DISPLAY = "7075870054";
const DEFAULT_WHATSAPP_DIAL = "917075870054";
const DEFAULT_WHATSAPP_LINK = "https://wa.me/917075870054";
const DEFAULT_EMAIL = "invisprotect@gmail.com";
const DEFAULT_INSTAGRAM_URL = "https://www.instagram.com/invisprotect";
const DEFAULT_FACEBOOK_URL = "https://www.facebook.com/share/1HbM6NCtiM/";
const DEFAULT_YOUTUBE_URL = "https://www.youtube.com/@invisprotect";
/* ========================================================================== */

export interface BrandContactConfig {
  enabled: boolean;
  phoneDisplay: string;
  phoneDial: string;
  phoneHref: string;
  whatsappDisplay: string;
  whatsappDial: string;
  whatsappLink: string;
  email: string;
  emailHref: string;
  address: string;
}

export interface BrandSocialsConfig {
  whatsappLink: string;
  instagram: string;
  facebook: string;
  youtube: string;
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
  socials: BrandSocialsConfig;
}

type PublicEnvironment = Record<string, string | undefined>;

function clean(value: string | undefined): string {
  return value?.trim() ?? "";
}

function validSiteUrl(value: string): string {
  if (!value) return DEFAULT_SITE_URL;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.toString().replace(/\/$/, "")
      : DEFAULT_SITE_URL;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

function normalizedDial(value: string): string {
  const compact = clean(value).replace(/[\s()-]/g, "");
  return /^\+?[1-9]\d{7,14}$/.test(compact) ? compact : "";
}

function normalizedWhatsAppDial(value: string): string {
  const digits = clean(value).replace(/\D/g, "");
  return /^[1-9]\d{7,14}$/.test(digits) ? digits : "";
}

function whatsappNumberFromUrl(url: URL): string {
  const candidate =
    url.hostname === "wa.me"
      ? url.pathname.replace(/\D/g, "")
      : url.searchParams.get("phone") || "";
  return /^[1-9]\d{7,14}$/.test(candidate) ? candidate : "";
}

function validWhatsAppLink(value: string): { link: string; dial: string } | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || !["wa.me", "api.whatsapp.com"].includes(url.hostname)) {
      return null;
    }
    const dial = whatsappNumberFromUrl(url);
    return dial ? { link: url.toString(), dial } : null;
  } catch {
    return null;
  }
}

function validEmail(value: string): string {
  const email = clean(value);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : "";
}

const INSTAGRAM_HOSTS = ["instagram.com", "www.instagram.com"];
const FACEBOOK_HOSTS = ["facebook.com", "www.facebook.com", "m.facebook.com"];
const YOUTUBE_HOSTS = ["youtube.com", "www.youtube.com"];

function validSocialUrl(value: string, allowedHosts: string[]): string {
  if (!value) return "";
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return "";
    if (!allowedHosts.includes(url.hostname.toLowerCase())) return "";
    return url.toString();
  } catch {
    return "";
  }
}

export function createBrandConfig(env: PublicEnvironment): BrandConfig {
  const status = clean(env.VITE_SITE_STATUS).toLowerCase() === "active" ? "active" : "pending";
  const contactRequested = clean(env.VITE_CONTACT_ENABLED).toLowerCase() === "true";
  const contactAllowed = status === "active" && contactRequested;
  const domain = validSiteUrl(clean(env.VITE_SITE_URL));
  const configuredPhoneDial = contactAllowed
    ? normalizedDial(env.VITE_BUSINESS_PHONE_DIAL ?? "")
    : "";
  const requestedWhatsappDial = contactAllowed
    ? normalizedWhatsAppDial(env.VITE_BUSINESS_WHATSAPP_DIAL ?? "")
    : "";
  const configuredWhatsAppLink = contactAllowed
    ? validWhatsAppLink(clean(env.VITE_BUSINESS_WHATSAPP_LINK))
    : null;
  const configuredWhatsappDial = requestedWhatsappDial || configuredWhatsAppLink?.dial || "";
  const configuredWhatsappDestination =
    configuredWhatsAppLink?.link ||
    (configuredWhatsappDial ? `https://wa.me/${configuredWhatsappDial}` : "");
  const configuredEmail = contactAllowed ? validEmail(env.VITE_BUSINESS_EMAIL ?? "") : "";
  const contactEnabled =
    contactAllowed && Boolean(configuredPhoneDial && configuredWhatsappDestination);
  const phoneDial = contactEnabled ? configuredPhoneDial : "";
  const whatsappDial = contactEnabled ? configuredWhatsappDial : "";
  const whatsappLink = contactEnabled ? configuredWhatsappDestination : "";
  const email = contactEnabled ? configuredEmail : "";

  const instagram =
    env.VITE_SOCIAL_INSTAGRAM_URL !== undefined
      ? clean(env.VITE_SOCIAL_INSTAGRAM_URL)
        ? validSocialUrl(clean(env.VITE_SOCIAL_INSTAGRAM_URL), INSTAGRAM_HOSTS)
        : ""
      : DEFAULT_INSTAGRAM_URL;
  const facebook =
    env.VITE_SOCIAL_FACEBOOK_URL !== undefined
      ? clean(env.VITE_SOCIAL_FACEBOOK_URL)
        ? validSocialUrl(clean(env.VITE_SOCIAL_FACEBOOK_URL), FACEBOOK_HOSTS)
        : ""
      : DEFAULT_FACEBOOK_URL;
  const youtube =
    env.VITE_SOCIAL_YOUTUBE_URL !== undefined
      ? clean(env.VITE_SOCIAL_YOUTUBE_URL)
        ? validSocialUrl(clean(env.VITE_SOCIAL_YOUTUBE_URL), YOUTUBE_HOSTS)
        : ""
      : DEFAULT_YOUTUBE_URL;

  return {
    status,
    name: clean(env.VITE_BRAND_NAME) || DEFAULT_BRAND_NAME,
    legalName: "",
    tagline: DEFAULT_TAGLINE,
    description: `Bespoke architectural safety solutions: invisible grills, precision safety netting, and bird protection across ${BUSINESS.regionLabel}.`,
    domain,
    domainHost: domain.replace(/^https?:\/\//, ""),
    contact: {
      enabled: contactEnabled,
      phoneDisplay: phoneDial ? clean(env.VITE_BUSINESS_PHONE_DISPLAY) || phoneDial : "",
      phoneDial,
      phoneHref: phoneDial ? `tel:${phoneDial}` : "",
      whatsappDisplay: whatsappLink
        ? clean(env.VITE_BUSINESS_WHATSAPP_DISPLAY) || whatsappDial
        : "",
      whatsappDial,
      whatsappLink,
      email,
      emailHref: email ? `mailto:${email}` : "",
      address: `Service areas: ${BUSINESS.regionLabel} (${hubCityList()})`,
    },
    socials: {
      whatsappLink,
      instagram,
      facebook,
      youtube,
    },
  };
}

const publicEnvironment: PublicEnvironment =
  typeof import.meta !== "undefined" && import.meta.env
    ? (import.meta.env as PublicEnvironment)
    : typeof process !== "undefined"
      ? process.env
      : {};

const liveProductionEnv: PublicEnvironment = {
  VITE_SITE_STATUS: "active",
  VITE_CONTACT_ENABLED: "true",
  VITE_BUSINESS_PHONE_DISPLAY: DEFAULT_PHONE_DISPLAY,
  VITE_BUSINESS_PHONE_DIAL: DEFAULT_PHONE_DIAL,
  VITE_BUSINESS_WHATSAPP_DISPLAY: DEFAULT_WHATSAPP_DISPLAY,
  VITE_BUSINESS_WHATSAPP_DIAL: DEFAULT_WHATSAPP_DIAL,
  VITE_BUSINESS_WHATSAPP_LINK: DEFAULT_WHATSAPP_LINK,
  VITE_BUSINESS_EMAIL: DEFAULT_EMAIL,
  ...publicEnvironment,
};

export const BRAND_CONFIG = createBrandConfig(liveProductionEnv);
