# Google Ads Landing Page Playbook — Invisible Grills (Bengaluru first)

**Put this file at `docs/LP_QUALITY_SCORE_PLAYBOOK.md`.** It is the spec for the coding agent (Antigravity) and the "DNA" to copy to the other 19 cities later.

Audited: `main` @ `42f54cd` (10 Oct 2026) and the live page https://invisprotect.in/lp/invisible-grills-bengaluru.

---

## 0. Ground rules (read before touching code)

These come from `AGENTS.md` and `docs/PAID_LANDING_PAGES.md`. They are not optional.

1. **Work on a branch, never directly on `main`.** `main` auto-deploys to the live site. Use a branch such as `lp/bengaluru-quality`, check the Vercel preview URL, then merge.
2. **Before every push, all four must pass:** `npx tsc --noEmit`, `npm test`, `npm run lint` (0 errors), `npm run build`.
3. **Honest copy only.** InvisProtect is a referral service. Never write "our technicians", "in-house", "our team", "our warranty". Never invent reviews, ratings, counts, certifications, test results or years in business.
4. **No prices.** No ₹ amounts and no "per sq ft" wording. Each installer quotes after the free site visit.
5. **Design DNA stays exactly as it is:** cream `#FAF8F5`, ink `#1C1917`, hairline borders, **square corners** (no `rounded-full` chips), `sn-*` classes, Jost / Inter / Cormorant Garamond, cinematic 4:5 / 2.39:1 banners, glass contact dock, dark footer. Calm, clean, quiet luxury. No new colours, no badges, no gradients beyond the existing vignette.
6. **Service text lives in data, not in the page component.** No `if (serviceKey === "invisible-grills")` strings inside `src/routes/lp.$landingId.tsx`. Everything comes from `src/data/paidLandingPages.ts`, so every city inherits it.

---

## 1. What is wrong today (findings)

### 1a. Today's two commits (`5a3edd8`, `42f54cd`) broke the guardrails

| Problem | Where | Why it matters |
| --- | --- | --- |
| **2 tests now fail** (`npm test`: 48/50). Before these commits all 50 passed. | `tests/paid-landing-pages.test.ts` lines 50 and 93 | The test suite is the business-rule guard. It was pushed to `main` anyway. |
| **"per sq.ft" wording added** in quote factors, the price FAQ, the buyer checklist and the form intro. | `paidLandingPages.ts` ~144, 162, 174; `lp.$landingId.tsx` ~332–333 | Breaks the "no per-sq-ft" rule. |
| **New lint error** (prettier). | `paidLandingPages.ts` line 150 | Breaks the push checklist. |
| **Unverifiable claims added:** "certified 2-inch cable gap", "certified 3.16mm SS316", "tested, reliable fall prevention", "zero hidden charges", "cuts cleanly in seconds", "installers cover all major residential localities". | `paidLandingPages.ts` ~153–194, ~911 | Breaks the honesty rule and is risky under Google Ads misrepresentation policy (unverifiable claims). InvisProtect cannot promise another company's pricing. |
| **SS316 pushed for an inland city.** Bengaluru local note says "3.16mm SS316 marine-grade"; the checklist now tells everyone to ask for SS316. The old (honest) advice was "SS304 suits most city flats; SS316 near the sea". | `paidLandingPages.ts` ~159, ~911 | Wrong advice for Bengaluru, and it contradicts the main site's spec of 2.5 / 3.0 mm cable (`servicesData.ts` line 377). Inconsistent specs reduce trust. |
| **`offers.price: "0"` in Service schema.** | `lp.$landingId.tsx` lines 57–62 | Tells Google the service costs ₹0. Misleading structured data. |
| **Rounded pill chips with shadows.** | `lp.$landingId.tsx` lines 335–348 | Breaks the square-corner hairline DNA. |
| **Service-specific strings hard-coded in the page component**, and the Bengaluru hero hard-coded inside `buildLandingPage`. | `lp.$landingId.tsx` 326–333; `paidLandingPages.ts` ~1460 | Cannot be copied to other cities cleanly. |
| **A forced "near me" FAQ.** | `paidLandingPages.ts` ~187 | Keyword stuffing. Google says the exact search phrase does not need to appear on the page; usefulness matters more. |

### 1b. Older issues that hold back landing page experience

