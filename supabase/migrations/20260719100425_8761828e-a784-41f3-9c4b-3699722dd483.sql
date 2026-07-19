
CREATE TABLE public.skill_gap_usage (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);
CREATE INDEX skill_gap_usage_identifier_created_idx ON public.skill_gap_usage (identifier, created_at DESC);
GRANT ALL ON public.skill_gap_usage TO service_role;
ALTER TABLE public.skill_gap_usage ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Deny direct access to skill_gap_usage" ON public.skill_gap_usage FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);
