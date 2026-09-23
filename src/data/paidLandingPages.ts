import type { ServiceId } from "./serviceIds";

export interface PaidLandingPageConfig {
  id: string;
  serviceId: ServiceId;
  serviceName: string;
  city: string;
  eyebrow: string;
  headline: string;
  summary: string;
  heroImage: string;
  heroImageWebp: string;
  heroImageWidth: number;
  heroImageHeight: number;
  heroAlt: string;
  formVariant: string;
  benefits: string[];
  trustSignals: Array<{ title: string; detail: string }>;
}

export const paidLandingPages = {
  "invisible-grills-hyderabad": {
    id: "invisible-grills-hyderabad",
    serviceId: "balcony-invisible-grills",
    serviceName: "Invisible Grills",
    city: "Hyderabad",
    eyebrow: "Hyderabad site surveys",
    headline: "Invisible Grills in Hyderabad",
    summary:
      "Request a site survey for high-tensile stainless steel cable safety grills for balconies, windows, and staircases.",
    heroImage: "/images/category-invisible-grills.webp",
    heroImageWebp: "/images/paid/invisible-grills-hyderabad.webp",
    heroImageWidth: 960,
    heroImageHeight: 403,
    heroAlt: "Illustrative view of invisible grill cables across a modern balcony opening",
    formVariant: "paid-short-v1",
    benefits: [
      "AISI 316 stainless steel cable options",
      "2-inch or 3-inch cable spacing",
      "Measured to the opening before installation",
    ],
    trustSignals: [
      {
        title: "Material specification",
        detail: "AISI 316 stainless steel cable with a protective Nylon-12 sheath.",
      },
      {
        title: "Precision survey",
        detail: "Digital measurements for opening dimensions and anchor placement.",
      },
      {
        title: "Hyderabad coverage",
        detail:
          "Service coverage includes Hyderabad and Secunderabad localities listed on our service-area page.",
      },
    ],
  },
  "safety-nets-hyderabad": {
    id: "safety-nets-hyderabad",
    serviceId: "balcony-safety-nets",
    serviceName: "Safety Nets",
    city: "Hyderabad",
    eyebrow: "Hyderabad site surveys",
    headline: "Safety Nets in Hyderabad",
    summary:
      "Request a site survey for UV-stabilized safety netting for balconies, staircases, children’s areas, and building openings.",
    heroImage: "/images/category-core-safety-nets.webp",
    heroImageWebp: "/images/paid/safety-nets-hyderabad.webp",
    heroImageWidth: 960,
    heroImageHeight: 401,
    heroAlt: "Illustrative view of safety netting across a residential balcony opening",
    formVariant: "paid-short-v1",
    benefits: [
      "Virgin HDPE monofilament net options",
      "Custom panels measured to site geometry",
      "Stainless steel perimeter fastening options",
    ],
    trustSignals: [
      {
        title: "UV-stabilized material",
        detail: "Net specifications use UV-stabilized virgin HDPE monofilament.",
      },
      {
        title: "Site-fit installation",
        detail: "Perimeters are measured around beams, pillars, and parapet walls.",
      },
      {
        title: "Hyderabad coverage",
        detail:
          "Service coverage includes Hyderabad and Secunderabad localities listed on our service-area page.",
      },
    ],
  },
} satisfies Record<string, PaidLandingPageConfig>;

export type PaidLandingId = keyof typeof paidLandingPages;

export function getPaidLandingPage(id: string): PaidLandingPageConfig | undefined {
  return paidLandingPages[id as PaidLandingId];
}
