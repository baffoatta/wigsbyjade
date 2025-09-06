"use client";

import { LOGIN_MUTATION } from "@/graphql/queries";
import { useMutation } from "@apollo/client/react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      const loginData = data as { login: { authToken: string } };
      if (loginData.login.authToken) {
        Cookies.set("auth-token", loginData.login.authToken, {
          expires: 7,
          secure: true,
        });
        router.push("/account");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    login({ variables: { username, password } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md"
        >
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-4">
          Don&apos;t have an account?{" "}
          <Link
            href="/account/register"
            className="text-pink-500 hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
