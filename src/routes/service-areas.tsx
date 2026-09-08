import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { ProofSection } from "@/components/ProofSection";
import { BRAND_CONFIG } from "@/config/brand";
import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/service-areas")({
  head: () =>
    buildMetaTags({
      title: `Verified Service Areas (Telangana & Andhra Pradesh) — ${BRAND_CONFIG.name}`,
      description: `Explore ${BRAND_CONFIG.name} verified architectural safety hubs across 7 cities in Telangana & Andhra Pradesh: Hyderabad, Visakhapatnam, Vijayawada, Amaravati, Tirupati, Warangal, and Hanamkonda.`,
      canonicalPath: "/service-areas",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Verified Service Areas & Regional Operations",
        description: `${BRAND_CONFIG.name} regional architectural safety installation coverage across Telangana and Andhra Pradesh urban corridors.`,
        publisher: {
          "@type": "Organization",
          name: BRAND_CONFIG.name,
          url: BRAND_CONFIG.domain,
        },
      },
    }),
  component: ServiceAreasPage,
});

const REGIONAL_HUBS = [
  {
    city: "Hyderabad & Secunderabad",
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
      "Wind-calibrated anchor tracks and strict AISI 316 austenitic stainless steel core specified to eliminate pitting from coastal sea breeze and tropical humidity.",
  },
  {
    city: "Vijayawada",
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
      "Laser site measurement protocols ensuring zero aesthetic disruption to architectural elevations and window sightlines.",
  },
];

function ServiceAreasPage() {
  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] min-h-screen">
      <SiteNav />

      {/* Hero */}
      <section className="relative w-full pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12 bg-[#FAF8F5] border-b border-[#1C1917]/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="sn-eyebrow text-[#F37021] mb-4 font-medium">
            Telangana &amp; Andhra Pradesh Coverage
          </p>
          <h1 className="sn-h1 text-[#1C1917] mb-4">Verified Service Hubs</h1>
          <p className="sn-subtext text-[#44403C] max-w-2xl mx-auto">
            {BRAND_CONFIG.name} deploys trained master technicians and digital laser survey teams
            across 7 primary city hubs in Telangana and Andhra Pradesh.
          </p>
        </div>
      </section>

      {/* Hubs Grid */}
      <main className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-16">
        {REGIONAL_HUBS.map((hub, idx) => (
          <article
            key={hub.city}
            className="border border-[#1C1917]/10 p-8 md:p-12 bg-white shadow-sm hover:border-[#F37021] hover:shadow-md transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 border-b border-[#1C1917]/10 pb-6 mb-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#F37021] uppercase font-medium">
                  Hub 0{idx + 1}
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-light text-[#1C1917] uppercase tracking-wide mt-1">
                  {hub.city}
                </h2>
              </div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#78716C] font-medium">
                {hub.tag}
              </span>
            </div>

            <p className="text-sm text-[#44403C] font-light leading-relaxed mb-6">
              {hub.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-light">
              <div>
                <h3 className="font-medium text-[#1C1917] uppercase tracking-wider mb-3">
                  Key Service Localities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {hub.neighborhoods.map((n) => (
                    <span
                      key={n}
                      className="inline-block bg-[#FAF8F5] text-[#1C1917] px-3 py-1.5 text-[11px] border border-[#1C1917]/10 font-medium"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-6 border border-[#1C1917]/10 flex flex-col justify-between">
                <div>
                  <h3 className="font-medium text-[#1C1917] uppercase tracking-wider mb-2">
                    Regional Climate &amp; Material Note
                  </h3>
                  <p className="text-[#78716C] leading-relaxed">{hub.climateNotes}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#1C1917]/10">
                  <Link
                    to="/consultation"
                    className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#F37021] hover:text-[#D9531E] hover:underline underline-offset-4 focus-ring transition-colors"
                  >
                    Schedule Survey in {hub.city.split(" ")[0]} →
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </main>

      <ProofSection />
      <Footer />
    </div>
  );
}

export default ServiceAreasPage;
