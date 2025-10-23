import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    "AIzaSyCO-mYNvvZ1Q9FIcqzfuF78bCFhOuIgy-s",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    "bombay-blokes-4c284.firebaseapp.com",
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "bombay-blokes-4c284",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    "bombay-blokes-4c284.firebasestorage.app",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "681463490065",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    "1:681463490065:web:a0ca074279601cb196f3b0",
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-J7RXF51YPD",
};

// Initialize Firebase
let app: FirebaseApp;
let storage: FirebaseStorage;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  storage = getStorage(app);
} else {
  app = getApps()[0];
  storage = getStorage(app);
}

export { app, storage };
