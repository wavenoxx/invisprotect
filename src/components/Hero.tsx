import { Link } from "@tanstack/react-router";
import { BRAND_CONFIG } from "@/config/brand";

/**
 * Hero — Hermès & Louis Vuitton Quiet Luxury Hero with Master Architectural Visuals.
 *
 * Directives:
 * - Desktop View: Full-screen 16:9 / widescreen responsive hero canvas.
 * - Mobile View: 9:16 aspect ratio dedicated mobile portrait canvas.
 * - Separate desktop and mobile image slots.
 * - H1 Headline: "Invisible Grills & Safety Nets" (Cormorant Garamond 300).
 * - Subtext: "Architectural safety for modern discerning homes." (Inter 300).
 * - Hermès signature orange solid CTA + framed exploration CTA.
 */
const Hero = () => {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#FAF8F5] select-none h-[100dvh] min-h-[580px] md:min-h-[640px]"
      aria-label={
        BRAND_CONFIG.name
          ? `${BRAND_CONFIG.name} Architectural Safety Hero`
          : "Architectural Safety Hero"
      }
    >
      {/* Desktop Visual Container (16:9 / Widescreen Hero Canvas) */}
      <div
        className="hidden md:block absolute inset-0 w-full h-full z-0"
        data-slot="desktop-hero-canvas"
      >
        <img
          src="/images/homepage/hero-desktop.png"
          alt="Widescreen Architectural Balcony Safety View"
          width={1672}
          height={941}
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* Mobile Visual Container (9:16 Mobile Portrait Hero Canvas) */}
      <div
        className="md:hidden absolute inset-0 w-full h-full z-0"
        data-slot="mobile-hero-canvas-9-16"
      >
        <img
          src="/images/homepage/hero-mobile.png"
          alt="Architectural Safety — Mobile Balcony View (9:16)"
          width={941}
          height={1672}
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* Warm Atmospheric Vignette for Pristine Color & Text Legibility */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(28,25,23,0.2) 0%, rgba(28,25,23,0.08) 45%, rgba(28,25,23,0.65) 100%)",
        }}
      />

      {/* Editorial Content Overlay (Lower-Third Placement) */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-14 sm:pb-20 md:pb-24 px-6 md:px-12 text-center">
        {/* Unified H1 Headline with crisp contrast drop-shadow */}
        <h1 className="sn-h1 text-white max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] mb-3">
          Invisible Grills &amp; Safety Nets
        </h1>

        {/* Unified Subtext Descriptor */}
        <p className="sn-subtext text-[#FAF8F5] max-w-md drop-shadow-[0_1.5px_6px_rgba(0,0,0,0.85)] mb-8">
          Architectural safety for modern discerning homes.
        </p>

        {/* Luxury Framed Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-4 sm:px-0">
          <Link to="/consultation" className="sn-btn-luxury-solid w-full sm:w-auto focus-ring">
            Request Site Survey
          </Link>
          <Link to="/solutions" className="sn-btn-luxury w-full sm:w-auto focus-ring">
            Explore Solutions
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
