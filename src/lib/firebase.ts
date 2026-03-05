import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

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
export const db = getFirestore(app);

// Analytics - only in browser
if (typeof window !== "undefined") {
  getAnalytics(app);
}
