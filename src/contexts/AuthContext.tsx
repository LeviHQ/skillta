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

async function callFirebaseData(user: User, body: Record<string, unknown>) {
  const token = await user.getIdToken();
  const { data, error } = await supabase.functions.invoke("firebase-data", {
    body,
    headers: { Authorization: `Bearer ${token}` },
  });
  if (error) throw error;
  return data;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        try {
          await callFirebaseData(u, {
            action: "ensureProfile",
            displayName: u.displayName,
            email: u.email,
            photoUrl: u.photoURL,
          });
        } catch (err) {
          console.error("Failed to ensure profile:", err);
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
    try {
      await callFirebaseData(user, {
        action: "saveQuizResult",
        answers: result.answers,
        topCareer: result.topCareer,
        topMatchPercentage: result.topMatchPercentage,
        allResults: result.allResults,
      });
    } catch (error) {
      console.error("Failed to save quiz result:", error);
      throw error;
    }
  };

  const getQuizHistory = async (): Promise<QuizResult[]> => {
    if (!user) return [];
    try {
      const data = await callFirebaseData(user, { action: "getQuizHistory" });
      const rows = (data?.results ?? []) as any[];
      return rows.map((row) => ({
        id: row.id,
        answers: row.answers,
        topCareer: row.top_career,
        topMatchPercentage: row.top_match_percentage,
        allResults: row.all_results,
        createdAt: row.created_at,
      }));
    } catch (error) {
      console.error("Failed to fetch quiz history:", error);
      return [];
    }
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

