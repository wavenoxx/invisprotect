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
  /** e.g. "On survey" */
  range: string;
  /** e.g. "quoted per site" */
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
  /** Human-readable coverage, e.g. "Karnataka, Telangana, Andhra Pradesh, Maharashtra, Tamil Nadu & Kerala". */
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
  regionLabel:
    "South & Western India (Karnataka, Telangana, Andhra Pradesh, Maharashtra, Tamil Nadu & Kerala)",
  primaryCity: "Hyderabad",
  primaryRegion: "Telangana",
  localityPlaceholder: "e.g. Kondapur, Whitefield, Baner, Powai, OMR, Kakkanad",
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
    {
      city: "Bengaluru (Bangalore)",
      shortName: "Bengaluru",
      schemaName: "Bengaluru",
      state: "Karnataka",
      tag: "Karnataka Premier Technology & High-Rise Hub",
      description:
        "High-density luxury apartment towers, IT corridor gated communities, and penthouse balconies fitted with high-tensile invisible grills and pigeon containment netting.",
      neighborhoods: [
        "Whitefield",
        "Sarjapur Road",
        "Bellandur",
        "Electronic City",
        "HSR Layout",
        "Hebbal",
        "Yelahanka",
        "Kanakapura Road",
        "Bannerghatta Road",
        "Marathahalli",
        "Indiranagar",
        "JP Nagar",
      ],
      climateNotes:
        "High UV exposure and monsoon wind shear engineered with carbon-stabilized HDPE netting, Nylon-12 coated AISI 316 cables, and anchor tracks tested for high-altitude balconies.",
    },
    {
      city: "Mysuru (Mysore)",
      shortName: "Mysuru",
      schemaName: "Mysuru",
      state: "Karnataka",
      tag: "Karnataka Heritage & Residential Hub",
      description:
        "Contemporary low-rise and mid-rise residential apartments, heritage villas, and independent duplexes secured with unobtrusive architectural safety barriers.",
      neighborhoods: [
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
      climateNotes:
        "Moderate plateau climate with seasonal downpours, protected using marine-grade stainless fasteners and weather-sealed track assemblies.",
    },
    {
      city: "Mangaluru (Mangalore)",
      shortName: "Mangaluru",
      schemaName: "Mangaluru",
      state: "Karnataka",
      tag: "Karnataka Coastal & High-Rise Hub",
      description:
        "Sea-facing high-rise residential towers and coastal condominiums engineered with marine-grade invisible safety grills and heavy-gauge pigeon netting.",
      neighborhoods: [
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
      climateNotes:
        "Strict AISI 316 austenitic stainless core specified to resist saline humidity, heavy coastal monsoons, and salt-air electrolytic corrosion.",
    },
    {
      city: "Pune",
      shortName: "Pune",
      schemaName: "Pune",
      state: "Maharashtra",
      tag: "Maharashtra Technology & Industrial Corridor Hub",
      description:
        "Vast township developments, IT corridor high-rises, and hillside residential balconies protected by heavy-duty monkey safety nets, pigeon spikes, and invisible grills.",
      neighborhoods: [
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
      climateNotes:
        "Calibrated for western ghats wind dynamics, intense dry summer heat, and heavy monsoon rains with UV-stabilized polymer netting and expansion bolt anchorage.",
    },
    {
      city: "Mumbai",
      shortName: "Mumbai",
      schemaName: "Mumbai",
      state: "Maharashtra",
      tag: "Maharashtra Financial Capital & Skyscraper Hub",
      description:
        "High-rise skyscrapers, sea-facing luxury penthouses, and heritage apartments requiring slim, zero-obstruction invisible grills and durable bird protection systems.",
      neighborhoods: [
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
      climateNotes:
        "Severe coastal marine salt-spray and high wind loading addressed with certified AISI 316 marine alloy wire rope and extruded 6063-T6 aluminum tracks.",
    },
    {
      city: "Thane",
      shortName: "Thane",
      schemaName: "Thane",
      state: "Maharashtra",
      tag: "Maharashtra Mega-Township Hub",
      description:
        "Expansive high-rise residential estates and lake-facing townships engineered for comprehensive balcony fall prevention and window pigeon deterrence.",
      neighborhoods: [
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
      climateNotes:
        "High humidity and seasonal monsoon torrents countered with anti-corrosive anchors and reinforced perimeter tension cables.",
    },
    {
      city: "Navi Mumbai",
      shortName: "Navi Mumbai",
      schemaName: "Navi Mumbai",
      state: "Maharashtra",
      tag: "Maharashtra Planned Urban & Maritime Hub",
      description:
        "Modern planned residential sectors, creek-facing high-rises, and wide open balconies fitted with panoramic invisible grills and precision-fitted safety netting.",
      neighborhoods: [
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
      climateNotes:
        "Engineered to withstand open-creek maritime winds and coastal humidity using UV-tested virgin netting and structural masonry fastenings.",
    },
    {
      city: "Chennai",
      shortName: "Chennai",
      schemaName: "Chennai",
      state: "Tamil Nadu",
      tag: "Tamil Nadu Metropolitan & Coastal Hub",
      description:
        "OMR IT corridor apartment complexes, coastal villas, and urban residential towers protected with marine-grade invisible safety grills and bird deterrence systems.",
      neighborhoods: [
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
      climateNotes:
        "Extreme coastal salinity, tropical humidity, and intense thermal expansion countered with marine-grade AISI 316 stainless steel and weather-resistant Nylon-12.",
    },
    {
      city: "Coimbatore",
      shortName: "Coimbatore",
      schemaName: "Coimbatore",
      state: "Tamil Nadu",
      tag: "Tamil Nadu Industrial & Residential Hub",
      description:
        "Fast-growing IT and textile corridor gated communities, luxury villas, and multi-storey apartments fitted with child-safe invisible grills and balcony netting.",
      neighborhoods: [
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
      climateNotes:
        "Calibrated for western ghats fringe breezes and moderate thermal swings with anodized aluminum profiles and high-tensile HDPE polymer mesh.",
    },
    {
      city: "Madurai",
      shortName: "Madurai",
      schemaName: "Madurai",
      state: "Tamil Nadu",
      tag: "Tamil Nadu Southern Cultural & Commercial Hub",
      description:
        "Expanding residential apartments, commercial buildings, and independent duplexes requiring reliable bird spikes, pigeon nets, and balcony fall protection.",
      neighborhoods: [
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
      climateNotes:
        "Formulated for intense dry southern heat and UV exposure using carbon-black UV-stabilized netting and heat-resistant anchor fixtures.",
    },
    {
      city: "Kochi (Cochin)",
      shortName: "Kochi",
      schemaName: "Kochi",
      state: "Kerala",
      tag: "Kerala Commercial & Waterfront High-Rise Hub",
      description:
        "Waterfront high-rise towers, Marine Drive luxury apartments, and backwater condominiums fitted with marine-grade invisible grills and bird protection systems.",
      neighborhoods: [
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
      climateNotes:
        "High-precipitation monsoon zones and backwater marine humidity resisted with 100% AISI 316 marine stainless core and hermetically sealed track finishes.",
    },
    {
      city: "Thiruvananthapuram (Trivandrum)",
      shortName: "Thiruvananthapuram",
      schemaName: "Thiruvananthapuram",
      state: "Kerala",
      tag: "Kerala Capital & Technopark Residential Hub",
      description:
        "Technopark IT residential belts, premium coastal apartments, and government residential quarters fitted with child safety nets and invisible balcony grills.",
      neighborhoods: [
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
      climateNotes:
        "Heavy monsoon downpours and tropical coastal exposure addressed with non-corroding stainless steel anchors and UV-resistant polymer netting.",
    },
    {
      city: "Kozhikode (Calicut)",
      shortName: "Kozhikode",
      schemaName: "Kozhikode",
      state: "Kerala",
      tag: "Kerala Northern Coastal & Trade Hub",
      description:
        "Beachside apartment towers, multi-storey residential communities, and commercial balconies secured with unobtrusive stainless steel safety systems.",
      neighborhoods: [
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
      climateNotes:
        "Direct Arabian sea wind and high humidity mitigated with marine-certified AISI 316 cables and powder-coated architectural track profiles.",
    },
  ],

  // Add real customer reviews only (e.g. copied from the Google Business
  // Profile with the customer's permission). Empty = section hidden.
  reviews: [],

  // Prices are never shown: every installer sets their own rates after the
  // free site visit. Keep this disabled; the price section then stays hidden.
  priceGuide: {
    enabled: false,
    eyebrow: "",
    heading: "",
    intro: "",
    items: [],
    factors: [],
    disclaimer: "",
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