1. **Mobile consent banner covers ~40% of the first screen** (fixed card with title, paragraph, two big buttons) and sits on top of the call/WhatsApp dock. On desktop it covers the form.
2. **Form starts ~1.5 screens below the hero on mobile.** A 7-line italic quote sits between the intro and the form.
3. **All three hero buttons look the same.** "Free Site Visit" (the conversion) is not the visual primary.
4. **City pages are ~91% identical text** (Bengaluru vs Hyderabad, measured on rendered HTML). Only the local note and locality list change. For organic search this looks like a doorway-page pattern; for Ads it means little "useful, original" content.
5. **No visuals of where grills go** (balcony, window, staircase, villa) even though on-brand images already exist in `public/images/`.
6. **Thin transparency in the LP footer.** No phone, email, hours or "how InvisProtect works" link on the page itself (only the floating dock).
7. **Schema conflict.** Root schema says the business is in Hyderabad; the LP's `provider` invents a Bengaluru address for the same business.
8. **Speed (mobile).** Lighthouse on a local production build with compression: performance 86–97, LCP 1.7–3.2 s, CLS 0. Main costs: the Google Fonts stylesheet (~780 ms render-blocking, Barlow loaded in 4 weights but only 800 is used for the wordmark), a 175 KB mobile hero served at 1122 px wide (~100 KB wasted), and ~117 KB of unused JS — including the Supabase auth client shipped to every visitor through `attachSupabaseAuth` in `src/start.ts`, although forms do not use Supabase.
9. **Pre-existing check failures:** `npx tsc --noEmit` fails on `data.pincode` in `src/functions/consultation.ts` lines 76 and 123; `npm run lint` fails on formatting in `src/routes/__root.tsx` lines 111–121.

---

## 2. Phase 1 — Repair (do first, small and safe)

### 2.1 Restore honest, test-passing copy for `invisible-grills`

In `SERVICES["invisible-grills"]` (`src/data/paidLandingPages.ts`):

```ts
quoteFactors: [
  "Total area of the openings",
  "Cable grade: SS304 or marine-grade SS316",
  "Cable thickness (in mm) and gap: 2-inch or 3-inch",
  "Type of opening: balcony, window, staircase or terrace",
  "Track finish, floor height and access",
],
benefitsIntro:
  "Quiet protection that keeps your balcony and windows open to light, breeze and view.",
benefits: [
  "Keeps your view, light and breeze — no 'jail look' like iron grills",
  "Child and pet safe with a 2-inch cable gap option",
  "Rust-resistant SS304 or marine-grade SS316 stainless-steel cable",
  "Can be cut with a cable cutter in a fire emergency — iron grills need a grinder",
],
buyerChecklist: [
  "SS304 suits most city flats; ask for marine-grade SS316 near the sea or a pool.",
  "Make sure the cable grade, thickness (in mm) and gap are written in the quote.",
  "Choose a 2-inch gap for toddlers and pets, 3-inch for others.",
  "Get the installer's warranty in writing before you pay.",
],
```

FAQs (8 items; first and last questions keep their exact wording for the test):

```ts
faqs: [
  {
    question: "How is the price decided?",
    answer:
      "Every home is different. At the free site visit the installer in {city} measures your openings and gives an exact written quote based on the area, the cable grade (SS304 or SS316), the cable thickness and gap, and the floor height.",
  },
  {
    question: "Are invisible grills safe for small children and pets?",
    answer:
      "Choose a 2-inch cable gap for toddlers and pets. Invisible grills are a fall-prevention barrier; they don't replace adult supervision.",
  },
  {
    question: "SS304 or SS316 — which cable should I choose in {city}?",
    answer: "{cableAdvice}",
  },
  {
    question: "How long does installation take?",
    answer:
      "Once measured, most flats are done in a day. Larger villas can take longer — the installer confirms the timeline in the quote.",
  },
  {
    question: "Do I need my apartment society's permission?",
    answer:
      "Some societies have rules about what can be fitted to balconies and the building's outside. Check with your association first — the installer can share photos and the specification to help you get approval.",
  },
  {
    question: "Will invisible grills stop pigeons?",
    answer:
      "Invisible grills are made for fall safety, not bird control. Pigeons can still perch on the cables and ledges, so if birds are the problem, ask about a pigeon net.",
  },
  {
    question: "What happens in a fire emergency?",
    answer:
      "The cables can be cut with a standard cable cutter, unlike iron grills that need a grinder.",
  },
  {
    question: "Who installs and who gives the warranty?",
    answer:
      "InvisProtect assigns a verified, expert local installation partner in {city} for your project. The installer measures on-site, provides the exact written quote, completes precision installation, and issues the direct written warranty at handover.",
  },
],
```

