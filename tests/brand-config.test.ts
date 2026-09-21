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

test("brand config provides valid default social channels", () => {
  const config = createBrandConfig({});

  assert.equal(config.socials.instagram, "https://www.instagram.com/invisprotect");
  assert.equal(config.socials.facebook, "https://www.facebook.com/share/1HbM6NCtiM/");
  assert.equal(config.socials.youtube, "https://www.youtube.com/@invisprotect");
});

test("brand config accepts valid custom social overrides", () => {
  const config = createBrandConfig({
    VITE_SOCIAL_INSTAGRAM_URL: "https://instagram.com/custom_invis",
    VITE_SOCIAL_FACEBOOK_URL: "https://www.facebook.com/custompage",
    VITE_SOCIAL_YOUTUBE_URL: "https://www.youtube.com/@customchannel",
  });

  assert.equal(config.socials.instagram, "https://instagram.com/custom_invis");
  assert.equal(config.socials.facebook, "https://www.facebook.com/custompage");
  assert.equal(config.socials.youtube, "https://www.youtube.com/@customchannel");
});

test("brand config rejects non-https and disallowed hosts for social channels", () => {
  const insecure = createBrandConfig({
    VITE_SOCIAL_INSTAGRAM_URL: "http://www.instagram.com/invisprotect",
    VITE_SOCIAL_FACEBOOK_URL: "javascript:alert(1)",
    VITE_SOCIAL_YOUTUBE_URL: "https://phishing-youtube.com/@invisprotect",
  });

  assert.equal(insecure.socials.instagram, "");
  assert.equal(insecure.socials.facebook, "");
  assert.equal(insecure.socials.youtube, "");
});

test("brand config allows explicitly disabling a social channel with empty string", () => {
  const disabled = createBrandConfig({
    VITE_SOCIAL_INSTAGRAM_URL: "",
    VITE_SOCIAL_FACEBOOK_URL: "",
    VITE_SOCIAL_YOUTUBE_URL: "",
  });

  assert.equal(disabled.socials.instagram, "");
  assert.equal(disabled.socials.facebook, "");
  assert.equal(disabled.socials.youtube, "");
});
