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
 * Pages are generated from 8 services x 7 cities = 56 landing IDs.
 * `{city}` inside service copy is replaced with the city's display name.
 */

export type PaidServiceKey =
  | "invisible-grills"
  | "safety-nets"
  | "pigeon-nets"
  | "bird-spikes"
  | "monkey-nets"
  | "mosquito-nets"
  | "cloth-drying-hangers"
  | "cricket-nets";
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

/** Cinematic image pair, shown uncropped: 4:5 on mobile, 2.39:1 on desktop. */
export interface PaidHeroImage {
  /** Base path without extension; `.webp` and `.jpg` both exist. */
  mobile: string;
  desktop: string;
  alt: string;
}

interface PaidServiceTemplate {
  key: PaidServiceKey;
  serviceId: ServiceId;
  serviceName: string;
  /** Short code used in WhatsApp reference tags, e.g. "IG". */
  code: string;
  quoteFactors: string[];
  /** One line under "Why {service}" in Chapter 01. */
  benefitsIntro: string;
  benefits: string[];
  buyerChecklist: string[];
  needOptions: string[];
  hero: PaidHeroImage;
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
  quoteFactors: string[];
  benefitsIntro: string;
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
  hero: PaidHeroImage;
  /** Closing cinematic band (same 4:5 / 2.39:1 treatment as the hero). */
  closingImage: PaidHeroImage;
  formVariant: string;
}

export const PAID_CONSENT_VERSION = "v3-2026-partner";

const CLOSING_IMAGE: PaidHeroImage = {
  mobile: "/images/homepage/banner-8-mobile",
  desktop: "/images/homepage/banner-8-desktop",
  alt: "Open living space with an uninterrupted balcony view",
};
export const PAID_FORM_VARIANT = "paid-v2";

