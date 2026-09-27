import type { ServiceId } from "./serviceIds";

/**
 * Google Ads landing pages (/lp/<service>-<city>).
 *
 * InvisProtect is a referral service: it connects a homeowner with ONE
 * independent, checked installer in their city. The installer measures,
 * quotes, installs and gives the warranty. Every sentence in this file must
 * stay true under that model — no "our technicians", no InvisProtect
 * warranty, no invented reviews, counts or ratings.
 *
 * Pages are generated from 3 services x 7 cities = 21 landing IDs.
 * `{city}` inside service copy is replaced with the city's display name.
 */

export type PaidServiceKey = "invisible-grills" | "safety-nets" | "pigeon-nets";
export type PaidCityKey =
  "hyderabad" | "vizag" | "vijayawada" | "amaravati" | "tirupati" | "warangal" | "hanamkonda";

export interface PaidFaq {
  question: string;
  answer: string;
}

export interface PaidTrustPoint {
  title: string;
  detail: string;
}

interface PaidServiceTemplate {
  key: PaidServiceKey;
  serviceId: ServiceId;
  serviceName: string;
  /** Short code used in WhatsApp reference tags, e.g. "IG". */
  code: string;
  priceFrom: string;
  priceRange: string;
  priceUnit: string;
  priceNote: string;
  priceFactors: string[];
  benefits: string[];
  buyerChecklist: string[];
  needOptions: string[];
  heroImage: string;
  heroImageWidth: number;
  heroImageHeight: number;
  heroAlt: string;
  faqs: PaidFaq[];
}

interface PaidCity {
  key: PaidCityKey;
  /** Name used in headlines, e.g. "Vizag". */
  name: string;
  /** Longer name used in the eyebrow, e.g. "Visakhapatnam (Vizag)". */
  fullName: string;
  /** Short code used in WhatsApp reference tags, e.g. "VZG". */
  code: string;
  state: "Telangana" | "Andhra Pradesh";
  localities: string[];
  localNote: Record<PaidServiceKey, string>;
}

export interface PaidLandingPageConfig {
  id: string;
  serviceKey: PaidServiceKey;
  cityKey: PaidCityKey;
  serviceId: ServiceId;
  serviceName: string;
  city: string;
  cityFullName: string;
  state: string;
  eyebrow: string;
  headline: string;
  summary: string;
  metaTitle: string;
  localNote: string;
  priceFrom: string;
  priceRange: string;
  priceUnit: string;
  priceNote: string;
  priceFactors: string[];
  benefits: string[];
  buyerChecklist: string[];
  needOptions: string[];
  localities: string[];
  faqs: PaidFaq[];
  trustSignals: PaidTrustPoint[];
  /** Tag added to prefilled WhatsApp messages, e.g. "IG-VZG". */
  whatsappRef: string;
  /** Prefilled WhatsApp message for this page. */
  whatsappMessage: string;
  consentText: string;
  consentVersion: string;
  disclosure: string;
  heroImage: string;
  heroImageWebp: string;
  heroImageWidth: number;
  heroImageHeight: number;
  heroAlt: string;
  formVariant: string;
}

export const PAID_CONSENT_VERSION = "v3-2026-partner";
export const PAID_FORM_VARIANT = "paid-v2";

