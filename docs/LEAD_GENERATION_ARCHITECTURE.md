# Lead Generation Architecture

## 1. Organic and paid acquisition layers

The existing homepage, service, category, service-area, material, warranty, FAQ, campaign, privacy, and terms routes remain the organic SEO and brand-authority website. They keep the established premium visual system and organic internal navigation.

Paid search traffic should use `/lp/$landingId`. These pages use a reusable, direct-response layout with a short lead form, explicit Call and WhatsApp actions when configured, and a mobile sticky action bar. Paid routes emit `noindex, nofollow`, are absent from `public/sitemap.xml`, and are not linked from organic navigation.

The initial configurations live in `src/data/paidLandingPages.ts`:

- `invisible-grills-hyderabad`
- `safety-nets-hyderabad`

Add another campaign by adding one typed configuration entry. Reuse approved service claims and a lightweight image; do not clone the route component.

## 2. Lead capture flow

1. The root measurement lifecycle captures Google click IDs, UTMs, the original landing URL, and the external referrer.
2. The visitor submits either the organic consultation form or the compact paid form.
3. Client validation checks the Indian mobile number, six-digit pincode, required details, service selection, and explicit contact consent.
4. The TanStack server function repeats validation and normalizes the phone to `+91XXXXXXXXXX`.
5. The server applies an in-memory burst limit, then calls a service-role-only database function.
6. The database function takes a transaction-scoped advisory lock for the normalized phone, checks the preceding ten minutes, and inserts the lead with status `new` only when no recent row exists. This closes the concurrent-request gap across server instances.
7. The browser receives a real lead UUID and displays a reference.
8. Only then does the browser emit `consultation_submission` and the configured Google Ads primary conversion.
9. The server registers the optional owner WhatsApp notification with the request runtime's `waitUntil` facility. If that facility is unavailable, the server awaits the same four-second-bounded attempt. Notification failure does not roll back or invalidate the lead.

Before optional measurement consent, attribution remains only in bounded module memory for the current SPA session. It still reaches a lead submitted during that session. `Essential Only` does not write attribution identifiers to persistent browser storage and removes any prior persisted attribution record. `Accept All` permits the current attribution state to be saved in `localStorage` for later navigation. If storage is blocked, the in-memory path still works and lead submission continues.

## 3. Google Ads and Consent Mode

The site uses the direct Google tag. It does not use Google Tag Manager.

The server-rendered document head executes a small bootstrap before any external measurement script. That bootstrap creates `dataLayer` and `gtag`, reads a valid saved choice when available, and establishes Consent Mode v2 defaults. `ad_storage`, `analytics_storage`, `ad_user_data`, and `ad_personalization` default to `denied`. The external tag loads only for a valid `VITE_GADS_ACCOUNT_ID` in `AW-XXXXXXXXXX` form.

Google tag configuration sets `send_page_view: false`. TanStack route changes produce one manual page-view event, avoiding an automatic/manual duplicate.

The primary Google Ads conversion fires only after Supabase returns a persisted lead ID. That UUID is sent as `transaction_id`. An in-memory set plus `sessionStorage` prevents repeat firing during normal rerenders or repeated success rendering. No artificial rupee value is sent unless `VITE_GADS_LEAD_VALUE` is deliberately configured.

Phone, WhatsApp, survey-open, form-start, and validation-error events are secondary engagement signals. They never call the primary conversion action. Browser events do not contain full phone numbers or email addresses.

## 4. Attribution

The following fields are retained from first arrival through submission:

- `gclid`, `wbraid`, `gbraid`
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
- original landing URL
- external referrer
- paid `landing_id`
- `form_variant`

The original landing URL and referrer are kept once captured. Later internal navigation does not overwrite them. Current URL campaign parameters can refresh individual campaign/click fields while the original landing remains stable.

Persistent attribution storage is consent-gated. No attribution cookies are created.

## 5. Environment configuration

Keep secrets in the deployment environment. Never prefix server secrets with `VITE_`.

To change the site from safe staging mode to active production mode, set:

```dotenv
VITE_SITE_STATUS="active"
VITE_SITE_URL="https://invisprotect.in"
VITE_BRAND_NAME="InvisProtect"
VITE_CONTACT_ENABLED="true"
VITE_BUSINESS_PHONE_DISPLAY="<human-readable number>"
VITE_BUSINESS_PHONE_DIAL="<E.164 dial number>"
VITE_BUSINESS_WHATSAPP_DISPLAY="<human-readable number>"
VITE_BUSINESS_WHATSAPP_DIAL="<country-code plus number, digits only>"
VITE_BUSINESS_WHATSAPP_LINK="<optional approved wa.me HTTPS URL>"
VITE_BUSINESS_EMAIL="<business email>"
```

`VITE_BUSINESS_WHATSAPP_LINK` is optional when a valid WhatsApp dial value is present; the site then generates a `https://wa.me/` URL. Invalid or incomplete phone, WhatsApp, and email values never produce empty or unsafe action links. Contact mode and lead forms remain visibly disabled until both valid Call and WhatsApp destinations are available, even when the two launch flags were set.

Lead persistence requires server-only:

