# Architectural Safety Atelier — Technical SEO & Route Architecture

**Framework:** TanStack Start (Vite SSR + React 19 + Nitro)  
**Status:** Certified & Production-Ready Reusable Template

---

## 1. Executive Summary

This architecture establishes a high-performance Technical SEO, AI-Search discoverability, Content Authority, and Trust structure for the invisible grills and safety solutions platform. It enforces clean URL structures, Core Web Vitals optimization, Schema.org JSON-LD structured data, and architectural authority across all categories and service lines.

All canonical URLs, Open Graph images, JSON-LD publisher references, and sitemaps derive dynamically from the configured site URL (`VITE_SITE_URL` / `BRAND_CONFIG.domain`). In pre-handover mode where a live production domain is pending, canonical publication is deferred to avoid publishing incorrect indexing signals.

---

## 2. Public Route Architecture & Indexing Registry

The site architecture enforces strict differentiation between public indexable content, local service hubs, and private transactional flows:

### A. Core Architectural Pages (13 Indexable Routes)

| Route Path            | Canonical Path        | Indexing Directive | Schema.org Type | Purpose / Editorial Topic                                        |
| --------------------- | --------------------- | ------------------ | --------------- | ---------------------------------------------------------------- |
| `/`                   | `/`                   | `index, follow`    | `Organization`  | Homepage Hero, Cinematic Scrollway, Proof Section                |
| `/solutions`          | `/solutions`          | `index, follow`    | `WebPage`       | Interactive Solutions Explorer across all 20 services            |
| `/service-areas`      | `/service-areas`      | `index, follow`    | `WebPage`       | Regional Operations & Verified Hubs Coverage                     |
| `/craftsmanship`      | `/craftsmanship`      | `index, follow`    | `WebPage`       | Materials, Metallurgy, Tensile Science & Anchoring Engineering   |
| `/lifestyle`          | `/lifestyle`          | `index, follow`    | `WebPage`       | Architectural Living, Child Safety & Horizon Liberation          |
| `/our-story`          | `/our-story`          | `index, follow`    | `WebPage`       | Atelier Heritage, Installation Track Record & Ethos              |
| `/maintenance-repair` | `/maintenance-repair` | `index, follow`    | `WebPage`       | Cleaning Protocol, Substrate Care, Retensioning Services         |
| `/warranty`           | `/warranty`           | `index, follow`    | `WebPage`       | Written Warranty Coverage Matrix (5-10 yrs grills, 3-5 yrs nets) |
| `/safety-faq`         | `/safety-faq`         | `index, follow`    | `FAQPage`       | Safety, Tensile Load, Fire Egress & Installation FAQ             |
| `/material-standards` | `/material-standards` | `index, follow`    | `WebPage`       | AISI 316, 6063-T6, Nylon-12, and Virgin HDPE Standards           |
| `/terms`              | `/terms`              | `index, follow`    | `WebPage`       | Terms and Conditions & Client Advisory Governance                |
| `/privacy`            | `/privacy`            | `index, follow`    | `WebPage`       | Privacy Declaration & Cookie Governance                          |
| `/sitemap`            | `/sitemap`            | `index, follow`    | `WebPage`       | HTML Site Directory & Crawl Equity Hub                           |

### B. Category Authority Hubs (5 Indexable Routes)

| Route Path                          | Canonical Path                      | Plain Service Descriptor                             | Breadcrumbs Hierarchy            |
| ----------------------------------- | ----------------------------------- | ---------------------------------------------------- | -------------------------------- |
| `/category/invisible-grills`        | `/category/invisible-grills`        | High-Tensile Stainless Steel Cable Safety Grills     | Home > Invisible Grills          |
| `/category/core-safety-nets`        | `/category/core-safety-nets`        | UV-Stabilized High-Density Polyethylene Netting      | Home > Core Safety Nets          |
| `/category/construction-industrial` | `/category/construction-industrial` | Heavy-Duty Structural & Debris Containment           | Home > Construction & Industrial |
| `/category/animal-bird-protection`  | `/category/animal-bird-protection`  | Humane Bird Spikes, Pigeon Nets & Monkey Deterrence  | Home > Animal & Bird Protection  |
| `/category/specialty-solutions`     | `/category/specialty-solutions`     | Sports Practice Cages, Coconut Nets & Pulley Systems | Home > Specialty Solutions       |

### C. Service Detail Pages (20 Indexable Routes)

Each service route contains a plain factual `<h1>`, specification matrix, installation sequence, metallurgy details, and `Service` + `BreadcrumbList` schemas:

1. `/service/balcony-invisible-grills`
2. `/service/staircase-invisible-grills`
3. `/service/windows-invisible-grills`
4. `/service/child-safety-invisible-grills`
5. `/service/balcony-safety-nets`
6. `/service/children-safety-nets`
7. `/service/staircase-safety-nets`
8. `/service/building-safety-nets`
9. `/service/construction-safety-nets`
10. `/service/industrial-safety-nets`
11. `/service/car-parking-safety-nets`
12. `/service/terrace-top-nets`
13. `/service/pigeon-safety-nets`
14. `/service/pigeons-bird-spikes`
15. `/service/monkey-safety-nets`
16. `/service/mosquito-safety-nets`
17. `/service/swimming-pool-nets`
18. `/service/cricket-sports-nets`
19. `/service/coconut-safety-nets`
20. `/service/cloth-drying-hangers`

### D. Protected / Non-Indexed Routes

- `/consultation`: Transactional lead inquiry interface (`noindex, follow`).
- `/campaigns/*`: Private editorial ad landing pages (`noindex, nofollow`).

---

## 3. Launch Deployment: Production Sitemap Generation

When launching with a live production domain:

1. Configure `VITE_SITE_URL="https://example.com"` in `.env`.
2. Update `public/robots.txt` to point to the sitemap:
   ```txt
   User-agent: *
   Allow: /
   Disallow: /consultation
   Disallow: /campaigns/

   Sitemap: https://example.com/sitemap.xml
   ```
3. Generate the XML sitemap referencing all 38 indexable routes using the configured production domain.
