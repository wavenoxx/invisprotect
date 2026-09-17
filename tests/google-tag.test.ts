import assert from "node:assert/strict";
import test from "node:test";
import { runInNewContext } from "node:vm";

import { getGoogleTagHeadScripts } from "../src/lib/google-tag.ts";

test("Google tag scripts establish consent before loading the external tag", () => {
  const scripts = getGoogleTagHeadScripts("AW-123456789");

  assert.equal(scripts.length, 2);
  assert.match(String(scripts[0]?.children), /consent.*default/s);
  assert.match(String(scripts[0]?.children), /__invisprotectConsentBootstrapped/);
  assert.equal(scripts[1]?.src, undefined);
  assert.match(
    String(scripts[1]?.children),
    /https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=AW-123456789/,
  );
  assert.match(String(scripts[1]?.children), /send_page_view:false/);
  assert.match(String(scripts[1]?.children), /__invisprotectGtagConfigured/);
});

test("missing or malformed account IDs do not load the external Google tag", () => {
  assert.equal(getGoogleTagHeadScripts("").length, 1);
  assert.equal(getGoogleTagHeadScripts("GTM-ABC").length, 1);
});

test("partial or malformed saved consent cannot grant storage before the tag loads", () => {
  const bootstrap = String(getGoogleTagHeadScripts("AW-123456789")[0]?.children);
  const context = {
    window: {} as Record<string, unknown>,
    localStorage: {
      getItem: () => JSON.stringify({ ad_storage: "granted" }),
    },
    Object,
    JSON,
  };

  runInNewContext(bootstrap, context);
  runInNewContext(bootstrap, context);

  const commands = (context.window.dataLayer as Array<ArrayLike<unknown>>) || [];
  assert.equal(commands.length, 3, "bootstrap commands must only be queued once");
  assert.equal((commands[0]?.[2] as { ad_storage?: string }).ad_storage, "denied");
  assert.equal((commands[0]?.[2] as { analytics_storage?: string }).analytics_storage, "denied");
});
