import assert from "node:assert/strict";
import test from "node:test";

test("configured primary conversion uses the persisted ID and fires once", async () => {
  process.env.VITE_GADS_ACCOUNT_ID = "AW-123456789";
  process.env.VITE_GADS_PRIMARY_LEAD_CONVERSION = "AW-123456789/TEST_LABEL";
  const { trackConsultationLead } = await import("../src/lib/analytics.ts?primary-conversion-test");
  const calls: unknown[][] = [];
  const storage = new Map<string, string>();

  Object.assign(globalThis, {
    window: {
      dataLayer: [],
      gtag: (...args: unknown[]) => calls.push(args),
      sessionStorage: {
        getItem: (key: string) => storage.get(key) ?? null,
        setItem: (key: string, value: string) => storage.set(key, value),
      },
    },
  });

  const leadId = "6d260f82-1777-4ab8-b3a2-bb50609345de";
  trackConsultationLead({
    leadId,
    landingId: "invisible-grills-hyderabad",
    service: "balcony-invisible-grills",
  });
  trackConsultationLead({ leadId });

  const conversions = calls.filter(
    ([command, event]) => command === "event" && event === "conversion",
  );
  assert.equal(conversions.length, 1);
  assert.deepEqual(conversions[0]?.[2], {
    send_to: "AW-123456789/TEST_LABEL",
    transaction_id: leadId,
  });
  assert.equal(JSON.stringify(conversions).includes("phone"), false);
  assert.equal(JSON.stringify(conversions).includes("email"), false);
  assert.equal(JSON.stringify(conversions).includes("value"), false);
});
