import assert from "node:assert/strict";
import test from "node:test";
import { buildConsultationWhatsappUrl, createLeadRef } from "./consultation-whatsapp.ts";

const whatsappBaseUrl = "https://wa.me/917075870054";

test("builds an encoded WhatsApp quote request with human-readable service names", () => {
  const url = buildConsultationWhatsappUrl(whatsappBaseUrl, {
    name: "Anand Varma",
    mobile: "9876543210",
    serviceNames: ["Balcony Invisible Grills", "Pigeon Protection Nets"],
    localityCity: "Jubilee Hills, Hyderabad",
    pincode: "500033",
    notes: "14th-floor curved balcony",
  });

  const parsedUrl = new URL(url);
  assert.equal(`${parsedUrl.origin}${parsedUrl.pathname}`, whatsappBaseUrl);
  assert.equal(
    parsedUrl.searchParams.get("text"),
    [
      "Hello InvisProtect,",
      "",
      "I would like to request a quote / site survey.",
      "",
      "Name: Anand Varma",
      "Mobile: 9876543210",
      "Service: Balcony Invisible Grills, Pigeon Protection Nets",
      "Location: Jubilee Hills, Hyderabad",
      "Pincode: 500033",
      "Requirement: 14th-floor curved balcony",
      "",
      "Please contact me with the quotation / site survey details.",
    ].join("\n"),
  );
});

test("adds the lead reference line only when a reference is given", () => {
  const url = buildConsultationWhatsappUrl(whatsappBaseUrl, {
    name: "Anand Varma",
    mobile: "9876543210",
    serviceNames: ["Invisible Grills"],
    localityCity: "Kondapur, Hyderabad",
    pincode: "500084",
    notes: "Need: Balcony",
    reference: "IG-HYD-K7Q2M9XA",
  });
  const text = new URL(url).searchParams.get("text") ?? "";
  assert.ok(text.includes("\nRef: IG-HYD-K7Q2M9XA\n"));
});

test("lead references are short, prefixed and use unambiguous characters", () => {
  const ref = createLeadRef("ig-hyd", () => new Uint8Array([0, 1, 2, 3, 4, 5, 6, 31]));
  assert.equal(ref, "IG-HYD-ABCDEFG9");
  const random = createLeadRef("PN-VZG");
  assert.match(random, /^PN-VZG-[A-HJ-NP-Z2-9]{8}$/);
  assert.notEqual(createLeadRef("X"), createLeadRef("X"));
});

test("uses Not specified when quote request notes are empty", () => {
  const url = buildConsultationWhatsappUrl(whatsappBaseUrl, {
    name: "Anand Varma",
    mobile: "9876543210",
    serviceNames: ["Window Invisible Grills"],
    localityCity: "Hyderabad",
    pincode: "500033",
    notes: "   ",
  });

  assert.equal(new URL(url).searchParams.get("text")?.includes("Requirement: Not specified"), true);
});
