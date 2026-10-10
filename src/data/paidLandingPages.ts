import type { ServiceId } from "./serviceIds";

/**
 * Google Ads landing pages (/lp/<service>-<city>).
 *
 * InvisProtect coordinates certified architectural safety solutions:
 * it connects homeowners with verified, expert local installation partners.
 * The dedicated installer measures on-site, quotes, installs and gives the
 * direct warranty.
 *
 * Pages are generated from 8 services x 20 cities = 160 landing IDs.
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
  | "hyderabad"
  | "vizag"
  | "vijayawada"
  | "amaravati"
  | "tirupati"
  | "warangal"
  | "hanamkonda"
  | "bengaluru"
  | "mysuru"
  | "mangaluru"
  | "pune"
  | "mumbai"
  | "thane"
  | "navi-mumbai"
  | "chennai"
  | "coimbatore"
  | "madurai"
  | "kochi"
  | "thiruvananthapuram"
  | "kozhikode";

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
  /** Headline of the form section, e.g. "Invisible Grills for your {city} home". */
  formIntroTitle: string;
  /** One or two sentences under it. */
  formIntroText: string;
  /** 3–4 short square chips under the intro. */
  scopeChips: string[];
  /** Optional "Where it fits" tiles (see 3.3). */
  applications?: { title: string; detail: string; image: string; alt: string; href: string }[];
  /** Optional comparison rows (see 3.4). */
  comparison?: { label: string; ours: string; theirs: string }[];
  /** Optional "At your free site visit" list (see 3.5). */
  siteVisitIncludes?: string[];
}

