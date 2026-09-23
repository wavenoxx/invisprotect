import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";
import { buildMetaTags } from "@/lib/seo";
import { ShieldCheck, Compass, Ruler, ArrowRight } from "lucide-react";
import { BUSINESS, hubCityList } from "@/config/business";

export const Route = createFileRoute("/campaigns/weightless-pavilion")({
  head: () =>
    buildMetaTags({
      title: `The Weightless Pavilion — Architectural Monograph | ${BRAND_CONFIG.name}`,
      description:
        "An architectural study on cantilever high-rise balconies, wind-load deflection, and the serene dissolution of physical barriers through marine-grade tensile engineering.",
      canonicalPath: "/campaigns/weightless-pavilion",
      ogImage: "/images/homepage/banner-8-desktop.jpg",
      noIndex: true,
    }),
  component: WeightlessPavilion,
});

function WeightlessPavilion() {
  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] min-h-screen">
      <SiteNav appearance="overlay" />

      {/* Hero Header */}
      <section className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[2.39/1] max-h-[85vh] overflow-hidden bg-[#1C1917]">
        <img
          src="/images/homepage/banner-8-desktop.webp"
          alt="The Weightless Pavilion - Unobstructed Balcony Views"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-85"
          loading="eager"
          decoding="async"
        />
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(28,25,23,0.85) 0%, rgba(28,25,23,0.3) 50%, rgba(28,25,23,0.7) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-8 sm:bottom-12 md:bottom-16 text-center text-white px-6 max-w-4xl mx-auto z-20">
          <p className="sn-eyebrow text-[#FAF8F5]/90 mb-2 drop-shadow-md">
            Architectural Monograph · Series 03
          </p>
          <h1 className="sn-h1 text-white max-w-3xl mx-auto drop-shadow-lg mb-3">
            The Weightless Pavilion
          </h1>
          <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#FAF8F5] leading-relaxed font-light drop-shadow-md max-w-2xl mx-auto">
            "When physical barriers dissolve into calibrated tension lines, true sanctuary begins."
          </p>
        </div>
      </section>

      {/* Monograph Essay */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="border-b border-[#1C1917]/10 pb-12 mb-16">
          <span className="text-[10px] font-mono tracking-widest text-brand uppercase font-medium">
            Curatorial Essay
          </span>
          <h2 className="sn-h2 text-[#1C1917] mt-3 mb-6">The Liberation of Elevated Living</h2>
          <div className="space-y-6 text-sm md:text-base font-light text-[#44403C] leading-relaxed">
            <p>
              Contemporary high-rise architecture across {BUSINESS.regionLabel} celebrates the
              cantilevered balcony as an extension of interior sanctuary. Yet, traditional security
              interventions—welded mild steel grates and ornamental iron cages—fracture the facade
              and confine the resident, visually severing the home from the horizon.
            </p>
            <p>
              {BRAND_CONFIG.name} conceives the balcony perimeter not as a cage to be closed, but as
              a weightless pavilion. By anchoring precision-extruded 6063-T6 aluminum tracks
              directly into the reinforced concrete slab and threading continuous AISI 316
              marine-grade stainless steel cables under calibrated individual tension, physical
              security transforms into an almost imperceptible diaphragm of air and light.
            </p>
          </div>
        </div>

        {/* 3 Architectural Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <Compass className="size-6 text-brand mb-4" strokeWidth={1.5} />
            <h3 className="font-display text-sm font-medium text-[#1C1917] uppercase tracking-[0.14em] mb-2">
              01 / Horizon Integrity
            </h3>
            <p className="text-xs text-[#78716C] font-light leading-relaxed">
              Preserving 98% optical openness while ensuring zero fall liability for families and
              pets across heights exceeding 40 floors.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <Ruler className="size-6 text-brand mb-4" strokeWidth={1.5} />
            <h3 className="font-display text-sm font-medium text-[#1C1917] uppercase tracking-[0.14em] mb-2">
              02 / Wind Aero-Acoustics
            </h3>
            <p className="text-xs text-[#78716C] font-light leading-relaxed">
              Aerodynamic multi-strand cabling eliminates high-rise wind whistling and turbulent
              drag common with flat glass partitions and perforated metal sheets.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <ShieldCheck className="size-6 text-brand mb-4" strokeWidth={1.5} />
            <h3 className="font-display text-sm font-medium text-[#1C1917] uppercase tracking-[0.14em] mb-2">
              03 / Emergency Egress
            </h3>
            <p className="text-xs text-[#78716C] font-light leading-relaxed">
              Unlike welded iron barriers that trap occupants during fire emergencies, each cable
              can be severed in seconds with handheld cutters for immediate evacuation.
            </p>
          </div>
        </div>

        {/* Action Card */}
        <div className="p-8 sm:p-12 bg-white border border-[#1C1917]/10 text-center shadow-lg">
          <p className="sn-eyebrow text-brand mb-3">Architectural Advisory</p>
          <h3 className="sn-h2 text-[#1C1917] mb-3">Commission a Private Balcony Evaluation</h3>
          <p className="text-xs md:text-sm font-light text-[#78716C] max-w-xl mx-auto mb-8">
            Experience the architectural liberation of invisible safety. Our regional technical
            advisors provide laser measurements and structural load assessments across{" "}
            {hubCityList()}.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/consultation" className="sn-btn-luxury-solid w-full sm:w-auto">
              Request Site Survey
              <ArrowRight size={13} className="ml-2" />
            </Link>
            <Link to="/solutions" className="sn-btn-luxury-dark w-full sm:w-auto">
              Explore Solutions Explorer
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default WeightlessPavilion;
