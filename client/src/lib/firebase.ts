import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// User provided configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUhxn2VsPPpsRwZMfLBZQbAdnGUEuoOMM",
  authDomain: "mmnjj-6255d.firebaseapp.com",
  projectId: "mmnjj-6255d",
  storageBucket: "mmnjj-6255d.firebasestorage.app",
  messagingSenderId: "116111119332",
  appId: "1:116111119332:web:9fa3546d0b3fb5afa02df1",
  measurementId: "G-LK3HCK03NZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
// Analytics is optional and might fail in some environments
let analytics;
try {
  analytics = getAnalytics(app);
} catch (e) {
  console.warn("Firebase Analytics failed to initialize", e);
}

export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export default app;
