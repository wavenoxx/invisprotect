import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { CinematicScrollway } from "@/components/CinematicScrollway";
import Hero from "@/components/Hero";
import { ProofSection } from "@/components/ProofSection";
import { PriceGuide } from "@/components/PriceGuide";
import { LuxuryContactDock } from "@/components/LuxuryContactDock";
import { BRAND_CONFIG } from "@/config/brand";
import { buildMetaTags } from "@/lib/seo";
import { BUSINESS } from "@/config/business";

export const Route = createFileRoute("/")({
  head: () => {
    const seo = buildMetaTags({
      title: `${BRAND_CONFIG.name} — Invisible Grills & Safety Nets for Discerning Homes`,
      description: `Bespoke architectural safety solutions: invisible grills, high-tensile safety netting, and bird deterrence for luxury residences across ${BUSINESS.regionLabel}.`,
      canonicalPath: "/",
      ogImage: "/images/homepage/banner-1.jpg",
    });
    return {
      ...seo,
      links: [
        ...seo.links,
        {
          rel: "preload",
          as: "image",
          href: "/images/homepage/hero-desktop.webp",
          media: "(min-width: 768px)",
          type: "image/webp",
        },
        {
          rel: "preload",
          as: "image",
          href: "/images/homepage/hero-mobile.webp",
          media: "(max-width: 767px)",
          type: "image/webp",
        },
      ],
    };
  },
  component: Index,
});

function Index() {
  return (
    <div className="bg-[#FAF8F5] text-[#1C1917]">
      <SiteNav appearance="overlay" />
      <Hero />
      <CinematicScrollway />
      <PriceGuide />
      <ProofSection />
      <Footer />
      <LuxuryContactDock />
    </div>
  );
}
