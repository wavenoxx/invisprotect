import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";
import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    buildMetaTags({
      title: `Terms and Conditions & Advisory Governance — ${BRAND_CONFIG.name}`,
      description: `Official terms of service, installation policies, and client advisory terms for ${BRAND_CONFIG.name}.`,
      canonicalPath: "/terms",
    }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] min-h-screen flex flex-col">
      <SiteNav />

      <main className="flex-1 max-w-4xl mx-auto px-6 md:px-12 pt-32 pb-24">
        <header className="mb-12 pb-8 border-b border-[#1C1917]/10">
          <p className="sn-eyebrow text-[#F37021] mb-3 font-medium">
            Legal &amp; Operational Standards
          </p>
          <h1 className="sn-h1 text-[#1C1917]">Terms and Conditions</h1>
          <p className="sn-subtext text-[#78716C] mt-3">
            Effective Date: 2026 · Standard Terms for Residential &amp; Commercial Architectural
            Safety Installations
          </p>
        </header>

        <article className="space-y-8 text-xs md:text-sm font-light leading-relaxed text-[#44403C]">
          <section className="bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="text-base uppercase tracking-widest font-medium text-[#1C1917] mb-3">
              1. Architectural Services &amp; Site Survey
            </h2>
            <p>
              {BRAND_CONFIG.name} provides custom-engineered safety installations including AISI 316
              invisible grills, structural safety netting, bird deterrence systems, and specialty
              residential barriers. All consultations, quotations, and measurements are subject to
              physical site inspection by an authorized technical advisor.
            </p>
          </section>

          <section className="bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="text-base uppercase tracking-widest font-medium text-[#1C1917] mb-3">
              2. Structural Feasibility &amp; Sub-base Verification
            </h2>
            <p>
              Installation requires structurally sound substrate anchoring (such as RCC concrete,
              solid brickwork, or reinforced architectural framing). {BRAND_CONFIG.name} reserves
              the right to recommend substrate reinforcement or modify anchoring configurations
              where site conditions require structural enhancement for client safety.
            </p>
          </section>

          <section className="bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="text-base uppercase tracking-widest font-medium text-[#1C1917] mb-3">
              3. Quotations, Pricing &amp; Milestone Payments
            </h2>
            <p>
              Project quotations are formulated on verified square-footage dimensions, selected
              tensile gauge options, and mounting specifications. Formal price agreements are issued
              in writing following physical site survey measurements.
            </p>
          </section>

          <section className="bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="text-base uppercase tracking-widest font-medium text-[#1C1917] mb-3">
              4. Warranty &amp; Maintenance Policy
            </h2>
            <p>
              Warranty protections apply exclusively to systems installed by authorized{" "}
              {BRAND_CONFIG.name} technicians according to manufacturer specifications. Complete
              warranty terms and coverage durations are detailed on our{" "}
              <Link to="/warranty" className="underline text-[#F37021] font-medium">
                Warranty Policy Page
              </Link>
              .
            </p>
          </section>

          <section className="bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="text-base uppercase tracking-widest font-medium text-[#1C1917] mb-3">
              5. Client Advisory &amp; Contact
            </h2>
            <p>
              For legal inquiries, terms clarification, or maintenance support, contact our Client
              Service team at{" "}
              {BRAND_CONFIG.contact.enabled ? (
                <>
                  <a
                    href={`mailto:${BRAND_CONFIG.contact.email}`}
                    className="underline text-[#F37021] font-medium"
                  >
                    {BRAND_CONFIG.contact.email}
                  </a>{" "}
                  or call {BRAND_CONFIG.contact.phoneDisplay}.
                </>
              ) : (
                <span className="italic text-[#78716C]">
                  Client contact details will be published upon launch.
                </span>
              )}
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}

export default TermsPage;
