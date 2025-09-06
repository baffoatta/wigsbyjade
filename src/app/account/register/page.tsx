"use client";

import { useRegisterUser } from "@/hooks/useWooCommerce";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const [register, { loading }] = useRegisterUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    try {
      await register({ username, email, password });
      setSuccess("Registration successful! You can now log in.");
      setTimeout(() => {
        router.push("/account/login");
      }, 2000);
    } catch {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Create Account</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md"
        >
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mb-4">{success}</p>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 text-white font-bold py-3 rounded-full hover:bg-pink-600 transition duration-300 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/account/login" className="text-pink-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
