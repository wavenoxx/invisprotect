import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { ProofSection } from "@/components/ProofSection";
import { BRAND_CONFIG } from "@/config/brand";
import { categoriesData, servicesData, ServiceDetail } from "@/data/servicesData";
import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/category/$categoryId")({
  head: ({ params }) => {
    const cat = categoriesData[params.categoryId];
    if (!cat) {
      return buildMetaTags({
        title: "Category Not Found",
        description: "The requested architectural safety category could not be located.",
      });
    }
    return buildMetaTags({
      title: `${cat.title} — Architectural Safety Systems | ${BRAND_CONFIG.name}`,
      description: `${cat.plainDescriptor}. Certified AISI 316 marine-grade and UV-stabilized architectural installations with transparent specifications.`,
      canonicalPath: `/category/${cat.id}`,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${BRAND_CONFIG.domain}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Solutions",
            item: `${BRAND_CONFIG.domain}/solutions`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: cat.title,
            item: `${BRAND_CONFIG.domain}/category/${cat.id}`,
          },
        ],
      },
    });
  },
  loader: ({ params }) => {
    const cat = categoriesData[params.categoryId];
    return { cat };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] text-[#1C1917]">
      <div className="text-center">
        <p className="text-sm tracking-widest font-light uppercase mb-4 text-[#78716C]">
          Category not found
        </p>
        <Link to="/solutions" className="sn-btn-luxury-solid">
          View Solutions Explorer
        </Link>
      </div>
    </div>
  ),
});

