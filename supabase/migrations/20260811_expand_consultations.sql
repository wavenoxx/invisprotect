-- ============================================================================
-- Migration: 20260811_expand_consultations.sql
-- Description: Ensures all base and attribution columns exist on consultations table
-- ============================================================================

-- 1. Ensure table exists
CREATE TABLE IF NOT EXISTS public.consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid()
);

-- 2. Add all base and extended columns safely
ALTER TABLE public.consultations 
  ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS name text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS phone text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS city_hub text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS pincode text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS services jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS source text,
  ADD COLUMN IF NOT EXISTS medium text,
  ADD COLUMN IF NOT EXISTS campaign text,
  ADD COLUMN IF NOT EXISTS term text,
  ADD COLUMN IF NOT EXISTS content text,
  ADD COLUMN IF NOT EXISTS landing_page text,
  ADD COLUMN IF NOT EXISTS referrer text,
  ADD COLUMN IF NOT EXISTS gclid text,
  ADD COLUMN IF NOT EXISTS wbraid text,
  ADD COLUMN IF NOT EXISTS gbraid text,
  ADD COLUMN IF NOT EXISTS consent_version text NOT NULL DEFAULT '1.0',
  ADD COLUMN IF NOT EXISTS consent_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS verified_at timestamptz,
  ADD COLUMN IF NOT EXISTS verification_method text NOT NULL DEFAULT 'direct_phone',
  ADD COLUMN IF NOT EXISTS notes text,
  ADD COLUMN IF NOT EXISTS revenue_value numeric,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

-- 3. Row-Level Security & Role Grants
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;

REVOKE SELECT, UPDATE, DELETE ON public.consultations FROM anon;
REVOKE SELECT, UPDATE, DELETE ON public.consultations FROM authenticated;

GRANT INSERT ON public.consultations TO anon, authenticated;
GRANT ALL ON public.consultations TO service_role;

DROP POLICY IF EXISTS "Anyone can submit a consultation request" ON public.consultations;
DROP POLICY IF EXISTS "Public can insert consultation with validation" ON public.consultations;

CREATE POLICY "Public can insert consultation with validation"
  ON public.consultations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(name) BETWEEN 1 AND 120
    AND length(phone) BETWEEN 7 AND 20
    AND length(city_hub) BETWEEN 1 AND 100
    AND length(pincode) BETWEEN 4 AND 12
    AND status IN ('new', 'pending')
  );
