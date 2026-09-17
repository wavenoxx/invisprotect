import assert from "node:assert/strict";
import test from "node:test";

import { captureAttribution } from "../src/lib/attribution.ts";
import { updateGoogleConsent } from "../src/lib/consent.ts";

const CONSENT_STORAGE_KEY = "consent_settings_v2";
const ATTRIBUTION_STORAGE_KEY = "attribution_data";

function consentValue(state: "granted" | "denied") {
  return JSON.stringify({
    ad_storage: state,
    analytics_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    timestamp: "2026-09-17T00:00:00.000Z",
  });
}

function installBrowserStorage(consent?: "granted" | "denied") {
  const values = new Map<string, string>();
  if (consent) values.set(CONSENT_STORAGE_KEY, consentValue(consent));
  const attributionWrites: string[] = [];

  Object.assign(globalThis, {
    window: {
      location: {
        search: "?utm_source=google&utm_medium=cpc&gclid=CONSENT-CLICK",
        href: "https://invisprotect.in/lp/invisible-grills-hyderabad?gclid=CONSENT-CLICK",
      },
    },
    document: { referrer: "https://www.google.com/" },
    localStorage: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => {
        values.set(key, value);
        if (key === ATTRIBUTION_STORAGE_KEY) attributionWrites.push(value);
      },
      removeItem: (key: string) => values.delete(key),
    },
  });

  return { attributionWrites, values };
}

test("attribution survives SPA navigation when browser storage is unavailable", () => {
  Object.assign(globalThis, {
    window: {
      location: {
        search:
          "?utm_source=google&utm_medium=cpc&utm_campaign=test&utm_term=invisible%20grills&utm_content=ad-a&gclid=CLICK-1&wbraid=WBRAID-1&gbraid=GBRAID-1",
        href: "https://invisprotect.in/lp/invisible-grills-hyderabad?gclid=CLICK-1",
      },
    },
    document: { referrer: "https://www.google.com/" },
    localStorage: {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("blocked");
      },
    },
  });

  const result = captureAttribution();

  assert.equal(result.gclid, "CLICK-1");
  assert.equal(result.utm_source, "google");
  assert.equal(result.utm_medium, "cpc");
  assert.equal(result.utm_campaign, "test");
  assert.equal(result.utm_term, "invisible grills");
  assert.equal(result.utm_content, "ad-a");
  assert.equal(result.wbraid, "WBRAID-1");
  assert.equal(result.gbraid, "GBRAID-1");
  assert.match(result.landing_page ?? "", /\/lp\/invisible-grills-hyderabad/);

  Object.assign(window.location, {
    search: "",
    href: "https://invisprotect.in/consultation",
  });
  const afterNavigation = captureAttribution();

  assert.equal(afterNavigation.gclid, "CLICK-1");
  assert.equal(afterNavigation.wbraid, "WBRAID-1");
  assert.equal(afterNavigation.gbraid, "GBRAID-1");
  assert.equal(afterNavigation.utm_campaign, "test");
  assert.match(afterNavigation.landing_page ?? "", /\/lp\/invisible-grills-hyderabad/);
});

test("attribution remains in memory without a consent choice and is not persisted", async () => {
  const { attributionWrites } = installBrowserStorage();
  const { captureAttribution: captureWithoutConsent } =
    await import("../src/lib/attribution.ts?no-consent");

  const landing = captureWithoutConsent();
  assert.equal(landing.gclid, "CONSENT-CLICK");
  assert.equal(attributionWrites.length, 0);

  Object.assign(window.location, {
    search: "",
    href: "https://invisprotect.in/consultation",
  });
  const formPayloadAttribution = captureWithoutConsent();
  assert.equal(formPayloadAttribution.gclid, "CONSENT-CLICK");
  assert.equal(formPayloadAttribution.utm_source, "google");
  assert.equal(attributionWrites.length, 0);
});

test("Essential Only does not persist attribution", async () => {
  const { attributionWrites, values } = installBrowserStorage("denied");
  values.set(ATTRIBUTION_STORAGE_KEY, JSON.stringify({ gclid: "STALE-CLICK" }));
  const { captureAttribution: captureDenied } =
    await import("../src/lib/attribution.ts?essential-only");

  assert.equal(captureDenied().gclid, "CONSENT-CLICK");
  assert.equal(attributionWrites.length, 0);
  assert.equal(values.has(ATTRIBUTION_STORAGE_KEY), false);
});

test("Accept All allows attribution persistence", async () => {
  const { attributionWrites, values } = installBrowserStorage();
  const { captureAttribution: captureGranted, persistCurrentAttribution } =
    await import("../src/lib/attribution.ts?accept-all");

  captureGranted();
  assert.equal(attributionWrites.length, 0);
  updateGoogleConsent(true);
  persistCurrentAttribution();
  assert.equal(attributionWrites.length, 1);
  assert.match(values.get(ATTRIBUTION_STORAGE_KEY) ?? "", /CONSENT-CLICK/);
});
