import assert from "node:assert/strict";
import test from "node:test";

import { captureAttribution } from "../src/lib/attribution.ts";

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
