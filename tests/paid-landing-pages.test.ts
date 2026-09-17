import assert from "node:assert/strict";
import test from "node:test";

import { getPaidLandingPage, paidLandingPages } from "../src/data/paidLandingPages.ts";

test("paid landing configuration seeds the two approved Hyderabad campaigns", () => {
  assert.deepEqual(Object.keys(paidLandingPages).sort(), [
    "invisible-grills-hyderabad",
    "safety-nets-hyderabad",
  ]);
  assert.equal(
    getPaidLandingPage("invisible-grills-hyderabad")?.serviceId,
    "balcony-invisible-grills",
  );
  assert.equal(getPaidLandingPage("safety-nets-hyderabad")?.city, "Hyderabad");
  assert.equal(getPaidLandingPage("unknown"), undefined);
});
