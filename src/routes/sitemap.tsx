import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";
import { paidLandingPages } from "@/data/paidLandingPages";
import { servicesData } from "@/data/servicesData";
import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/sitemap")({
  head: () =>
    buildMetaTags({
      title: `Site Directory & Architectural Safety Index — ${BRAND_CONFIG.name}`,
      description: `Complete directory of all ${BRAND_CONFIG.name} architectural safety services, category explorers, regional hubs, and customer care resources.`,
      canonicalPath: "/sitemap",
    }),
  component: SitemapPage,
});

const REGIONAL_STATES = [
  "Telangana",
  "Andhra Pradesh",
  "Karnataka",
  "Maharashtra",
  "Tamil Nadu",
  "Kerala",
] as const;

function SitemapPage() {
  const serviceList = Object.values(servicesData);
  const landingPagesList = useMemo(() => Object.values(paidLandingPages), []);

  const regionalHubsByState = useMemo(() => {
    return REGIONAL_STATES.map((state) => {
      const inState = landingPagesList.filter((p) => p.state === state);
      const cityMap = new Map<string, typeof landingPagesList>();
      for (const p of inState) {
        if (!cityMap.has(p.city)) cityMap.set(p.city, []);
        cityMap.get(p.city)?.push(p);
      }
      return {
        state,
        cities: Array.from(cityMap.entries()).map(([city, pages]) => ({
          city,
          pages,
        })),
      };
    });
  }, [landingPagesList]);

  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] min-h-screen flex flex-col">
      <SiteNav />

      <main className="flex-1 max-w-6xl mx-auto px-5 sm:px-8 md:px-12 pt-32 pb-24 w-full">
        <header className="mb-12 pb-8 border-b border-[#1C1917]/10">
          <p className="sn-eyebrow text-brand mb-3 font-medium">Index &amp; Navigation</p>
          <h1 className="sn-h1 text-[#1C1917]">Site Directory</h1>
          <p className="sn-subtext text-[#78716C] mt-3">
            Comprehensive index of all public pages, architectural safety solutions, and regional
            installation hubs.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm font-light">
          {/* Column 1: Services */}
          <div className="bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="text-xs uppercase tracking-widest font-medium text-[#1C1917] mb-6 pb-2 border-b border-[#1C1917]/10 text-brand">
              Safety Services ({serviceList.length})
            </h2>
            <ul className="space-y-3">
              {serviceList.map((s) => (
                <li key={s.id}>
                  <Link
                    to="/service/$serviceId"
                    params={{ serviceId: s.id }}
                    className="text-[#44403C] hover:text-brand hover:underline underline-offset-4 transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Categories & Explorers */}
          <div className="bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="text-xs uppercase tracking-widest font-medium text-[#1C1917] mb-6 pb-2 border-b border-[#1C1917]/10 text-brand">
              Categories &amp; Solutions
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/solutions"
                  className="text-[#44403C] hover:text-brand hover:underline underline-offset-4 transition-colors"
                >
                  Solutions Overview
                </Link>
              </li>
              <li>
                <Link
                  to="/category/$categoryId"
                  params={{ categoryId: "invisible-grills" }}
                  className="text-[#44403C] hover:text-brand hover:underline underline-offset-4 transition-colors"
                >
                  Invisible Grills
                </Link>
              </li>
              <li>
                <Link
                  to="/category/$categoryId"
                  params={{ categoryId: "core-safety-nets" }}
                  className="text-[#44403C] hover:text-brand hover:underline underline-offset-4 transition-colors"
                >
                  Core Safety Nets
                </Link>
              </li>
              <li>
                <Link
                  to="/category/$categoryId"
                  params={{ categoryId: "construction-industrial" }}
                  className="text-[#44403C] hover:text-brand hover:underline underline-offset-4 transition-colors"
                >
                  Construction &amp; Industrial
                </Link>
              </li>
              <li>
                <Link
                  to="/category/$categoryId"
                  params={{ categoryId: "animal-bird-protection" }}
                  className="text-[#44403C] hover:text-brand hover:underline underline-offset-4 transition-colors"
                >
                  Animal &amp; Bird Protection
                </Link>
              </li>
              <li>
                <Link
                  to="/category/$categoryId"
                  params={{ categoryId: "specialty-solutions" }}
                  className="text-[#44403C] hover:text-brand hover:underline underline-offset-4 transition-colors"
                >
                  Specialty Solutions
                </Link>
              </li>
            </ul>

            <h2 className="text-xs uppercase tracking-widest font-medium text-[#1C1917] mt-10 mb-6 pb-2 border-b border-[#1C1917]/10 text-brand">
              Regional Operations
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/service-areas"
                  className="text-[#1C1917] hover:text-brand hover:underline underline-offset-4 font-medium transition-colors"
                >
                  Service Areas →
                </Link>
              </li>
              <li>
                <Link
                  to="/maintenance-repair"
                  className="text-[#44403C] hover:text-brand hover:underline underline-offset-4 transition-colors"
                >
                  Care &amp; Maintenance Protocol
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Legal */}
          <div className="bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="text-xs uppercase tracking-widest font-medium text-[#1C1917] mb-6 pb-2 border-b border-[#1C1917]/10 text-brand">
              Company &amp; Architecture
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/our-story"
                  className="text-[#44403C] hover:text-brand hover:underline underline-offset-4 transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/craftsmanship"
                  className="text-[#44403C] hover:text-brand hover:underline underline-offset-4 transition-colors"
                >
                  The Craftsmanship
                </Link>
              </li>
              <li>
                <Link
                  to="/lifestyle"
                  className="text-[#44403C] hover:text-brand hover:underline underline-offset-4 transition-colors"
                >
                  The Lifestyle
                </Link>
              </li>
              <li>
                <Link
                  to="/consultation"
                  className="text-[#44403C] hover:text-brand hover:underline underline-offset-4 transition-colors"
                >
                  Consultation &amp; Survey Booking
                </Link>
              </li>
            </ul>

            <h2 className="text-xs uppercase tracking-widest font-medium text-[#1C1917] mt-10 mb-6 pb-2 border-b border-[#1C1917]/10 text-brand">
              Customer Care &amp; Legal
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/warranty"
                  className="text-[#44403C] hover:text-brand hover:underline underline-offset-4 transition-colors"
                >
                  Warranty Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/safety-faq"
                  className="text-[#44403C] hover:text-brand hover:underline underline-offset-4 transition-colors"
                >
                  Safety &amp; Architecture FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/material-standards"
                  className="text-[#44403C] hover:text-brand hover:underline underline-offset-4 transition-colors"
                >
                  Material Standards
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-[#44403C] hover:text-brand hover:underline underline-offset-4 transition-colors"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-[#44403C] hover:text-brand hover:underline underline-offset-4 transition-colors"
                >
                  Privacy &amp; Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Regional Landing Pages (160 Hubs across 6 States) ── */}
        <section className="mt-20 pt-12 border-t border-[#1C1917]/10">
          <header className="mb-10">
            <p className="sn-eyebrow text-brand mb-2 font-medium">
              Regional Installation Network · {landingPagesList.length} Landing Pages
            </p>
            <h2 className="sn-h2 text-[#1C1917]">
              City Landing Pages &amp; Local Engineering Hubs
            </h2>
            <p className="sn-subtext text-[#78716C] mt-2 max-w-2xl">
              Direct access to dedicated invisible grill and safety net engineering teams across 20
              cities in 6 southern and western states.
            </p>
          </header>

          <div className="space-y-12">
            {regionalHubsByState.map(({ state, cities }) => (
              <div key={state}>
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-xs uppercase tracking-widest font-semibold text-brand">
                    {state} ({cities.length} {cities.length === 1 ? "Hub" : "Hubs"})
                  </h3>
                  <div className="flex-1 h-px bg-[#1C1917]/10" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {cities.map(({ city, pages }) => (
                    <div
                      key={city}
                      className="bg-white p-6 border border-[#1C1917]/8 shadow-sm flex flex-col"
                    >
                      <div className="flex items-baseline justify-between pb-3 mb-3 border-b border-[#1C1917]/10">
                        <h4 className="font-display text-sm uppercase tracking-wider font-semibold text-[#1C1917]">
                          {city}
                        </h4>
                        <span className="text-[10px] uppercase font-mono tracking-widest text-[#78716C]">
                          {pages.length} Services
                        </span>
                      </div>
                      <ul className="space-y-2 text-xs font-light">
                        {pages.map((p) => (
                          <li key={p.id}>
                            <Link
                              to="/lp/$landingId"
                              params={{ landingId: p.id }}
                              className="text-[#44403C] hover:text-brand hover:underline underline-offset-2 transition-colors block leading-snug"
                            >
                              {p.serviceName}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default SitemapPage;
