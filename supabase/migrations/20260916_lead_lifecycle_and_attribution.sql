-- Lead lifecycle, paid-landing attribution, and server-owned status history.
-- Additive migration: existing consultation rows and revenue values are preserved.

ALTER TABLE public.consultations
  ADD COLUMN IF NOT EXISTS landing_id text,
  ADD COLUMN IF NOT EXISTS form_variant text,
  ADD COLUMN IF NOT EXISTS contact_consent boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS contacted_at timestamptz,
  ADD COLUMN IF NOT EXISTS qualified_at timestamptz,
  ADD COLUMN IF NOT EXISTS survey_booked_at timestamptz,
  ADD COLUMN IF NOT EXISTS quoted_at timestamptz,
  ADD COLUMN IF NOT EXISTS won_at timestamptz,
  ADD COLUMN IF NOT EXISTS lost_at timestamptz,
  ADD COLUMN IF NOT EXISTS lost_reason text,
  ADD COLUMN IF NOT EXISTS legacy_status text;

-- Preserve any unexpected legacy value before normalizing it. This allows the
-- lifecycle check to be installed safely on an already-populated table.
UPDATE public.consultations
SET
  legacy_status = COALESCE(legacy_status, status),
  status = 'new'
WHERE status IS NULL
   OR status NOT IN ('new', 'contacted', 'qualified', 'survey_booked', 'quoted', 'won', 'lost', 'invalid');

ALTER TABLE public.consultations
  ALTER COLUMN status SET DEFAULT 'new';

ALTER TABLE public.consultations
  DROP CONSTRAINT IF EXISTS consultations_status_check;

ALTER TABLE public.consultations
  ADD CONSTRAINT consultations_status_check
  CHECK (status IN ('new', 'contacted', 'qualified', 'survey_booked', 'quoted', 'won', 'lost', 'invalid'));

CREATE INDEX IF NOT EXISTS consultations_phone_created_at_idx
  ON public.consultations (phone, created_at DESC);

CREATE INDEX IF NOT EXISTS consultations_status_updated_at_idx
  ON public.consultations (status, updated_at DESC);

CREATE TABLE IF NOT EXISTS public.consultation_status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  consultation_id uuid NOT NULL REFERENCES public.consultations(id) ON DELETE CASCADE,
  from_status text,
  to_status text NOT NULL,
  changed_at timestamptz NOT NULL DEFAULT now(),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  CONSTRAINT consultation_status_history_from_status_check
    CHECK (from_status IS NULL OR from_status IN ('new', 'contacted', 'qualified', 'survey_booked', 'quoted', 'won', 'lost', 'invalid')),
  CONSTRAINT consultation_status_history_to_status_check
    CHECK (to_status IN ('new', 'contacted', 'qualified', 'survey_booked', 'quoted', 'won', 'lost', 'invalid'))
);

CREATE INDEX IF NOT EXISTS consultation_status_history_lead_changed_idx
  ON public.consultation_status_history (consultation_id, changed_at DESC);

INSERT INTO public.consultation_status_history (consultation_id, from_status, to_status, metadata)
SELECT
  c.id,
  NULL,
  c.status,
  jsonb_strip_nulls(
    jsonb_build_object(
      'event', 'migration_backfill',
      'backfilled', true,
      'legacy_status', c.legacy_status
    )
  )
FROM public.consultations AS c
WHERE NOT EXISTS (
  SELECT 1
  FROM public.consultation_status_history AS h
  WHERE h.consultation_id = c.id
);

CREATE OR REPLACE FUNCTION public.sync_consultation_lifecycle_timestamps()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at := now();

  IF TG_OP = 'INSERT' THEN
    CASE NEW.status
      WHEN 'contacted' THEN NEW.contacted_at := COALESCE(NEW.contacted_at, now());
      WHEN 'qualified' THEN NEW.qualified_at := COALESCE(NEW.qualified_at, now());
      WHEN 'survey_booked' THEN NEW.survey_booked_at := COALESCE(NEW.survey_booked_at, now());
      WHEN 'quoted' THEN NEW.quoted_at := COALESCE(NEW.quoted_at, now());
      WHEN 'won' THEN NEW.won_at := COALESCE(NEW.won_at, now());
      WHEN 'lost' THEN NEW.lost_at := COALESCE(NEW.lost_at, now());
      ELSE NULL;
    END CASE;
  ELSIF NEW.status IS DISTINCT FROM OLD.status THEN
    CASE NEW.status
      WHEN 'contacted' THEN NEW.contacted_at := COALESCE(NEW.contacted_at, now());
      WHEN 'qualified' THEN NEW.qualified_at := COALESCE(NEW.qualified_at, now());
      WHEN 'survey_booked' THEN NEW.survey_booked_at := COALESCE(NEW.survey_booked_at, now());
      WHEN 'quoted' THEN NEW.quoted_at := COALESCE(NEW.quoted_at, now());
      WHEN 'won' THEN NEW.won_at := COALESCE(NEW.won_at, now());
      WHEN 'lost' THEN NEW.lost_at := COALESCE(NEW.lost_at, now());
      ELSE NULL;
    END CASE;
  END IF;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.record_consultation_status_history()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.consultation_status_history (consultation_id, from_status, to_status, metadata)
    VALUES (NEW.id, NULL, NEW.status, '{"event": "lead_created"}'::jsonb);
  ELSIF NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO public.consultation_status_history (consultation_id, from_status, to_status)
    VALUES (NEW.id, OLD.status, NEW.status);
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS consultations_sync_lifecycle_timestamps ON public.consultations;
CREATE TRIGGER consultations_sync_lifecycle_timestamps
  BEFORE INSERT OR UPDATE ON public.consultations
  FOR EACH ROW EXECUTE FUNCTION public.sync_consultation_lifecycle_timestamps();