interface PaidCity {
  key: PaidCityKey;
  /** Name used in headlines, e.g. "Vizag". */
  name: string;
  /** Longer name used in the eyebrow, e.g. "Visakhapatnam (Vizag)". */
  fullName: string;
  /** Short code used in WhatsApp reference tags, e.g. "VZG". */
  code: string;
  state: "Telangana" | "Andhra Pradesh" | "Karnataka" | "Maharashtra" | "Tamil Nadu" | "Kerala";
  /** Name used in titles/descriptions, including the common search spelling. */
  searchName: string;
  /** Drives cable advice text. Owner confirms per city. */
  climate: "coastal" | "inland";
  localities: string[];
  localNote: Record<PaidServiceKey, string>;
  /** Optional per-service hero override (replaces the Bengaluru special case in buildLandingPage). */
  heroOverrides?: Partial<Record<PaidServiceKey, PaidHeroImage>>;
  /** Optional city installation gallery. Empty until real photos exist. */
  gallery?: { image: string; caption: string; alt?: string }[];
  /** Optional city-specific FAQs inserted before the last FAQ. */
  localFaqs?: { question: string; answer: string }[];
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
  formIntroTitle: string;
  formIntroText: string;
  scopeChips: string[];
  applications?: { title: string; detail: string; image: string; alt: string; href: string }[];
  comparison?: { label: string; ours: string; theirs: string }[];
  siteVisitIncludes?: string[];
  gallery?: { image: string; caption: string; alt?: string }[];
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
      "Cable thickness (in mm) and gap: 2-inch or 3-inch",
      "Type of opening: balcony, window, staircase or terrace",
      "Track finish, floor height and access",
    ],
    benefitsIntro:
      "Quiet protection that keeps your balcony and windows open to light, breeze and view.",
    benefits: [
      "Keeps your view, light and breeze — no 'jail look' like iron grills",
      "Child and pet safe with a 2-inch cable gap option",
      "Rust-resistant SS304 or marine-grade SS316 stainless-steel cable",
      "Can be cut with a cable cutter in a fire emergency — iron grills need a grinder",
    ],
    buyerChecklist: [
      "SS304 suits most city flats; ask for marine-grade SS316 near the sea or a pool.",
      "Make sure the cable grade, thickness (in mm) and gap are written in the quote.",
      "Choose a 2-inch gap for toddlers and pets, 3-inch for others.",
      "Get the installer's warranty in writing before you pay.",
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
          "Every home is different. At the free site visit the installer in {city} measures your openings and gives an exact written quote based on the area, the cable grade (SS304 or SS316), the cable thickness and gap, and the floor height.",
      },
      {
        question: "Are invisible grills safe for small children and pets?",
        answer:
          "Choose a 2-inch cable gap for toddlers and pets. Invisible grills are a fall-prevention barrier; they don't replace adult supervision.",
      },
      {
        question: "SS304 or SS316 — which cable should I choose in {city}?",
        answer: "{cableAdvice}",
      },
      {
        question: "How long does installation take?",
        answer:
          "Once measured, most flats are done in a day. Larger villas can take longer — the installer confirms the timeline in the quote.",
      },
      {
        question: "Do I need my apartment society's permission?",
        answer:
          "Some societies have rules about what can be fitted to balconies and the building's outside. Check with your association first — the installer can share photos and the specification to help you get approval.",
      },
      {
        question: "Will invisible grills stop pigeons?",
        answer:
          "Invisible grills are made for fall safety, not bird control. Pigeons can still perch on the cables and ledges, so if birds are the problem, ask about a pigeon net.",
      },
      {
        question: "What happens in a fire emergency?",
        answer:
          "The cables can be cut with a standard cable cutter, unlike iron grills that need a grinder.",
      },
      {
        question: "Who installs and who gives the warranty?",
        answer:
          "InvisProtect assigns a verified, expert local installation partner in {city} for your project. The installer measures on-site, provides the exact written quote, completes precision installation, and issues the direct written warranty at handover.",
      },
    ],
    formIntroTitle: "Invisible Grills for your {city} home",
    formIntroText:
      "Free site visit for balconies, windows, staircases or the full flat. An exact written quote from one checked installer. No obligation.",
    scopeChips: ["Balconies", "Windows", "Staircases & duplexes", "Villas & high-rise flats"],
    applications: [
      {
        title: "Balconies",
        detail: "Open views from high-rise balconies, with a child-safe gap.",
        image: "/images/balcony-invisible-grills-480.webp",
        alt: "High-rise balcony with slim invisible grill cables",
        href: "/service/balcony-invisible-grills",
      },
      {
        title: "Windows",
        detail: "Bedroom and French windows stay open to light and air.",
        image: "/images/windows-invisible-grills-480.webp",
        alt: "Bedroom window fitted with invisible grill cables",
        href: "/service/windows-invisible-grills",
      },
      {
        title: "Staircases & duplexes",
        detail: "Safe edges for open staircases and duplex voids.",
        image: "/images/staircase-invisible-grills-480.webp",
        alt: "Open staircase edge protected by invisible grill cables",
        href: "/service/staircase-invisible-grills",
      },
      {
        title: "Child & pet safety",
        detail: "A 2-inch gap option for homes with toddlers and pets.",
        image: "/images/child-safety-invisible-grills-480.webp",
        alt: "Child at a window protected by invisible grill cables",
        href: "/service/child-safety-invisible-grills",
      },
    ],
    comparison: [
      {
        label: "View & light",
        ours: "Open — thin cables",
        theirs: "Blocked by bars",
      },
      {
        label: "Look",
        ours: "Barely visible from outside",
        theirs: "“Jail look”",
      },
      {
        label: "Fire emergency",
        ours: "Cut with a cable cutter",
        theirs: "Needs a grinder",
      },
      {
        label: "Rust",
        ours: "Stainless steel (SS304 / SS316)",
        theirs: "Needs repainting",
      },
      {
        label: "Children & pets",
        ours: "2-inch gap option",
        theirs: "Depends on bar spacing",
      },
    ],
    siteVisitIncludes: [
      "Measures every opening you want covered",
      "Checks the wall, slab or railing where the track will be fixed",
      "Advises the gap (2-inch for children and pets) and the cable grade",
      "Gives a written quote with cable grade, thickness in mm, gap, finish and warranty terms",
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
          "InvisProtect assigns a verified, expert local installation partner in {city} for your project. The installer measures on-site, provides the exact written quote, completes precision installation, and issues the direct written warranty at handover.",
      },
    ],
    formIntroTitle: "Safety Nets for your {city} home",
    formIntroText:
      "Free site visit for balconies, ducts, staircases or terraces. An exact written quote from one checked installer. No obligation.",
    scopeChips: ["Balconies", "Ducts & shafts", "Staircase voids", "Terraces & play areas"],
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
          "InvisProtect assigns a verified, expert local installation partner in {city} for your project. The installer measures on-site, provides the exact written quote, completes precision installation, and issues the direct written warranty at handover.",
      },
    ],
    formIntroTitle: "Pigeon Nets for your {city} home",
    formIntroText:
      "Free site visit for balconies, windows, AC ledges or building shafts. An exact written quote from one checked installer. No obligation.",
    scopeChips: ["Balconies", "Window sills", "AC outdoor ledges", "Building utility shafts"],
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
          "InvisProtect assigns a verified, expert local installation partner in {city} for your project. The installer measures on-site, provides the exact written quote, completes precision installation, and issues the direct written warranty at handover.",
      },
    ],
    formIntroTitle: "Bird Spikes for your {city} home",
    formIntroText:
      "Free site visit for window sills, parapet ledges and AC units. An exact written quote from one checked installer. No obligation.",
    scopeChips: ["Window sills", "Parapet ledges", "AC outdoor units", "Signboards & beams"],
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
          "InvisProtect assigns a verified, expert local installation partner in {city} for your project. The installer measures on-site, provides the exact written quote, completes precision installation, and issues the direct written warranty at handover.",
      },
    ],
    formIntroTitle: "Monkey Safety Nets for your {city} home",
    formIntroText:
      "Free site visit for balconies, open terraces or courtyards. An exact written quote from one checked installer. No obligation.",
    scopeChips: ["Balconies", "Open terraces", "Courtyards", "Utility verandas"],
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
          "InvisProtect assigns a verified, expert local installation partner in {city} for your project. The installer measures on-site, provides the exact written quote, completes precision installation, and issues the direct written warranty at handover.",
      },
    ],
    formIntroTitle: "Mosquito Mesh for your {city} home",
    formIntroText:
      "Free site visit for windows, French doors and balconies. An exact written quote from one checked installer. No obligation.",
    scopeChips: ["Bedroom windows", "Balcony French doors", "Kitchen windows", "Main door mesh"],
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
          "InvisProtect assigns a verified, expert local installation partner in {city} for your project. The installer measures on-site, provides the exact written quote, completes precision installation, and issues the direct written warranty at handover.",
      },
    ],
    formIntroTitle: "Ceiling Cloth Drying Hangers for your {city} home",
    formIntroText:
      "Free site visit for apartment balconies and utility spaces. An exact written quote from one checked installer. No obligation.",
    scopeChips: ["Balconies", "Utility corridors", "Wash areas", "Ceiling pulleys"],
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
          "InvisProtect assigns a verified, expert local installation partner in {city} for your project. The installer measures on-site, provides the exact written quote, completes precision installation, and issues the direct written warranty at handover.",
      },
    ],
    formIntroTitle: "Cricket Practice Nets for your {city} home",
    formIntroText:
      "Free site visit for private terraces, open plots or society grounds. An exact written quote from one checked installer. No obligation.",
    scopeChips: ["Rooftop terraces", "Society clubhouses", "School grounds", "Open backyards"],
  },
};

