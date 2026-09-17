import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const migration = readFileSync(
  new URL("../supabase/migrations/20260916_lead_lifecycle_and_attribution.sql", import.meta.url),
  "utf8",
);

test("lifecycle migration preserves unknown legacy status before applying its constraint", () => {
  assert.match(migration, /legacy_status text/i);
  assert.match(migration, /status NOT IN\s*\(/i);
  assert.match(
    migration,
    /legacy_status\s*=\s*COALESCE\(legacy_status,\s*status\)[\s\S]*status\s*=\s*'new'/i,
  );
});

test("lead creation is serialized per normalized phone inside the database", () => {
  assert.match(migration, /CREATE OR REPLACE FUNCTION public\.create_consultation_if_not_recent/i);
  assert.match(migration, /pg_advisory_xact_lock/i);
  assert.match(migration, /REVOKE ALL ON FUNCTION public\.create_consultation_if_not_recent/i);
  assert.match(
    migration,
    /GRANT EXECUTE ON FUNCTION public\.create_consultation_if_not_recent[\s\S]*service_role/i,
  );
});

test("public roles cannot read or mutate lead or history data", () => {
  assert.match(migration, /REVOKE ALL ON public\.consultations FROM anon, authenticated/i);
  assert.match(
    migration,
    /REVOKE ALL ON public\.consultation_status_history FROM anon, authenticated/i,
  );
});
