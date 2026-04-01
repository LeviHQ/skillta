import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { supabase } from "@/integrations/supabase/client";

interface QuizResult {
  id?: string;
  answers: Record<number, string>;
  topCareer: string;
  topMatchPercentage: number;
  allResults: { careerId: string; title: string; matchPercentage: number }[];
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  saveQuizResult: (result: Omit<QuizResult, "id" | "createdAt">) => Promise<void>;
  getQuizHistory: () => Promise<QuizResult[]>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        // Upsert profile in Supabase
        const { data: existing } = await supabase
          .from("profiles")
          .select("id")
          .eq("firebase_uid", u.uid)
          .maybeSingle();

        if (!existing) {
          await supabase.from("profiles").insert({
            firebase_uid: u.uid,
            display_name: u.displayName,
            email: u.email,
            photo_url: u.photoURL,
          });
        }
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const sendWelcomeEmail = async (user: User) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-welcome-email', {
        body: {
          email: user.email,
          displayName: user.displayName || user.email?.split('@')[0],
        },
      });
      if (error) {
        console.error('Welcome email error:', error);
      } else {
        console.log('Welcome email sent successfully:', data);
      }
    } catch (err) {
      console.error('Failed to send welcome email:', err);
    }
  };

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    if (result.user) {
      sendWelcomeEmail(result.user);
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const saveQuizResult = async (result: Omit<QuizResult, "id" | "createdAt">) => {
    if (!user) return;
    const { error } = await supabase.from("quiz_results").insert({
      firebase_uid: user.uid,
      answers: result.answers,
      top_career: result.topCareer,
      top_match_percentage: result.topMatchPercentage,
      all_results: result.allResults,
    });
    if (error) {
      console.error("Failed to save quiz result:", error);
      throw error;
    }
  };

  const getQuizHistory = async (): Promise<QuizResult[]> => {
    if (!user) return [];
    const { data, error } = await supabase
      .from("quiz_results")
      .select("*")
      .eq("firebase_uid", user.uid)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch quiz history:", error);
      return [];
    }

    return (data || []).map((row: any) => ({
      id: row.id,
      answers: row.answers,
      topCareer: row.top_career,
      topMatchPercentage: row.top_match_percentage,
      allResults: row.all_results,
      createdAt: row.created_at,
    }));
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut, saveQuizResult, getQuizHistory }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

