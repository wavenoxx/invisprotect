import assert from "node:assert/strict";
import test from "node:test";

import { trackConsultationLead } from "../src/lib/analytics.ts";

test("a persisted lead emits one primary event with no artificial value", () => {
  const dataLayer: Array<Record<string, unknown> | unknown[]> = [];
  const storage = new Map<string, string>();
  Object.assign(globalThis, {
    window: {
      dataLayer,
      sessionStorage: {
        getItem: (key: string) => storage.get(key) ?? null,
        setItem: (key: string, value: string) => storage.set(key, value),
      },
    },
    document: { title: "Landing" },
  });

  const lead = {
    leadId: "lead-test-dedup-1",
    city: "Hyderabad",
    service: "balcony-invisible-grills",
    landingId: "invisible-grills-hyderabad",
    campaign: "search-test",
  };

  trackConsultationLead(lead);
  trackConsultationLead(lead);

  const events = dataLayer.filter(
    (entry): entry is Record<string, unknown> =>
      !Array.isArray(entry) && entry.event === "consultation_submission",
  );
  assert.equal(events.length, 1);
  assert.equal(events[0]?.transaction_id, lead.leadId);
  assert.equal("value" in events[0]!, false);
  assert.equal(events[0]?.landing_id, lead.landingId);
  assert.equal("phone" in events[0]!, false);
  assert.equal(storage.get(`gads_primary_lead:${lead.leadId}`), "1");
});