`{cableAdvice}` is a new token replaced by `withCity`-style substitution from the city config (see 2.4).

### 2.2 Bengaluru local note (no invented specs)

```ts
"invisible-grills":
  "For Bengaluru's high-rise apartments, villas and duplexes — slim stainless-steel cables keep the skyline and the breeze, while a 2-inch gap keeps little ones safe.",
```

**Owner confirmed (10 Oct 2026):** installers cover all listed localities in all 20 cities. Keep the locality lists as they are.

### 2.3 Fix structured data

In `src/routes/__root.tsx`, add `"@id": "https://invisprotect.in/#organization"` to `organizationSchema`.

In `src/routes/lp.$landingId.tsx`, replace `serviceSchema` with:

```ts
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: `${landing.serviceName} in ${landing.city}`,
  serviceType: landing.serviceName,
  description: landing.summary,
  url: `https://invisprotect.in/lp/${params.landingId}`,
  image: `https://invisprotect.in${landing.hero.desktop}.jpg`,
  provider: { "@id": "https://invisprotect.in/#organization" },
  areaServed: {
    "@type": "City",
    name: landing.city,
    containedInPlace: { "@type": "State", name: landing.state },
  },
};
```

No `offers`, no `price`, no invented city address.

### 2.4 Move service and city specifics into data

Add to `PaidServiceTemplate` (and pass through to `PaidLandingPageConfig`):

```ts
/** Headline of the form section, e.g. "Invisible Grills for your {city} home". */
formIntroTitle: string;
/** One or two sentences under it. */
formIntroText: string;
/** 3–4 short square chips under the intro. */
scopeChips: string[];
/** Optional "Where it fits" tiles (see 3.3). */
applications?: { title: string; detail: string; image: string; alt: string; href: string }[];
/** Optional comparison rows (see 3.4). */
comparison?: { label: string; ours: string; theirs: string }[];
/** Optional "At your free site visit" list (see 3.5). */
siteVisitIncludes?: string[];
```

Values for invisible grills:

```ts
formIntroTitle: "Invisible Grills for your {city} home",
formIntroText:
  "Free site visit for balconies, windows, staircases or the full flat. An exact written quote from one checked installer. No obligation.",
scopeChips: ["Balconies", "Windows", "Staircases & duplexes", "Villas & high-rise flats"],
```

> Do not use the word "laser" anywhere on paid pages until the owner confirms every partner installer uses a laser distance meter. Say "measurement".

Add to `PaidCity`:

```ts
/** Name used in titles/descriptions, including the common search spelling. */
searchName: string; // Bengaluru → "Bengaluru (Bangalore)", Mysuru → "Mysuru (Mysore)", Kochi → "Kochi (Cochin)", Mumbai → "Mumbai"
/** Drives cable advice text. Owner confirms per city. */
climate: "coastal" | "inland";
/** Optional per-service hero override (replaces the Bengaluru special case in buildLandingPage). */
heroOverrides?: Partial<Record<PaidServiceKey, PaidHeroImage>>;
```

Cable advice is generated, not hand-written per city:

```ts
const cableAdvice =
  city.climate === "coastal"
    ? `${city.name} is close to the sea, so marine-grade SS316 is the safer choice — salty air corrodes ordinary steel faster. Make sure the grade is written in the quote.`
    : `${city.name} is inland, so SS304 suits most apartments. Choose marine-grade SS316 for pool-facing balconies or if you want extra corrosion resistance. Make sure the grade is written in the quote.`;
```

Use this `climate` list (the owner may adjust it later): coastal = Vizag, Mangaluru, Mumbai, Thane, Navi Mumbai, Chennai, Kochi, Thiruvananthapuram, Kozhikode. Inland = all others.

Move the Bengaluru hero into `CITIES.bengaluru.heroOverrides["invisible-grills"]` and use `city.heroOverrides?.[service.key] ?? service.hero` in `buildLandingPage`.

### 2.5 Titles and descriptions (one template for every invisible-grills page)

```ts
const metaTitle = `${service.serviceName} in ${city.searchName} | Balcony & Windows | InvisProtect`;
const summary = `Invisible grills for balconies & windows in ${city.searchName}. Free site visit and an exact written quote from one checked installer.`;
```

Bengaluru result:
- Title: `Invisible Grills in Bengaluru (Bangalore) | Balcony & Windows | InvisProtect`
- Description / hero line: `Invisible grills for balconies & windows in Bengaluru (Bangalore). Free site visit and an exact written quote from one checked installer.`

Keep the H1 exactly `Invisible Grills in Bengaluru` (the test checks it). The words "Bangalore" + "balcony" + "windows" now appear in title, description, eyebrow and hero line — no stuffing needed anywhere else.

### 2.6 Replace the pills

Render `landing.scopeChips` with the same square hairline style already used for quote factors:

```tsx
<ul className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
  {landing.scopeChips.map((chip) => (
    <li key={chip} className="border border-[#1C1917]/10 bg-white px-3 py-1.5 text-[11px] text-[#1C1917]">
      {chip}
    </li>
  ))}
