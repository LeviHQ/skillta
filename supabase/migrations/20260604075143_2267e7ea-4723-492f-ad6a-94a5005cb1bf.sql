-- Lock down profiles and quiz_results: remove permissive policies.
-- Access will be brokered via the firebase-data edge function using service_role.

DROP POLICY IF EXISTS "Anyone can insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Anyone can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Anyone can insert quiz results" ON public.quiz_results;
DROP POLICY IF EXISTS "Anyone can read quiz results" ON public.quiz_results;

-- Revoke direct Data API access from anon/authenticated; only service_role can touch these.
REVOKE ALL ON public.profiles FROM anon, authenticated;
REVOKE ALL ON public.quiz_results FROM anon, authenticated;
GRANT ALL ON public.profiles TO service_role;
GRANT ALL ON public.quiz_results TO service_role;

-- Keep RLS enabled so no row leaks even if grants change later.
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

-- Explicit deny-all policies for anon/authenticated (defence in depth).
CREATE POLICY "Deny direct access to profiles"
  ON public.profiles
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

CREATE POLICY "Deny direct access to quiz_results"
  ON public.quiz_results
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);