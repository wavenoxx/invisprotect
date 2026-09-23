/**
 * ============================================================================
 * BUSINESS CONTENT CONFIG — edit this file for each new business owner.
 * ============================================================================
 *
 * Identity and contact details (name, phone, WhatsApp, email, domain, socials)
 * live in `src/config/brand.ts`. The brand colour lives in `src/styles.css`
 * (`--brand` and `--brand-deep`). Service copy lives in `src/data/servicesData.ts`.
 *
 * Everything here is read by the header, footer, service-area page, homepage,
 * structured data (SEO) and the privacy page, so a change here updates the
 * whole site.
 *
 * Honesty rules for this file:
 *  - `reviews` must only contain real reviews from real customers, with a
 *    source the owner can show (for example their Google Business Profile).
 *    Leave the array empty until real reviews exist; the reviews section then
 *    stays hidden.
 *  - `priceGuide` ranges must be the owner's own confirmed rates.
 */

export interface ServiceHub {
  /** Display name, e.g. "Hyderabad & Secunderabad". */
  city: string;
  /** Short name used in compact lists, e.g. "Hyderabad". */
  shortName: string;
  /** Name used in schema.org `areaServed`, e.g. "Hyderabad". */
  schemaName: string;
  state: string;
  tag: string;
  description: string;
  neighborhoods: string[];
  climateNotes: string;
}

export interface CustomerReview {
  quote: string;
  name: string;
  /** Locality and service, e.g. "Kondapur, Hyderabad · Balcony Invisible Grills". */
  context: string;
  /** Where the review can be checked, e.g. "Google review". */
  source: string;
}

export interface PriceGuideItem {
  service: string;
  /** e.g. "₹140 – ₹300" */
  range: string;
  /** e.g. "per sq ft" */
  unit: string;
  note: string;
  /** Optional link target, a service id from src/data/serviceIds.ts */
  serviceId?: string;
}

export interface PriceGuideConfig {
  enabled: boolean;
  eyebrow: string;
  heading: string;
  intro: string;
  items: PriceGuideItem[];
  factors: string[];
  disclaimer: string;
}

export interface BusinessConfig {
  /** Human-readable coverage, e.g. "Telangana & Andhra Pradesh". */
  regionLabel: string;
  /** Main city used for the LocalBusiness address in structured data. */
  primaryCity: string;
  /** Region used for the LocalBusiness address in structured data. */
  primaryRegion: string;
  /** Example locality shown as a form placeholder. */
  localityPlaceholder: string;
  /** Map coordinates of the main office/city for structured data. */
  geo: { latitude: number; longitude: number };
  serviceHubs: ServiceHub[];
  reviews: CustomerReview[];
  priceGuide: PriceGuideConfig;
}

