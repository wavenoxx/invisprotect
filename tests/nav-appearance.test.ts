import assert from "node:assert/strict";
import test from "node:test";

import { resolveNavTone } from "../src/lib/nav-appearance.ts";

test("nav tone resolves to light-on-image for overlay appearance when unscrolled", () => {
  assert.equal(resolveNavTone("overlay", false), "light-on-image");
});

test("nav tone resolves to dark-on-cream for overlay appearance when scrolled", () => {
  assert.equal(resolveNavTone("overlay", true), "dark-on-cream");
});

test("nav tone resolves to dark-on-cream for solid appearance when unscrolled", () => {
  assert.equal(resolveNavTone("solid", false), "dark-on-cream");
});

test("nav tone resolves to dark-on-cream for solid appearance when scrolled", () => {
  assert.equal(resolveNavTone("solid", true), "dark-on-cream");
});
