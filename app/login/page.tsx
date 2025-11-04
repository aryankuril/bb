"use client";
import { useState } from "react";
import { login, getUserRole } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { setCookie } from "cookies-next";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCred = await login(email, password);
      const role = await getUserRole(userCred.user.uid);

      // 🔹 Get Firebase ID token
      const idToken = await userCred.user.getIdToken();
      // 🔹 Save token in cookie (used by middleware)
      setCookie("firebase-auth", idToken, {
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      });

      console.log("User Role:", role);

      if (!role) throw new Error("No role found in Firestore for this user.");

      if (role === "admin") {
        alert("Welcome Admin!");
        router.push("/admin");
      } else if (role === "user") {
        alert("Welcome User!");
        router.push("/");
      } else {
        throw new Error("Invalid role.");
      }
    } catch (err: any) {
      console.error("Login Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-96 space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Login</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
