import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCv2gb5zFy1ArBtEWDA1EuCgPEUcrKyj1o",
  authDomain: "skillta-30f35.firebaseapp.com",
  projectId: "skillta-30f35",
  storageBucket: "skillta-30f35.firebasestorage.app",
  messagingSenderId: "406657336931",
  appId: "1:406657336931:web:51b9f970f9c058425e1a56",
  measurementId: "G-S8RS21HEDT",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const db = getFirestore(app);

// Firebase Analytics is non-critical: load it lazily after the page is idle
// so it never competes with first paint / first interaction.
if (typeof window !== "undefined") {
  const startAnalytics = () => {
    import("firebase/analytics")
      .then(({ getAnalytics, isSupported }) =>
        isSupported().then((ok) => {
          if (ok) getAnalytics(app);
        }),
      )
      .catch(() => {
        /* analytics is optional */
      });
  };
  const schedule = () => {
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void) => number })
      .requestIdleCallback;
    if (idle) idle(startAnalytics);
    else window.setTimeout(startAnalytics, 2000);
  };
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
}
