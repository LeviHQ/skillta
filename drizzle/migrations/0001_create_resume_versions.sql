CREATE TABLE public.resume_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  firebase_uid text NOT NULL,
  version_number integer NOT NULL,
  title text NOT NULL,
  target_role text NOT NULL,
  ats_score integer NOT NULL CHECK (ats_score BETWEEN 0 AND 100),
  jd_summary text,
  notes text,
  file_path text NOT NULL,
  file_name text NOT NULL,
  file_size integer NOT NULL,
  mime_type text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (firebase_uid, version_number)
);
GRANT ALL ON public.resume_versions TO service_role;
ALTER TABLE public.resume_versions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Deny direct access to resume_versions" ON public.resume_versions FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);
CREATE INDEX resume_versions_uid_created_idx ON public.resume_versions (firebase_uid, created_at DESC);