DROP TRIGGER IF EXISTS consultations_record_status_history ON public.consultations;
CREATE TRIGGER consultations_record_status_history
  AFTER INSERT OR UPDATE OF status ON public.consultations
  FOR EACH ROW EXECUTE FUNCTION public.record_consultation_status_history();

-- Serialize the duplicate check and insert by normalized phone inside one
-- database transaction. Only the service role can execute this function.
CREATE OR REPLACE FUNCTION public.create_consultation_if_not_recent(p_lead jsonb)
RETURNS TABLE (lead_id uuid, was_created boolean)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_phone text;
  v_services jsonb;
  v_lead_id uuid;
BEGIN
  IF p_lead IS NULL OR jsonb_typeof(p_lead) <> 'object' THEN
    RAISE EXCEPTION 'Invalid consultation payload' USING ERRCODE = '22023';
  END IF;

  v_phone := NULLIF(btrim(p_lead->>'phone'), '');
  v_services := p_lead->'services';

  IF v_phone IS NULL OR v_phone !~ '^\+91[6-9][0-9]{9}$' THEN
    RAISE EXCEPTION 'Invalid normalized phone' USING ERRCODE = '22023';
  END IF;
  IF length(btrim(COALESCE(p_lead->>'name', ''))) NOT BETWEEN 2 AND 120 THEN
    RAISE EXCEPTION 'Invalid name' USING ERRCODE = '22023';
  END IF;
  IF length(btrim(COALESCE(p_lead->>'city_hub', ''))) NOT BETWEEN 2 AND 100 THEN
    RAISE EXCEPTION 'Invalid locality' USING ERRCODE = '22023';
  END IF;
  IF COALESCE(p_lead->>'pincode', '') !~ '^[1-9][0-9]{5}$' THEN
    RAISE EXCEPTION 'Invalid pincode' USING ERRCODE = '22023';
  END IF;
  IF jsonb_typeof(v_services) IS DISTINCT FROM 'array' THEN
    RAISE EXCEPTION 'Invalid services' USING ERRCODE = '22023';
  END IF;
  IF jsonb_array_length(v_services) NOT BETWEEN 1 AND 10 THEN
    RAISE EXCEPTION 'Invalid services' USING ERRCODE = '22023';
  END IF;
  IF COALESCE(p_lead->>'contact_consent', 'false') <> 'true' THEN
    RAISE EXCEPTION 'Contact consent is required' USING ERRCODE = '22023';
  END IF;

  PERFORM pg_advisory_xact_lock(hashtextextended(v_phone, 0));

  IF EXISTS (
    SELECT 1
    FROM public.consultations AS c
    WHERE c.phone = v_phone
      AND c.created_at >= now() - interval '10 minutes'
  ) THEN
    lead_id := NULL;
    was_created := false;
    RETURN NEXT;
    RETURN;
  END IF;

  INSERT INTO public.consultations (
    name,
    phone,
    city_hub,
    pincode,
    services,
    notes,
    status,
    source,
    medium,
    campaign,
    term,
    content,
    landing_page,
    referrer,
    gclid,
    wbraid,
    gbraid,
    consent_version,
    contact_consent,
    consent_at,
    verified_at,
    verification_method,
    landing_id,
    form_variant
  ) VALUES (
    btrim(p_lead->>'name'),
    v_phone,
    btrim(p_lead->>'city_hub'),
    p_lead->>'pincode',
    v_services,
    NULLIF(btrim(p_lead->>'notes'), ''),
    'new',
    NULLIF(p_lead->>'source', ''),
    NULLIF(p_lead->>'medium', ''),
    NULLIF(p_lead->>'campaign', ''),
    NULLIF(p_lead->>'term', ''),
    NULLIF(p_lead->>'content', ''),
    NULLIF(p_lead->>'landing_page', ''),
    NULLIF(p_lead->>'referrer', ''),
    NULLIF(p_lead->>'gclid', ''),
    NULLIF(p_lead->>'wbraid', ''),
    NULLIF(p_lead->>'gbraid', ''),
    COALESCE(NULLIF(p_lead->>'consent_version', ''), 'v2-2026'),
    true,
    now(),
    CASE WHEN COALESCE(p_lead->>'verified', 'false') = 'true' THEN now() ELSE NULL END,
    CASE
      WHEN p_lead->>'verification_method' IN ('sms_otp', 'direct_phone', 'unverified')
        THEN p_lead->>'verification_method'
      ELSE 'direct_phone'
    END,
    NULLIF(p_lead->>'landing_id', ''),
    NULLIF(p_lead->>'form_variant', '')
  )
  RETURNING id INTO v_lead_id;

  lead_id := v_lead_id;
  was_created := true;
  RETURN NEXT;
END;
$$;

ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_status_history ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.consultations FROM anon, authenticated;
REVOKE ALL ON public.consultation_status_history FROM anon, authenticated;
GRANT ALL ON public.consultations TO service_role;
GRANT ALL ON public.consultation_status_history TO service_role;

REVOKE ALL ON FUNCTION public.sync_consultation_lifecycle_timestamps() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.record_consultation_status_history() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.create_consultation_if_not_recent(jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.create_consultation_if_not_recent(jsonb) TO service_role;

DROP POLICY IF EXISTS "Anyone can submit a consultation request" ON public.consultations;
DROP POLICY IF EXISTS "Public can insert consultation with validation" ON public.consultations;
