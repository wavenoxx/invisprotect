import { Link } from "@tanstack/react-router";
import { BRAND_CONFIG } from "@/config/brand";
import { BUSINESS } from "@/config/business";
import { trackEngagement } from "@/lib/analytics";

interface PriceGuideProps {
  /** Pre-selects this service on the consultation form. */
  categorySlug?: string;
}

/**
 * Indicative price ranges from src/config/business.ts (priceGuide).
 * Local buyers search for prices first; showing honest ranges builds trust
 * and qualifies leads before the site survey.
 */
export function PriceGuide({ categorySlug }: PriceGuideProps) {
  const guide = BUSINESS.priceGuide;
  if (!guide.enabled || guide.items.length === 0) return null;

  const whatsappHref = BRAND_CONFIG.contact.whatsappLink
    ? `${BRAND_CONFIG.contact.whatsappLink}?text=${encodeURIComponent(
        `Hello ${BRAND_CONFIG.name}, I would like an exact quote. My opening size is about ___ sq ft.`,
      )}`
    : "";

  return (
    <section
      id="price-guide"
      aria-labelledby="price-guide-heading"
      className="w-full bg-white border-t border-[#1C1917]/10 py-20 md:py-28 text-[#1C1917]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
          <p className="sn-eyebrow text-brand mb-3 font-medium">{guide.eyebrow}</p>
          <h2 id="price-guide-heading" className="sn-h1 text-[#1C1917] mb-3">
            {guide.heading}
          </h2>
          <p className="sn-subtext text-[#44403C]">{guide.intro}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {guide.items.map((item) => (
            <article
              key={item.service}
              className="flex flex-col bg-[#FAF8F5] border border-[#1C1917]/10 p-6 sm:p-7 md:p-8"
            >
              <h3 className="font-display text-[12px] font-medium text-[#1C1917] uppercase tracking-[0.14em]">
                {item.service}
              </h3>
              <p className="mt-5 font-display text-3xl sm:text-4xl md:text-[2.5rem] font-light leading-none text-[#1C1917] tracking-tight tabular-nums">
                {item.range}
              </p>
              <p className="mt-2 text-[10px] font-mono uppercase tracking-widest text-brand font-medium">
                {item.unit}
              </p>
              <p className="mt-5 text-xs text-[#44403C] font-light leading-relaxed flex-1">
                {item.note}
              </p>
              {item.serviceId ? (
                <Link
                  to="/service/$serviceId"
                  params={{ serviceId: item.serviceId }}
                  className="mt-6 inline-flex items-center text-[10px] uppercase tracking-[0.2em] font-medium text-[#1C1917] hover:text-brand hover:underline underline-offset-4 focus-ring transition-colors"
                >
                  View Specifications →
                </Link>
              ) : null}
            </article>
          ))}
        </div>

        {guide.factors.length > 0 ? (
          <div className="mt-12 text-center">
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#78716C] mb-4">
              What changes the price
            </p>
            <ul className="flex flex-wrap justify-center gap-2">
              {guide.factors.map((factor) => (
                <li
                  key={factor}
                  className="px-3 py-1.5 text-[11px] text-[#1C1917] bg-[#FAF8F5] border border-[#1C1917]/10"
                >
                  {factor}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/consultation"
            search={categorySlug ? { service: categorySlug } : undefined}
            className="sn-btn-luxury-solid w-full sm:w-auto focus-ring"
          >
            Get Exact Quote
          </Link>
          {whatsappHref ? (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                try {
                  trackEngagement("whatsapp", "price_guide");
                } catch {
                  /* analytics is optional */
                }
              }}
              className="sn-btn-luxury-dark w-full sm:w-auto focus-ring"
            >
              Ask on WhatsApp
            </a>
          ) : null}
        </div>

        <p className="mt-6 text-center text-[11px] text-[#78716C] font-light">{guide.disclaimer}</p>
      </div>
    </section>
  );
}

export default PriceGuide;
