"use client";
import { useState } from "react";
import { signupUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import Button from "../components/Button";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await signupUser(email, password, name);

      const idToken = await user.getIdToken();
      setCookie("firebase-auth", idToken, {
        path: "/",
        maxAge: 60 * 60 * 24,
      });

      alert("Signup successful! Welcome!");
      router.push("/");
    } catch (err: any) {
      console.error("Signup Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSignup}
        className="relative bg-black p-10 shadow-md w-96 space-y-4 overflow-hidden rounded-[20px]"
      >
        {/* Right yellow border */}
        <div className="absolute -right-1 top-0 w-2 sm:w-2 md:w-5 h-full bg-[#FAB31E]"></div>

        <h2 className="text-xl font-semibold text-white text-center">
          Signup
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          required
          className="w-full border p-2 rounded text-white bg-black"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full border p-2 rounded text-white bg-black"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full border p-2 rounded text-white bg-black"
        />

        <Button
          type="submit"
          disabled={loading}
          className="white-text"
          text={loading ? "Creating account..." : "Sign Up"}
        />

        {/* Login Link */}
        <p className="text-center text-white text-sm mt-2">
          Already have an account?{" "}
          <a href="/login" className="text-[#FAB31E] underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