export const CITIES: Record<PaidCityKey, PaidCity> = {
  hyderabad: {
    key: "hyderabad",
    name: "Hyderabad",
    fullName: "Hyderabad & Secunderabad",
    code: "HYD",
    state: "Telangana",
    searchName: "Hyderabad",
    climate: "inland",
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
    searchName: "Visakhapatnam (Vizag)",
    climate: "coastal",
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
    searchName: "Vijayawada",
    climate: "inland",
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
    searchName: "Amaravati",
    climate: "inland",
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
    searchName: "Tirupati",
    climate: "inland",
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
    searchName: "Warangal",
    climate: "inland",
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
    searchName: "Hanamkonda",
    climate: "inland",
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
  bengaluru: {
    key: "bengaluru",
    name: "Bengaluru",
    fullName: "Bengaluru (Bangalore)",
    code: "BLR",
    state: "Karnataka",
    searchName: "Bengaluru (Bangalore)",
    climate: "inland",
    heroOverrides: {
      "invisible-grills": {
        mobile: "/images/paid/invisible-grills-bengaluru-mobile",
        desktop: "/images/paid/invisible-grills-bengaluru-desktop",
        alt: "Bengaluru high-rise balcony protected by slim invisible grill cables overlooking scenic lake and metro",
      },
    },
    localities: [
      "Whitefield",
      "Sarjapur Road",
      "Bellandur",
      "Electronic City",
      "HSR Layout",
      "Hebbal",
      "Yelahanka",
      "Devanahalli",
      "West of Chord Road",
      "Rajajinagar",
      "Koramangala",
      "Kanakapura Road",
      "Bannerghatta Road",
      "Marathahalli",
      "Indiranagar",
      "JP Nagar",
    ],
    localNote: {
      "invisible-grills":
        "For Bengaluru's high-rise apartments, villas and duplexes — slim stainless-steel cables keep the skyline and the breeze, while a 2-inch gap keeps little ones safe.",
      "safety-nets":
        "High-strength fall prevention nets for high-altitude balconies, utility ducts, and staircase voids across Bengaluru tech corridor residential towers.",
      "pigeon-nets":
        "Full-perimeter translucent netting stops pigeon roosting and droppings on Bengaluru apartment balconies, utility spaces, and AC ledges.",
      "bird-spikes":
        "Durable polycarbonate-base stainless steel spikes protect Bengaluru window sills, parapet ledges, and AC outdoor compressors from pest birds.",
      "monkey-nets":
        "Heavy-gauge reinforced safety netting engineered for Bengaluru green belts and peripheral residential townships frequented by monkey troops.",
      "mosquito-nets":
        "Custom-fitted architectural insect screens and sliding mesh frames designed for cool Bengaluru evenings without insect intrusion.",
      "cloth-drying-hangers":
        "Space-saving ceiling pulley cloth drying systems tailored for modern Bengaluru apartment balconies and compact utility balconies.",
      "cricket-nets":
        "High-density UV-resistant cricket practice net enclosures installed for Bengaluru gated society clubhouses, school grounds, and private rooftops.",
    },
    localFaqs: [
      {
        question: "Can invisible grills be fitted on a high floor in Bengaluru?",
        answer:
          "Yes. Installers fit the tracks from inside the balcony, so high floors are usually not a problem. Floor height and access can affect the quote and the timeline — the installer confirms both at the site visit.",
      },
      {
        question: "How do invisible grills handle Bengaluru's monsoon and dust?",
        answer:
          "Stainless-steel cable resists rust in the rain. Wipe the cables with a damp cloth every few months to keep dust off, and ask the installer how the bottom track drains rainwater.",
      },
    ],
  },
  mysuru: {
    key: "mysuru",
    name: "Mysuru",
    fullName: "Mysuru (Mysore)",
    code: "MYS",
    state: "Karnataka",
    searchName: "Mysuru (Mysore)",
    climate: "inland",
    localities: [
      "Gokulam",
      "Vijayanagar",
      "Jayalakshmipuram",
      "Kuvempunagar",
      "Saraswathipuram",
      "Bogadi Road",
      "Yadavagiri",
      "Dattagalli",
      "Siddartha Layout",
      "Hebbal Ring Road",
    ],
    localNote: {
      "invisible-grills":
        "Unobtrusive invisible grills crafted for Mysuru residential apartments, heritage duplexes, and independent villas — elegant safety without caged bars.",
      "safety-nets":
        "Precision-tensioned balcony and staircase safety nets providing reliable fall containment for Mysuru family homes.",
      "pigeon-nets":
        "Discreet pigeon barrier netting to maintain clean, hygienic balconies and window ledges across Mysuru neighborhoods.",
      "bird-spikes":
        "Precision ledge bird spikes preventing pigeon congregation on architectural cornices, window sills, and AC brackets in Mysuru.",
      "monkey-nets":
        "Durable monkey containment nets protecting Chamundi foothills and surrounding Mysuru residential gardens and terraces.",
      "mosquito-nets":
        "Made-to-measure mosquito screens and door mesh systems for Mysuru homes, ensuring fresh airflow and complete insect barrier.",
      "cloth-drying-hangers":
        "Overhead ceiling-mounted drying hanger rods for Mysuru apartment balconies and utility wash areas.",
      "cricket-nets":
        "Durable practice nets fitted for Mysuru sports academies, residential plots, and institutional grounds.",
    },
  },
  mangaluru: {
    key: "mangaluru",
    name: "Mangaluru",
    fullName: "Mangaluru (Mangalore)",
    code: "MLR",
    state: "Karnataka",
    searchName: "Mangaluru (Mangalore)",
    climate: "coastal",
    localities: [
      "Kadri",
      "Bejai",
      "Urwa",
      "Falnir",
      "Bendoorwell",
      "Mannagudda",
      "Chilimbi",
      "Kottara",
      "Valencia",
      "Derlakatte",
    ],
    localNote: {
      "invisible-grills":
        "Marine-certified AISI 316 stainless steel invisible grills specifically engineered for Mangaluru sea-facing high-rises and salty coastal winds.",
      "safety-nets":
        "Heavy-duty UV-stabilized balcony safety netting built to withstand coastal monsoon downpours and open sea gusts in Mangaluru.",
      "pigeon-nets":
        "Corrosion-resistant bird netting for coastal Mangaluru apartments and commercial balconies.",
      "bird-spikes":
        "Marine-grade stainless steel bird spikes installed on Mangaluru coastal residences to stop birds nesting on damp exterior ledges.",
      "monkey-nets":
        "Sturdy anti-monkey safety netting tailored for hillside and coastal fringe residential communities in Mangaluru.",
      "mosquito-nets":
        "Rust-proof stainless steel and fiber mosquito mesh systems engineered for Mangaluru humid coastal climate.",
      "cloth-drying-hangers":
        "Anti-corrosive stainless steel ceiling drying hangers for Mangaluru high-humidity apartments.",
      "cricket-nets":
        "All-weather UV-stabilized cricket practice netting for Mangaluru coastal schools and sports complexes.",
    },
  },
  pune: {
    key: "pune",
    name: "Pune",
    fullName: "Pune & PCMC",
    code: "PUN",
    state: "Maharashtra",
    searchName: "Pune",
    climate: "inland",
    localities: [
      "Hinjawadi",
      "Wakad",
      "Baner",
      "Balewadi",
      "Kharadi",
      "Viman Nagar",
      "Magarpatta City",
      "Kothrud",
      "Aundh",
      "Bavdhan",
      "Pimple Saudagar",
      "Hadapsar",
    ],
    localNote: {
      "invisible-grills":
        "High-tensile invisible grills tailored for Pune township developments and IT corridor high-rise balconies from Baner to Kharadi.",
      "safety-nets":
        "Engineered fall-prevention safety netting for high-altitude balconies and open shafts across Pune high-density residential towers.",
      "pigeon-nets":
        "Full-coverage pigeon exclusion netting keeping Pune balconies and utility shafts free from droppings and bird infestation.",
      "bird-spikes":
        "Weather-proof stainless steel bird deterrent spikes protecting Pune window sills, parapets, and AC compressor units.",
      "monkey-nets":
        "Heavy-gauge monkey barrier nets engineered for Pune hillside gated communities in Bavdhan, Baner, and Kothrud.",
      "mosquito-nets":
        "Custom-fitted mosquito mesh and sliding screens for Pune residential apartments and independent row houses.",
      "cloth-drying-hangers":
        "Ceiling-mounted pulley cloth drying racks designed to save floor space in modern Pune apartment balconies.",
      "cricket-nets":
        "Professional practice net cages installed for Pune township clubhouses, private terraces, and sports academies.",
    },
  },
  mumbai: {
    key: "mumbai",
    name: "Mumbai",
    fullName: "Mumbai Metropolitan",
    code: "BOM",
    state: "Maharashtra",
    searchName: "Mumbai",
    climate: "coastal",
    localities: [
      "Powai",
      "Andheri West",
      "Bandra West",
      "Goregaon East",
      "Malad West",
      "Borivali West",
      "Worli",
      "Lower Parel",
      "Juhu",
      "Chembur",
      "Ghatkopar East",
      "Kandivali East",
    ],
    localNote: {
      "invisible-grills":
        "Certified AISI 316 marine-grade stainless steel invisible grills engineered to withstand Mumbai coastal sea salt spray and skyscraper wind pressure.",
      "safety-nets":
        "High-tensile UV-treated balcony safety nets engineered for Mumbai skyscraper heights and sea-facing apartments.",
      "pigeon-nets":
        "Heavy-duty translucent pigeon netting providing complete barrier protection for Mumbai apartment balconies and utility ducts.",
      "bird-spikes":
        "Corrosion-resistant bird spikes for Mumbai window ledges, pipe shafts, and AC outdoor compressors.",
      "monkey-nets":
        "Reinforced perimeter safety netting designed for Mumbai residential societies near Sanjay Gandhi National Park fringes.",
      "mosquito-nets":
        "Sleek mosquito screens and magnetic mesh doors designed for Mumbai apartments to block mosquitoes while keeping breezes flowing.",
      "cloth-drying-hangers":
        "Space-optimizing ceiling drying hangers designed for compact Mumbai high-rise balconies and utility areas.",
      "cricket-nets":
        "Heavy-gauge cricket practice nets fitted for Mumbai residential society terraces, turf clubs, and rooftop nets.",
    },
  },
  thane: {
    key: "thane",
    name: "Thane",
    fullName: "Thane Mega-Township Hub",
    code: "THA",
    state: "Maharashtra",
    searchName: "Thane",
    climate: "coastal",
    localities: [
      "Ghodbunder Road",
      "Hiranandani Estate",
      "Majiwada",
      "Vartak Nagar",
      "Kavesar",
      "Kasarvadavali",
      "Manpada",
      "Naupada",
      "Panch Pakhadi",
      "Wagle Estate",
    ],
    localNote: {
      "invisible-grills":
        "Sleek architectural invisible grills designed for Thane mega-townships and lake-facing high-rises along Ghodbunder Road.",
      "safety-nets":
        "Child and pet safety nets securely anchored for high-rise apartment balconies and open shafts across Thane.",
      "pigeon-nets":
        "Balcony pigeon barrier nets preventing bird nesting and health hazards in Thane residential complexes.",
      "bird-spikes":
        "Precision stainless steel bird spikes installed on window sills and AC ledges across Thane apartments.",
      "monkey-nets":
        "Sturdy anti-monkey safety netting tailored for Yeoor hills adjacent residential enclaves in Thane.",
      "mosquito-nets":
        "Precision-fitted insect screens for Thane apartments to enjoy lake breezes with complete insect protection.",
      "cloth-drying-hangers":
        "Ceiling pulley cloth drying systems designed to maximize balcony utility in Thane high-rises.",
      "cricket-nets":
        "UV-treated practice cricket netting installed for Thane residential sports grounds and clubhouse terraces.",
    },
  },
  "navi-mumbai": {
    key: "navi-mumbai",
    name: "Navi Mumbai",
    fullName: "Navi Mumbai Planned Urban Hub",
    code: "NVM",
    state: "Maharashtra",
    searchName: "Navi Mumbai",
    climate: "coastal",
    localities: [
      "Kharghar",
      "Vashi",
      "Seawoods",
      "Nerul",
      "Palm Beach Road",
      "Belapur",
      "Koperkhairane",
      "Airoli",
      "Ulwe",
      "Ghansoli",
    ],
    localNote: {
      "invisible-grills":
        "Marine-grade invisible grills tailored for Navi Mumbai wide-open balconies and Palm Beach Road sea-facing towers.",
      "safety-nets":
        "High-tensile balcony safety netting calibrated for creek winds and high-rise fall prevention across Navi Mumbai sectors.",
      "pigeon-nets":
        "Full-aperture bird netting keeping Navi Mumbai apartment balconies, ducts, and AC ledges permanently pigeon-free.",
      "bird-spikes":
        "Non-harmful stainless steel bird deterrent spikes for window frames and external ledges in Navi Mumbai.",
      "monkey-nets":
        "Heavy-duty monkey exclusion netting protecting residential balconies near Parsik hill ranges in Navi Mumbai.",
      "mosquito-nets":
        "Durable insect screen mesh for creek-adjacent Navi Mumbai residences, keeping pests out year-round.",
      "cloth-drying-hangers":
        "Ceiling-mounted stainless steel pulley cloth drying hangers for Navi Mumbai modern apartments.",
      "cricket-nets":
        "All-weather cricket practice net enclosures for Navi Mumbai housing societies and sports facilities.",
    },
  },
  chennai: {
    key: "chennai",
    name: "Chennai",
    fullName: "Chennai Metropolitan",
    code: "MAA",
    state: "Tamil Nadu",
    searchName: "Chennai",
    climate: "coastal",
    localities: [
      "OMR (Old Mahabalipuram Road)",
      "ECR (East Coast Road)",
      "Sholinganallur",
      "Thoraipakkam",
      "Velachery",
      "Anna Nagar",
      "Adyar",
      "Besant Nagar",
      "Porur",
      "Medavakkam",
      "Perungudi",
      "Nungambakkam",
    ],
    localNote: {
      "invisible-grills":
        "Marine-certified AISI 316 stainless steel invisible grills engineered to withstand Chennai high coastal salinity, tropical humidity, and OMR IT high-rises.",
      "safety-nets":
        "UV-stabilized high-strength safety nets providing child and pet safety for Chennai seaside and high-rise apartments.",
      "pigeon-nets":
        "Durable translucent pigeon protection netting for Chennai residential and commercial balconies.",
      "bird-spikes":
        "Marine-grade stainless steel bird spikes installed on window sills and ledges across Chennai.",
      "monkey-nets":
        "Strong anti-monkey safety netting tailored for green residential areas and temple-adjacent localities in Chennai.",
      "mosquito-nets":
        "Heavy-duty architectural insect screens and sliding mosquito doors engineered for Chennai tropical climate.",
      "cloth-drying-hangers":
        "Rust-proof stainless steel ceiling cloth drying hangers tailored for Chennai humid coastal weather.",
      "cricket-nets":
        "High-density UV-treated cricket practice netting for Chennai residential communities, academies, and private rooftops.",
    },
  },
  coimbatore: {
    key: "coimbatore",
    name: "Coimbatore",
    fullName: "Coimbatore Industrial & Residential Hub",
    code: "CBE",
    state: "Tamil Nadu",
    searchName: "Coimbatore",
    climate: "inland",
    localities: [
      "RS Puram",
      "Race Course",
      "Peelamedu",
      "Saravanampatti",
      "Saibaba Colony",
      "Gandhipuram",
      "Vadavalli",
      "Ramanathapuram",
      "Singanallur",
      "Ganapathy",
    ],
    localNote: {
      "invisible-grills":
        "Elegant invisible safety grills designed for Coimbatore gated communities, villas, and modern multi-storey apartments.",
      "safety-nets":
        "Precision-fitted balcony and staircase fall protection nets for Coimbatore family residences.",
      "pigeon-nets":
        "Pigeon deterrence netting preventing roosting and bird droppings on Coimbatore apartment balconies and AC units.",
      "bird-spikes":
        "Weather-resistant bird spikes protecting window ledges and building architectural projections in Coimbatore.",
      "monkey-nets":
        "Heavy-gauge monkey safety netting engineered for Coimbatore western ghats fringe residences.",
      "mosquito-nets":
        "Custom-fitted mosquito mesh systems designed to allow fresh Western Ghats breezes into Coimbatore homes.",
      "cloth-drying-hangers":
        "Space-efficient ceiling pulley cloth drying racks for Coimbatore modern apartment balconies.",
      "cricket-nets":
        "All-weather cricket practice nets fitted for Coimbatore sports grounds, schools, and private terraces.",
    },
  },
  madurai: {
    key: "madurai",
    name: "Madurai",
    fullName: "Madurai Cultural & Commercial Hub",
    code: "MDU",
    state: "Tamil Nadu",
    searchName: "Madurai",
    climate: "inland",
    localities: [
      "KK Nagar",
      "Anna Nagar",
      "SS Colony",
      "TVS Nagar",
      "Koodal Nagar",
      "Villianur",
      "Pasumalai",
      "Tallakulam",
      "Sellur",
      "Palanganatham",
    ],
    localNote: {
      "invisible-grills":
        "High-tensile invisible grills engineered for Madurai residential apartments and modern duplexes — maximum safety without blocking ventilation.",
      "safety-nets":
        "Durable UV-treated balcony safety nets providing fall prevention for Madurai family homes.",
      "pigeon-nets":
        "Clean and discreet pigeon netting protecting Madurai apartment balconies and open utility areas.",
      "bird-spikes":
        "Durable stainless steel bird spikes installed on window sills, parapets, and commercial ledges in Madurai.",
      "monkey-nets":
        "Heavy-duty monkey protection netting for Madurai residential terraces, balconies, and open backyards.",
      "mosquito-nets":
        "High-durability mosquito screens and sliding net doors designed for Madurai warm climate.",
      "cloth-drying-hangers":
        "Ceiling pulley cloth drying systems designed to save space in Madurai apartments and houses.",
      "cricket-nets":
        "Custom practice cricket nets fitted for Madurai school grounds, open plots, and private rooftops.",
    },
  },
  kochi: {
    key: "kochi",
    name: "Kochi",
    fullName: "Kochi (Cochin) Waterfront Hub",
    code: "COK",
    state: "Kerala",
    searchName: "Kochi (Cochin)",
    climate: "coastal",
    localities: [
      "Marine Drive",
      "Kakkanad",
      "Edappally",
      "Panampilly Nagar",
      "Kaloor",
      "Palarivattom",
      "Kadavanthra",
      "Aluva",
      "Vyttila",
      "Maradu",
      "Thevara",
    ],
    localNote: {
      "invisible-grills":
        "100% AISI 316 marine-grade stainless steel invisible grills engineered to resist Kochi backwater humidity, heavy monsoon rains, and Marine Drive winds.",
      "safety-nets":
        "Heavy-duty waterproof and UV-treated balcony safety nets engineered for Kochi waterfront towers and high-rise apartments.",
      "pigeon-nets":
        "Corrosion-free translucent pigeon barrier netting for Kochi high-rise balconies and duct spaces.",
      "bird-spikes":
        "Marine-grade stainless steel bird spikes for window ledges, rain gutters, and AC units across Kochi.",
      "monkey-nets":
        "Reinforced monkey safety netting designed for Kochi green residential belts and independent villas.",
      "mosquito-nets":
        "High-grade stainless steel and fiber mosquito mesh systems engineered for Kochi backwater tropical climate.",
      "cloth-drying-hangers":
        "Rust-proof stainless steel ceiling drying hangers for Kochi humid rainy season and compact balconies.",
      "cricket-nets":
        "Monsoon-resistant heavy-duty cricket practice net enclosures for Kochi sports clubs and residential societies.",
    },
  },
  thiruvananthapuram: {
    key: "thiruvananthapuram",
    name: "Thiruvananthapuram",
    fullName: "Thiruvananthapuram (Trivandrum)",
    code: "TRV",
    state: "Kerala",
    searchName: "Thiruvananthapuram (Trivandrum)",
    climate: "coastal",
    localities: [
      "Kazhakkoottam",
      "Kowdiar",
      "Sasthamangalam",
      "Pattom",
      "Vellayambalam",
      "Vazhuthacaud",
      "Peroorkada",
      "Sreekariyam",
      "Kumarapuram",
      "Kesavadasapuram",
    ],
    localNote: {
      "invisible-grills":
        "Marine-grade invisible grills tailored for Thiruvananthapuram Technopark residential high-rises and premium coastal villas.",
      "safety-nets":
        "High-tensile balcony safety nets engineered for child protection in Thiruvananthapuram multi-storey apartments.",
      "pigeon-nets":
        "Full-coverage bird netting keeping Thiruvananthapuram apartment balconies and AC ledges clean and pigeon-free.",
      "bird-spikes":
        "Weather-proof stainless steel bird deterrent spikes for window frames and parapets in Thiruvananthapuram.",
      "monkey-nets":
        "Sturdy anti-monkey safety nets protecting Thiruvananthapuram residential balconies, open courtyards, and terraces.",
      "mosquito-nets":
        "Precision-fitted mosquito screens and magnetic mesh doors designed for Thiruvananthapuram coastal climate.",
      "cloth-drying-hangers":
        "Ceiling-mounted stainless steel pulley cloth drying systems for Thiruvananthapuram modern flats.",
      "cricket-nets":
        "All-weather UV-stabilized cricket practice nets for Thiruvananthapuram sports grounds and residential societies.",
    },
  },
  kozhikode: {
    key: "kozhikode",
    name: "Kozhikode",
    fullName: "Kozhikode (Calicut)",
    code: "CLT",
    state: "Kerala",
    searchName: "Kozhikode (Calicut)",
    climate: "coastal",
    localities: [
      "Mavoor Road",
      "PT Usha Road",
      "Nadakkavu",
      "Chevayur",
      "Thondayad",
      "Bilathikulam",
      "Westhill",
      "Pottammal",
      "Kottooli",
      "Panniyankara",
    ],
    localNote: {
      "invisible-grills":
        "Marine-certified AISI 316 invisible safety grills engineered for Kozhikode Arabian Sea winds and high-rise apartments.",
      "safety-nets":
        "High-strength UV-stabilized balcony safety netting providing child and pet safety for Kozhikode coastal residences.",
      "pigeon-nets":
        "Translucent bird netting providing complete protection against pigeons for Kozhikode apartment balconies.",
      "bird-spikes":
        "Rust-proof stainless steel bird spikes installed on window sills and ledges across Kozhikode.",
      "monkey-nets":
        "Heavy-gauge monkey barrier nets protecting Kozhikode coastal fringe and suburban residences.",
      "mosquito-nets":
        "Durable insect screens and sliding mesh frames designed for Kozhikode tropical coastal weather.",
      "cloth-drying-hangers":
        "Anti-corrosive stainless steel ceiling drying hangers for Kozhikode apartments.",
      "cricket-nets":
        "Durable cricket practice netting fitted for Kozhikode sports clubs, school grounds, and private rooftops.",
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
  const isIG = service.key === "invisible-grills";
  const headline = `${service.serviceName} in ${city.name}`;
  const metaTitle = isIG
    ? `${service.serviceName} in ${city.searchName} | Balcony & Windows | InvisProtect`
    : `${service.serviceName} in ${city.name} — Free Site Visit`;
  const summary = isIG
    ? `Invisible grills for balconies & windows in ${city.searchName}. Free site visit and an exact written quote from one checked installer.`
    : `Free site visit and an exact written quote from one checked local installer in ${city.name}.`;

  const cableAdvice =
    city.climate === "coastal"
      ? `${city.name} is close to the sea, so marine-grade SS316 is the safer choice — salty air corrodes ordinary steel faster. Make sure the grade is written in the quote.`
      : `${city.name} is inland, so SS304 suits most apartments. Choose marine-grade SS316 for pool-facing balconies or if you want extra corrosion resistance. Make sure the grade is written in the quote.`;

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
    headline,
    summary,
    metaTitle,
    localNote: city.localNote[service.key],
    quoteFactors: service.quoteFactors,
    benefitsIntro: service.benefitsIntro,
    benefits: service.benefits,
    buyerChecklist: service.buyerChecklist,
    needOptions: service.needOptions,
    localities: city.localities,
    faqs: (() => {
      const baseFaqs = service.faqs.map((faq) => ({
        question: withCity(faq.question, city.name),
        answer: withCity(faq.answer, city.name).split("{cableAdvice}").join(cableAdvice),
      }));
      const cityFaqs = (
        service.key === "invisible-grills" && city.localFaqs ? city.localFaqs : []
      ).map((faq) => ({
        question: withCity(faq.question, city.name),
        answer: withCity(faq.answer, city.name).split("{cableAdvice}").join(cableAdvice),
      }));
      return cityFaqs.length > 0 && baseFaqs.length > 0
        ? [...baseFaqs.slice(0, -1), ...cityFaqs, baseFaqs[baseFaqs.length - 1]]
        : baseFaqs;
    })(),
    trustSignals: trustSignalsFor(city.name),
    whatsappRef,
    whatsappMessage: `Hi InvisProtect, I need ${service.serviceName.toLowerCase()} in ${city.name}. My area: `,
    consentText: `I agree that InvisProtect may share my project details with our verified installation expert in ${city.name} to schedule a site survey and quote via Call or WhatsApp.`,
    consentVersion: PAID_CONSENT_VERSION,
    disclosure: `InvisProtect coordinates certified architectural safety solutions across India. We assign a verified, expert local installation partner in ${city.name}. The assigned certified installer gives the final quote, completes precision installation, and provides the direct written warranty.`,
    hero: city.heroOverrides?.[service.key] ?? service.hero,
    closingImage: CLOSING_IMAGE,
    formVariant: PAID_FORM_VARIANT,
    formIntroTitle: withCity(service.formIntroTitle, city.name),
    formIntroText: withCity(service.formIntroText, city.name),
    scopeChips: service.scopeChips,
    applications: service.applications,
    comparison: service.comparison,
    siteVisitIncludes: service.siteVisitIncludes,
    gallery: city.gallery,
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