export const BUSINESS: BusinessConfig = {
  regionLabel: "Telangana & Andhra Pradesh",
  primaryCity: "Hyderabad",
  primaryRegion: "Telangana",
  localityPlaceholder: "e.g. Kondapur, Hyderabad",
  geo: { latitude: 17.385, longitude: 78.4867 },

  serviceHubs: [
    {
      city: "Hyderabad & Secunderabad",
      shortName: "Hyderabad",
      schemaName: "Hyderabad",
      state: "Telangana",
      tag: "Telangana Central Hub",
      description:
        "High-rise gated communities, premium duplexes, and luxury villa perimeters engineered with marine-grade invisible grills and fall-containment safety nets.",
      neighborhoods: [
        "Financial District",
        "Gachibowli",
        "HITEC City",
        "Kokapet",
        "Kondapur",
        "Madhapur",
        "Nanakramguda",
        "Jubilee Hills",
        "Banjara Hills",
        "Tellapur",
      ],
      climateNotes:
        "Calibrated for high thermal variation and intense summer sun with UV-stabilized Nylon-12 coating and heavy-duty RCC slab anchor tracks.",
    },
    {
      city: "Visakhapatnam (Vizag)",
      shortName: "Vizag",
      schemaName: "Visakhapatnam",
      state: "Andhra Pradesh",
      tag: "Andhra Pradesh Coastal Hub",
      description:
        "Marine-grade AISI 316 invisible grills and pigeon deterrence systems engineered specifically for coastal salt-spray corridors and sea-facing high-rises.",
      neighborhoods: [
        "Madhurawada",
        "Yendada",
        "Rushikonda",
        "MVP Colony",
        "Seethammadhara",
        "Siripuram",
        "Beach Road",
        "Pedda Waltair",
        "Lawsons Bay Colony",
        "Kommadi",
      ],
      climateNotes:
        "Wind-calibrated anchor tracks and strict AISI 316 austenitic stainless steel core specified to resist pitting from coastal sea breeze and tropical humidity.",
    },
    {
      city: "Vijayawada",
      shortName: "Vijayawada",
      schemaName: "Vijayawada",
      state: "Andhra Pradesh",
      tag: "Andhra Pradesh Central Urban Hub",
      description:
        "Dense urban residential corridors, commercial balconies, and premium apartments fitted with laser-measured safety netting and stainless steel bird spikes.",
      neighborhoods: [
        "Benz Circle",
        "Patamata",
        "Labbipet",
        "Moghalrajpuram",
        "Kanuru",
        "Poranki",
        "Tadigadapa",
        "Currency Nagar",
        "Ramavarappadu",
        "Gunadala",
      ],
      climateNotes:
        "High-temperature resistant polymer netting and anodized aluminum profiles designed for tropical heat and long-term tensile durability.",
    },
    {
      city: "Amaravati",
      shortName: "Amaravati",
      schemaName: "Amaravati",
      state: "Andhra Pradesh",
      tag: "Andhra Pradesh Capital Region Hub",
      description:
        "Contemporary residential projects, government employee quarters, and luxury villas throughout the expanding capital development geography.",
      neighborhoods: [
        "Tadepalli",
        "Mangalagiri",
        "Undavalli",
        "Penumaka",
        "Neerukonda",
        "Kuragallu",
        "Mandadam",
        "Velagapudi",
        "Rayapudi",
        "Thullur",
      ],
      climateNotes:
        "Engineered for open-plain wind dynamics and high-elevation residential balconies with reinforced expansion anchoring.",
    },
    {
      city: "Tirupati",
      shortName: "Tirupati",
      schemaName: "Tirupati",
      state: "Andhra Pradesh",
      tag: "Andhra Pradesh Southern Hub",
      description:
        "Established residential neighborhoods and pilgrimage corridors requiring specialized monkey protection nets, bird spikes, and balcony safety netting.",
      neighborhoods: [
        "MR Palli",
        "Tiruchanur",
        "Mangalam",
        "Akkarampalle",
        "Renigunta",
        "Royal Nagar",
        "Padmavathi Nagar",
        "Balaji Colony",
        "Vaikuntapuram",
        "Karakambadi",
      ],
      climateNotes:
        "High-tensile heavy-gauge netting formulated to withstand foothills wildlife pressure and prolonged direct solar radiation.",
    },
    {
      city: "Warangal",
      shortName: "Warangal",
      schemaName: "Warangal",
      state: "Telangana",
      tag: "Telangana Eastern Urban Hub",
      description:
        "Major Tier-2 urban residential market with expanding multi-story apartments, internal stairwells, and terrace fall-containment installations.",
      neighborhoods: [
        "Kareemabad",
        "Desaipet",
        "Rangashaipet",
        "Kashibugga",
        "Kothawada",
        "Urs",
        "Khila Warangal / Fort Warangal",
        "Girmajipet",
      ],
      climateNotes:
        "Precision structural fastening into brick and concrete masonry using anti-corrosive stainless steel fasteners.",
    },
    {
      city: "Hanamkonda",
      shortName: "Hanamkonda",
      schemaName: "Hanamkonda",
      state: "Telangana",
      tag: "Telangana Residential & Premium Housing Hub",
      description:
        "Fast-growing premium residential belt featuring contemporary apartments, independent homes, and duplex balconies fitted with invisible safety grills.",
      neighborhoods: [
        "Balasamudram",
        "Subedari",
        "Hunter Road",
        "Waddepally",
        "Nakkalagutta",
        "Kumarpally",
        "Gopalpur",
        "Naim Nagar",
        "Bheemaram",
        "100 Feet Road",
      ],
      climateNotes:
        "Laser site measurement protocols ensuring minimal disruption to architectural elevations and window sightlines.",
    },
  ],

  // Add real customer reviews only (e.g. copied from the Google Business
  // Profile with the customer's permission). Empty = section hidden.
  reviews: [],

  priceGuide: {
    enabled: true,
    eyebrow: "Transparent Pricing",
    heading: "Indicative Price Guide",
    intro:
      "Honest starting ranges so you can plan before the survey. Your exact quote depends on the opening size and the specification you choose.",
    items: [
      {
        service: "Invisible Grills",
        range: "₹140 – ₹300",
        unit: "per sq ft",
        note: "SS 304 cable at the lower end; AISI 316 marine-grade cable, thicker gauge and premium track finishes at the upper end.",
        serviceId: "balcony-invisible-grills",
      },
      {
        service: "Safety & Pigeon Nets",
        range: "₹15 – ₹35",
        unit: "per sq ft",
        note: "Depends on net material (HDPE / nylon), mesh size, UV grade and the anchoring needed around beams and pillars.",
        serviceId: "balcony-safety-nets",
      },
      {
        service: "Bird Spikes, Hangers & Specialty",
        range: "On survey",
        unit: "quoted per site",
        note: "Bird spikes, cloth drying hangers, sports, coconut and industrial nets are quoted after measuring the site.",
      },
    ],
    factors: [
      "Total area in sq ft",
      "Cable grade & thickness (SS 304 vs AISI 316)",
      "Cable spacing (2-inch child-safe vs 3-inch)",
      "Floor height & access",
      "Track finish & colour",
    ],
    disclaimer:
      "Indicative ranges only, not a quotation. The final price is confirmed in writing after a free site survey.",
  },
};

/* ── Helpers used across the site ─────────────────────────────────────────── */

export const SERVICE_HUBS = BUSINESS.serviceHubs;

/** Distinct states in the order they first appear. */
export function hubStates(): string[] {
  return [...new Set(SERVICE_HUBS.map((h) => h.state))];
}

/** "Hyderabad, Visakhapatnam, … and Hanamkonda" */
export function hubCityList(key: "schemaName" | "shortName" = "schemaName"): string {
  const names = SERVICE_HUBS.map((h) => h[key]);
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

/** "Hyderabad · Vizag · Vijayawada …" */
export function hubCityDots(key: "schemaName" | "shortName" = "shortName"): string {
  return SERVICE_HUBS.map((h) => h[key]).join(" · ");
}

/** [{ state: "Telangana", cities: ["Hyderabad & Secunderabad", …] }, …] */
export function hubsByState(
  key: "city" | "shortName" | "schemaName" = "city",
): { state: string; cities: string[] }[] {
  return hubStates().map((state) => ({
    state,
    cities: SERVICE_HUBS.filter((h) => h.state === state).map((h) => h[key]),
  }));
}

export const HUB_COUNT = SERVICE_HUBS.length;
