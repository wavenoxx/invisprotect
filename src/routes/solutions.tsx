import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { BRAND_CONFIG } from "@/config/brand";

import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/solutions")({
  head: () =>
    buildMetaTags({
      title: `Architectural Safety Solutions Explorer — ${BRAND_CONFIG.name}`,
      description: `Explore the complete architectural catalog of ${BRAND_CONFIG.name}: invisible grills, safety netting, construction containment, and bird protection across Telangana & Andhra Pradesh.`,
      canonicalPath: "/solutions",
      ogImage: "/images/campaigns/campaign-2-card-1.jpg",
    }),
  component: SolutionsExplorer,
});

type Column = {
  id: string;
  title: string;
  color: string;
  backdrop: string;
  services: { label: string; slug: string }[];
};

const columns: Column[] = [
  {
    id: "invisible-grills",
    title: "Invisible Grills",
    color: "#8DA891",
    backdrop: "/images/solutions/solution-1-invisible-grills.png",
    services: [
      { label: "Balcony", slug: "balcony-invisible-grills" },
      { label: "Staircase", slug: "staircase-invisible-grills" },
      { label: "Windows", slug: "windows-invisible-grills" },
      { label: "Child Safety", slug: "child-safety-invisible-grills" },
    ],
  },
  {
    id: "core-safety-nets",
    title: "Core Safety Nets",
    color: "#8FAFC4",
    backdrop: "/images/solutions/solution-2-core-safety-nets.png",
    services: [
      { label: "Balcony", slug: "balcony-safety-nets" },
      { label: "Children", slug: "children-safety-nets" },
      { label: "Staircase", slug: "staircase-safety-nets" },
      { label: "Building", slug: "building-safety-nets" },
    ],
  },
  {
    id: "construction-industrial",
    title: "Construction & Industrial",
    color: "#D1D1D1",
    backdrop: "/images/solutions/solution-3-construction-industrial.png",
    services: [
      { label: "Construction", slug: "construction-safety-nets" },
      { label: "Industrial", slug: "industrial-safety-nets" },
      { label: "Terrace Top", slug: "terrace-top-nets" },
      { label: "Car Parking", slug: "car-parking-safety-nets" },
    ],
  },
  {
    id: "animal-bird-protection",
    title: "Animal & Bird Protection",
    color: "#E5C1C5",
    backdrop: "/images/solutions/solution-4-animal-bird-protection.png",
    services: [
      { label: "Pigeon Nets", slug: "pigeon-safety-nets" },
      { label: "Bird Spikes", slug: "pigeons-bird-spikes" },
      { label: "Monkey Nets", slug: "monkey-safety-nets" },
      { label: "Mosquito Nets", slug: "mosquito-safety-nets" },
    ],
  },
  {
    id: "specialty-solutions",
    title: "Specialty Solutions",
    color: "#A6C1C5",
    backdrop: "/images/solutions/solution-5-specialty-solutions.png",
    services: [
      { label: "Sports Nets", slug: "sports-practice-nets" },
      { label: "Coconut Nets", slug: "coconut-safety-nets" },
      { label: "Pool Nets", slug: "swimming-pool-nets" },
      { label: "Cloth Hangers", slug: "cloth-drying-hangers" },
    ],
  },
];

function SolutionsExplorer() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  const widthClass = (i: number) => {
    if (hoveredIndex === null) return "md:w-[20%]";
    return hoveredIndex === i ? "md:w-[40%]" : "md:w-[15%]";
  };

  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] min-h-screen">
      <SiteNav />

      {/* Mobile Magazine Lookbook */}
      <div
        className="block md:hidden h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory relative bg-[#FAF8F5]"
        onScroll={(e) => {
          const index = Math.round(e.currentTarget.scrollTop / window.innerHeight);
          if (index !== activeMobileIndex) setActiveMobileIndex(index);
        }}
      >
        {columns.map((col, index) => (
          <section
            key={col.id}
            className="w-full h-[100dvh] snap-start relative flex flex-col justify-between p-6 overflow-hidden select-none bg-[#FAF8F5]"
          >
            <div className="absolute inset-0 overflow-hidden bg-neutral-950">
              <img
                src={col.backdrop}
                alt={col.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/95 via-[#1C1917]/50 to-[#1C1917]/20" />

            <div className="relative z-10 w-full mt-auto pb-10 flex flex-col items-start text-white">
              <span className="font-sans text-[9px] tracking-[0.25em] text-[#F37021] mb-1 uppercase font-medium">
                Category
              </span>
              <h2
                className={`font-serif text-2xl font-light text-white mb-6 uppercase block transition-all duration-[1000ms] ease-out transform ${
                  activeMobileIndex === index
                    ? "opacity-100 translate-y-0 tracking-[0.1em]"
                    : "opacity-0 translate-y-6 tracking-[0.05em]"
                }`}
              >
                {col.title}
              </h2>

              <div className="flex flex-col w-full border-b border-white/15">
                {col.services.map((s, sIdx) => {
                  const delay =
                    ["delay-100", "delay-200", "delay-300", "delay-400"][sIdx] ?? "delay-500";
                  const visible = activeMobileIndex === index;
                  return (
                    <Link
                      key={s.slug}
                      to="/service/$serviceId"
                      params={{ serviceId: s.slug }}
                      className={`w-full border-t border-white/15 py-3.5 flex justify-between items-center text-[11px] font-sans font-light text-[#FAF8F5] hover:text-[#F37021] uppercase tracking-wider transition-all duration-700 ease-out transform focus-ring ${delay} ${
                        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                    >
                      <span>{s.label}</span>
                      <span className="text-[#F37021] font-light">→</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Desktop Shoji Accordion Layout */}
      <div className="hidden md:flex w-full h-screen overflow-hidden bg-[#FAF8F5] flex-row relative font-sans">
        {columns.map((col, i) => {
          const active = hoveredIndex === i;
          return (
            <div
              key={col.id}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group w-full ${widthClass(i)} transition-all duration-[1000ms] ease-out relative flex flex-col justify-between overflow-hidden p-8 border-r border-[#1C1917]/10 bg-[#FAF8F5]`}
            >
              <div className="absolute inset-0 w-full h-full bg-neutral-950 overflow-hidden">
                <img
                  src={col.backdrop}
                  alt={col.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/90 via-[#1C1917]/40 to-[#1C1917]/20" />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.3em] text-[#F37021] mb-3 font-medium"
                    style={{ fontWeight: 400 }}
                  >
                    Category
                  </p>
                  <h2 className="font-serif text-xl tracking-[0.15em] text-white mb-6 uppercase">
                    {col.title}
                  </h2>
                </div>

                <div
                  className={`transition-opacity duration-700 delay-300 ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="flex flex-col">
                    {col.services.map((s) => (
                      <Link
                        key={s.slug}
                        to="/service/$serviceId"
                        params={{ serviceId: s.slug }}
                        className="text-[12px] font-light text-[#FAF8F5] tracking-wider hover:text-[#F37021] block mb-4 underline decoration-[0.5px] underline-offset-4 focus-ring transition-colors"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  to="/category/$categoryId"
                  params={{ categoryId: col.id }}
                  className="relative z-10 text-[10px] uppercase tracking-[0.25em] text-[#FAF8F5]/80 hover:text-[#F37021] mt-6 focus-ring transition-colors font-medium"
                >
                  View Category →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
