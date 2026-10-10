import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { ProofSection } from "@/components/ProofSection";
import { BRAND_CONFIG } from "@/config/brand";
import { BUSINESS, HUB_COUNT, SERVICE_HUBS, hubCityList } from "@/config/business";
import { getPaidLandingPage } from "@/data/paidLandingPages";
import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/service-areas")({
  head: () =>
    buildMetaTags({
      title: `Verified Service Areas (20 Hubs in 6 States) — ${BRAND_CONFIG.name}`,
      description: `InvisProtect verified architectural safety hubs across 20 cities in 6 states: Bengaluru, Hyderabad, Mumbai, Pune, Chennai, Vizag, Kochi & more.`,
      canonicalPath: "/service-areas",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `Verified Service Areas (${HUB_COUNT} Cities across 6 States) — ${BRAND_CONFIG.name}`,
        description: `InvisProtect verified architectural safety hubs across 20 cities in Karnataka, Telangana, Andhra Pradesh, Maharashtra, Tamil Nadu & Kerala.`,
        url: `${BRAND_CONFIG.domain}/service-areas`,
        publisher: {
          "@type": "Organization",
          name: BRAND_CONFIG.name,
          url: BRAND_CONFIG.domain,
        },
        mainEntity: {
          "@type": "ItemList",
          name: "InvisProtect Verified Operational Service Hubs",
          numberOfItems: HUB_COUNT,
          itemListElement: SERVICE_HUBS.map((hub, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            item: {
              "@type": "Place",
              name: hub.city,
              address: {
                "@type": "PostalAddress",
                addressLocality: hub.schemaName,
                addressRegion: hub.state,
                addressCountry: "IN",
              },
              description: hub.description,
            },
          })),
        },
      },
    }),
  component: ServiceAreasPage,
});

const STATE_META: Record<string, { code: string; name: string }> = {
  All: { code: "ALL", name: "All States" },
  Telangana: { code: "TG", name: "Telangana" },
  "Andhra Pradesh": { code: "AP", name: "Andhra Pradesh" },
  Karnataka: { code: "KA", name: "Karnataka" },
  Maharashtra: { code: "MH", name: "Maharashtra" },
  "Tamil Nadu": { code: "TN", name: "Tamil Nadu" },
  Kerala: { code: "KL", name: "Kerala" },
};

