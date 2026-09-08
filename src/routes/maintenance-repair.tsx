import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { ProofSection } from "@/components/ProofSection";
import { BRAND_CONFIG } from "@/config/brand";
import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/maintenance-repair")({
  head: () =>
    buildMetaTags({
      title: `Care, Maintenance & Retensioning Protocol — ${BRAND_CONFIG.name}`,
      description: `Architectural care instructions and maintenance guidelines for ${BRAND_CONFIG.name} invisible grills, safety nets, and bird deterrent systems.`,
      canonicalPath: "/maintenance-repair",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Care, Maintenance & Retensioning Protocol",
        description: `Official care guidelines and maintenance schedule for ${BRAND_CONFIG.name} architectural safety installations.`,
        publisher: {
          "@type": "Organization",
          name: BRAND_CONFIG.name,
          url: BRAND_CONFIG.domain,
        },
      },
    }),
  component: MaintenanceRepairPage,
});

function MaintenanceRepairPage() {
  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] min-h-screen">
      <SiteNav />

      {/* Hero Header */}
      <section className="relative w-full pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12 bg-[#FAF8F5] border-b border-[#1C1917]/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="sn-eyebrow text-[#F37021] mb-4 font-medium">System Longevity</p>
          <h1 className="sn-h1 text-[#1C1917] mb-4">Care, Maintenance &amp; Retensioning</h1>
          <p className="sn-subtext text-[#44403C] max-w-2xl mx-auto">
            {BRAND_CONFIG.name} architectural safety systems are engineered for enduring durability.
            Following these simple care guidelines preserves crystal optical clarity and optimal
            tensile performance for years.
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-20">
        {/* 1. Invisible Grills Care */}
        <article className="border-b border-[#1C1917]/10 pb-16">
          <span className="text-[10px] font-mono tracking-widest text-[#F37021] uppercase font-medium">
            Section 01 / Invisible Grills
          </span>
          <h2 className="font-serif text-2xl font-light text-[#1C1917] uppercase tracking-wider mt-2 mb-6">
            Invisible Grills Maintenance Protocol
          </h2>
          <div className="space-y-4 text-xs md:text-sm text-[#44403C] font-light leading-relaxed">
            <p>
              The AISI 316 stainless steel cables are sheathed in a transparent UV-stabilized
              Nylon-12 polymer layer that repels water and airborne dust.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-white border border-[#1C1917]/10 p-6 shadow-sm">
                <h3 className="font-medium text-[#1C1917] uppercase text-xs tracking-wider mb-2 text-[#F37021]">
                  Recommended Cleaning
                </h3>
                <p className="text-[#78716C]">
                  Wipe cables every 3–6 months using a soft microfiber cloth dampened with lukewarm
                  water and mild neutral soap. Rinse with clean water and dry with a lint-free
                  towel.
                </p>
              </div>
              <div className="bg-white border border-[#1C1917]/10 p-6 shadow-sm">
                <h3 className="font-medium text-[#1C1917] uppercase text-xs tracking-wider mb-2 text-[#F37021]">
                  Avoid Abrasives
                </h3>
                <p className="text-[#78716C]">
                  Never use steel wool, wire brushes, strong acids, or chlorine-based solvents.
                  Abrasive scrubbers can scratch the protective polymer coating.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* 2. Renovation & Civil Work Guidelines */}
        <article className="border-b border-[#1C1917]/10 pb-16">
          <span className="text-[10px] font-mono tracking-widest text-[#F37021] uppercase font-medium">
            Section 02 / Renovation Guidelines
          </span>
          <h2 className="font-serif text-2xl font-light text-[#1C1917] uppercase tracking-wider mt-2 mb-6">
            Building Exterior Painting &amp; Civil Work
          </h2>
          <p className="text-xs md:text-sm text-[#44403C] font-light leading-relaxed mb-6">
            When repainting balconies or conducting civil work near {BRAND_CONFIG.name}{" "}
            installations:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#44403C] font-light leading-relaxed">
            <div className="border border-[#1C1917]/10 p-6 bg-white shadow-sm">
              <h3 className="font-medium text-[#1C1917] mb-2 uppercase text-xs tracking-wider text-[#F37021]">
                1. Masking Protection
              </h3>
              <p className="text-[#78716C]">
                Cover the aluminum track profiles and lower cable junctions with masking tape and
                protective plastic sheets before sanding or applying primer.
              </p>
            </div>
            <div className="border border-[#1C1917]/10 p-6 bg-white shadow-sm">
              <h3 className="font-medium text-[#1C1917] mb-2 uppercase text-xs tracking-wider text-[#F37021]">
                2. Paint Overspray
              </h3>
              <p className="text-[#78716C]">
                If latex water-based paint splatters on cables, wipe immediately with a damp warm
                towel. Do not scrape dry paint with sharp razor blades.
              </p>
            </div>
            <div className="border border-[#1C1917]/10 p-6 bg-white shadow-sm">
              <h3 className="font-medium text-[#1C1917] mb-2 uppercase text-xs tracking-wider text-[#F37021]">
                3. Substrate Integrity
              </h3>
              <p className="text-[#78716C]">
                Do not tamper with or remove structural anchor expansion bolts embedded into the
                concrete slab during civil plastering.
              </p>
            </div>
          </div>
        </article>

        {/* 3. Safety Nets Care */}
        <article className="border-b border-[#1C1917]/10 pb-16">
          <span className="text-[10px] font-mono tracking-widest text-[#F37021] uppercase font-medium">
            Section 03 / Balcony Safety Nets
          </span>
          <h2 className="font-serif text-2xl font-light text-[#1C1917] uppercase tracking-wider mt-2 mb-6">
            Balcony &amp; Window Netting Care
          </h2>
          <div className="space-y-4 text-xs md:text-sm text-[#44403C] font-light leading-relaxed">
            <p>
              Our high-density monofilament HDPE netting is treated with carbon-black UV
              stabilizers. Routine maintenance ensures uncompromised load capacity:
            </p>
            <div className="space-y-3 pt-2">
              <p>
                • Rinse gently with a low-pressure garden hose spray nozzle every 4–6 months to
                remove accumulated urban dust and bird feathers.
              </p>
              <p>
                • Inspect corner anchor hooks once a year to ensure tension cords remain firmly
                engaged in their eyelets.
              </p>
            </div>
            <div className="bg-[#F37021]/8 border border-[#F37021]/30 p-6 text-xs text-[#1C1917] font-light leading-relaxed mt-4">
              <h3 className="font-medium uppercase text-[11px] tracking-wider mb-2 text-[#F37021]">
                Safety Caution
              </h3>
              <p>
                Keep open flames, barbecue smokers, and festive fireworks away from polymer netting
                cords. High thermal exposure can fuse synthetic fibers.
              </p>
            </div>
          </div>
        </article>

        {/* 4. Retensioning & Inspection Services */}
        <article>
          <span className="text-[10px] font-mono tracking-widest text-[#F37021] uppercase font-medium">
            Section 04 / Professional Services
          </span>
          <h2 className="font-serif text-2xl font-light text-[#1C1917] uppercase tracking-wider mt-2 mb-6">
            Professional Inspection &amp; Retensioning
          </h2>
          <p className="text-xs md:text-sm text-[#44403C] font-light leading-relaxed mb-8">
            While {BRAND_CONFIG.name} invisible grills utilize mechanical dual-key tension locks
            designed for long-term tautness, structural building settling or exterior impact may
            warrant inspection. Our regional service technicians provide:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-[#44403C] font-light">
            <div className="border border-[#1C1917]/10 p-6 bg-white shadow-sm">
              <span className="font-medium text-[#1C1917] block mb-1 text-[#F37021]">
                Tension Recalibration
              </span>
              <p className="text-[#78716C]">
                Precision retensioning of individual cable lines to restore uniform spacing.
              </p>
            </div>
            <div className="border border-[#1C1917]/10 p-6 bg-white shadow-sm">
              <span className="font-medium text-[#1C1917] block mb-1 text-[#F37021]">
                Single-Line Replacement
              </span>
              <p className="text-[#78716C]">
                Rapid replacement of isolated cables severed during emergency egress or civil work.
              </p>
            </div>
            <div className="border border-[#1C1917]/10 p-6 bg-white shadow-sm">
              <span className="font-medium text-[#1C1917] block mb-1 text-[#F37021]">
                Anchor Inspection
              </span>
              <p className="text-[#78716C]">
                Structural substrate testing and replacement of aged fasteners or track covers.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/consultation" className="sn-btn-luxury-solid">
              Request Maintenance Visit →
            </Link>
          </div>
        </article>
      </main>

      <ProofSection />
      <Footer />
    </div>
  );
}

export default MaintenanceRepairPage;
