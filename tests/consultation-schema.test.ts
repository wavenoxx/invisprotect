import assert from "node:assert/strict";
import test from "node:test";

import { ConsultationInputSchema, normalizeIndianPhone } from "../src/lib/consultation-schema.ts";

test("Indian phone numbers are normalized for persistence", () => {
  assert.equal(normalizeIndianPhone("98765 43210"), "+919876543210");
  assert.equal(normalizeIndianPhone("+91 98765-43210"), "+919876543210");
  assert.equal(normalizeIndianPhone("12345"), null);
});

test("paid lead input requires explicit contact consent and a six-digit pincode", () => {
  const base = {
    name: "Asha Rao",
    phone: "9876543210",
    city_hub: "Kondapur, Hyderabad",
    pincode: "500084",
    services: ["balcony-invisible-grills"],
    contact_consent: true,
    landing_id: "invisible-grills-hyderabad",
    form_variant: "paid-short-v1",
  };

  assert.equal(ConsultationInputSchema.safeParse(base).success, true);
  assert.equal(
    ConsultationInputSchema.safeParse({ ...base, contact_consent: false }).success,
    false,
  );
  assert.equal(ConsultationInputSchema.safeParse({ ...base, pincode: "5000" }).success, false);
  assert.equal(
    ConsultationInputSchema.safeParse({ ...base, services: ["not-an-invisprotect-service"] })
      .success,
    false,
  );
});