const SERVICES: Record<PaidServiceKey, PaidServiceTemplate> = {
  "invisible-grills": {
    key: "invisible-grills",
    serviceId: "balcony-invisible-grills",
    serviceName: "Invisible Grills",
    code: "IG",
    quoteFactors: [
      "Total area of the openings",
      "Cable grade: SS304 or marine-grade SS316",
      "Cable thickness and spacing",
      "Floor height and access",
      "Track finish",
    ],
    benefitsIntro: "Quiet protection that keeps your home open to light, air and view.",
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
    hero: {
      mobile: "/images/paid/invisible-grills-mobile",
      desktop: "/images/paid/invisible-grills-desktop",
      alt: "Sea-facing balcony protected by slim invisible grill cables",
    },
    faqs: [
      {
        question: "How is the price decided?",
        answer:
          "Every home is different. At the free site visit the installer measures your openings and gives an exact written quote based on the area, the cable grade (SS304 or SS316), the cable thickness and spacing, and the floor height.",
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
    quoteFactors: [
      "Total area of the openings",
      "Net material: HDPE or nylon",
      "Mesh size and UV grade",
      "Fixing around beams and pillars",
      "Floor height and access",
    ],
    benefitsIntro: "Quiet protection that keeps your home open to light, air and view.",
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
    hero: {
      mobile: "/images/paid/safety-nets-mobile",
      desktop: "/images/paid/safety-nets-desktop",
      alt: "High-rise balcony fitted with a fine safety net, city view beyond",
    },
    faqs: [
      {
        question: "How is the price decided?",
        answer:
          "Every home is different. At the free site visit the installer measures your openings and gives an exact written quote based on the area, the net material, the mesh size and UV grade, and the fixing needed.",
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
    quoteFactors: [
      "Total area of the openings",
      "Net material and mesh size",
      "UV-stabilised grade",
      "Number of openings: balcony, windows, AC ledge",
      "Floor height and access",
    ],
    benefitsIntro: "Quiet protection that keeps your home open to light, air and view.",
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
    hero: {
      mobile: "/images/paid/pigeon-nets-mobile",
      desktop: "/images/paid/pigeon-nets-desktop",
      alt: "Apartment balcony sealed with a near-invisible pigeon net",
    },
    faqs: [
      {
        question: "How is the price decided?",
        answer:
          "Every home is different. At the free site visit the installer measures your openings and gives an exact written quote based on the area, the net and mesh size, the number of openings and the floor height.",
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
  "bird-spikes": {
    key: "bird-spikes",
    serviceId: "pigeons-bird-spikes",
    serviceName: "Bird Spikes",
    code: "BS",
    quoteFactors: [
      "Running length of ledges, sills and parapets",
      "Spike material and base",
      "Rows needed on each ledge",
      "Surface: concrete, tile, metal or glass",
      "Floor height and access",
    ],
    benefitsIntro: "A quiet fix that keeps pigeons off ledges, sills and AC units.",
    benefits: [
      "Stops pigeons sitting and nesting on ledges, sills and AC units",
      "Humane — spikes stop birds landing without hurting them",
      "Stainless steel spikes that don't rust in the rain",
      "Low profile and hard to notice from the street",
    ],
    buyerChecklist: [
      "Ask for stainless steel spikes on a UV-stabilised base — cheap plastic turns brittle in the sun.",
      "Cover every ledge, sill and AC top where pigeons sit — they simply move to the next gap.",
      "Ask how the spikes are fixed: outdoor adhesive or screws that suit your surface.",
      "Get the warranty in writing before you pay.",
    ],
    needOptions: [
      "Window sills / ledges",
      "AC outdoor unit",
      "Parapet / wall",
      "Signboard / elevation",
    ],
    hero: {
      mobile: "/images/paid/bird-spikes-mobile",
      desktop: "/images/paid/bird-spikes-desktop",
      alt: "Stainless steel bird spikes along a window ledge beside an AC unit",
    },
    faqs: [
      {
        question: "How is the price decided?",
        answer:
          "Every home is different. At the free site visit the installer measures the ledges and sills to be covered and gives an exact written quote based on the length, the spike material, the rows needed and the floor height.",
      },
      {
        question: "Do bird spikes hurt pigeons?",
        answer:
          "No. The spikes are blunt and only stop pigeons from landing. Birds simply move elsewhere.",
      },
      {
        question: "Spikes or a net — which do I need?",
        answer:
          "Spikes suit ledges, sills and AC tops where pigeons sit. If pigeons fly into an open balcony, a pigeon net is the better fix. The installer advises at the site visit.",
      },
      {
        question: "How long does installation take?",
        answer:
          "Most homes are done in a few hours once measured. The installer confirms the timeline in the quote.",
      },
      {
        question: "Who installs and who gives the warranty?",
        answer:
          "InvisProtect connects you with one checked, independent installer in {city}. The installer measures, quotes, installs and gives the warranty. Always ask for the warranty in writing before paying.",
      },
    ],
  },
  "monkey-nets": {
    key: "monkey-nets",
    serviceId: "monkey-safety-nets",
    serviceName: "Monkey Safety Nets",
    code: "MK",
    quoteFactors: [
      "Total area to be covered",
      "Net material and strength",
      "Mesh size",
      "Frame, cable or hook fixing",
      "Floor height and access",
    ],
    benefitsIntro: "A strong, humane barrier that keeps monkeys out and lets light and air in.",
    benefits: [
      "Keeps monkeys out of balconies, terraces and open courtyards",
      "Stronger net made for monkeys, not just birds",
      "Light and air still pass through",
      "Fixed tight at the edges so there is no way in",
    ],
    buyerChecklist: [
      "Ask for a net made for monkeys — a light pigeon net can be torn.",
      "Close the whole opening, including gaps near pipes, ledges and grills.",
      "Ask how the edges and corners are fixed — monkeys test the weakest point.",
      "Get the warranty in writing before you pay.",
    ],
    needOptions: ["Balcony", "Terrace", "Courtyard / duct", "Windows"],
    hero: {
      mobile: "/images/paid/monkey-nets-mobile",
      desktop: "/images/paid/monkey-nets-desktop",
      alt: "Balcony enclosed with a strong monkey safety net, trees beyond",
    },
    faqs: [
      {
        question: "How is the price decided?",
        answer:
          "Every home is different. At the free site visit the installer measures the openings and gives an exact written quote based on the area, the net strength, the fixing needed and the floor height.",
      },
      {
        question: "Will a pigeon net stop monkeys?",
        answer:
          "Usually not. Monkeys can tear a light bird net. A monkey net uses stronger material and firmer fixing at the edges.",
      },
      {
        question: "Does the net harm monkeys?",
        answer: "No. The net is a barrier — it keeps monkeys out without hurting them.",
      },
      {
        question: "How long does installation take?",
        answer:
          "Most balconies and terraces are done in a day once measured. The installer confirms the timeline in the quote.",
      },
      {
        question: "Who installs and who gives the warranty?",
        answer:
          "InvisProtect connects you with one checked, independent installer in {city}. The installer measures, quotes, installs and gives the warranty. Always ask for the warranty in writing before paying.",
      },
    ],
  },
  "mosquito-nets": {
    key: "mosquito-nets",
    serviceId: "mosquito-safety-nets",
    serviceName: "Mosquito Nets",
    code: "MQ",
    quoteFactors: [
      "Number and size of windows and doors",
      "Type: fixed, sliding, pleated or velcro",
      "Mesh material: fibreglass or stainless steel",
      "Frame: aluminium or uPVC",
      "Balcony or full enclosure",
    ],
    benefitsIntro: "Open windows and fresh air — without the mosquitoes.",
    benefits: [
      "Keeps mosquitoes out while windows and doors stay open",
      "Fresh air and light without sprays or coils",
      "Made to measure for each window, door and balcony",
      "Sliding and pleated options for doors you use every day",
    ],
    buyerChecklist: [
      "Ask what the mesh is made of — fibreglass or stainless steel — and get it in writing.",
      "Check that every frame is sealed at the edges; small gaps let mosquitoes in.",
      "Choose sliding or pleated mesh for doors and windows you open every day.",
      "Get the warranty in writing before you pay.",
    ],
    needOptions: ["Windows", "Doors", "Balcony", "Full flat / villa"],
    hero: {
      mobile: "/images/paid/mosquito-nets-mobile",
      desktop: "/images/paid/mosquito-nets-desktop",
      alt: "Bedroom balcony door fitted with a fine mosquito mesh at dusk",
    },
    faqs: [
      {
        question: "How is the price decided?",
        answer:
          "Every home is different. At the free site visit the installer measures each window and door and gives an exact written quote based on the sizes, the mesh type and material, and the frame.",
      },
      {
        question: "Which type suits my home?",
        answer:
          "Fixed or velcro mesh suits windows you rarely open. Sliding or pleated mesh suits doors and windows you use every day. The installer shows samples at the site visit.",
      },
      {
        question: "Will the mesh block light or air?",
        answer: "No. The mesh is fine and lets light and air through.",
      },
      {
        question: "How long does installation take?",
        answer:
          "Frames are made to your measurements, so fitting usually happens a few days after the site visit. The installer confirms the timeline in the quote.",
      },
      {
        question: "Who installs and who gives the warranty?",
        answer:
          "InvisProtect connects you with one checked, independent installer in {city}. The installer measures, quotes, installs and gives the warranty. Always ask for the warranty in writing before paying.",
      },
    ],
  },
  "cloth-drying-hangers": {
    key: "cloth-drying-hangers",
    serviceId: "cloth-drying-hangers",
    serviceName: "Cloth Drying Hangers",
    code: "CH",
    quoteFactors: [
      "Number of drying rods",
      "Rod length and material",
      "Ceiling type and height",
      "Pulley or fixed system",
      "Balcony, utility area or terrace",
    ],
    benefitsIntro: "Dry clothes overhead and keep your balcony clear.",
    benefits: [
      "Dries clothes overhead and frees up balcony floor space",
      "Raise and lower the rods with a smooth pulley",
      "Stainless steel rod options that don't rust on open balconies",
      "Fits balconies, utility areas and terraces",
    ],
    buyerChecklist: [
      "Ask for stainless steel rods and pulleys — cheaper metal rusts on open balconies.",
      "Check the ceiling fixing suits your ceiling: RCC slab, false ceiling or tiles.",
      "Ask how much weight each rod is rated to carry, in writing.",
      "Get the warranty in writing before you pay.",
    ],
    needOptions: ["Balcony", "Utility area", "Terrace", "More than one hanger"],
    hero: {
      mobile: "/images/paid/cloth-drying-hangers-mobile",
      desktop: "/images/paid/cloth-drying-hangers-desktop",
      alt: "Ceiling-mounted cloth drying hanger in a bright apartment balcony",
    },
    faqs: [
      {
        question: "How is the price decided?",
        answer:
          "Every home is different. At the free site visit the installer checks your ceiling and gives an exact written quote based on the number of rods, the rod length and material, and the pulley system.",
      },
      {
        question: "Will it fit my balcony ceiling?",
        answer:
          "Most balcony and utility ceilings are suitable. The installer checks the ceiling type and height at the site visit.",
      },
      {
        question: "How much weight can it hold?",
        answer:
          "It depends on the rods and the ceiling fixing. Ask the installer for the load rating in writing.",
      },
      {
        question: "How long does installation take?",
        answer:
          "Usually a few hours once measured. The installer confirms the timeline in the quote.",
      },
      {
        question: "Who installs and who gives the warranty?",
        answer:
          "InvisProtect connects you with one checked, independent installer in {city}. The installer measures, quotes, installs and gives the warranty. Always ask for the warranty in writing before paying.",
      },
    ],
  },
  "cricket-nets": {
    key: "cricket-nets",
    serviceId: "sports-practice-nets",
    serviceName: "Cricket Practice Nets",
    code: "CN",
    quoteFactors: [
      "Length, width and height of the practice area",
      "Net material and thickness",
      "Poles and cables, or an existing structure",
      "Terrace, open ground or indoor",
      "Side, back and roof nets needed",
    ],
    benefitsIntro: "A safe practice space, fitted to your terrace, plot or community ground.",
    benefits: [
      "Safe batting and bowling practice close to home",
      "Keeps the ball inside — no broken windows or lost balls",
      "UV-stabilised nets made for outdoor use",
      "Fitted to terraces, open plots, schools and communities",
    ],
    buyerChecklist: [
      "Ask for a UV-stabilised net so it lasts in the sun.",
      "Tell the installer if you play with a hard ball — it needs a thicker net.",
      "Ask how the poles or cables are fixed, especially on a terrace.",
      "Get the warranty in writing before you pay.",
    ],
    needOptions: ["Terrace", "Open plot / ground", "School / academy", "Apartment community"],
    hero: {
      mobile: "/images/paid/cricket-nets-mobile",
      desktop: "/images/paid/cricket-nets-desktop",
      alt: "Rooftop cricket practice net with a turf pitch at sunset",
    },
    faqs: [
      {
        question: "How is the price decided?",
        answer:
          "Every site is different. At the free site visit the installer measures the practice area and gives an exact written quote based on the size, the net thickness and the poles or cables needed.",
      },
      {
        question: "Can a practice net be fitted on a terrace?",
        answer:
          "Often, yes. The installer checks the terrace size, parapet height and fixing points at the site visit.",
      },
      {
        question: "Hard ball or tennis ball?",
        answer:
          "Tell the installer which ball you play with. Hard-ball cricket needs a thicker net than tennis-ball cricket.",
      },
      {
        question: "How long does installation take?",
        answer:
          "Most practice nets are fitted in one or two days once measured. The installer confirms the timeline in the quote.",
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
      "bird-spikes":
        "Pigeons on your Hyderabad window sills and AC units? Spikes along every ledge stop them landing.",
      "monkey-nets":
        "Monkeys troubling your Hyderabad balcony or terrace? A strong net keeps them out and lets the light in.",
      "mosquito-nets":
        "Keep windows open on Hyderabad evenings without letting mosquitoes in — mesh made to measure for every window and door.",
      "cloth-drying-hangers":
        "Made for Hyderabad's apartment balconies and utility areas — dry clothes overhead and keep the floor clear.",
      "cricket-nets":
        "Turn a Hyderabad terrace or community ground into a safe practice net — measured and fitted on site.",
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
      "bird-spikes":
        "Pigeons on sea-facing ledges and AC units in Vizag? Stainless steel spikes stand up to the coastal air.",
      "monkey-nets":
        "Monkeys troubling your Vizag balcony or terrace? A strong net keeps them out and lets the sea breeze in.",
      "mosquito-nets":
        "Let the Vizag sea breeze in and keep mosquitoes out — ask for rust-free mesh and frames near the coast.",
      "cloth-drying-hangers":
        "Salty coastal air rusts cheap rods — ask for stainless steel hangers for your Vizag balcony.",
      "cricket-nets":
        "UV-stabilised practice nets for Vizag terraces and grounds, fixed firmly for coastal wind.",
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
      "bird-spikes":
        "Stop pigeons sitting on window sills, ledges and AC units in Vijayawada homes.",
      "monkey-nets": "A strong monkey net for Vijayawada balconies, terraces and open courtyards.",
      "mosquito-nets":
        "Mosquito mesh for Vijayawada windows, doors and balconies — made to measure and sealed at the edges.",
      "cloth-drying-hangers":
        "Ceiling cloth drying hangers for Vijayawada apartments and independent houses.",
      "cricket-nets": "Practice nets for Vijayawada terraces, open plots and school grounds.",
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
      "bird-spikes":
        "Moving into a new flat in the capital region? Fit spikes on the ledges before pigeons settle in.",
      "monkey-nets":
        "Keep monkeys out of new homes in Tadepalli, Mangalagiri and the capital region.",
      "mosquito-nets":
        "Add mosquito mesh to your new capital-region flat before you move in — measured to each window and door.",
      "cloth-drying-hangers":
        "Plan a ceiling cloth hanger for your new flat in Tadepalli, Mangalagiri or the capital region.",
      "cricket-nets":
        "Practice nets for terraces, open plots and community grounds across the capital region.",
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
      "bird-spikes": "Stop pigeons nesting on window sills, ledges and AC units in Tirupati homes.",
      "monkey-nets":
        "Monkeys are common in Tirupati — a strong net keeps them out of balconies, terraces and courtyards.",
      "mosquito-nets":
        "Mosquito mesh for Tirupati windows, doors and balconies — fresh air without the mosquitoes.",
      "cloth-drying-hangers":
        "Dry clothes overhead in your Tirupati balcony or utility area and keep the floor free.",
      "cricket-nets": "Practice nets for Tirupati terraces, open plots and school grounds.",
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
      "bird-spikes": "Stop pigeon droppings on window sills, ledges and AC units in Warangal.",
      "monkey-nets":
        "Monkeys troubling your Warangal home? A strong net keeps balconies and terraces closed to them.",
      "mosquito-nets": "Mosquito mesh for Warangal windows, doors and balconies — made to measure.",
      "cloth-drying-hangers":
        "Ceiling cloth drying hangers for Warangal apartments and independent houses.",
      "cricket-nets": "Practice nets for Warangal terraces, open plots and school grounds.",
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
      "bird-spikes":
        "Stop pigeon droppings on window sills, ledges and AC units in Hanamkonda and Kazipet.",
      "monkey-nets":
        "Monkeys troubling your Hanamkonda home? A strong net keeps balconies and terraces closed to them.",
      "mosquito-nets":
        "Mosquito mesh for Hanamkonda windows, doors and balconies — made to measure.",
      "cloth-drying-hangers":
        "Ceiling cloth drying hangers for Hanamkonda apartments, duplexes and independent houses.",
      "cricket-nets": "Practice nets for Hanamkonda terraces, open plots and school grounds.",
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
      title: "Free site visit",
      detail: "Measurement at your home is free, with no obligation to go ahead.",
    },
    {
      title: "Exact written quote",
      detail:
        "The installer measures first and gives a written quote before any work starts. You decide.",
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
    summary: `Free site visit and an exact written quote from one checked local installer in ${city.name}.`,
    metaTitle: `${service.serviceName} in ${city.name} — Free Site Visit`,
    localNote: city.localNote[service.key],
    quoteFactors: service.quoteFactors,
    benefitsIntro: service.benefitsIntro,
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
    hero: service.hero,
    closingImage: CLOSING_IMAGE,
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