</ul>
```

### 2.7 Make all checks green

- Update `tests/paid-landing-pages.test.ts` deliberately: FAQs `5 ≤ length ≤ 8`, first question still `"How is the price decided?"`, **last** question still `"Who installs and who gives the warranty?"`, no `{city}` / `{cableAdvice}` left unreplaced.
- Add banned phrases to the honesty test: `"per sq"`, `"zero hidden"`, `"certified 2-inch"`, `"certified 3.16"`, `"tested, reliable"`, `"near me"`, `"all major residential localities"`.
- Add a test: no `rounded-full` inside `src/routes/lp.$landingId.tsx`.
- Add a test: every page has `scopeChips.length >= 3` and a non-empty `formIntroTitle`.
- Fix the pre-existing `data.pincode` type errors (`src/functions/consultation.ts` lines 76, 123 — use `data.pincode ?? ""` or remove the field) and run `npx prettier --write src/routes/__root.tsx src/data/paidLandingPages.ts`.
- Update `<lastmod>` for changed pages in `public/sitemap.xml` and the date assertion in the sitemap test.

---

## 3. Phase 2 — Relevance and usefulness (landing page experience)

### 3.1 Hero: one clear primary action

- Make **Free Site Visit** the visual primary: add a modifier in `src/styles.css`, e.g. `.sn-btn-luxury-hero.is-primary`, whose default state is the existing hover state (brand fill, white text). Call and WhatsApp stay as they are.
- Under the buttons add one quiet line (same style as the closing banner): `One checked installer · Written quote · No obligation`.

### 3.2 Mobile: form sooner

In the "Private Site Visit" section, on mobile show: eyebrow → H2 → intro text → chips → **form** → local quote. On desktop keep today's two-column layout. Use `order-*` classes; do not duplicate markup.

### 3.3 New section: "Where invisible grills fit" (after "Three Quiet Steps")

Four square tiles using images that already exist (each `.webp` verified in `public/images/`), each linking to the main service page:

| Title | Image | Link |
| --- | --- | --- |
| Balconies | `/images/balcony-invisible-grills.webp` | `/service/balcony-invisible-grills` |
| Windows | `/images/windows-invisible-grills.webp` | `/service/windows-invisible-grills` |
| Staircases & duplexes | `/images/staircase-invisible-grills.webp` | `/service/staircase-invisible-grills` |
| Child & pet safety | `/images/child-safety-invisible-grills.webp` | `/service/child-safety-invisible-grills` |

Style: `sn-eyebrow` + `sn-h1` section intro, hairline cards, square corners, `loading="lazy"`, explicit `width`/`height`, short one-line detail per tile. Confirm the four `/service/...` routes resolve before linking.

### 3.4 New section: "Invisible Grills vs Iron Grills" (inside Chapter 01 or as Chapter 02)

A quiet two-column hairline table, no prices:

| | Invisible grills | Iron grills |
| --- | --- | --- |
| View & light | Open — thin cables | Blocked by bars |
| Look | Barely visible from outside | "Jail look" |
| Fire emergency | Cut with a cable cutter | Needs a grinder |
| Rust | Stainless steel (SS304 / SS316) | Needs repainting |
| Children & pets | 2-inch gap option | Depends on bar spacing |

### 3.5 New section: "At your free site visit"

```ts
siteVisitIncludes: [
  "Measures every opening you want covered",
  "Checks the wall, slab or railing where the track will be fixed",
  "Advises the gap (2-inch for children and pets) and the cable grade",
  "Gives a written quote with cable grade, thickness in mm, gap, finish and warranty terms",
],
```

Render with the existing `EditorialRows` component.

### 3.6 Real proof (only when real)

Add an optional `gallery` field per city: real installation photos from the Bengaluru installer (with the customer's permission), caption like `Whitefield · 3BHK balcony`. **Do not use AI images or stock as "installations".** Render the section only when the array is non-empty. When the owner has real Google reviews, use the existing `reviews` array in `src/config/business.ts`.

> Note: the current Bengaluru hero shows cables roughly 6–8 inches apart. Real child-safe grills are 2–3 inches. Consider a hero with realistic spacing so the picture matches the 2-inch promise.

### 3.7 LP footer transparency

Add above the footer nav, in the same dark-footer style: phone (`BRAND_CONFIG.contact.phoneDisplay`), WhatsApp, email, "Replies 8 AM – 8 PM", and links to `/our-story` (How InvisProtect works), `/warranty`, `/material-standards`, `/privacy`, `/terms`. Read all values from `BRAND_CONFIG`; never type them.

### 3.8 Compact consent notice on `/lp/*`

Keep the same choices and copy rules, but on landing pages show a slim one-line bar (text + "Accept" + "Essential only"), square corners, that does not cover the contact dock (offset above it). Keep the full card on the rest of the site. Behaviour, storage key and Google consent calls stay unchanged.

### 3.9 Internal links for organic search

- `/service-areas`: in the Bengaluru hub card, link "Invisible grills in Bengaluru" to `/lp/invisible-grills-bengaluru` (repeat for each hub when scaling).
- `/service/balcony-invisible-grills`: add a small "Find an installer in your city" list linking to the invisible-grills city pages.

### 3.10 Optional (later): ad-group message match without new URLs

Accept a whitelisted search param `?focus=balcony|windows|staircase|villa`. Read it in the route (TanStack `validateSearch`), map it to pre-written eyebrow/hero lines in data, render it server-side. **Never print the raw query text.** Canonical URL stays without the param. The owner then sets a custom parameter per ad group in Google Ads.

---

## 4. Phase 3 — Speed

1. **Responsive hero.** Extend `scripts/make-paid-hero.mjs` to also write `-640`, `-960` and `-1280` width variants; use `srcSet` with `sizes="100vw"` in `CinematicPicture` and in the preload links (`imageSrcSet` / `imageSizes`). Target: mobile hero ≤ 90 KB.
2. **Fonts.** Load Barlow Semi Condensed only at weight 800. Grep the codebase for the Jost / Inter / Cormorant weights actually used and drop the rest from the Google Fonts URL in `src/routes/__root.tsx`.
3. **Unused Supabase client.** Forms do not use Supabase. Confirm no server function needs a bearer token, then remove `attachSupabaseAuth` from `functionMiddleware` in `src/start.ts` so the auth client is no longer bundled for visitors.
4. Re-check with PageSpeed Insights (mobile) on the Vercel preview. Targets: LCP < 2.5 s, CLS < 0.1, INP < 200 ms.

---

## 5. Phase 4 — Measurement (owner decisions, then code)

These do not change Quality Score, but they change CPC under Smart Bidding.

1. **Consent default.** Today every visitor starts with all four consent types `denied`, plus `ads_data_redaction: true`. Visitors who ignore the banner send conversions without click IDs, so Google Ads sees fewer and noisier conversions. Google's consent mode supports region-specific defaults (`region: [...]`). Whether to keep `denied` for Indian visitors is a legal decision (India's DPDP Rules are being phased in) — decide with a lawyer, then change `src/lib/google-tag.ts` accordingly.
2. **Conversion quality.** The primary conversion fires when the form is submitted, before the visitor taps Send in WhatsApp. Some "conversions" never become chats. Option: send `{ reference, gclid, landingId, timestamp }` to a small server log (or a Google Sheet via a server function) so qualified leads ("site visit booked") can be uploaded as offline conversions. The click ID is already captured in `src/lib/attribution.ts` but is discarded today.

---

## 6. Scaling the DNA to the other 19 cities

After Bengaluru is live and its Quality Score components are checked:

1. For each city fill: `searchName`, `climate`, the invisible-grills `localNote` (honest, no invented specs), its localities, and `heroOverrides` only if a real or city-appropriate hero exists.
2. Everything else (copy, chips, sections, schema, tests) is inherited from the service template — no per-city code.

### Shared text vs city text

Same service facts on every city page are fine — SS304/SS316, the 2-inch gap and the fire-safety answer are true everywhere. The risk is only for organic Search: Google's spam policy lists "pages targeted at specific regions or cities" and "substantially similar pages" under doorway abuse. Today Bengaluru and Hyderabad are ~91% identical. Aim for roughly **70% shared / 30% city-specific** visible text.

| Shared (service template) | City-specific (city config) |
| --- | --- |
| Benefits, buyer's checklist, quote factors | `localNote` — the homes and buildings typical of that city |
| "Where it fits" tiles, comparison table, site-visit list | `cableAdvice` — generated from `climate` (coastal vs inland) |
| Generic FAQs (price, children, fire, warranty) | `localFaqs` (new, 2 per city) — a real local concern, e.g. sea air in Kochi, monkeys in Tirupati, high-rise wind in Mumbai, society rules in Bengaluru gated communities |
| Process, trust signals, disclosure | Localities list, and real installation photos (`gallery`) when available |
| | `buildingTypes` (new) — e.g. Bengaluru: "gated-community high-rises, villas, duplexes"; Vijayawada: "independent houses and apartments" |

Rules for city text: written for that city, true, no invented numbers or certifications, no keyword stuffing. Add a test that fails if two cities share the same `localNote`, `localFaqs` or `buildingTypes`.

---

## 7. Acceptance checklist (before merging)

- [ ] `npx tsc --noEmit`, `npm test`, `npm run lint`, `npm run build` all pass.
- [ ] No `per sq`, `₹`, `certified 2-inch`, `zero hidden`, `near me`, `our team` anywhere in paid-page data.
- [ ] No `rounded-full` and no service-specific strings in `src/routes/lp.$landingId.tsx`.
- [ ] Rendered title is `Invisible Grills in Bengaluru (Bangalore) | Balcony & Windows | InvisProtect`; H1 is `Invisible Grills in Bengaluru`.
- [ ] Rich Results Test on the preview URL: Service + BreadcrumbList + FAQPage parse with no errors; no `offers`.
- [ ] Mobile 390 px screenshot: hero → intro → form within ~1.3 screens; consent bar does not cover the dock.
- [ ] PageSpeed mobile on preview: LCP < 2.5 s, CLS < 0.1.
- [ ] Other 159 pages still render and still pass tests.
- [ ] `public/sitemap.xml` `<lastmod>` updated for changed pages.

---

## Appendix — Google Ads account changes (owner does these in Google Ads, not in code)

Quality Score is reported per keyword from three parts: **expected CTR, ad relevance, landing page experience**. The landing page only fixes the third. Check which part says "Below average" first: Keywords → Columns → Quality Score, Exp. CTR, Ad relevance, Landing page exp.

1. **Tight ad groups** (one theme each), all pointing at the Bengaluru URL:
   - Core: `invisible grills bangalore`, `invisible grills bengaluru`, `invisible grills in bangalore`, `invisible grill bangalore`
   - Balcony: `balcony invisible grills bangalore`, `invisible grills for balcony bangalore`
   - Windows: `invisible grills for windows bangalore`, `window invisible grills bangalore`
   - Near me: `invisible grills near me`, `invisible grill installers near me` (relies on Bengaluru location targeting)
   - Price (optional, separate): `invisible grills price bangalore`, `invisible grills cost` — the page shows no prices, so expect lower relevance here; keep it separate so it does not mix with the others.
2. **RSA headlines** mirror the page: "Invisible Grills in Bangalore", "Balcony & Window Invisible Grills", "Free Site Visit in Bangalore", "Exact Written Quote", "One Checked Installer", "SS304 / SS316 Stainless Cable", "2-Inch Child-Safe Gap". Pin the city headline in position 1. Use the spelling people search ("Bangalore") — confirm in the Search terms report.
3. **Assets:** sitelinks (Balcony, Windows, Staircase, How It Works), callouts (Free Site Visit, Written Quote, No Obligation, One Installer), structured snippet "Types: Balcony, Windows, Staircase, Duplex, Villa", call asset with 080 6426 8880, image assets from the hero.
4. **Negative keywords:** jobs, salary, training, course, dealer, distributor, wholesale, manufacturer, supplier, DIY, "how to install", amazon, flipkart, PDF, design images, iron, aluminium, other city names.
5. **Location option:** "Presence: people in or regularly in your targeted locations".
6. **Bidding:** after ~30 conversions in 30 days, move from Maximize Conversions without a target to Maximize Conversions **with a target CPA**. Without a target, the algorithm spends the whole budget and CPC rises regardless of Quality Score.
7. Quality Score is relative to other advertisers on the same keyword and updates only after enough impressions — give it 2–4 weeks after the page changes before judging.