function CategoryPage() {
  const { cat } = Route.useLoaderData() as { cat: (typeof categoriesData)[string] };
  const services = (cat?.services || [])
    .map((id: string) => servicesData[id])
    .filter(Boolean) as ServiceDetail[];

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] min-h-screen">
      <SiteNav />

      {/* Hero Header with Exact 2.39:1 Cinematic Panoramic Visual */}
      <section className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[2.39/1] max-h-[85vh] overflow-hidden bg-[#FAF8F5]">
        <img
          src={cat.heroImage}
          alt={cat.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
        {/* Delicate Ambient Vignette for Pristine Color & Text Legibility */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(28,25,23,0.75) 0%, rgba(28,25,23,0.2) 45%, rgba(28,25,23,0.6) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-6 sm:bottom-10 md:bottom-14 text-center text-white px-6 max-w-4xl mx-auto z-20">
          <p className="sn-eyebrow text-[#FAF8F5]/90 mb-1.5 md:mb-2 drop-shadow-md">
            {BRAND_CONFIG.name} · Architectural Safety
          </p>
          <h1 className="sn-h1 text-white max-w-2xl mx-auto drop-shadow-lg mb-2 md:mb-3">
            {cat.title}
          </h1>
          <p className="sn-subtext text-[#FAF8F5]/95 max-w-2xl mx-auto drop-shadow-md">
            {cat.plainDescriptor}
          </p>
        </div>
      </section>

      {/* Editorial Quote */}
      <section className="py-14 md:py-20 px-6 max-w-3xl mx-auto text-center border-b border-[#1C1917]/10">
        <p className="font-serif italic text-xl md:text-2xl font-light text-[#1C1917] leading-relaxed">
          “{cat.quote}”
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-10 pb-4 border-b border-[#1C1917]/10">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#F37021] uppercase font-medium">
              Curated Catalog
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-light uppercase tracking-wide mt-1 text-[#1C1917]">
              Available {cat.title} Configurations
            </h2>
          </div>
          <p className="text-xs text-[#78716C] font-light">
            Select a configuration for detailed engineering specifications
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s: ServiceDetail) => (
            <Link
              key={s.id}
              to="/service/$serviceId"
              params={{ serviceId: s.id }}
              className="group flex flex-col justify-between border border-[#1C1917]/10 bg-white p-6 hover:border-[#F37021] hover:shadow-lg transition-all duration-300 focus-ring min-h-[44px]"
            >
              <div>
                <div className="sn-luxury-frame aspect-[4/5] bg-neutral-100 mb-6 border border-[#1C1917]/8 overflow-hidden relative">
                  <img
                    src={s.images[0]}
                    alt={s.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[9px] font-mono tracking-widest text-[#F37021] uppercase block mb-1 font-medium">
                  {s.editorialTitle ?? s.category}
                </span>
                <h3
                  className="font-serif text-lg font-light text-[#1C1917] uppercase tracking-wide group-hover:text-[#F37021] transition-colors"
                  style={{ fontWeight: 400 }}
                >
                  {s.title}
                </h3>
                <p className="text-[11.5px] text-[#78716C] font-light mt-2 line-clamp-2 leading-relaxed">
                  {s.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1C1917]/8 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-medium text-[#1C1917] group-hover:text-[#F37021] transition-colors">
                <span>View Specifications</span>
                <span className="text-[#F37021] group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Comprehensive Authority & Engineering Breakdown */}
      <section className="w-full bg-[#F4EFEA] border-t border-b border-[#1C1917]/10 py-20 md:py-28 text-[#1C1917]">
        <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-20">
          {/* Overview */}
          <article className="border-b border-[#1C1917]/10 pb-16">
            <span className="text-[10px] font-mono tracking-widest text-[#F37021] uppercase font-medium">
              Authority 01 / Architectural Definition
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-light uppercase tracking-wide mt-1 mb-6 text-[#1C1917]">
              System Overview &amp; Function
            </h2>
            <p className="text-sm md:text-base text-[#44403C] font-light leading-relaxed">
              {cat.overview}
            </p>
          </article>

          {/* Key Applications */}
          <article className="border-b border-[#1C1917]/10 pb-16">
            <span className="text-[10px] font-mono tracking-widest text-[#F37021] uppercase font-medium">
              Authority 02 / Applications
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-light uppercase tracking-wide mt-1 mb-6 text-[#1C1917]">
              Where {cat.title} are Specified
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cat.applications.map((app, i) => (
                <div
                  key={i}
                  className="p-5 border border-[#1C1917]/8 bg-white flex items-start gap-4 text-xs md:text-sm text-[#44403C] font-light shadow-sm"
                >
                  <span className="font-mono text-[#F37021] text-xs mt-0.5 font-medium">
                    0{i + 1}
                  </span>
                  <span>{app}</span>
                </div>
              ))}
            </div>
          </article>

          {/* Verified Materials */}
          <article className="border-b border-[#1C1917]/10 pb-16">
            <span className="text-[10px] font-mono tracking-widest text-[#F37021] uppercase font-medium">
              Authority 03 / Metallurgy &amp; Chemistry
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-light uppercase tracking-wide mt-1 mb-6 text-[#1C1917]">
              Verified Material Standards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cat.materials.map((mat) => (
                <div key={mat.name} className="p-6 border border-[#1C1917]/8 bg-white shadow-sm">
                  <h3 className="font-serif text-base font-medium text-[#1C1917] uppercase tracking-wider mb-2">
                    {mat.name}
                  </h3>
                  <p className="text-xs text-[#78716C] font-light leading-relaxed">{mat.detail}</p>
                </div>
              ))}
            </div>
          </article>

          {/* Measurement & Installation Methodology */}
          <article className="border-b border-[#1C1917]/10 pb-16">
            <span className="text-[10px] font-mono tracking-widest text-[#F37021] uppercase font-medium">
              Authority 04 / Engineering Methodology
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-light uppercase tracking-wide mt-1 mb-6 text-[#1C1917]">
              Measurement &amp; Installation Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs md:text-sm text-[#44403C] font-light leading-relaxed">
              <div className="bg-white p-6 border border-[#1C1917]/8 shadow-sm">
                <h3 className="font-medium text-[#1C1917] uppercase tracking-wider text-xs mb-3 text-[#F37021]">
                  Laser Site Measurement
                </h3>
                <p>{cat.measurementProcess}</p>
              </div>
              <div className="bg-white p-6 border border-[#1C1917]/8 shadow-sm">
                <h3 className="font-medium text-[#1C1917] uppercase tracking-wider text-xs mb-3 text-[#F37021]">
                  Mechanical Anchoring &amp; Tensioning
                </h3>
                <p>{cat.installationMethod}</p>
              </div>
            </div>
          </article>

          {/* Care, Maintenance & Boundaries */}
          <article className="border-b border-[#1C1917]/10 pb-16">
            <span className="text-[10px] font-mono tracking-widest text-[#F37021] uppercase font-medium">
              Authority 05 / Maintenance &amp; Scope
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-light uppercase tracking-wide mt-1 mb-6 text-[#1C1917]">
              Care Guidelines &amp; Structural Limits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs md:text-sm text-[#44403C] font-light leading-relaxed">
              <div>
                <h3 className="font-medium text-[#1C1917] uppercase tracking-wider text-xs mb-2">
                  Care &amp; Cleaning
                </h3>
                <p className="text-[#78716C] mb-4">{cat.maintenanceGuide}</p>
                <Link
                  to="/maintenance-repair"
                  className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#1C1917] hover:text-[#F37021] hover:underline underline-offset-4 focus-ring transition-colors"
                >
                  Full Maintenance Guide →
                </Link>
              </div>
              <div>
                <h3 className="font-medium text-[#1C1917] uppercase tracking-wider text-xs mb-2">
                  Structural Limitations &amp; Egress
                </h3>
                <p className="text-[#78716C] mb-4">{cat.limitations}</p>
                <Link
                  to="/warranty"
                  className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#1C1917] hover:text-[#F37021] hover:underline underline-offset-4 focus-ring transition-colors"
                >
                  Warranty Terms &amp; Exclusions →
                </Link>
              </div>
            </div>
          </article>

          {/* Category FAQs */}
          {cat.faqs?.length > 0 && (
            <article>
              <span className="text-[10px] font-mono tracking-widest text-[#F37021] uppercase font-medium">
                Authority 06 / Knowledge Base
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-light uppercase tracking-wide mt-1 mb-8 text-[#1C1917]">
                {cat.title} FAQs
              </h2>

              <div className="space-y-4">
                {cat.faqs.map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div
                      key={faq.question}
                      className="border border-[#1C1917]/10 bg-white shadow-sm"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif text-base md:text-lg font-light text-[#1C1917] hover:bg-[#FAF8F5] transition-colors focus-ring min-h-11 cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <span className="text-xl font-light text-[#F37021] shrink-0">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6 pt-2 text-xs md:text-sm text-[#44403C] font-light leading-relaxed border-t border-[#1C1917]/8">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </article>
          )}
        </div>
      </section>

      <ProofSection categorySlug={cat.id} />
      <Footer />
    </div>
  );
}

export default CategoryPage;
