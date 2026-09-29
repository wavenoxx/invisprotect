# Agent notes — InvisProtect

- **Hosting:** Vercel auto-deploys every push to `main` to https://invisprotect.in. Keep `main` building. Never force-push or rewrite pushed history.
- **Before every push:** run `npx tsc --noEmit`, `npm test`, `npm run lint` (0 errors) and `npm run build`.
- **Business model:** InvisProtect is a referral / lead-generation service, not an installer. It passes each request to one independent, checked installer, who quotes, installs and gives the warranty.
- **Copy rules:**
  - Never write "our technicians", "in-house", "our team" or "our warranty".
  - Never invent reviews, ratings, customer counts or years in business.
  - Never show prices — no ₹ amounts, no per-sq-ft rates. Each installer sets their own price after the free site visit.
- **Lead flow:**
  1. The form validates the details.
  2. It creates a lead reference, e.g. `IG-HYD-K7Q2M9XA`.
  3. It fires the Google Ads lead conversion with that reference as `transaction_id` (`trackConsultationLeadThen` in `src/lib/analytics.ts`).
  4. It opens WhatsApp with the details and the reference.

  Forms do not use a database. The Supabase code is kept but unused.

- **Google Ads landing pages:** `/lp/<service>-<city>` (56 pages: 8 services × 7 cities), generated from `src/data/paidLandingPages.ts`. They are `noindex, nofollow` and not in the sitemap. See `docs/PAID_LANDING_PAGES.md`.
- **Design:** use only the existing design system:
  - the `sn-*` classes in `src/styles.css`
  - cream `#FAF8F5` and ink `#1C1917`
  - hairline borders and square corners
  - Jost, Inter and Cormorant Garamond
  - the homepage cinematic banners and the glass contact dock
- **Config:** public config lives in Vercel environment variables. `VITE_*` values are read at build time, so redeploy after changing them. Never put secrets in `VITE_` variables.
