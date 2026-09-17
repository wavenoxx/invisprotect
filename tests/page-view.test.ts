import assert from "node:assert/strict";
import test from "node:test";

test("manual page views dispatch once per unique location", async () => {
  process.env.VITE_GADS_ACCOUNT_ID = "AW-123456789";
  const { trackPageView } = await import("../src/lib/analytics.ts?page-view-test");
  const calls: unknown[][] = [];
  const dataLayer: Array<Record<string, unknown> | unknown[]> = [];

  Object.assign(globalThis, {
    window: {
      dataLayer,
      gtag: (...args: unknown[]) => calls.push(args),
    },
    document: { title: "Landing" },
  });

  trackPageView("https://invisprotect.in/lp/invisible-grills-hyderabad", "Landing");
  trackPageView("https://invisprotect.in/lp/invisible-grills-hyderabad", "Landing");
  trackPageView("https://invisprotect.in/privacy", "Privacy");

  assert.equal(
    calls.filter(([command, event]) => command === "event" && event === "page_view").length,
    2,
  );
  assert.equal(
    dataLayer.filter(
      (entry) => !Array.isArray(entry) && (entry as Record<string, unknown>).event === "page_view",
    ).length,
    0,
  );
});
