import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";

import {
  PAID_CITY_KEYS,
  PAID_SERVICE_KEYS,
  buildWhatsAppHref,
  getPaidLandingPage,
  paidLandingPages,
} from "../src/data/paidLandingPages.ts";
import { isApprovedServiceId } from "../src/data/serviceIds.ts";

test("paid landing pages cover 8 services x 7 cities and keep the original IDs", () => {
  assert.equal(PAID_SERVICE_KEYS.length, 8);
  assert.equal(PAID_CITY_KEYS.length, 7);
  assert.equal(Object.keys(paidLandingPages).length, 56);
  assert.equal(
    getPaidLandingPage("invisible-grills-hyderabad")?.serviceId,
    "balcony-invisible-grills",
  );
  assert.equal(getPaidLandingPage("safety-nets-hyderabad")?.city, "Hyderabad");
  assert.equal(getPaidLandingPage("pigeon-nets-vizag")?.headline, "Pigeon Nets in Vizag");
  assert.equal(getPaidLandingPage("bird-spikes-hyderabad")?.serviceId, "pigeons-bird-spikes");
  assert.equal(
    getPaidLandingPage("monkey-nets-tirupati")?.headline,
    "Monkey Safety Nets in Tirupati",
  );
  assert.equal(getPaidLandingPage("mosquito-nets-vijayawada")?.whatsappRef, "MQ-VJA");
  assert.equal(
    getPaidLandingPage("cloth-drying-hangers-warangal")?.serviceId,
    "cloth-drying-hangers",
  );
  assert.equal(
    getPaidLandingPage("cricket-nets-vizag")?.headline,
    "Cricket Practice Nets in Vizag",
  );
  assert.equal(getPaidLandingPage("unknown"), undefined);
  assert.equal(getPaidLandingPage("toString"), undefined);
});

test("every paid landing page is complete, city-specific and uses an approved service", () => {
  const refs = new Set<string>();
  for (const page of Object.values(paidLandingPages)) {
    assert.ok(isApprovedServiceId(page.serviceId), page.id);
    assert.ok(page.headline.endsWith(`in ${page.city}`), page.id);
    assert.ok(page.localities.length >= 8, page.id);
    assert.equal(page.faqs.length, 5, page.id);
    assert.equal(page.faqs[0].question, "How is the price decided?", page.id);
    assert.equal(page.faqs[4].question, "Who installs and who gives the warranty?", page.id);
    for (const faq of page.faqs) {
      assert.ok(!faq.question.includes("{city}") && !faq.answer.includes("{city}"), page.id);
    }
    assert.ok(page.localNote.length > 20, page.id);
    assert.ok(page.benefitsIntro.length > 20, page.id);
    assert.equal(page.benefits.length, 4, page.id);
    assert.equal(page.buyerChecklist.length, 4, page.id);
    assert.equal(page.needOptions.length, 4, page.id);
    assert.match(page.whatsappRef, /^(IG|SN|PN|BS|MK|MQ|CH|CN)-[A-Z]{3}$/);
    assert.ok(!refs.has(page.whatsappRef), `duplicate ref ${page.whatsappRef}`);
    refs.add(page.whatsappRef);
  }
});

test("paid pages disclose the referral model and ask consent to share with one installer", () => {
  for (const page of Object.values(paidLandingPages)) {
    assert.match(page.disclosure, /referral service/);
    assert.match(page.disclosure, /installer gives the final quote/);
    assert.match(page.consentText, /one checked installer/);
    assert.ok(page.consentVersion.length <= 40);
    const copy = JSON.stringify(page).toLowerCase();
    for (const banned of [
      "our technicians",
      "in-house",
      "our team",
      "our warranty",
      "5-year",
      "illustrative",
    ]) {
      assert.ok(!copy.includes(banned), `${page.id} contains "${banned}"`);
    }
  }
});

test("paid pages never show prices — each installer sets their own", () => {
  for (const page of Object.values(paidLandingPages)) {
    const copy = JSON.stringify(page);
    assert.ok(!copy.includes("₹"), `${page.id} shows a rupee amount`);
    assert.ok(!/per sq\.? ?ft/i.test(copy), `${page.id} shows a per-sq-ft rate`);
    assert.ok(page.quoteFactors.length >= 4, page.id);
  }
});

test("every hero and closing image exists as .webp and .jpg", () => {
  const heroPath = /^\/images\/(homepage\/banner-\d+|paid\/[a-z-]+)-(mobile|desktop)$/;
  for (const page of Object.values(paidLandingPages)) {
    for (const image of [page.hero, page.closingImage]) {
      for (const base of [image.mobile, image.desktop]) {
        assert.match(base, heroPath, page.id);
        for (const ext of ["webp", "jpg"]) {
          assert.ok(existsSync(`public${base}.${ext}`), `${page.id}: missing public${base}.${ext}`);
        }
      }
      assert.ok(image.alt.length > 10, page.id);
    }
  }
});

test("WhatsApp links carry a prefilled message with a source tag", () => {
  const href = buildWhatsAppHref("https://wa.me/917075870054", "Hi, I need nets", "PN-HYD");
  const url = new URL(href);
  assert.equal(url.hostname, "wa.me");
  assert.equal(url.searchParams.get("text"), "Hi, I need nets [ref PN-HYD]");
  assert.equal(buildWhatsAppHref("", "x"), "");
});
