CREATE TABLE public.badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firebase_uid TEXT NOT NULL,
  badge_type TEXT NOT NULL CHECK (badge_type IN ('quiz', 'resume')),
  source_id UUID,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (badge_type, source_id)
);

GRANT ALL ON public.badges TO service_role;

ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Deny direct access to badges"
ON public.badges
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);

CREATE INDEX badges_uid_type_created_idx
ON public.badges (firebase_uid, badge_type, created_at DESC);

INSERT INTO public.badges (firebase_uid, badge_type, source_id, payload, created_at)
SELECT
  firebase_uid,
  'quiz',
  id,
  jsonb_build_object(
    'topCareer', top_career,
    'topMatchPercentage', top_match_percentage,
    'allResults', all_results
  ),
  created_at
FROM public.quiz_results
ON CONFLICT (badge_type, source_id) DO NOTHING;