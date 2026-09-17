import assert from "node:assert/strict";
import test from "node:test";
import { buildConsultationWhatsappUrl } from "./consultation-whatsapp.ts";

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
