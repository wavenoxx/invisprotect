import assert from "node:assert/strict";
import test from "node:test";

import { createBrandConfig } from "../src/config/brand.ts";

test("brand config defaults to pending with no actionable contact links", () => {
  const config = createBrandConfig({});

  assert.equal(config.status, "pending");
  assert.equal(config.domain, "https://invisprotect.in");
  assert.equal(config.contact.enabled, false);
  assert.equal(config.contact.phoneHref, "");
  assert.equal(config.contact.whatsappLink, "");
  assert.equal(config.contact.emailHref, "");
});

test("brand config exposes normalized actions only for an active configured site", () => {
  const config = createBrandConfig({
    VITE_SITE_STATUS: "active",
    VITE_CONTACT_ENABLED: "true",
    VITE_BUSINESS_PHONE_DISPLAY: "+91 98765 43210",
    VITE_BUSINESS_PHONE_DIAL: "+919876543210",
    VITE_BUSINESS_WHATSAPP_DISPLAY: "+91 98765 43210",
    VITE_BUSINESS_WHATSAPP_DIAL: "919876543210",
    VITE_BUSINESS_EMAIL: "hello@example.com",
  });

  assert.equal(config.contact.enabled, true);
  assert.equal(config.contact.phoneHref, "tel:+919876543210");
  assert.equal(config.contact.whatsappLink, "https://wa.me/919876543210");
  assert.equal(config.contact.emailHref, "mailto:hello@example.com");
});

test("brand config never exposes malformed or partial contact actions", () => {
  const config = createBrandConfig({
    VITE_SITE_STATUS: "active",
    VITE_CONTACT_ENABLED: "true",
    VITE_BUSINESS_PHONE_DISPLAY: "Call us",
    VITE_BUSINESS_PHONE_DIAL: "",
    VITE_BUSINESS_WHATSAPP_LINK: "javascript:alert(1)",
    VITE_BUSINESS_EMAIL: "not-an-email",
  });

  assert.equal(config.contact.phoneHref, "");
  assert.equal(config.contact.whatsappLink, "");
  assert.equal(config.contact.emailHref, "");
  assert.equal(config.contact.enabled, false);
});

test("active mode remains safely disabled without both Call and WhatsApp", () => {
  const config = createBrandConfig({
    VITE_SITE_STATUS: "active",
    VITE_CONTACT_ENABLED: "true",
    VITE_BUSINESS_PHONE_DIAL: "+919876543210",
  });

  assert.equal(config.contact.phoneHref, "");
  assert.equal(config.contact.whatsappLink, "");
  assert.equal(config.contact.enabled, false);
});

test("a direct WhatsApp link must contain a valid destination number", () => {
  const invalid = createBrandConfig({
    VITE_SITE_STATUS: "active",
    VITE_CONTACT_ENABLED: "true",
    VITE_BUSINESS_PHONE_DIAL: "+919876543210",
    VITE_BUSINESS_WHATSAPP_LINK: "https://wa.me/",
  });
  const valid = createBrandConfig({
    VITE_SITE_STATUS: "active",
    VITE_CONTACT_ENABLED: "true",
    VITE_BUSINESS_PHONE_DIAL: "+919876543210",
    VITE_BUSINESS_WHATSAPP_LINK: "https://wa.me/919812345678",
  });

  assert.equal(invalid.contact.enabled, false);
  assert.equal(invalid.contact.whatsappLink, "");
  assert.equal(valid.contact.enabled, true);
  assert.equal(valid.contact.whatsappDisplay, "919812345678");
});
