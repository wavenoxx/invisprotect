import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import test from "node:test";

import { BRAND_CONFIG } from "../src/config/brand.ts";
import { BUSINESS, HUB_COUNT, SERVICE_HUBS } from "../src/config/business.ts";

const STATES = ["Telangana", "Andhra Pradesh", "Karnataka", "Maharashtra", "Tamil Nadu", "Kerala"];

const ROOT = new URL("..", import.meta.url).pathname;

function filesUnder(dir: string, exts: string[]): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      if (name === "node_modules" || name === "images") continue;
      out.push(...filesUnder(path, exts));
    } else if (exts.some((ext) => name.endsWith(ext))) {
      out.push(path);
    }
  }
  return out;
}

test("coverage config names all 6 states and 20 city hubs", () => {
  for (const state of STATES) {
    assert.ok(BUSINESS.regionLabel.includes(state), `regionLabel is missing ${state}`);
  }
  assert.equal(HUB_COUNT, 20);
  assert.deepEqual(new Set(SERVICE_HUBS.map((hub) => hub.state)), new Set(STATES));
});

test("site description (homepage meta, og and schema) uses the full coverage", () => {
  assert.ok(
    BRAND_CONFIG.description.includes(BUSINESS.regionLabel),
    "BRAND_CONFIG.description must be built from BUSINESS.regionLabel",
  );
});

test("no page, meta tag or public file still says the old two-state / 7-city coverage", () => {
  const banned = [
    /Telangana\s*(&|and)\s*Andhra Pradesh/i,
    /Andhra Pradesh\s*(&|and)\s*Telangana/i,
    /\b(7|seven)\s+(cities|city hubs|hubs)\b/i,
  ];
  const files = [
    ...filesUnder(join(ROOT, "src"), [".ts", ".tsx"]),
    ...filesUnder(join(ROOT, "public"), [".xml", ".txt", ".json", ".webmanifest", ".html"]),
  ].filter((file) => !file.endsWith(".test.ts"));

  const hits: string[] = [];
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    for (const pattern of banned) {
      const match = text.match(pattern);
      if (match) hits.push(`${relative(ROOT, file)}: "${match[0]}"`);
    }
  }
  assert.deepEqual(hits, [], `Old coverage copy found:\n${hits.join("\n")}`);
});

test("every sitemap URL has a lastmod date", () => {
  const sitemap = readFileSync(join(ROOT, "public", "sitemap.xml"), "utf8");
  const urls = sitemap.match(/<url>[\s\S]*?<\/url>/g) ?? [];
  assert.ok(urls.length > 0);
  for (const url of urls) {
    assert.match(url, /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/, `Missing lastmod in ${url}`);
  }
  assert.ok(sitemap.includes("<loc>https://invisprotect.in/</loc>"));
  assert.ok(sitemap.includes("<loc>https://invisprotect.in/service-areas</loc>"));
});
