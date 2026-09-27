import assert from "node:assert/strict";
import test from "node:test";

function installWindow(gtag?: (...args: unknown[]) => void) {
  const storage = new Map<string, string>();
  Object.assign(globalThis, {
    window: {
      dataLayer: [],
      ...(gtag ? { gtag } : {}),
      sessionStorage: {
        getItem: (key: string) => storage.get(key) ?? null,
        setItem: (key: string, value: string) => storage.set(key, value),
      },
    },
  });
}

test("without a configured conversion the redirect runs immediately", async () => {
  delete process.env.VITE_GADS_ACCOUNT_ID;
  delete process.env.VITE_GADS_PRIMARY_LEAD_CONVERSION;
  const { trackConsultationLeadThen } = await import("../src/lib/analytics.ts?then-unconfigured");
  installWindow(() => undefined);
  let runs = 0;
  trackConsultationLeadThen({ leadId: "IG-HYD-AAAAAAAA" }, () => (runs += 1));
  assert.equal(runs, 1);
});

test("a configured conversion redirects once gtag confirms the hit, exactly once", async () => {
  process.env.VITE_GADS_ACCOUNT_ID = "AW-123456789";
  process.env.VITE_GADS_PRIMARY_LEAD_CONVERSION = "AW-123456789/TEST_LABEL";
  const { trackConsultationLeadThen } = await import("../src/lib/analytics.ts?then-configured");
  const calls: unknown[][] = [];
  installWindow((...args: unknown[]) => {
    calls.push(args);
    const params = args[2] as { event_callback?: () => void } | undefined;
    params?.event_callback?.();
  });

  let runs = 0;
  trackConsultationLeadThen({ leadId: "PN-VZG-BBBBBBBB" }, () => (runs += 1), 50);
  assert.equal(runs, 1);
  await new Promise((resolve) => setTimeout(resolve, 80));
  assert.equal(runs, 1, "the timeout must not run the redirect a second time");

  const conversion = calls.find(
    ([command, event]) => command === "event" && event === "conversion",
  );
  const params = conversion?.[2] as Record<string, unknown>;
  assert.equal(params.send_to, "AW-123456789/TEST_LABEL");
  assert.equal(params.transaction_id, "PN-VZG-BBBBBBBB");
  assert.equal(typeof params.event_callback, "function");
});

test("a blocked Google tag still redirects after the timeout", async () => {
  process.env.VITE_GADS_ACCOUNT_ID = "AW-123456789";
  process.env.VITE_GADS_PRIMARY_LEAD_CONVERSION = "AW-123456789/TEST_LABEL";
  const { trackConsultationLeadThen } = await import("../src/lib/analytics.ts?then-blocked");
  installWindow(() => undefined);

  let runs = 0;
  trackConsultationLeadThen({ leadId: "SN-TPT-CCCCCCCC" }, () => (runs += 1), 30);
  assert.equal(runs, 0);
  await new Promise((resolve) => setTimeout(resolve, 60));
  assert.equal(runs, 1);
});
