import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { ProofSection } from "@/components/ProofSection";
import { BRAND_CONFIG } from "@/config/brand";
import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/safety-faq")({
  head: () =>
    buildMetaTags({
      title: `Safety, Materials & Engineering FAQ — ${BRAND_CONFIG.name}`,
      description: `Frequently asked questions about ${BRAND_CONFIG.name} invisible grills, safety netting systems, load capacities, emergency egress, and installation.`,
      canonicalPath: "/safety-faq",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Safety & Architectural FAQ",
        description: `Official questions and answers regarding ${BRAND_CONFIG.name} architectural fall-prevention systems.`,
        publisher: {
          "@type": "Organization",
          name: BRAND_CONFIG.name,
          url: BRAND_CONFIG.domain,
        },
      },
    }),
  component: SafetyFaqPage,
});

const FAQ_SECTIONS = [
  {
    category: "Invisible Grills Architecture",
    questions: [
      {
        q: "What are invisible grills made of?",
        a: "Our invisible grills use high-tensile AISI 316 marine-grade austenitic stainless steel wire rope (7x7 or 7x19 construction) wrapped in a transparent, UV-stabilized virgin Nylon-12 protective sheath. The cables are anchored into extruded 6063-T6 architectural aluminum tracks.",
      },
      {
        q: "Can invisible grills be breached or cut in a fire emergency?",
        a: "Yes. Unlike heavy fixed wrought iron grates that trap occupants and firefighters during building fires, our stainless steel cables can be severed in seconds using standard heavy-duty wire cutters for rapid emergency egress.",
      },
      {
        q: "Will the cables rust or turn yellow from tropical sun exposure?",
        a: "No. The combination of marine-grade 316 stainless steel and virgin UV-stabilized Nylon-12 prevents atmospheric pitting, corrosion, and UV discoloration under standard tropical weathering.",
      },
      {
        q: "What is the difference between 2-inch and 3-inch cable spacing?",
        a: "2-inch (50 mm) micro-spacing is recommended for households with infants, toddlers, or small pets to prevent heads or paws from slipping through. 3-inch (75 mm) spacing provides optimal fall protection for adult balconies and standard windows while maximizing open panoramic visibility.",
      },
    ],
  },
  {
    category: "Balcony & Safety Netting",
    questions: [
      {
        q: "How long do HDPE safety nets last in open sunlight?",
        a: "Our safety nets are manufactured from 100% virgin High-Density Polyethylene (HDPE) infused with carbon-black UV stabilizers, giving them an expected lifespan of 3 to 5+ years under continuous sun and monsoon exposure.",
      },
      {
        q: "Do balcony safety nets block fresh air circulation?",
        a: "No. The open diamond mesh geometry allows over 90% of natural airflow and ambient daylight to pass freely while maintaining secure perimeter containment.",
      },
      {
        q: "How are safety nets anchored into balcony ceilings and walls?",
        a: "Our installers drill into the concrete slab or masonry perimeter at 8-to-12 inch intervals to seat stainless steel anchor hooks. A reinforced perimeter wire rope is threaded through the mesh to maintain uniform, sag-free tension.",
      },
    ],
  },
  {
    category: "Survey, Installation & Warranty",
    questions: [
      {
        q: "Is the initial on-site laser measurement complimentary?",
        a: "Yes. Our regional safety advisory team provides complimentary on-site digital laser measurements across all verified service hubs to inspect your structural substrate and calculate precise material requirements.",
      },
      {
        q: "How long does standard residential installation take?",
        a: "Most residential balcony and window installations are completed within 4 to 8 hours by our trained installation team.",
      },
      {
        q: "What warranty coverage is provided upon handover?",
        a: "Invisible grill cable and track systems receive a 5-Year Material Warranty against manufacturing defects and corrosion. HDPE safety netting carries a 3 to 5-Year Material Warranty against UV degradation.",
      },
    ],
  },
];

function SafetyFaqPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "0-0": true,
    "1-0": true,
    "2-0": true,
  });

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] min-h-screen">
      <SiteNav />

      {/* Hero */}
      <section className="relative w-full pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12 bg-[#FAF8F5] border-b border-[#1C1917]/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="sn-eyebrow text-[#F37021] mb-4 font-medium">Engineering Knowledge</p>
          <h1 className="sn-h1 text-[#1C1917] mb-4">Safety, Materials &amp; Architecture FAQ</h1>
          <p className="sn-subtext text-[#44403C] max-w-2xl mx-auto">
            Clear, factual answers regarding materials, tensile behavior, emergency egress,
            warranties, and on-site installation processes.
          </p>
        </div>
      </section>

      {/* FAQ Accordions */}
      <main className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-16">
        {FAQ_SECTIONS.map((sec, secIdx) => (
          <section key={sec.category} className="border-b border-[#1C1917]/10 pb-12">
            <span className="text-[10px] font-mono tracking-widest text-[#F37021] uppercase font-medium">
              Category 0{secIdx + 1}
            </span>
            <h2 className="font-serif text-2xl font-light text-[#1C1917] uppercase tracking-wide mt-1 mb-8">
              {sec.category}
            </h2>

            <div className="space-y-4">
              {sec.questions.map((faq, faqIdx) => {
                const key = `${secIdx}-${faqIdx}`;
                const isOpen = !!openItems[key];
                return (
                  <div key={faq.q} className="border border-[#1C1917]/10 bg-white shadow-sm">
                    <button
                      type="button"
                      onClick={() => toggleItem(key)}
                      aria-expanded={isOpen}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif text-base md:text-lg font-light text-[#1C1917] hover:bg-[#FAF8F5] transition-colors focus-ring min-h-11 cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <span className="text-xl font-light text-[#F37021] shrink-0">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-2 text-xs md:text-sm text-[#44403C] font-light leading-relaxed border-t border-[#1C1917]/8 bg-[#FAF8F5]/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {/* Still have questions */}
        <div className="text-center pt-8">
          <h3 className="font-serif text-xl font-light text-[#1C1917] uppercase tracking-wider mb-3">
            Have a Specific Architectural Query?
          </h3>
          <p className="text-xs text-[#78716C] font-light mb-6">
            Our regional safety advisors are available to review architectural drawings and site
            plans.
          </p>
          <Link to="/consultation" className="sn-btn-luxury-solid">
            Connect with an Advisor
          </Link>
        </div>
      </main>

      <ProofSection />
      <Footer />
    </div>
  );
}

export default SafetyFaqPage;
