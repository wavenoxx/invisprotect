import { Link } from "@tanstack/react-router";
import { BRAND_CONFIG } from "@/config/brand";

interface ProofSectionProps {
  categorySlug?: string;
}

export function ProofSection({ categorySlug }: ProofSectionProps) {
  return (
    <section className="w-full bg-[#FAF8F5] border-t border-[#1C1917]/10 py-20 md:py-28 text-[#1C1917]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <p className="sn-eyebrow text-[#F37021] mb-3 font-medium">Engineering Standards</p>
          <h2 className="sn-h1 text-[#1C1917] mb-3">Proof, Not Promises</h2>
          <p className="sn-subtext text-[#44403C]">
            Every {BRAND_CONFIG.name ? `${BRAND_CONFIG.name} ` : ""}installation is built upon
            verified material chemistry, precision laser site surveys, and documented mechanical
            anchoring.
          </p>
        </div>

        {/* 4 Architectural Fact Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 border-t border-[#1C1917]/10 pt-12">
          {/* 1. Metallurgy */}
          <div className="flex flex-col bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <span className="text-[10px] font-mono tracking-widest text-[#F37021] uppercase mb-2 font-medium">
              01 / Metallurgy
            </span>
            <h3 className="font-serif text-lg font-light text-[#1C1917] uppercase tracking-wider mb-3">
              AISI 316 Marine Alloy
            </h3>
            <p className="text-xs text-[#44403C] font-light leading-relaxed">
              We specify genuine AISI 316 marine-grade austenitic stainless steel wire rope encased
              in UV-stabilized Nylon-12 for high tensile strength and coastal corrosion resistance.
            </p>
            <Link
              to="/material-standards"
              className="mt-4 inline-flex items-center text-[10px] uppercase tracking-[0.2em] font-medium text-[#1C1917] hover:text-[#F37021] hover:underline underline-offset-4 focus-ring transition-colors"
            >
              Material Standards →
            </Link>
          </div>

          {/* 2. Precision Anchoring */}
          <div className="flex flex-col bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <span className="text-[10px] font-mono tracking-widest text-[#F37021] uppercase mb-2 font-medium">
              02 / Anchoring
            </span>
            <h3 className="font-serif text-lg font-light text-[#1C1917] uppercase tracking-wider mb-3">
              6063-T6 Aluminum Track
            </h3>
            <p className="text-xs text-[#44403C] font-light leading-relaxed">
              Extruded architectural aluminum profiles anchored into RCC slabs using heavy-duty
              stainless steel expansion bolts and individual line tension-lockers.
            </p>
            <Link
              to="/craftsmanship"
              className="mt-4 inline-flex items-center text-[10px] uppercase tracking-[0.2em] font-medium text-[#1C1917] hover:text-[#F37021] hover:underline underline-offset-4 focus-ring transition-colors"
            >
              The Craftsmanship →
            </Link>
          </div>

          {/* 3. Documented Handover */}
          <div className="flex flex-col bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <span className="text-[10px] font-mono tracking-widest text-[#F37021] uppercase mb-2 font-medium">
              03 / Accountability
            </span>
            <h3 className="font-serif text-lg font-light text-[#1C1917] uppercase tracking-wider mb-3">
              Written Warranty
            </h3>
            <p className="text-xs text-[#44403C] font-light leading-relaxed">
              Transparent, system-specific material warranties documented upon final inspection and
              handover, supported by our regional maintenance and tension-tuning team.
            </p>
            <Link
              to="/warranty"
              className="mt-4 inline-flex items-center text-[10px] uppercase tracking-[0.2em] font-medium text-[#1C1917] hover:text-[#F37021] hover:underline underline-offset-4 focus-ring transition-colors"
            >
              Warranty Matrix →
            </Link>
          </div>

          {/* 4. Verified Service Hubs */}
          <div className="flex flex-col bg-white p-6 border border-[#1C1917]/8 shadow-sm">
            <span className="text-[10px] font-mono tracking-widest text-[#F37021] uppercase mb-2 font-medium">
              04 / Advisory
            </span>
            <h3 className="font-serif text-lg font-light text-[#1C1917] uppercase tracking-wider mb-3">
              Regional Operations
            </h3>
            <p className="text-xs text-[#44403C] font-light leading-relaxed">
              Direct master installers and safety advisors serving residential communities and
              commercial estates across 7 primary hubs in Telangana &amp; Andhra Pradesh: Hyderabad,
              Visakhapatnam, Vijayawada, Amaravati, Tirupati, Warangal, and Hanamkonda.
            </p>
            <Link
              to="/service-areas"
              className="mt-4 inline-flex items-center text-[10px] uppercase tracking-[0.2em] font-medium text-[#1C1917] hover:text-[#F37021] hover:underline underline-offset-4 focus-ring transition-colors"
            >
              Service Areas →
            </Link>
          </div>
        </div>

        {/* Action Banner */}
        <div className="mt-16 p-8 bg-[#F4EFEA] border border-[#1C1917]/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <p className="text-sm font-medium text-[#1C1917]">
              Schedule a precision laser measurement of your balcony or window openings.
            </p>
            <p className="text-xs text-[#78716C] font-light mt-1">
              Complimentary on-site evaluation by trained regional safety advisors.
            </p>
          </div>
          <Link
            to="/consultation"
            search={categorySlug ? { service: categorySlug } : undefined}
            className="sn-btn-luxury-solid shrink-0"
          >
            Request Site Survey
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProofSection;
