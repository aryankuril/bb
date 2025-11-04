"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Topbar() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user?.email) setEmail(user.email);
    });
    return () => unsub();
  }, []);

  return (
    <header className="flex items-center justify-between bg-white shadow p-4">
      <h1 className="text-lg font-semibold">Admin Dashboard</h1>
      <div className="text-sm text-gray-600">{email}</div>
    </header>
  );
}
