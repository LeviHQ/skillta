import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";
import { auth, googleProvider, db } from "@/lib/firebase";
import { doc, setDoc, getDoc, collection, addDoc, query, orderBy, getDocs, serverTimestamp } from "firebase/firestore";
import { supabase } from "@/integrations/supabase/client";

interface QuizResult {
  id?: string;
  answers: Record<number, string>;
  topCareer: string;
  topMatchPercentage: number;
  allResults: { careerId: string; title: string; matchPercentage: number }[];
  createdAt: any;
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
        const userRef = doc(db, "users", u.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            displayName: u.displayName,
            email: u.email,
            photoURL: u.photoURL,
            createdAt: serverTimestamp(),
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
    // Send welcome email on every sign-in
    if (result.user) {
      sendWelcomeEmail(result.user);
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const saveQuizResult = async (result: Omit<QuizResult, "id" | "createdAt">) => {
    if (!user) return;
    const colRef = collection(db, "users", user.uid, "quizResults");
    await addDoc(colRef, {
      ...result,
      createdAt: serverTimestamp(),
    });
  };

  const getQuizHistory = async (): Promise<QuizResult[]> => {
    if (!user) return [];
    const colRef = collection(db, "users", user.uid, "quizResults");
    const q = query(colRef, orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as QuizResult));
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

