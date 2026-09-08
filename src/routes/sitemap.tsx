import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";
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

function SitemapPage() {
  const serviceList = Object.values(servicesData);

  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] min-h-screen flex flex-col">
      <SiteNav />

      <main className="flex-1 max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-24">
        <header className="mb-12 pb-8 border-b border-[#1C1917]/10">
          <p className="sn-eyebrow text-[#F37021] mb-3 font-medium">Index &amp; Navigation</p>
          <h1 className="sn-h1 text-[#1C1917]">Site Directory</h1>
          <p className="sn-subtext text-[#78716C] mt-3">
            Comprehensive index of all public pages and architectural safety solutions.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm font-light">
          {/* Column 1: Services */}
          <div className="bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="text-xs uppercase tracking-widest font-medium text-[#1C1917] mb-6 pb-2 border-b border-[#1C1917]/10 text-[#F37021]">
              Safety Services ({serviceList.length})
            </h2>
            <ul className="space-y-3">
              {serviceList.map((s) => (
                <li key={s.id}>
                  <Link
                    to="/service/$serviceId"
                    params={{ serviceId: s.id }}
                    className="text-[#44403C] hover:text-[#F37021] hover:underline underline-offset-4 transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Categories & Explorers */}
          <div className="bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="text-xs uppercase tracking-widest font-medium text-[#1C1917] mb-6 pb-2 border-b border-[#1C1917]/10 text-[#F37021]">
              Categories &amp; Solutions
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/solutions"
                  className="text-[#44403C] hover:text-[#F37021] hover:underline underline-offset-4 transition-colors"
                >
                  Solutions Overview
                </Link>
              </li>
              <li>
                <Link
                  to="/category/$categoryId"
                  params={{ categoryId: "invisible-grills" }}
                  className="text-[#44403C] hover:text-[#F37021] hover:underline underline-offset-4 transition-colors"
                >
                  Invisible Grills
                </Link>
              </li>
              <li>
                <Link
                  to="/category/$categoryId"
                  params={{ categoryId: "core-safety-nets" }}
                  className="text-[#44403C] hover:text-[#F37021] hover:underline underline-offset-4 transition-colors"
                >
                  Core Safety Nets
                </Link>
              </li>
              <li>
                <Link
                  to="/category/$categoryId"
                  params={{ categoryId: "construction-industrial" }}
                  className="text-[#44403C] hover:text-[#F37021] hover:underline underline-offset-4 transition-colors"
                >
                  Construction &amp; Industrial
                </Link>
              </li>
              <li>
                <Link
                  to="/category/$categoryId"
                  params={{ categoryId: "animal-bird-protection" }}
                  className="text-[#44403C] hover:text-[#F37021] hover:underline underline-offset-4 transition-colors"
                >
                  Animal &amp; Bird Protection
                </Link>
              </li>
              <li>
                <Link
                  to="/category/$categoryId"
                  params={{ categoryId: "specialty-solutions" }}
                  className="text-[#44403C] hover:text-[#F37021] hover:underline underline-offset-4 transition-colors"
                >
                  Specialty Solutions
                </Link>
              </li>
            </ul>

            <h2 className="text-xs uppercase tracking-widest font-medium text-[#1C1917] mt-10 mb-6 pb-2 border-b border-[#1C1917]/10 text-[#F37021]">
              Regional Operations
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/service-areas"
                  className="text-[#1C1917] hover:text-[#F37021] hover:underline underline-offset-4 font-medium transition-colors"
                >
                  Verified Service Areas →
                </Link>
              </li>
              <li>
                <Link
                  to="/maintenance-repair"
                  className="text-[#44403C] hover:text-[#F37021] hover:underline underline-offset-4 transition-colors"
                >
                  Care &amp; Maintenance Protocol
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Legal */}
          <div className="bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="text-xs uppercase tracking-widest font-medium text-[#1C1917] mb-6 pb-2 border-b border-[#1C1917]/10 text-[#F37021]">
              Company &amp; Architecture
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/our-story"
                  className="text-[#44403C] hover:text-[#F37021] hover:underline underline-offset-4 transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/craftsmanship"
                  className="text-[#44403C] hover:text-[#F37021] hover:underline underline-offset-4 transition-colors"
                >
                  The Craftsmanship
                </Link>
              </li>
              <li>
                <Link
                  to="/lifestyle"
                  className="text-[#44403C] hover:text-[#F37021] hover:underline underline-offset-4 transition-colors"
                >
                  The Lifestyle
                </Link>
              </li>
              <li>
                <Link
                  to="/consultation"
                  className="text-[#44403C] hover:text-[#F37021] hover:underline underline-offset-4 transition-colors"
                >
                  Consultation &amp; Survey Booking
                </Link>
              </li>
            </ul>

            <h2 className="text-xs uppercase tracking-widest font-medium text-[#1C1917] mt-10 mb-6 pb-2 border-b border-[#1C1917]/10 text-[#F37021]">
              Customer Care &amp; Legal
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/warranty"
                  className="text-[#44403C] hover:text-[#F37021] hover:underline underline-offset-4 transition-colors"
                >
                  Warranty Policy &amp; Terms
                </Link>
              </li>
              <li>
                <Link
                  to="/safety-faq"
                  className="text-[#44403C] hover:text-[#F37021] hover:underline underline-offset-4 transition-colors"
                >
                  Safety &amp; Architecture FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/material-standards"
                  className="text-[#44403C] hover:text-[#F37021] hover:underline underline-offset-4 transition-colors"
                >
                  Material Standards
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-[#44403C] hover:text-[#F37021] hover:underline underline-offset-4 transition-colors"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-[#44403C] hover:text-[#F37021] hover:underline underline-offset-4 transition-colors"
                >
                  Privacy &amp; Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SitemapPage;
