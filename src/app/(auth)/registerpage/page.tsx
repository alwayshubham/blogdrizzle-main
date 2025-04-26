"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => router.push("/loginpage"), 2000);
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 ">
      <div className="relative bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition duration-300 hover:scale-[1.02] hover:shadow-3xl">
        <form onSubmit={handleRegister}>
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Create Account</h2>

          {error && <p className="text-red-300 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-300 text-sm mb-4">{success}</p>}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-white bg-opacity-20 placeholder-white placeholder-opacity-70 text-white border-none rounded-lg p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white bg-opacity-20 placeholder-white placeholder-opacity-70 text-white border-none rounded-lg p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white bg-opacity-20 placeholder-white placeholder-opacity-70 text-white border-none rounded-lg p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-white bg-opacity-20 placeholder-white placeholder-opacity-70 text-white border-none rounded-lg p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <button
            type="submit"
            className="bg-white text-indigo-600 font-bold rounded-lg p-3 w-full mt-2 transition-transform duration-200 hover:scale-105 hover:bg-gray-100"
          >
            Register
          </button>

          <p className="mt-6 text-center text-white text-sm">
            Already have an account?{" "}
            <Link href="/loginpage" className="underline hover:text-blue-200">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
