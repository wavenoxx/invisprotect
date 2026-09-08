import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";

import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/craftsmanship")({
  head: () =>
    buildMetaTags({
      title: `Materials, Metallurgy & Tensile Engineering — ${BRAND_CONFIG.name}`,
      description:
        "Precision engineering and architectural strength. Verified AISI 316 marine-grade stainless steel cables, UV-stabilized Nylon-12 coating, and 6063-T6 aluminum tracks.",
      canonicalPath: "/craftsmanship",
      ogImage: "/images/craftsmanship/hero.jpg",
    }),
  component: CraftsmanshipPage,
});

const ledger = [
  {
    eyebrow: "01 — AISI 316 Marine Grade Stainless Steel Core",
    title: "The Core",
    copy: "The spine of our system. We utilize AISI 316-grade marine stainless steel, alloyed with molybdenum for superior rust resistance. This alloy resists corrosion in highly humid and coastal environments across Telangana & Andhra Pradesh, ensuring long-term structural integrity.",
  },
  {
    eyebrow: "02 — Nylon-12 Protective Shield",
    title: "The Shield",
    copy: "Each steel core is encapsulated in a translucent Nylon-12 coating. Unlike standard PVC coatings that degrade under intense tropical sunlight, Nylon-12 is highly UV-stabilized, smooth to the touch, and engineered to prevent weathering and abrasion.",
  },
  {
    eyebrow: "03 — Calibrated Tension Locking System",
    title: "The Anchor",
    copy: "Cables must remain true and aligned to preserve visual transparency. Our tracks utilize internal tension lockers housed in an extruded structural aluminum profile, engineered to maintain sustained cable tension and structural alignment over time.",
  },
  {
    eyebrow: "04 — UV-Stabilized HDPE Weave",
    title: "The Mesh",
    copy: "For our safety netting systems, we utilize virgin high-density polyethylene threads braided with UV stabilizers. Woven in a double-knotted lock pattern, they absorb impact forces without strand displacement, creating a calm, protective perimeter barrier.",
  },
];

const specs = [
  { label: "Tensile Strength", value: "High Tensile", note: "AISI 316 steel core" },
  { label: "Wind Resistance", value: "High-Rise Rated", note: "engineered for elevated exposure" },
  { label: "UV Stability Index", value: "UV-Stabilized", note: "nylon-12 & HDPE polymer" },
  { label: "Warranty Coverage", value: "System Warranty", note: "see written terms" },
];

function CraftsmanshipPage() {
  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] min-h-screen">
      <SiteNav />

      {/* Hero Header with Exact Cinematic Visual */}
      <section className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[2.39/1] max-h-[85vh] overflow-hidden bg-[#FAF8F5]">
        <img
          src="/images/craftsmanship-hero.png"
          alt="Precision Engineering and Architectural Strength"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
        {/* Delicate Ambient Vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(28,25,23,0.8) 0%, rgba(28,25,23,0.25) 45%, rgba(28,25,23,0.6) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-6 sm:bottom-10 md:bottom-14 text-center text-white px-6 max-w-4xl mx-auto z-20">
          <p className="sn-eyebrow text-[#FAF8F5]/90 mb-1.5 md:mb-2 drop-shadow-md">
            The Craftsmanship
          </p>
          <h1 className="sn-h1 text-white max-w-3xl mx-auto drop-shadow-lg mb-2 md:mb-3">
            Precision Engineering, Architectural Strength
          </h1>
          <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#FAF8F5] leading-relaxed font-light drop-shadow-md">
            "High-tensile marine grade elements, engineered to disappear."
          </p>
        </div>
      </section>

      {/* Technical Ledger */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-20 md:pt-28">
        <div className="text-center mb-12">
          <p className="sn-eyebrow text-[#F37021] font-medium">The Technical Ledger</p>
          <h2 className="sn-h1 text-[#1C1917] mt-3 mb-2">Materials of Consequence</h2>
        </div>

        {ledger.map((b) => (
          <div
            key={b.title}
            className="border-t border-[#1C1917]/10 py-12 px-2 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white my-4 border border-[#1C1917]/8 shadow-sm"
          >
            <div>
              <p className="sn-eyebrow text-[#F37021] font-medium">{b.eyebrow}</p>
              <h3 className="font-serif text-lg md:text-xl font-light text-[#1C1917] uppercase tracking-wider mt-3">
                {b.title}
              </h3>
            </div>
            <p className="text-sm md:text-[15px] leading-relaxed text-[#44403C] font-light tracking-wide">
              {b.copy}
            </p>
          </div>
        ))}
      </section>

      {/* Specs Grid */}
      <section className="bg-[#F4EFEA] mt-20 md:mt-28 py-20 md:py-28 border-t border-b border-[#1C1917]/10">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <p className="sn-eyebrow text-[#F37021] font-medium">Tolerances</p>
            <h2 className="sn-h1 text-[#1C1917] mt-3">Specifications</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-[#1C1917]/10">
            {specs.map((s) => (
              <div
                key={s.label}
                className="border-r border-b border-[#1C1917]/10 p-8 text-center bg-white shadow-xs"
              >
                <p className="sn-eyebrow text-[#F37021] font-medium">{s.label}</p>
                <p className="font-serif text-2xl md:text-3xl text-[#1C1917] font-light mt-4 tracking-wide">
                  {s.value}
                </p>
                <p className="mt-2 text-[11px] font-light text-[#78716C] tracking-wide">{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 border-t border-[#1C1917]/10">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="sn-eyebrow text-[#F37021] font-medium">By Appointment</p>
          <h2 className="sn-h1 text-[#1C1917] mt-4 mb-4">Inspect Your Space</h2>
          <p className="sn-subtext text-[#44403C] max-w-md mx-auto mb-8">
            A safety advisor will visit your residence, conduct precision site measurements, and
            propose an installation tailored to your architecture.
          </p>
          <Link to="/consultation" className="sn-btn-luxury-solid">
            Request Bespoke Measurement
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default CraftsmanshipPage;
