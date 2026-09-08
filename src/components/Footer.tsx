import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { BRAND_CONFIG } from "@/config/brand";
import { trackEngagement } from "@/lib/analytics";
import { BrandLogo } from "./BrandLogo";

export function Footer() {
  const [showServiceArea, setShowServiceArea] = useState(false);

  return (
    <footer className="bg-[#1C1917] border-t border-[#1C1917] text-[#FAF8F5] select-none">
      {/* BRAND HEADER */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-6 border-b border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <BrandLogo variant="horizontal" color="#FAF8F5" goldColor="#C5A880" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#A8A29E] font-light">
          Architectural Safety Atelier
        </span>
      </div>

      {/* SECTION 1: 4-COLUMN LINK GRID */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: SERVICES */}
          <div>
            <h4
              className="uppercase mb-6"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.25em",
                color: "#F37021",
              }}
            >
              Services
            </h4>
            <ul className="space-y-3.5">
              {[
                { label: "Invisible Grills", to: "/category/invisible-grills" },
                { label: "Core Safety Nets", to: "/category/core-safety-nets" },
                { label: "Construction & Industrial", to: "/category/construction-industrial" },
                { label: "Animal & Bird Protection", to: "/category/animal-bird-protection" },
                { label: "Specialty Solutions", to: "/category/specialty-solutions" },
                { label: "Solutions Explorer", to: "/solutions" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-[#D6D3D1] hover:text-[#F37021] hover:underline underline-offset-4 transition-colors focus-ring"
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: "12px",
                      fontWeight: 300,
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: CUSTOMER CARE */}
          <div>
            <h4
              className="uppercase mb-6"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.25em",
                color: "#F37021",
              }}
            >
              Customer Care
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link
                  to="/consultation"
                  className="text-[#D6D3D1] hover:text-[#F37021] hover:underline underline-offset-4 transition-colors focus-ring"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  Request Site Survey
                </Link>
              </li>
              <li>
                <Link
                  to="/warranty"
                  className="text-[#D6D3D1] hover:text-[#F37021] hover:underline underline-offset-4 transition-colors focus-ring"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  Warranty Policy &amp; Terms
                </Link>
              </li>
              <li>
                <Link
                  to="/safety-faq"
                  className="text-[#D6D3D1] hover:text-[#F37021] hover:underline underline-offset-4 transition-colors focus-ring"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  Safety &amp; Architecture FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/material-standards"
                  className="text-[#D6D3D1] hover:text-[#F37021] hover:underline underline-offset-4 transition-colors focus-ring"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  Material Standards
                </Link>
              </li>
              <li>
                <Link
                  to="/maintenance-repair"
                  className="text-[#D6D3D1] hover:text-[#F37021] hover:underline underline-offset-4 transition-colors focus-ring"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  Care &amp; Maintenance Protocol
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: THE ATELIER HOUSE */}
          <div>
            <h4
              className="uppercase mb-6"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.25em",
                color: "#F37021",
              }}
            >
              The {BRAND_CONFIG.name ? `${BRAND_CONFIG.name} House` : "Atelier House"}
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link
                  to="/our-story"
                  className="text-[#D6D3D1] hover:text-[#F37021] hover:underline underline-offset-4 transition-colors focus-ring"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/craftsmanship"
                  className="text-[#D6D3D1] hover:text-[#F37021] hover:underline underline-offset-4 transition-colors focus-ring"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  The Craftsmanship
                </Link>
              </li>
              <li>
                <Link
                  to="/lifestyle"
                  className="text-[#D6D3D1] hover:text-[#F37021] hover:underline underline-offset-4 transition-colors focus-ring"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  The Lifestyle
                </Link>
              </li>
              <li>
                <Link
                  to="/service-areas"
                  className="text-[#FAF8F5] hover:text-[#F37021] hover:underline underline-offset-4 transition-colors focus-ring font-medium"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                  }}
                >
                  Verified Service Areas →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: LEGAL & DIRECTORY */}
          <div>
            <h4
              className="uppercase mb-6"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.25em",
                color: "#F37021",
              }}
            >
              Legal &amp; Index
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link
                  to="/terms"
                  className="text-[#D6D3D1] hover:text-[#F37021] hover:underline underline-offset-4 transition-colors focus-ring"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-[#D6D3D1] hover:text-[#F37021] hover:underline underline-offset-4 transition-colors focus-ring"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  Privacy &amp; Cookies
                </Link>
              </li>
              <li>
                <Link
                  to="/sitemap"
                  className="text-[#D6D3D1] hover:text-[#F37021] hover:underline underline-offset-4 transition-colors focus-ring"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                  }}
                >
                  Site Directory
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* SECTION 2: CLIENT SERVICE & REGIONAL ADVISORY */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Direct Contact */}
            <div>
              <h4
                className="uppercase mb-3"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.25em",
                  color: "#F37021",
                }}
              >
                Client Service &amp; Site Surveys
              </h4>
              <p
                className="mb-4 text-xs font-light text-[#D6D3D1] leading-relaxed"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                An architectural safety advisor is available for scheduling on-site precision
                measurements across Telangana &amp; Andhra Pradesh:
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-light text-[#D6D3D1]">
                {BRAND_CONFIG.contact.enabled ? (
                  <>
                    <a
                      href={`tel:${BRAND_CONFIG.contact.phoneDial}`}
                      onClick={() => trackEngagement("phone", "footer")}
                      className="hover:text-[#F37021] hover:underline underline-offset-4 font-normal text-[#FAF8F5] focus-ring transition-colors"
                    >
                      Call: {BRAND_CONFIG.contact.phoneDisplay}
                    </a>
                    <a
                      href={BRAND_CONFIG.socials.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEngagement("whatsapp", "footer")}
                      className="hover:text-[#F37021] hover:underline underline-offset-4 font-normal text-[#FAF8F5] focus-ring transition-colors"
                    >
                      WhatsApp: {BRAND_CONFIG.contact.whatsappDisplay}
                    </a>
                    <a
                      href={`mailto:${BRAND_CONFIG.contact.email}`}
                      onClick={() => trackEngagement("email", "footer")}
                      className="hover:text-[#F37021] hover:underline underline-offset-4 text-[#D6D3D1] focus-ring transition-colors"
                    >
                      Email: {BRAND_CONFIG.contact.email}
                    </a>
                  </>
                ) : (
                  <span className="text-[#A8A29E] tracking-wider text-[11px] uppercase">
                    Direct inquiries coordinated via{" "}
                    <Link
                      to="/consultation"
                      className="text-[#F37021] underline underline-offset-4 hover:text-white"
                    >
                      Site Survey Request
                    </Link>
                  </span>
                )}
              </div>
            </div>

            {/* Quiet Brand Mission Statement */}
            <div className="md:text-right">
              <p className="font-serif italic text-base md:text-lg text-[#E7E5E4] font-light leading-relaxed">
                "The art of architectural protection — securing your sanctuary with quiet elegance."
              </p>
              <div className="mt-2.5 flex flex-col md:items-end gap-0.5 text-[9.5px] sm:text-[10px] tracking-[0.16em] uppercase text-[#A8A29E] font-light">
                <span>Telangana: Hyderabad · Warangal · Hanamkonda</span>
                <span>Andhra Pradesh: Vizag · Vijayawada · Amaravati · Tirupati</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: SUB-BOTTOM BAR */}
      <div className="border-t border-white/10 bg-[#141210]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* SERVICE AREA */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowServiceArea(!showServiceArea)}
                className="text-[11px] text-[#A8A29E] hover:text-[#F37021] font-light uppercase tracking-widest flex items-center gap-1.5 focus-ring cursor-pointer transition-colors"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                aria-expanded={showServiceArea}
              >
                <span>Verified Service Hubs: Telangana &amp; Andhra Pradesh</span>
                <span className="text-[9px]">{showServiceArea ? "▲" : "▼"}</span>
              </button>
              {showServiceArea && (
                <div
                  className="absolute bottom-full left-0 mb-2 w-80 bg-[#24201D] border border-white/15 p-4 shadow-2xl text-xs font-light text-[#D6D3D1] space-y-2 z-50"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  <p className="font-medium text-[#FAF8F5] text-[11px] uppercase tracking-wider text-[#F37021]">
                    Operational Hubs (7 Cities)
                  </p>
                  <p>• Telangana: Hyderabad &amp; Secunderabad, Warangal, Hanamkonda</p>
                  <p>• Andhra Pradesh: Visakhapatnam, Vijayawada, Amaravati, Tirupati</p>
                  <div className="pt-2 border-t border-white/10">
                    <Link
                      to="/service-areas"
                      className="text-[10px] uppercase tracking-wider text-[#F37021] underline underline-offset-4 hover:text-[#FAF8F5]"
                    >
                      View All Locality Details →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* COPYRIGHT */}
            <p
              className="text-[10px] uppercase font-light text-[#A8A29E] tracking-[0.2em]"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              © {new Date().getFullYear()} {BRAND_CONFIG.name || "InvisProtect"}. All Rights
              Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
