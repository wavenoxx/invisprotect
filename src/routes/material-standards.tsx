import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";
import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/material-standards")({
  head: () =>
    buildMetaTags({
      title: `Material Standards, Alloys & Polymer Tolerances — ${BRAND_CONFIG.name}`,
      description: `Engineering specifications, alloy compositions, and polymer tolerances behind ${BRAND_CONFIG.name} invisible safety systems.`,
      canonicalPath: "/material-standards",
    }),
  component: MaterialStandardsPage,
});

function MaterialStandardsPage() {
  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] min-h-screen flex flex-col">
      <SiteNav />

      <main className="flex-1 max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-24">
        <header className="mb-12 pb-8 border-b border-[#1C1917]/10">
          <p className="sn-eyebrow text-[#F37021] mb-3 font-medium">Engineering Governance</p>
          <h1 className="sn-h1 text-[#1C1917]">Material Standards &amp; Tolerances</h1>
          <p className="sn-subtext text-[#78716C] mt-3">
            Architectural integrity through verified metallurgical and polymer specifications.
          </p>
        </header>

        <section className="space-y-12 text-xs md:text-sm font-light leading-relaxed text-[#44403C]">
          <div className="border-t border-[#1C1917]/10 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="text-base uppercase tracking-widest font-medium text-[#1C1917]">
              01. AISI 316 Stainless Steel
            </h2>
            <div className="md:col-span-2 space-y-3">
              <p>
                The core structural element of our Invisible Grills consists of austenitic AISI 316
                marine-grade stainless steel cables. Containing 2% to 3% molybdenum, this alloy
                provides superior resistance to chloride pitting and crevice corrosion compared to
                standard 304 stainless steel.
              </p>
              <p className="text-xs text-[#78716C]">
                Ideal for high-humidity coastal and urban environments across Telangana &amp; Andhra
                Pradesh, including Hyderabad, Visakhapatnam, Vijayawada, Amaravati, Tirupati,
                Warangal, and Hanamkonda.
              </p>
            </div>
          </div>

          <div className="border-t border-[#1C1917]/10 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="text-base uppercase tracking-widest font-medium text-[#1C1917]">
              02. Nylon-12 Translucent Sheathing
            </h2>
            <div className="md:col-span-2 space-y-3">
              <p>
                Each steel cable core is encapsulated in an extruded translucent Nylon-12 membrane.
                Nylon-12 exhibits high chemical resistance, low moisture absorption, and thermal
                stability under direct tropical UV sunlight, preventing cable fraying and user
                abrasion.
              </p>
            </div>
          </div>

          <div className="border-t border-[#1C1917]/10 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="text-base uppercase tracking-widest font-medium text-[#1C1917]">
              03. 6063-T6 Structural Aluminum Profiles
            </h2>
            <div className="md:col-span-2 space-y-3">
              <p>
                Anchoring tracks are precision-extruded from architectural 6063-T6 tempered aluminum
                alloy. Anodized or powder-coated in matte stone profiles, they house the tension
                lock mechanisms flush against your masonry without visible raw screw heads.
              </p>
            </div>
          </div>

          <div className="border-t border-[#1C1917]/10 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <h2 className="text-base uppercase tracking-widest font-medium text-[#1C1917]">
              04. Virgin High-Density Polyethylene (HDPE)
            </h2>
            <div className="md:col-span-2 space-y-3">
              <p>
                Our safety netting lines utilize 100% virgin polymer monofilaments blended with UV
                absorbers during manufacturing. Double-knotted mesh junctions prevent strand
                displacement under impact while maintaining high tensile strength across seasonal
                temperature shifts.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-14 pt-8 border-t border-[#1C1917]/10 text-center">
          <Link to="/craftsmanship" className="sn-btn-luxury-dark">
            Explore The Craftsmanship →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MaterialStandardsPage;
