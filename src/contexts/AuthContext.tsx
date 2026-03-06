import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, onAuthStateChanged, signInWithPopup, signInWithRedirect, getRedirectResult, signOut as firebaseSignOut } from "firebase/auth";
import { auth, googleProvider, db } from "@/lib/firebase";
import { doc, setDoc, getDoc, collection, addDoc, query, orderBy, getDocs, serverTimestamp } from "firebase/firestore";

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
    // Check for redirect result on load
    getRedirectResult(auth).catch(() => {});
    
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

  const signInWithGoogle = async () => {
    try {
      // Try popup first
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      // If popup blocked/closed, fall back to redirect
      if (error?.code === 'auth/popup-blocked' || error?.code === 'auth/popup-closed-by-user' || error?.code === 'auth/cancelled-popup-request') {
        await signInWithRedirect(auth, googleProvider);
      } else {
        throw error;
      }
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
