import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { BRAND_CONFIG } from "@/config/brand";

import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/lifestyle")({
  head: () =>
    buildMetaTags({
      title: `Architectural Living Spaces & Open Horizons — ${BRAND_CONFIG.name}`,
      description:
        "Living without hesitation: breathtaking panoramic views, open breezes, and child safety enjoyed in complete peace of mind.",
      canonicalPath: "/lifestyle",
      ogImage: "/images/lifestyle/hero.jpg",
    }),
  component: LifestylePage,
});

const pillars = [
  {
    image: "/images/lifestyle/feature-1.png",
    title: "CURIOSITY WITHOUT BOUNDARIES",
    eyebrow: "The Child's Exploration",
    copy: "Curiosity knows no limits, and safety shouldn't feel like confinement. A home should be a canvas of discovery, not a constant source of parental anxiety. We weave a silent, unyielding guardian around your edges, letting your children explore while you breathe freely.",
    reverse: false,
  },
  {
    image: "/images/lifestyle/feature-2.png",
    title: "WOVEN INTO THE LIGHT",
    eyebrow: "The Preserved Horizon",
    copy: `Your view is a premium asset — a daily connection to the sky. Traditional iron bars secure your space by building cages, trapping the light and blocking the breeze. ${BRAND_CONFIG.name} protects what you cherish while disappearing completely into the horizon. Security is invisible.`,
    reverse: true,
  },
  {
    image: "/images/lifestyle/feature-3.png",
    title: "THE NIGHT WIND",
    eyebrow: "The Sanctuary of Sleep",
    copy: "Welcoming the night breeze, keeping the vectors out. True rest is breathing natural air. Our micro-pore fiberglass meshes fit flush into your frame, letting in the cool night wind while locking out insect vectors. Sleep in pure, unpolluted ventilation.",
    reverse: false,
  },
];

function LifestylePage() {
  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] min-h-screen">
      <SiteNav />

      {/* Hero Header with Exact 2.39:1 Cinematic Panoramic Visual */}
      <section className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[2.39/1] max-h-[85vh] overflow-hidden bg-[#FAF8F5]">
        <img
          src="/images/lifestyle/hero.png"
          alt="Architectural Living Spaces & Open Horizons"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
        {/* Soft lower-third atmospheric gradient preserving raw golden sunset clarity and brilliance */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.18) 35%, transparent 65%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-6 sm:bottom-10 md:bottom-14 text-center text-white px-6 max-w-4xl mx-auto z-20">
          <p className="sn-eyebrow text-[#FAF8F5] mb-1.5 md:mb-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
            The Lifestyle · {BRAND_CONFIG.name}
          </p>
          <h1 className="sn-h1 text-white max-w-3xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] mb-2 md:mb-3">
            Living Without Hesitation
          </h1>
          <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#FAF8F5] leading-relaxed font-light drop-shadow-[0_1.5px_6px_rgba(0,0,0,0.9)]">
            "Breathtaking views, enjoyed in absolute peace of mind."
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24 md:space-y-32">
          {pillars.map((p) => (
            <div
              key={p.title}
              className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${p.reverse ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div className="sn-luxury-frame aspect-[3/4] bg-neutral-100 border border-[#1C1917]/10 overflow-hidden relative group shadow-md">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-2 md:px-8">
                <p className="sn-eyebrow text-[#F37021] font-medium">{p.eyebrow}</p>
                <h2 className="font-serif uppercase mt-4 text-xl md:text-2xl tracking-wider text-[#1C1917] font-light">
                  {p.title}
                </h2>
                <p className="mt-6 text-sm md:text-[15px] leading-relaxed font-light text-[#44403C] tracking-wide">
                  {p.copy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 border-t border-[#1C1917]/10 bg-[#F4EFEA]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="sn-eyebrow text-[#F37021] font-medium">An Invitation</p>
          <h2 className="sn-h1 text-[#1C1917] mt-4 mb-4">Curate Your Sanctuary</h2>
          <p className="sn-subtext text-[#44403C] max-w-md mx-auto mb-8">
            Begin a private survey of your space. Our advisors will compose a protection plan worthy
            of the home you've built.
          </p>
          <Link to="/consultation" className="sn-btn-luxury-solid">
            Begin Survey
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default LifestylePage;