function ServiceAreasPage() {
  const [selectedState, setSelectedState] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const states = useMemo(() => {
    const list = Array.from(new Set(SERVICE_HUBS.map((h) => h.state)));
    return ["All", ...list];
  }, []);

  const stateCounts = useMemo(() => {
    const counts: Record<string, number> = { All: SERVICE_HUBS.length };
    for (const hub of SERVICE_HUBS) {
      counts[hub.state] = (counts[hub.state] || 0) + 1;
    }
    return counts;
  }, []);

  const filteredHubs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return SERVICE_HUBS.filter((hub) => {
      const matchesState = selectedState === "All" || hub.state === selectedState;
      if (!matchesState) return false;
      if (!q) return true;

      const matchesCity =
        hub.city.toLowerCase().includes(q) || hub.shortName.toLowerCase().includes(q);
      const matchesTag = hub.tag.toLowerCase().includes(q);
      const matchesDescription = hub.description.toLowerCase().includes(q);
      const matchesNeighborhood = hub.neighborhoods.some((n) => n.toLowerCase().includes(q));
      const matchesStateName = hub.state.toLowerCase().includes(q);

      return (
        matchesCity || matchesTag || matchesDescription || matchesNeighborhood || matchesStateName
      );
    });
  }, [selectedState, searchQuery]);

  const isNeighborhoodMatch = (name: string) => {
    const q = searchQuery.trim().toLowerCase();
    return q.length >= 2 && name.toLowerCase().includes(q);
  };

  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] min-h-screen flex flex-col">
      <SiteNav />

      {/* Hero */}
      <section className="relative w-full pt-32 pb-14 md:pt-40 md:pb-20 px-6 md:px-12 bg-[#FAF8F5] border-b border-[#1C1917]/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="sn-eyebrow text-brand mb-3 font-medium uppercase tracking-[0.24em]">
            6 States · {HUB_COUNT} Metropolitan Hubs
          </p>
          <h1 className="sn-h1 text-[#1C1917] mb-4">Verified Service Areas</h1>
          <p className="sn-subtext text-[#44403C] max-w-2xl mx-auto mb-8">
            {BRAND_CONFIG.name} verified installation and precision laser site-survey teams operate
            across {HUB_COUNT} metropolitan hubs in 6 states: Karnataka, Telangana, Andhra Pradesh,
            Maharashtra, Tamil Nadu, and Kerala.
          </p>

          {/* Quick Metrics Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-6 border-t border-[#1C1917]/10 text-left">
            <div className="bg-white/60 p-3.5 border border-[#1C1917]/10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#78716C] block">
                States
              </span>
              <span className="text-base font-semibold text-[#1C1917]">6 States</span>
            </div>
            <div className="bg-white/60 p-3.5 border border-[#1C1917]/10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#78716C] block">
                City Hubs
              </span>
              <span className="text-base font-semibold text-[#1C1917]">{HUB_COUNT} Hubs</span>
            </div>
            <div className="bg-white/60 p-3.5 border border-[#1C1917]/10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#78716C] block">
                Localities
              </span>
              <span className="text-base font-semibold text-[#1C1917]">210+ Areas</span>
            </div>
            <div className="bg-white/60 p-3.5 border border-[#1C1917]/10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#78716C] block">
                Installer Network
              </span>
              <span className="text-base font-semibold text-[#1C1917]">Verified Teams</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive State Filter Tabs & Locality Search */}
      <section className="sticky top-20 z-20 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#1C1917]/10 py-4 px-6 md:px-12 transition-all">
        <div className="max-w-6xl mx-auto space-y-4">
          {/* State Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 -mx-2 px-2">
            {states.map((st) => {
              const meta = STATE_META[st] || { code: st.slice(0, 2).toUpperCase(), name: st };
              const count = stateCounts[st] || 0;
              const isActive = selectedState === st;
              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSelectedState(st)}
                  className={`inline-flex shrink-0 items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-medium tracking-wider uppercase whitespace-nowrap transition-all duration-200 border cursor-pointer ${
                    isActive
                      ? "bg-[#1C1917] text-[#FAF8F5] border-[#1C1917] shadow-sm"
                      : "bg-white text-[#78716C] border-[#1C1917]/15 hover:border-[#1C1917]/40 hover:text-[#1C1917]"
                  }`}
                  aria-pressed={isActive}
                >
                  <span className="font-mono font-bold sm:hidden">{meta.code}</span>
                  <span className="hidden sm:inline">{meta.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 font-mono ${
                      isActive ? "bg-white/20 text-white" : "bg-[#FAF8F5] text-[#78716C]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Locality Search Input */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search locality or city (e.g. Kondapur, Whitefield, Baner, Powai, OMR)..."
                className="w-full bg-white border border-[#1C1917]/15 pl-4 pr-10 py-2.5 text-xs text-[#1C1917] placeholder:text-[#A8A29E] focus:border-brand focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#78716C] hover:text-[#1C1917] p-1 cursor-pointer"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            <p className="text-xs text-[#78716C] font-light">
              Showing <span className="font-semibold text-[#1C1917]">{filteredHubs.length}</span>{" "}
              {filteredHubs.length === 1 ? "hub" : "hubs"}
              {selectedState !== "All" && (
                <>
                  {" in "}
                  <span className="font-medium text-[#1C1917]">
                    {STATE_META[selectedState]?.name || selectedState} (
                    {STATE_META[selectedState]?.code})
                  </span>
                </>
              )}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>
        </div>
      </section>

      {/* Hubs Grid */}
      <main className="flex-1 max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16 w-full space-y-12">
        {filteredHubs.length > 0 ? (
          filteredHubs.map((hub) => {
            const originalIndex = SERVICE_HUBS.findIndex((h) => h.city === hub.city);
            const cityKey = hub.shortName.toLowerCase().replace(/\s+/g, "-");
            const lpId = `invisible-grills-${cityKey}`;
            const hasLp = Boolean(getPaidLandingPage(lpId));
            return (
              <article
                key={hub.city}
                className="border border-[#1C1917]/10 p-8 md:p-12 bg-white shadow-sm hover:border-brand hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 border-b border-[#1C1917]/10 pb-6 mb-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono tracking-widest text-brand uppercase font-medium">
                        Hub {String(originalIndex + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#78716C] bg-[#FAF8F5] px-2 py-0.5 border border-[#1C1917]/10">
                        {hub.state}
                      </span>
                    </div>
                    <h2 className="sn-h2 text-[#1C1917] mt-1.5">{hub.city}</h2>
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
                      Key Service Localities ({hub.neighborhoods.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {hub.neighborhoods.map((n) => {
                        const matched = isNeighborhoodMatch(n);
                        return (
                          <span
                            key={n}
                            className={`inline-block px-3 py-1.5 text-[11px] border font-medium transition-all ${
                              matched
                                ? "bg-brand/10 border-brand text-brand ring-1 ring-brand/30"
                                : "bg-[#FAF8F5] text-[#1C1917] border-[#1C1917]/10"
                            }`}
                          >
                            {n}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-[#FAF8F5] p-6 border border-[#1C1917]/10 flex flex-col justify-between">
                    <div>
                      <h3 className="font-medium text-[#1C1917] uppercase tracking-wider mb-2">
                        Regional Climate &amp; Material Note
                      </h3>
                      <p className="text-[#78716C] leading-relaxed">{hub.climateNotes}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-[#1C1917]/10 flex flex-wrap items-center justify-between gap-3">
                      <Link
                        to="/consultation"
                        className="text-[10px] uppercase tracking-[0.2em] font-medium text-brand hover:text-brand-deep hover:underline underline-offset-4 focus-ring transition-colors"
                      >
                        Schedule Survey in {hub.shortName} →
                      </Link>
                      {hasLp ? (
                        <Link
                          to="/lp/$landingId"
                          params={{ landingId: lpId }}
                          className="text-[10px] uppercase tracking-[0.2em] font-light text-[#1C1917] hover:text-brand hover:underline underline-offset-4 focus-ring transition-colors"
                        >
                          Invisible grills in {hub.shortName}
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <div className="border border-[#1C1917]/10 p-12 bg-white text-center max-w-xl mx-auto space-y-4 shadow-sm">
            <span className="text-xs font-mono uppercase tracking-widest text-brand">
              Custom Locality Coverage
            </span>
            <h3 className="sn-h2 text-[#1C1917]">
              No Direct Match for &ldquo;{searchQuery}&rdquo;
            </h3>
            <p className="text-xs text-[#44403C] leading-relaxed font-light">
              Our checked installer partners frequently service residential communities and
              townships surrounding our {HUB_COUNT} major hubs across {BUSINESS.regionLabel}.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedState("All");
                }}
                className="sn-btn-luxury-dark cursor-pointer text-xs"
              >
                Reset Filters
              </button>
              <Link to="/consultation" className="sn-btn-luxury-solid text-xs">
                Request Custom Site Survey
              </Link>
            </div>
          </div>
        )}
      </main>

      <ProofSection />
      <Footer />
    </div>
  );
}

export default ServiceAreasPage;
