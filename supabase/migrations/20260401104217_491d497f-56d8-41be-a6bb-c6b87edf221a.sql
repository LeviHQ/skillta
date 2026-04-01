
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  firebase_uid TEXT NOT NULL UNIQUE,
  display_name TEXT,
  email TEXT,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.quiz_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  firebase_uid TEXT NOT NULL,
  answers JSONB NOT NULL DEFAULT '{}',
  top_career TEXT NOT NULL,
  top_match_percentage INTEGER NOT NULL,
  all_results JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_quiz_results_firebase_uid ON public.quiz_results(firebase_uid);
CREATE INDEX idx_profiles_firebase_uid ON public.profiles(firebase_uid);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert profiles" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read own profile" ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Anyone can insert quiz results" ON public.quiz_results FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read quiz results" ON public.quiz_results FOR SELECT USING (true);
