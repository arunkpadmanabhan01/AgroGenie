"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { auth, googleProvider } from "@/app/lib/firebase";
import { signInWithPopup } from "firebase/auth";

export default function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      if (res.ok) {
        router.push(
          "/auth/signin?message=Account created successfully! Please sign in."
        );
      } else {
        const data = await res.json();
        setError(data.message || "Something went wrong");
      }
    } catch (error) {
      setError("An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          router.push("/dashboard");
        } else {
          setError(data.message || "Failed to create user");
        }
      } else {
        setError("Failed to authenticate");
      }
    } catch (error) {
      console.error("Google sign in error:", error);
      setError("Failed to sign in with Google");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#e8f5e9",
        minHeight: "100vh",
        padding: "20px",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflowY: "auto",
      }}
    >
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <h1
          style={{
            color: "#000",
            fontSize: "28px",
            fontWeight: "bold",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          Create Account
        </h1>

        {error && (
          <div
            style={{
              backgroundColor: "#FEE2E2",
              padding: "10px",
              marginBottom: "20px",
              color: "#DC2626",
              borderRadius: "4px",
            }}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "15px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <label
              htmlFor="name"
              style={{ display: "block", marginBottom: "5px", color: "#000" }}
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Enter your name"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "white",
                color: "#000",
              }}
            />
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "15px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "5px", color: "#000" }}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="Enter your email"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "white",
                color: "#000",
              }}
            />
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "15px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <label
              htmlFor="password"
              style={{ display: "block", marginBottom: "5px", color: "#000" }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "white",
                color: "#000",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#2563EB",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              marginTop: "10px",
            }}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

          <p style={{ textAlign: "center", color: "#000" }}>
            Already have an account?{" "}
            <span
              onClick={() => router.push("/auth/signin")}
              style={{
                color: "#2563EB",
                textDecoration: "none",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Sign in here
            </span>
          </p>

          <div
            style={{
              margin: "20px 0",
              textAlign: "center",
              position: "relative",
            }}
          >
            <div
              style={{ borderTop: "1px solid #ccc", margin: "10px 0" }}
            ></div>
            <span
              style={{
                backgroundColor: "#e8f5e9",
                padding: "8px 15px",
                color: "#000",
                position: "relative",
                top: "-15px",
                fontWeight: "500",
                borderRadius: "20px",
                border: "1px solid #ccc",
              }}
            >
              Or continue with
            </span>
          </div>

          <button
            onClick={handleGoogleSignIn}
            style={{
              width: "100%",
              padding: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "white",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              fontSize: "16px",
              color: "#000",
              fontWeight: "500",
              marginTop: "10px",
              zIndex: 1,
            }}
          >
            <FcGoogle style={{ width: "24px", height: "24px" }} />
            Sign up with Google
          </button>
        </form>
      </div>
    </div>
  );
}
