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
 * - Paired transparent hairline actions.
 */
const heroCtaBase =
  "inline-flex min-h-11 max-w-[calc(100vw-3rem)] items-center justify-center whitespace-nowrap border bg-transparent px-7 text-[10px] font-medium uppercase tracking-[0.24em] text-white transition-[border-color,background-color,color,box-shadow,transform] duration-200 ease-out md:hover:-translate-y-px md:hover:border-brand md:hover:bg-brand md:hover:shadow-[0_4px_14px_color-mix(in_oklab,var(--brand)_24%,transparent)] focus-visible:-translate-y-px focus-visible:border-brand focus-visible:bg-brand focus-visible:shadow-[0_4px_14px_color-mix(in_oklab,var(--brand)_24%,transparent)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:translate-y-0 active:scale-[0.99] active:border-brand active:bg-brand";

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
        <picture>
          <source srcSet="/images/homepage/hero-desktop.webp" type="image/webp" />
          <img
            src="/images/homepage/hero-desktop.jpg"
            alt="Widescreen architectural balcony with an unobstructed safety view"
            width={1672}
            height={941}
            className="h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </div>

      {/* Mobile Visual Container (9:16 Mobile Portrait Hero Canvas) */}
      <div
        className="md:hidden absolute inset-0 w-full h-full z-0"
        data-slot="mobile-hero-canvas-9-16"
      >
        <picture>
          <source srcSet="/images/homepage/hero-mobile.webp" type="image/webp" />
          <img
            src="/images/homepage/hero-mobile.jpg"
            alt="Residential balcony opening designed for discreet safety protection"
            width={941}
            height={1672}
            className="h-full w-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
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
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-14 sm:pb-20 md:pb-24 px-4 sm:px-8 md:px-12 text-center w-full max-w-full">
        {/* Unified H1 Headline with crisp contrast drop-shadow */}
        <h1 className="sn-h1 text-white max-w-xl sm:max-w-2xl px-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] mb-3 text-balance">
          Invisible Grills &amp; Safety Nets
        </h1>

        {/* Unified Subtext Descriptor */}
        <p className="sn-subtext text-[#FAF8F5] max-w-md px-4 drop-shadow-[0_1.5px_6px_rgba(0,0,0,0.85)] mb-8 text-balance">
          Architectural safety for modern discerning homes.
        </p>

        {/* Transparent Editorial Actions */}
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link to="/consultation" className={`${heroCtaBase} border-white/68 px-7`}>
            Request Site Survey
          </Link>
          <Link to="/solutions" className={`${heroCtaBase} border-white/40 text-white/85`}>
            Explore Solutions
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