const SERVICES: Record<PaidServiceKey, PaidServiceTemplate> = {
  "invisible-grills": {
    key: "invisible-grills",
    serviceId: "balcony-invisible-grills",
    serviceName: "Invisible Grills",
    code: "IG",
    priceFrom: "₹140",
    priceRange: "₹140 – ₹300",
    priceUnit: "per sq ft",
    priceNote:
      "SS304 cable is at the lower end. Marine-grade SS316, thicker cable and premium track finishes are at the upper end.",
    priceFactors: [
      "Total area in sq ft",
      "Cable grade: SS304 or marine-grade SS316",
      "Cable thickness (in mm)",
      "Gap between cables: 2-inch or 3-inch",
      "Floor height and access",
    ],
    benefits: [
      "Keeps your view open — no 'jail look' like iron grills",
      "Child and pet safe with a 2-inch cable gap option",
      "Rust-resistant SS304 or marine-grade SS316 cable",
      "Can be cut with a cable cutter in a fire emergency",
    ],
    buyerChecklist: [
      "Ask for SS316 if you live near the sea; SS304 suits most city flats.",
      "Make sure the cable thickness (in mm) is written in the quote.",
      "Choose a 2-inch gap for toddlers and pets, 3-inch for others.",
      "Get the warranty in writing before you pay.",
    ],
    needOptions: ["Balcony", "Windows", "Staircase / duplex", "Full flat / villa"],
    heroImage: "/images/paid/invisible-grills.webp",
    heroImageWidth: 960,
    heroImageHeight: 720,
    heroAlt: "Illustrative image of invisible grill cables across a balcony opening",
    faqs: [
      {
        question: "What is the price of invisible grills in {city}?",
        answer:
          "Most homes pay ₹140 – ₹300 per sq ft. SS304 cable is at the lower end; marine-grade SS316, thicker cable and premium tracks are at the upper end. The installer gives an exact written quote after measuring at the free site visit.",
      },
      {
        question: "How long does installation take?",
        answer:
          "Once measured, most flats are done in a day. Larger villas can take longer — the installer confirms the timeline in the quote.",
      },
      {
        question: "Are invisible grills safe for small children?",
        answer:
          "Choose a 2-inch cable gap for toddlers and pets. Invisible grills are a fall-prevention barrier; they don't replace adult supervision.",
      },
      {
        question: "What happens in a fire emergency?",
        answer:
          "The cables can be cut with a standard cable cutter, unlike iron grills that need a grinder.",
      },
      {
        question: "Who installs and who gives the warranty?",
        answer:
          "InvisProtect connects you with one checked, independent installer in {city}. The installer measures, quotes, installs and gives the warranty. Always ask for the warranty in writing before paying.",
      },
    ],
  },
  "safety-nets": {
    key: "safety-nets",
    serviceId: "balcony-safety-nets",
    serviceName: "Safety Nets",
    code: "SN",
    priceFrom: "₹15",
    priceRange: "₹15 – ₹35",
    priceUnit: "per sq ft",
    priceNote:
      "Depends on the net material (HDPE or nylon), mesh size, UV grade and the fixing needed around beams and pillars.",
    priceFactors: [
      "Total area in sq ft",
      "Net material: HDPE or nylon",
      "Mesh size",
      "UV-stabilised grade",
      "Fixing around beams, pillars and parapets",
    ],
    benefits: [
      "Stops falls of kids, pets and things from balconies and ducts",
      "Thin, UV-stabilised net — light and air still pass through",
      "Fitted with stainless steel hooks and a border rope",
      "Also for staircases, open ducts and terraces",
    ],
    buyerChecklist: [
      "Ask for a UV-stabilised net — cheap nets turn brittle in the sun.",
      "Check the mesh size suits your need (children, pets or birds).",
      "Stainless steel hooks don't rust.",
      "Get the warranty in writing before you pay.",
    ],
    needOptions: ["Balcony", "Duct / shaft", "Staircase", "Terrace / play area"],
    heroImage: "/images/paid/safety-nets.webp",
    heroImageWidth: 960,
    heroImageHeight: 720,
    heroAlt: "Illustrative image of a safety net across an apartment balcony",
    faqs: [
      {
        question: "What is the price of safety nets in {city}?",
        answer:
          "Most safety nets cost ₹15 – ₹35 per sq ft depending on the material (HDPE or nylon), mesh size, UV grade and fixing. The installer gives an exact written quote after the free site visit.",
      },
      {
        question: "How long does installation take?",
        answer:
          "Most balconies are netted in a few hours once measured. The installer confirms the timeline in the quote.",
      },
      {
        question: "Will the net block light or my view?",
        answer: "No. The net is thin and lets light and air through — you can still see outside.",
      },
      {
        question: "Where can safety nets be fitted?",
        answer: "Balconies, windows, staircases, open ducts, terraces and children's play areas.",
      },
      {
        question: "Who installs and who gives the warranty?",
        answer:
          "InvisProtect connects you with one checked, independent installer in {city}. The installer measures, quotes, installs and gives the warranty. Always ask for the warranty in writing before paying.",
      },
    ],
  },
  "pigeon-nets": {
    key: "pigeon-nets",
    serviceId: "pigeon-safety-nets",
    serviceName: "Pigeon Nets",
    code: "PN",
    priceFrom: "₹15",
    priceRange: "₹15 – ₹35",
    priceUnit: "per sq ft",
    priceNote:
      "Depends on the net material, mesh size, UV grade and how the edges are sealed around the opening.",
    priceFactors: [
      "Total area in sq ft",
      "Net material and mesh size",
      "UV-stabilised grade",
      "Number of openings (balcony, windows, AC ledge)",
      "Floor height and access",
    ],
    benefits: [
      "Keeps pigeons out — no droppings, feathers or nesting",
      "Thin net that is hard to notice from a distance",
      "Light and air still pass through",
      "Edges sealed with stainless steel hooks and border rope",
    ],
    buyerChecklist: [
      "The net must cover the full opening with the edges sealed — gaps let pigeons back in.",
      "Ask for a UV-stabilised net so it lasts in the sun.",
      "Stainless steel hooks don't rust.",
      "Get the warranty in writing before you pay.",
    ],
    needOptions: ["Balcony", "Windows / AC ledge", "Duct / shaft", "Whole building"],
    heroImage: "/images/paid/pigeon-nets.webp",
    heroImageWidth: 960,
    heroImageHeight: 720,
    heroAlt: "Illustrative image of a pigeon net covering an apartment balcony",
    faqs: [
      {
        question: "What is the price of pigeon nets in {city}?",
        answer:
          "Most pigeon nets cost ₹15 – ₹35 per sq ft depending on the net, mesh size, UV grade and number of openings. The installer gives an exact written quote after the free site visit.",
      },
      {
        question: "Will it stop pigeons completely?",
        answer:
          "A tight net that covers the full opening, with the edges sealed, keeps pigeons out. Gaps at the edges are the usual reason pigeons get back in.",
      },
      {
        question: "Will the net look ugly?",
        answer: "No. A thin transparent or black net is hard to notice from a distance.",
      },
      {
        question: "How long does installation take?",
        answer:
          "Most balconies are done in a few hours once measured. The installer confirms the timeline in the quote.",
      },
      {
        question: "Who installs and who gives the warranty?",
        answer:
          "InvisProtect connects you with one checked, independent installer in {city}. The installer measures, quotes, installs and gives the warranty. Always ask for the warranty in writing before paying.",
      },
    ],
  },
};

