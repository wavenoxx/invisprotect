# Customizing this site for a new business

This website is a reusable template for invisible grills and safety-net
businesses. Each new owner gets their own copy with their own details. **Do
not ship an unchanged copy.** Two businesses with the same text compete
against each other in Google (duplicate content), and claims that are true for
one business may be false for another.

Rule of thumb: sell **one copy per city** and rewrite the copy for each owner.

---

## 1. Identity and contact (about 10 minutes)

File: `src/config/brand.ts`, in the **BRAND IDENTITY & CONTACT** block at the top.

| Setting                      | Example                                          |
| ---------------------------- | ------------------------------------------------ |
| `DEFAULT_BRAND_NAME`         | `"SafeView Grills"`                              |
| `DEFAULT_SITE_URL`           | `"https://safeviewgrills.in"`                    |
| `DEFAULT_TAGLINE`            | `"Invisible Grills & Safety Nets in Vijayawada"` |
| Phone, WhatsApp, email       | The owner's real numbers                         |
| Instagram, Facebook, YouTube | The owner's links, or `""` to hide               |

Environment variables in `.env.example` override these at build time.

## 2. Areas, reviews and prices (about 20 minutes)

File: `src/config/business.ts`

- `regionLabel`, `primaryCity`, `primaryRegion`, `geo`, `localityPlaceholder`
- `serviceHubs`: only the cities the owner **actually serves**. The footer,
  menu, service-area page, homepage banner, privacy page and SEO schema all
  read from this list.
- `reviews`: **real reviews only**. Copy them from the owner's Google Business
  Profile with the customer's permission. Keep the list empty until real
  reviews exist, and the section stays hidden. Never invent names or quotes:
  India's CCPA guidelines (2022) require endorsements to be genuine.
- `priceGuide`: replace the ranges with the owner's **confirmed** rates, or set
  `enabled: false`.

## 3. Brand colour (1 minute)

File: `src/styles.css`, at the top of `:root`:

```css
--brand: #f37021; /* main accent */
--brand-deep: #d9531e; /* hover shade */
```

## 4. Services and copy (about 1–2 hours)

- `src/data/servicesData.ts`: rewrite the descriptions in the owner's words.
  Check every spec claim with the owner, including warranty years, cable
  grade (SS 304 or AISI 316), mesh sizes and installation time.
- To remove a service the owner does not offer, delete it from
  `src/data/serviceIds.ts` and `servicesData.ts`. TypeScript will show every
  place that needs updating.
- Check these pages for claims that must be true for this owner: `/warranty`,
  `/safety-faq`, `/maintenance-repair`, `/our-story`, `/terms` and `/privacy`.
  Examples are the free site survey, warranty terms and in-house installers.

## 5. Images and logo

- Add the owner's **real installation photos** wherever possible, especially
  on service pages. Keep AI images for moods and category banners.
- Save new photos as `.webp`, no more than 2000 px wide, and use the same file
  names or update the paths in `servicesData.ts`.
- Logo: `src/components/BrandLogo.tsx` shows the brand name as text by default.

## 6. Domain-specific files

- `public/robots.txt`: sitemap URL
- `public/sitemap.xml`: change every `<loc>` to the new domain
- `src/data/paidLandingPages.ts`: the city in the ad landing pages
- `.github/workflows/keep-alive.yml`: `SITE_URL`

## 7. Backend (leads)

See `docs/LEAD_GENERATION_ARCHITECTURE.md`. Minimum setup:

1. Create a Supabase project and run everything in `supabase/migrations/`.
2. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` on the host.
3. Optional: WhatsApp Cloud API owner alerts and Google Ads conversion IDs.

**Supabase Free plan:** a project pauses after 7 days with no activity, and a
paused project silently stops saving leads. The `keep-alive.yml` workflow
calls `/api/health` every 3 days to prevent this. It needs no secrets. Open
`https://<domain>/api/health` once to confirm it returns `"database":"ok"`.

## 8. Launch checklist

- [ ] No invented reviews, names or numbers anywhere on the site
- [ ] Cities, warranty, materials and prices confirmed by the owner
- [ ] Service copy rewritten, not identical to another client's site
- [ ] Call and WhatsApp buttons tested on a phone
- [ ] Test lead submitted and visible in the database
- [ ] `/api/health` returns `ok`
- [ ] `npm test`, `npx tsc --noEmit` and `npm run build` pass
