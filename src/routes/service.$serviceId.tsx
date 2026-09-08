import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { ProofSection } from "@/components/ProofSection";
import { servicesData, categoriesData, type ServiceDetail } from "@/data/servicesData";
import { BRAND_CONFIG } from "@/config/brand";
import { buildMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/service/$serviceId")({
  head: ({ params }) => {
    const s = servicesData[params.serviceId];
    const cat = s ? categoriesData[s.category] : undefined;
    const title = s ? `${s.title} — ${BRAND_CONFIG.name}` : `Service — ${BRAND_CONFIG.name}`;
    const canonicalPath = `/service/${params.serviceId}`;

    const breadcrumbs = [
      { name: "Home", path: "/" },
      { name: cat?.title ?? "Category", path: cat ? `/category/${cat.id}` : "/solutions" },
      { name: s?.title ?? "Service", path: canonicalPath },
    ];

    const serviceSchema = s
      ? {
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.title,
          serviceType: "Architectural Safety Installation",
          provider: {
            "@type": "Organization",
            name: BRAND_CONFIG.name,
            url: BRAND_CONFIG.domain,
          },
          areaServed: {
            "@type": "AdministrativeArea",
            name: "Telangana & Andhra Pradesh",
          },
          description: s.description,
        }
      : undefined;

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: crumb.name,
        item: `${BRAND_CONFIG.domain}${crumb.path}`,
      })),
    };

    return buildMetaTags({
      title,
      description: s?.description ?? `${BRAND_CONFIG.name} bespoke architectural safety system.`,
      canonicalPath,
      ogImage: s?.images[0],
      jsonLd: serviceSchema ? [breadcrumbSchema, serviceSchema] : breadcrumbSchema,
    });
  },
  loader: ({ params }) => {
    const s = servicesData[params.serviceId];
    if (!s) throw notFound();
    return { service: s };
  },
  component: ServicePage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] text-[#1C1917]">
      <div className="text-center">
        <p className="text-sm tracking-widest font-light uppercase mb-4 text-[#78716C]">
          Service not found
        </p>
        <Link to="/solutions" className="sn-btn-luxury-solid">
          View Solutions Explorer
        </Link>
      </div>
    </div>
  ),
});