const CITIES: Record<PaidCityKey, PaidCity> = {
  hyderabad: {
    key: "hyderabad",
    name: "Hyderabad",
    fullName: "Hyderabad & Secunderabad",
    code: "HYD",
    state: "Telangana",
    localities: [
      "Gachibowli",
      "Kondapur",
      "Madhapur",
      "HITEC City",
      "Kokapet",
      "Financial District",
      "Narsingi",
      "Manikonda",
      "Tellapur",
      "Kukatpally",
      "Miyapur",
      "Bachupally",
      "Nizampet",
      "Kompally",
      "Jubilee Hills",
      "Banjara Hills",
      "Secunderabad",
      "Uppal",
      "LB Nagar",
      "Attapur",
    ],
    localNote: {
      "invisible-grills":
        "Made for Hyderabad's high-rise flats and gated communities — measured to your exact balcony, window or duplex staircase.",
      "safety-nets":
        "For balconies, ducts and staircases in Hyderabad apartments and independent houses — fitted tight with no gaps.",
      "pigeon-nets":
        "Pigeon droppings on your Hyderabad balcony or AC ledge? A full-cover net stops pigeons from sitting and nesting.",
    },
  },
  vizag: {
    key: "vizag",
    name: "Vizag",
    fullName: "Visakhapatnam (Vizag)",
    code: "VZG",
    state: "Andhra Pradesh",
    localities: [
      "Madhurawada",
      "PM Palem",
      "Yendada",
      "Rushikonda",
      "MVP Colony",
      "Seethammadhara",
      "Siripuram",
      "Dwaraka Nagar",
      "Beach Road",
      "Lawsons Bay Colony",
      "Pedda Waltair",
      "Akkayyapalem",
      "Gajuwaka",
      "Kommadi",
      "Pendurthi",
    ],
    localNote: {
      "invisible-grills":
        "Near the sea? Choose marine-grade SS316 cable — salty coastal air corrodes lower grades faster.",
      "safety-nets":
        "UV-stabilised nets with strong fixing for windy, sea-facing balconies in Vizag.",
      "pigeon-nets":
        "Stop pigeons nesting on sea-facing balconies and AC ledges — with rust-free stainless steel hooks for coastal air.",
    },
  },
  vijayawada: {
    key: "vijayawada",
    name: "Vijayawada",
    fullName: "Vijayawada",
    code: "VJA",
    state: "Andhra Pradesh",
    localities: [
      "Benz Circle",
      "Patamata",
      "Labbipet",
      "Moghalrajpuram",
      "Governorpet",
      "Gunadala",
      "Ramavarappadu",
      "Currency Nagar",
      "Kanuru",
      "Poranki",
      "Tadigadapa",
      "Bhavanipuram",
      "Gollapudi",
    ],
    localNote: {
      "invisible-grills":
        "Open balconies for Vijayawada apartments — safety for kids without the heavy iron-grill look.",
      "safety-nets":
        "Balcony, duct and staircase safety nets for Vijayawada apartments and independent houses.",
      "pigeon-nets":
        "Pigeons troubling your Vijayawada balcony? A full-cover net keeps balconies and AC ledges clean.",
    },
  },
  amaravati: {
    key: "amaravati",
    name: "Amaravati",
    fullName: "Amaravati · Tadepalli · Mangalagiri",
    code: "AMR",
    state: "Andhra Pradesh",
    localities: [
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
    localNote: {
      "invisible-grills":
        "Moving into a new flat in the capital region? Add invisible grills before you move in — measured to each opening.",
      "safety-nets":
        "Safety nets for new apartments in Tadepalli, Mangalagiri and the capital region.",
      "pigeon-nets":
        "Net your new balcony before pigeons start nesting — much easier than removing them later.",
    },
  },
  tirupati: {
    key: "tirupati",
    name: "Tirupati",
    fullName: "Tirupati",
    code: "TPT",
    state: "Andhra Pradesh",
    localities: [
      "Tiruchanur",
      "MR Palli",
      "Mangalam",
      "Akkarampalle",
      "Padmavathi Nagar",
      "Balaji Colony",
      "Royal Nagar",
      "Vaikuntapuram",
      "Karakambadi",
      "Air Bypass Road",
      "Renigunta",
    ],
    localNote: {
      "invisible-grills":
        "Open balconies with safety for kids and pets — measured and fitted to your Tirupati home.",
      "safety-nets":
        "Monkeys and pigeons are common in Tirupati — a strong net keeps both out of balconies and terraces.",
      "pigeon-nets":
        "Keep pigeons — and, with a stronger net, monkeys — out of your Tirupati balcony.",
    },
  },
  warangal: {
    key: "warangal",
    name: "Warangal",
    fullName: "Warangal",
    code: "WGL",
    state: "Telangana",
    localities: [
      "Kareemabad",
      "Desaipet",
      "Rangashaipet",
      "Kashibugga",
      "Kothawada",
      "Fort Warangal",
      "Girmajipet",
      "Mattewada",
      "Shivanagar",
    ],
    localNote: {
      "invisible-grills":
        "For Warangal's new apartments and independent houses — child-safe balconies without the iron-grill look.",
      "safety-nets": "Balcony, staircase and terrace safety nets for Warangal homes.",
      "pigeon-nets": "Stop pigeon droppings and nesting on balconies and AC ledges in Warangal.",
    },
  },
  hanamkonda: {
    key: "hanamkonda",
    name: "Hanamkonda",
    fullName: "Hanamkonda & Kazipet",
    code: "HNK",
    state: "Telangana",
    localities: [
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
      "Kazipet",
    ],
    localNote: {
      "invisible-grills":
        "For Hanamkonda's apartments, duplexes and independent houses — keep the view, add the safety.",
      "safety-nets": "Balcony, staircase and terrace safety nets for Hanamkonda homes.",
      "pigeon-nets": "Stop pigeon droppings and nesting on balconies and AC ledges in Hanamkonda.",
    },
  },
};

export const PAID_SERVICE_KEYS = Object.keys(SERVICES) as PaidServiceKey[];
export const PAID_CITY_KEYS = Object.keys(CITIES) as PaidCityKey[];

function withCity(text: string, city: string): string {
  return text.split("{city}").join(city);
}

function trustSignalsFor(city: string): PaidTrustPoint[] {
  return [
    {
      title: "One installer, not ten calls",
      detail: `Your number goes to one checked installer in ${city} only — never to a list of vendors.`,
    },
    {
      title: "Price range upfront",
      detail: `Typical ${city} prices are shown on this page. The installer gives an exact written quote after measuring.`,
    },
    {
      title: "Free site visit, no obligation",
      detail: "Measurement and quote are free. You decide after you see the price.",
    },
    {
      title: "Checked installers",
      detail:
        "We check an installer's past work and customer references before sending them requests.",
    },
  ];
}

function buildLandingPage(service: PaidServiceTemplate, city: PaidCity): PaidLandingPageConfig {
  const id = `${service.key}-${city.key}`;
  const whatsappRef = `${service.code}-${city.code}`;
  return {
    id,
    serviceKey: service.key,
    cityKey: city.key,
    serviceId: service.serviceId,
    serviceName: service.serviceName,
    city: city.name,
    cityFullName: city.fullName,
    state: city.state,
    eyebrow: `${city.fullName} · Free site visit`,
    headline: `${service.serviceName} in ${city.name}`,
    summary: `Free site visit and exact price from a checked local installer in ${city.name}. Most homes pay ${service.priceRange} ${service.priceUnit}.`,
    metaTitle: `${service.serviceName} in ${city.name} — Price from ${service.priceFrom}/sq ft`,
    localNote: city.localNote[service.key],
    priceFrom: service.priceFrom,
    priceRange: service.priceRange,
    priceUnit: service.priceUnit,
    priceNote: service.priceNote,
    priceFactors: service.priceFactors,
    benefits: service.benefits,
    buyerChecklist: service.buyerChecklist,
    needOptions: service.needOptions,
    localities: city.localities,
    faqs: service.faqs.map((faq) => ({
      question: withCity(faq.question, city.name),
      answer: withCity(faq.answer, city.name),
    })),
    trustSignals: trustSignalsFor(city.name),
    whatsappRef,
    whatsappMessage: `Hi InvisProtect, I need ${service.serviceName.toLowerCase()} in ${city.name}. My area: `,
    consentText: `I agree that InvisProtect may share these details with one checked installer in ${city.name}, and that InvisProtect and that installer may call or WhatsApp me about this request.`,
    consentVersion: PAID_CONSENT_VERSION,
    disclosure: `InvisProtect is a referral service. We connect you with one independent, checked installer in ${city.name}. The installer gives the final quote, does the installation and provides the warranty.`,
    heroImage: service.heroImage,
    heroImageWebp: service.heroImage,
    heroImageWidth: service.heroImageWidth,
    heroImageHeight: service.heroImageHeight,
    heroAlt: service.heroAlt,
    formVariant: PAID_FORM_VARIANT,
  };
}

export const paidLandingPages: Record<string, PaidLandingPageConfig> = Object.fromEntries(
  PAID_SERVICE_KEYS.flatMap((serviceKey) =>
    PAID_CITY_KEYS.map((cityKey) => {
      const page = buildLandingPage(SERVICES[serviceKey], CITIES[cityKey]);
      return [page.id, page] as const;
    }),
  ),
);

export type PaidLandingId = keyof typeof paidLandingPages;

export function getPaidLandingPage(id: string): PaidLandingPageConfig | undefined {
  return Object.prototype.hasOwnProperty.call(paidLandingPages, id)
    ? paidLandingPages[id]
    : undefined;
}

/** Adds a prefilled message (with a source tag) to a wa.me / api.whatsapp.com link. */
export function buildWhatsAppHref(baseLink: string, message: string, ref?: string): string {
  if (!baseLink) return "";
  const text = ref ? `${message} [ref ${ref}]` : message;
  try {
    const url = new URL(baseLink);
    url.searchParams.set("text", text);
    return url.toString();
  } catch {
    return baseLink;
  }
}
