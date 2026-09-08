import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { CinematicScrollway } from "@/components/CinematicScrollway";
import Hero from "@/components/Hero";
import { ProofSection } from "@/components/ProofSection";
import { BRAND_CONFIG } from "@/config/brand";
import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    buildMetaTags({
      title: `${BRAND_CONFIG.name} — Invisible Grills & Safety Nets for Discerning Homes`,
      description:
        "Bespoke architectural safety solutions: invisible grills, high-tensile safety netting, and bird deterrence for luxury residences across Telangana & Andhra Pradesh.",
      canonicalPath: "/",
      ogImage: "/images/homepage/banner-1.jpg",
    }),
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
    </div>
  );
}
