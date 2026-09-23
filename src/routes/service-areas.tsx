import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { ProofSection } from "@/components/ProofSection";
import { BRAND_CONFIG } from "@/config/brand";
import { BUSINESS, HUB_COUNT, SERVICE_HUBS, hubCityList } from "@/config/business";
import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/service-areas")({
  head: () =>
    buildMetaTags({
      title: `Service Areas (${BUSINESS.regionLabel}) — ${BRAND_CONFIG.name}`,
      description: `Invisible grills and safety nets from ${BRAND_CONFIG.name} across ${HUB_COUNT} cities in ${BUSINESS.regionLabel}: ${hubCityList()}.`,
      canonicalPath: "/service-areas",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Service Areas & Regional Operations",
        description: `${BRAND_CONFIG.name} installation coverage across ${BUSINESS.regionLabel}.`,
        publisher: {
          "@type": "Organization",
          name: BRAND_CONFIG.name,
          url: BRAND_CONFIG.domain,
        },
      },
    }),
  component: ServiceAreasPage,
});

function ServiceAreasPage() {
  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] min-h-screen">
      <SiteNav />

      {/* Hero */}
      <section className="relative w-full pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12 bg-[#FAF8F5] border-b border-[#1C1917]/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="sn-eyebrow text-brand mb-4 font-medium">{BUSINESS.regionLabel} Coverage</p>
          <h1 className="sn-h1 text-[#1C1917] mb-4">Service Areas</h1>
          <p className="sn-subtext text-[#44403C] max-w-2xl mx-auto">
            {BRAND_CONFIG.name} installation and site-survey teams cover {HUB_COUNT} cities across{" "}
            {BUSINESS.regionLabel}.
          </p>
        </div>
      </section>

      {/* Hubs Grid */}
      <main className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-16">
        {SERVICE_HUBS.map((hub, idx) => (
          <article
            key={hub.city}
            className="border border-[#1C1917]/10 p-8 md:p-12 bg-white shadow-sm hover:border-brand hover:shadow-md transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 border-b border-[#1C1917]/10 pb-6 mb-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-brand uppercase font-medium">
                  Hub {String(idx + 1).padStart(2, "0")}
                </span>
                <h2 className="sn-h2 text-[#1C1917] mt-1">{hub.city}</h2>
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
                    className="text-[10px] uppercase tracking-[0.2em] font-medium text-brand hover:text-brand-deep hover:underline underline-offset-4 focus-ring transition-colors"
                  >
                    Schedule Survey in {hub.shortName} →
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
