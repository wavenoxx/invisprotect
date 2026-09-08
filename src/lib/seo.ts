import { BRAND_CONFIG } from "@/config/brand";

export interface PageSeoConfig {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * Builds standardized meta tags, canonical links, and JSON-LD structured data
 * for TanStack Router route head definitions.
 */
export function buildMetaTags(config: PageSeoConfig) {
  const baseDomain = BRAND_CONFIG.domain ? BRAND_CONFIG.domain.replace(/\/$/, "") : "";
  const canonicalUrl = baseDomain ? `${baseDomain}${config.canonicalPath ?? ""}` : "";
  const brandName = BRAND_CONFIG.name;
  const fullTitle = brandName
    ? config.title.includes(brandName)
      ? config.title
      : `${config.title} — ${brandName}`
    : config.title;

  const ogImage = config.ogImage
    ? config.ogImage
    : baseDomain
      ? `${baseDomain}/images/homepage/banner-1-desktop.png`
      : "/images/homepage/banner-1-desktop.png";

  const robots = config.noIndex ? "noindex, follow" : "index, follow";

  const meta = [
    { title: fullTitle },
    { name: "description", content: config.description },
    { name: "robots", content: robots },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: config.description },
    ...(canonicalUrl ? [{ property: "og:url", content: canonicalUrl }] : []),
    { property: "og:type", content: config.ogType ?? "website" },
    { property: "og:image", content: ogImage },
    { property: "og:site_name", content: brandName || "Architectural Safety Solutions" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: config.description },
    { name: "twitter:image", content: ogImage },
  ];

  const links = canonicalUrl ? [{ rel: "canonical", href: canonicalUrl }] : [];

  const scripts = config.jsonLd
    ? [
        {
          type: "application/ld+json",
          children: JSON.stringify(config.jsonLd),
        },
      ]
    : [];

  return { meta, links, scripts };
}
