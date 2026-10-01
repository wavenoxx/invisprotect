import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";
import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    buildMetaTags({
      title: `Terms and Conditions & Advisory Governance — ${BRAND_CONFIG.name}`,
      description: `Terms for the ${BRAND_CONFIG.name} architectural safety and certified installer network: how requests, site visits, quotations and warranties work.`,
      canonicalPath: "/terms",
    }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] min-h-screen flex flex-col">
      <SiteNav />

      <main className="flex-1 max-w-4xl mx-auto px-5 sm:px-8 md:px-12 pt-32 pb-24 w-full">
        <header className="mb-12 pb-8 border-b border-[#1C1917]/10">
          <p className="sn-eyebrow text-brand mb-3 font-medium">
            Legal &amp; Operational Standards
          </p>
          <h1 className="sn-h1 text-[#1C1917]">Terms and Conditions</h1>
          <p className="sn-subtext text-[#78716C] mt-3">
            Last updated: 28 September 2026 · Operational Standards for the {BRAND_CONFIG.name}{" "}
            Certified Installer Network
          </p>
        </header>

        <article className="space-y-8 text-xs md:text-sm font-light leading-relaxed text-[#44403C]">
          <section className="bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="sn-h2 text-[#1C1917] mb-3">1. Operational Model &amp; Site Visit</h2>
            <p>
              {BRAND_CONFIG.name} coordinates certified architectural safety solutions across India.
              We connect homeowners with verified, expert local installation partners for invisible
              grills, safety netting, bird protection and specialty residential barriers. Site
              measurements, custom fabrication, and final quotations are provided directly by your
              assigned certified installer at a physical site visit.
            </p>
          </section>

          <section className="bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="sn-h2 text-[#1C1917] mb-3">
              2. Structural Feasibility &amp; Sub-base Verification
            </h2>
            <p>
              Installation requires structurally sound substrate anchoring (such as RCC concrete,
              solid brickwork, or reinforced architectural framing). The installer may recommend
              substrate reinforcement or change the anchoring where site conditions require it for
              your safety.
            </p>
          </section>

          <section className="bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="sn-h2 text-[#1C1917] mb-3">3. Quotations, Pricing &amp; Payments</h2>
            <p>
              Quotations are prepared by the installer from the measured dimensions, the materials
              you choose and the mounting required. The price, the contract and all payments are
              between you and the installer, and are confirmed in writing after the site visit.
            </p>
          </section>

          <section className="bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="sn-h2 text-[#1C1917] mb-3">4. Warranty &amp; Complaints</h2>
            <p>
              The warranty is given by the installer, in writing, at handover. {BRAND_CONFIG.name}{" "}
              checks installers before sending them requests but does not guarantee their work. If
              something goes wrong, tell us — we will follow up with the installer and may stop
              sending them requests. See our{" "}
              <Link to="/warranty" className="underline text-brand font-medium">
                Warranty Guide
              </Link>
              .
            </p>
          </section>

          <section className="bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="sn-h2 text-[#1C1917] mb-3">5. Client Advisory &amp; Contact</h2>
            <p>
              For legal inquiries, terms clarification, or maintenance support, contact our Client
              Service team at{" "}
              {BRAND_CONFIG.contact.emailHref || BRAND_CONFIG.contact.phoneHref ? (
                <>
                  {BRAND_CONFIG.contact.emailHref ? (
                    <a
                      href={BRAND_CONFIG.contact.emailHref}
                      className="underline text-brand font-medium"
                    >
                      {BRAND_CONFIG.contact.email}
                    </a>
                  ) : null}
                  {BRAND_CONFIG.contact.emailHref && BRAND_CONFIG.contact.phoneHref ? " or " : null}
                  {BRAND_CONFIG.contact.phoneHref ? (
                    <a
                      href={BRAND_CONFIG.contact.phoneHref}
                      className="underline text-brand font-medium"
                    >
                      {BRAND_CONFIG.contact.phoneDisplay}
                    </a>
                  ) : null}
                  .
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
