import assert from "node:assert/strict";
import test from "node:test";

import {
  PAID_CITY_KEYS,
  PAID_SERVICE_KEYS,
  buildWhatsAppHref,
  getPaidLandingPage,
  paidLandingPages,
} from "../src/data/paidLandingPages.ts";
import { isApprovedServiceId } from "../src/data/serviceIds.ts";

test("paid landing pages cover 3 services x 7 cities and keep the original Hyderabad IDs", () => {
  assert.equal(PAID_SERVICE_KEYS.length, 3);
  assert.equal(PAID_CITY_KEYS.length, 7);
  assert.equal(Object.keys(paidLandingPages).length, 21);
  assert.equal(
    getPaidLandingPage("invisible-grills-hyderabad")?.serviceId,
    "balcony-invisible-grills",
  );
  assert.equal(getPaidLandingPage("safety-nets-hyderabad")?.city, "Hyderabad");
  assert.equal(getPaidLandingPage("pigeon-nets-vizag")?.headline, "Pigeon Nets in Vizag");
  assert.equal(getPaidLandingPage("unknown"), undefined);
  assert.equal(getPaidLandingPage("toString"), undefined);
});

test("every paid landing page is complete, city-specific and uses an approved service", () => {
  for (const page of Object.values(paidLandingPages)) {
    assert.ok(isApprovedServiceId(page.serviceId), page.id);
    assert.ok(page.headline.endsWith(`in ${page.city}`), page.id);
    assert.ok(page.localities.length >= 8, page.id);
    assert.equal(page.faqs.length, 5, page.id);
    for (const faq of page.faqs) {
      assert.ok(!faq.question.includes("{city}") && !faq.answer.includes("{city}"), page.id);
    }
    assert.ok(page.localNote.length > 20, page.id);
    assert.match(page.whatsappRef, /^(IG|SN|PN)-[A-Z]{3}$/);
  }
});

test("paid pages disclose the referral model and ask consent to share with one installer", () => {
  for (const page of Object.values(paidLandingPages)) {
    assert.match(page.disclosure, /referral service/);
    assert.match(page.disclosure, /installer gives the final quote/);
    assert.match(page.consentText, /one checked installer/);
    assert.ok(page.consentVersion.length <= 40);
    const copy = JSON.stringify(page).toLowerCase();
    for (const banned of ["our technicians", "in-house", "our team", "our warranty", "5-year"]) {
      assert.ok(!copy.includes(banned), `${page.id} contains "${banned}"`);
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