```dotenv
SUPABASE_URL="<production project URL>"
SUPABASE_SERVICE_ROLE_KEY="<production service-role key>"
```

Owner notification requires server-only:

```dotenv
WHATSAPP_API_TOKEN="<Meta Cloud API token>"
WHATSAPP_PHONE_NUMBER_ID="<Meta phone number ID>"
OWNER_WHATSAPP_PHONE="<recipient with country code>"
```

Google Ads measurement requires:

```dotenv
VITE_GADS_ACCOUNT_ID="AW-XXXXXXXXXX"
VITE_GADS_PRIMARY_LEAD_CONVERSION="AW-XXXXXXXXXX/CONVERSION_LABEL"
VITE_GADS_LEAD_VALUE=""
```

Leave the optional lead value blank until the business has an approved valuation model.

## 6. Lead lifecycle

New web submissions always start as `new`. They are never automatically qualified.

- `new`: persisted and awaiting human review
- `contacted`: the team reached or attempted to reach the person
- `qualified`: a real, contactable, serviceable opportunity
- `survey_booked`: a site survey is scheduled
- `quoted`: a quotation was provided
- `won`: work was accepted; `revenue_value` may be recorded when known
- `lost`: a valid opportunity did not proceed; `lost_reason` may be recorded
- `invalid`: spam, vendor solicitation, job seeker, unreachable junk, or an unusable duplicate

A qualified lead should generally be a unique real person requesting an offered service in a serviceable area, contactable by phone or WhatsApp, reasonably interested in a survey or quotation, and not spam, a vendor solicitation, a job application, or an obvious duplicate.

The lifecycle migration adds stage timestamps and a trigger-maintained `consultation_status_history` audit table. An insert records an explicit `lead_created` history event with `from_status = null`; later status changes record transitions. Unexpected pre-migration status values are retained in `legacy_status` before the active status is normalized to `new`. Anonymous and authenticated browser roles cannot read, update, delete, or directly insert consultation or history rows. Submissions pass through the server function using the server-only service-role client.

## 7. Owner notifications

After persistence, the server formats a notification with lead ID, customer, phone, service, locality/city, pincode, source, medium, campaign, original landing URL, paid landing ID, form variant, and whether a Google Ads click ID is present. API secrets are never included. The installed TanStack Start/H3/Nitro stack exposes the runtime request's `waitUntil` extension, which Nitro maps to Cloudflare's execution context for the default deployment preset. The task is registered before returning success. On a runtime without that extension, the response waits for the same notification attempt, whose network request aborts after four seconds. Missing configuration, timeout, or Meta API failure is logged without response bodies, tokens, customer details, or raw network errors and never changes the persisted lead result.

## 8. Future offline conversion readiness

The database retains Google click identifiers, lead ID, creation time, source/campaign fields, lifecycle status, qualification and won timestamps, and eventual revenue value. This supports a later consent-aware server integration for:

- Qualified Lead conversion imports
- Converted/Won Lead imports
- Enhanced Conversions for Leads or other offline measurement

No Google Ads API integration, developer token, or automatic PII transmission is included now. Add that only as a separately reviewed server-side feature with the required account credentials, consent basis, hashing/normalization rules, retry handling, and audit trail.

## 9. Production launch checklist

1. Apply all Supabase migrations to the production project and verify RLS/grants.
2. Configure the site, contact, and Supabase values above.
3. Optionally configure Meta WhatsApp Cloud API values and send a test owner notification.
4. Create or identify the Google Ads lead conversion action, then supply its AW account ID and full conversion destination.
5. Deploy to `https://invisprotect.in` and confirm canonicals use that origin.
6. Confirm `/lp/invisible-grills-hyderabad` and `/lp/safety-nets-hyderabad` return `noindex, nofollow` and are absent from the sitemap.
7. Submit a test lead with a unique phone number and test attribution. Confirm the database row, initial history row, reference ID, and notification attempt.
8. Repeat immediately with the same normalized phone and confirm the duplicate is rejected without a second row.
9. Confirm Call and WhatsApp destinations on mobile with the production contact values.
10. Verify privacy and terms links remain reachable from paid pages.

## 10. Google Ads diagnostics

Use browser developer tools or Google Tag Assistant on the deployed site:

1. Before choosing consent, confirm the first queued consent command defaults all four optional storage settings to `denied`.
2. Confirm `gtag/js?id=AW-...` loads only when the account ID is configured.
3. Navigate between client-side routes and confirm one `page_view` per route, with no automatic duplicate.
4. Click phone, WhatsApp, and survey actions and confirm secondary event names only.
5. Trigger form validation errors and confirm no conversion request.
6. Simulate a failed database request and confirm no conversion request.
7. Submit one valid persisted lead and confirm one `consultation_submission` plus one Google Ads `conversion` event containing the lead UUID as `transaction_id`.
8. Re-render or revisit the success state in the same session and confirm the primary conversion does not fire again.
9. Validate the full conversion destination in Google Ads diagnostics; an AW account ID alone cannot attribute the lead conversion action.

Do not spend against the landing pages until the production database insert, transaction ID, consent behavior, and Google Ads conversion action have all been verified end to end.
