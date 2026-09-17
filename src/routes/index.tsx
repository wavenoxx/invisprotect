import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { CinematicScrollway } from "@/components/CinematicScrollway";
import Hero from "@/components/Hero";
import { ProofSection } from "@/components/ProofSection";
import { LuxuryContactDock } from "@/components/LuxuryContactDock";
import { BRAND_CONFIG } from "@/config/brand";
import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => {
    const seo = buildMetaTags({
      title: `${BRAND_CONFIG.name} — Invisible Grills & Safety Nets for Discerning Homes`,
      description:
        "Bespoke architectural safety solutions: invisible grills, high-tensile safety netting, and bird deterrence for luxury residences across Telangana & Andhra Pradesh.",
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
      <SiteNav />
      <Hero />
      <CinematicScrollway />
      <ProofSection />
      <Footer />
      <LuxuryContactDock />
    </div>
  );
}
