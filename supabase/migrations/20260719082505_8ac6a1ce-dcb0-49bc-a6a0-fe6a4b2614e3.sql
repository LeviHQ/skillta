CREATE TABLE public.resume_review_usage (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);
GRANT ALL ON public.resume_review_usage TO service_role;
ALTER TABLE public.resume_review_usage ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Deny direct access to resume_review_usage" ON public.resume_review_usage FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);
CREATE INDEX idx_resume_review_usage_lookup ON public.resume_review_usage (identifier, created_at DESC);