function ServicePage() {
  const { service } = Route.useLoaderData() as { service: ServiceDetail };
  const category = categoriesData[service.category];

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      { root: scrollerRef.current, threshold: 0.55 },
    );
    imgRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [service.id]);

  const relatedServices = (category?.services || [])
    .filter((id) => id !== service.id)
    .map((id) => servicesData[id])
    .filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col text-[#1C1917] bg-[#FAF8F5]">
      <SiteNav />

      {/* Main Split Layout: Left Imagery / Right Sticky Architecture */}
      <div className="flex-1 flex flex-col md:flex-row relative bg-transparent pt-16 md:pt-20">
        {/* LEFT: Imagery Gallery */}
        <div
          ref={scrollerRef}
          className="w-full md:w-1/2 h-[60vh] md:h-[calc(100vh-80px)] overflow-y-auto snap-y snap-mandatory relative sn-noscrollbar bg-[#FAF8F5]"
        >
          {service.images.map((imgUrl, i) => (
            <div
              key={i}
              data-idx={i}
              ref={(el) => {
                imgRefs.current[i] = el;
              }}
              className="snap-start w-full h-[60vh] md:h-[calc(100vh-80px)] relative overflow-hidden bg-neutral-100 border-b border-[#1C1917]/10 flex items-center justify-center group"
            >
              <img
                src={imgUrl}
                alt={`${service.title} architectural installation detail ${i + 1}`}
                className="w-full h-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/30 via-transparent to-[#1C1917]/10 pointer-events-none" />
            </div>
          ))}

          {/* Progress dots */}
          <div className="absolute bottom-6 left-6 flex flex-col gap-2 z-10">
            {service.images.map((_, i) => (
              <span
                key={i}
                className={`w-2.5 h-2.5 rounded-full border border-white transition-colors duration-300 ${
                  active === i ? "bg-[#F37021]" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: Sticky Architectural Specifications */}
        <div className="w-full md:w-1/2 md:h-[calc(100vh-80px)] md:sticky md:top-[80px] overflow-y-auto flex flex-col justify-between p-8 md:p-14 border-l border-[#1C1917]/10 bg-[#FAF8F5]">
          <div>
            {/* Breadcrumb Eyebrow */}
            <nav aria-label="Breadcrumb" className="mb-4">
              <p
                className="uppercase text-[9px] text-[#78716C] font-mono tracking-widest"
                style={{ fontWeight: 400 }}
              >
                <Link to="/" className="hover:text-[#F37021] focus-ring transition-colors">
                  HOME
                </Link>{" "}
                /{" "}
                <Link
                  to="/category/$categoryId"
                  params={{ categoryId: service.category }}
                  className="hover:text-[#F37021] focus-ring transition-colors"
                >
                  {(category?.title ?? service.category).toUpperCase()}
                </Link>{" "}
                / <span className="text-[#F37021] font-medium">{service.title.toUpperCase()}</span>
              </p>
            </nav>

            {/* Plain Factual H1 */}
            <h1 className="sn-h1 text-[#1C1917] mb-2">{service.title}</h1>

            {/* Plain Service Descriptor */}
            <p className="mt-2 text-xs md:text-sm font-light text-[#44403C] tracking-wide">
              {service.plainDescriptor}
            </p>

            {/* Price upon request & survey link */}
            <div className="mt-4 pb-6 border-b border-[#1C1917]/10 flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#F37021]">
                Custom Architectural Fabrication
              </span>
              <span className="text-[11px] text-[#78716C] font-light">
                Laser Measured · On-Site Survey
              </span>
            </div>

            {/* Detail Paragraphs */}
            <div className="mt-6 space-y-4">
              {service.detailParagraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-[13px] font-light leading-relaxed text-[#44403C]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Process Steps */}
            {service.processSteps && service.processSteps.length > 0 && (
              <div className="mt-8 pt-6 border-t border-[#1C1917]/10">
                <span className="text-[10px] font-mono tracking-widest text-[#F37021] uppercase block mb-3 font-medium">
                  Installation Sequence
                </span>
                <ol className="space-y-2 text-xs text-[#44403C] font-light list-decimal pl-4">
                  {service.processSteps.map((step, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Specs Matrix */}
            <div className="mt-8 bg-white p-6 border border-[#1C1917]/10 shadow-sm">
              <span className="text-[10px] font-mono tracking-widest text-[#F37021] uppercase block mb-3 font-medium">
                Technical Specification Table
              </span>
              {service.specs.map((sp) => (
                <div
                  key={sp.label}
                  className="border-t border-[#1C1917]/8 py-3.5 w-full flex justify-between gap-4 text-xs font-light"
                >
                  <span className="uppercase text-[#78716C] tracking-wider text-[11px]">
                    {sp.label}
                  </span>
                  <span className="text-[#1C1917] text-right font-medium text-[11.5px]">
                    {sp.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Care & Warranty Deep Links */}
            <div className="mt-6 flex flex-wrap gap-4 text-[10px] uppercase tracking-[0.2em] font-medium text-[#1C1917]">
              <Link
                to="/maintenance-repair"
                className="hover:text-[#F37021] underline underline-offset-4 focus-ring transition-colors"
              >
                Care &amp; Cleaning Guide →
              </Link>
              <Link
                to="/warranty"
                className="hover:text-[#F37021] underline underline-offset-4 focus-ring transition-colors"
              >
                Written Warranty Matrix →
              </Link>
            </div>
          </div>

          {/* Survey CTA Action */}
          <div className="mt-10 pt-6 border-t border-[#1C1917]/10 flex flex-col sm:flex-row gap-4">
            <Link
              to="/consultation"
              search={{ service: service.title }}
              className="flex-1 sn-btn-luxury-solid text-center"
            >
              Request Laser Site Survey
            </Link>
            <Link
              to="/safety-faq"
              className="inline-flex items-center justify-center border border-[#1C1917]/25 px-6 py-3.5 text-[11px] uppercase tracking-[0.25em] text-[#1C1917] hover:border-[#F37021] hover:text-[#F37021] transition-colors duration-300 min-h-11 focus-ring"
            >
              Safety FAQ
            </Link>
          </div>
        </div>
      </div>

      {/* Related System Configurations */}
      {relatedServices.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 border-t border-[#1C1917]/10">
          <div className="mb-8">
            <span className="text-[10px] font-mono tracking-widest text-[#F37021] uppercase font-medium">
              Related Systems
            </span>
            <h2 className="font-serif text-2xl font-light uppercase tracking-wide mt-1 text-[#1C1917]">
              Explore Complementary {category?.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedServices.slice(0, 3).map((rel) => (
              <Link
                key={rel.id}
                to="/service/$serviceId"
                params={{ serviceId: rel.id }}
                className="border border-[#1C1917]/10 p-6 bg-white hover:border-[#F37021] hover:shadow-lg transition-all duration-300 group focus-ring min-h-11 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] bg-neutral-100 mb-4 border border-[#1C1917]/8 overflow-hidden relative">
                    <img
                      src={rel.images[0]}
                      alt={rel.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-serif text-base font-light text-[#1C1917] uppercase tracking-wide group-hover:text-[#F37021] transition-colors">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-[#78716C] font-light mt-1 line-clamp-2">
                    {rel.description}
                  </p>
                </div>
                <span className="mt-4 inline-block text-[10px] uppercase tracking-[0.2em] font-medium text-[#1C1917] group-hover:text-[#F37021] transition-colors">
                  View Specs →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <ProofSection categorySlug={service.category} />
      <Footer />
    </div>
  );
}

export default ServicePage;
