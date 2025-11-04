// lib/auth.ts
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { deleteCookie } from "cookies-next";


// ---- Normal user signup (default role: "user") ----
export async function signupUser(email: string, password: string, name: string) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  const ref = doc(db, "users", userCred.user.uid);
  await setDoc(ref, {
    email,
    name,
    role: "user",
    createdAt: serverTimestamp(),
  });
  return userCred.user;
}

// ---- Admin signup (only use manually via CreateAdmin.tsx) ----
export async function signupAdmin(email: string, password: string) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  const ref = doc(db, "users", userCred.user.uid);
  await setDoc(ref, {
    email,
    displayName: email.split("@")[0],
    role: "admin",
    createdAt: serverTimestamp(),
  });
  return userCred.user;
}

// ---- Login ----
export async function login(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password);
}

// ---- Logout ----
export async function logout() {
  await signOut(auth);
  deleteCookie("firebase-auth");
}

// ---- Get user role ----
export async function getUserRole(uid: string) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data()?.role : null;
}
