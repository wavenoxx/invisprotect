# Google Ads landing pages

InvisProtect is a **referral / lead-generation service**. Each request goes to **one** independent, checked installer in that city, who measures, quotes, installs and gives the warranty.

## Rules for every page

- **No prices.** No ₹ amounts and no per-sq-ft rates. Every installer sets their own price after the free site visit.
- **Honest copy only.** Never write "our technicians", "in-house", "our team" or "our warranty". Never invent reviews, ratings, counts or years in business.
- **Design.** Use only the site design system: the cinematic banner, `sn-*` typography, hairline cards, the Cormorant quote, the glass Call / WhatsApp dock and the dark footer.
- **Visibility.** Pages are `noindex, nofollow`, absent from `public/sitemap.xml`, and never linked from site navigation.

## Final URLs (21)

| Service          | City       | Final URL                                              | WhatsApp ref prefix |
| ---------------- | ---------- | ------------------------------------------------------ | ------------------- |
| Invisible Grills | Hyderabad  | https://invisprotect.in/lp/invisible-grills-hyderabad  | `IG-HYD`            |
| Invisible Grills | Vizag      | https://invisprotect.in/lp/invisible-grills-vizag      | `IG-VZG`            |
| Invisible Grills | Vijayawada | https://invisprotect.in/lp/invisible-grills-vijayawada | `IG-VJA`            |
| Invisible Grills | Amaravati  | https://invisprotect.in/lp/invisible-grills-amaravati  | `IG-AMR`            |
| Invisible Grills | Tirupati   | https://invisprotect.in/lp/invisible-grills-tirupati   | `IG-TPT`            |
| Invisible Grills | Warangal   | https://invisprotect.in/lp/invisible-grills-warangal   | `IG-WGL`            |
| Invisible Grills | Hanamkonda | https://invisprotect.in/lp/invisible-grills-hanamkonda | `IG-HNK`            |
| Safety Nets      | Hyderabad  | https://invisprotect.in/lp/safety-nets-hyderabad       | `SN-HYD`            |
| Safety Nets      | Vizag      | https://invisprotect.in/lp/safety-nets-vizag           | `SN-VZG`            |
| Safety Nets      | Vijayawada | https://invisprotect.in/lp/safety-nets-vijayawada      | `SN-VJA`            |
| Safety Nets      | Amaravati  | https://invisprotect.in/lp/safety-nets-amaravati       | `SN-AMR`            |
| Safety Nets      | Tirupati   | https://invisprotect.in/lp/safety-nets-tirupati        | `SN-TPT`            |
| Safety Nets      | Warangal   | https://invisprotect.in/lp/safety-nets-warangal        | `SN-WGL`            |
| Safety Nets      | Hanamkonda | https://invisprotect.in/lp/safety-nets-hanamkonda      | `SN-HNK`            |
| Pigeon Nets      | Hyderabad  | https://invisprotect.in/lp/pigeon-nets-hyderabad       | `PN-HYD`            |
| Pigeon Nets      | Vizag      | https://invisprotect.in/lp/pigeon-nets-vizag           | `PN-VZG`            |
| Pigeon Nets      | Vijayawada | https://invisprotect.in/lp/pigeon-nets-vijayawada      | `PN-VJA`            |
| Pigeon Nets      | Amaravati  | https://invisprotect.in/lp/pigeon-nets-amaravati       | `PN-AMR`            |
| Pigeon Nets      | Tirupati   | https://invisprotect.in/lp/pigeon-nets-tirupati        | `PN-TPT`            |
| Pigeon Nets      | Warangal   | https://invisprotect.in/lp/pigeon-nets-warangal        | `PN-WGL`            |
| Pigeon Nets      | Hanamkonda | https://invisprotect.in/lp/pigeon-nets-hanamkonda      | `PN-HNK`            |

Lead references look like `IG-HYD-K7Q2M9XA`: the service code, the city code, then 8 random characters.

- Service codes: IG = Invisible Grills, SN = Safety Nets, PN = Pigeon Nets.
- City codes: HYD Hyderabad, VZG Vizag, VJA Vijayawada, AMR Amaravati, TPT Tirupati, WGL Warangal, HNK Hanamkonda.
- The `/consultation` page uses the prefix `WEB-`.

## Google Ads setup notes

- Use the final URL exactly as listed. Add tracking with an account-level tracking template, not in the final URL:

  ```text
  {lpurl}?utm_source=google&utm_medium=cpc&utm_campaign={_campaign}&utm_term={keyword}
  ```

  Set the `{_campaign}` custom parameter per campaign.

- The primary conversion fires on form submit, just before WhatsApp opens. Its `transaction_id` is the lead reference, so junk chats can be matched and retracted by order ID.
- Configure the Google Ads IDs in Vercel with `VITE_GADS_ACCOUNT_ID=AW-…` and `VITE_GADS_PRIMARY_LEAD_CONVERSION=AW-…/LABEL`, then redeploy.
