import assert from "node:assert/strict";
import test from "node:test";

import { readStoredConsent } from "../src/lib/consent.ts";

test("only a complete valid saved choice suppresses the consent prompt", () => {
  const values = new Map<string, string>();
  Object.assign(globalThis, {
    window: {},
    localStorage: {
      getItem: (key: string) => values.get(key) ?? null,
    },
  });

  values.set("consent_settings_v2", "not-json");
  assert.equal(readStoredConsent(), null);

  values.set("consent_settings_v2", JSON.stringify({ ad_storage: "granted" }));
  assert.equal(readStoredConsent(), null);

  values.set(
    "consent_settings_v2",
    JSON.stringify({
      ad_storage: "denied",
      analytics_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      timestamp: "2026-09-16T00:00:00.000Z",
    }),
  );
  assert.equal(readStoredConsent()?.ad_storage, "denied");
});
