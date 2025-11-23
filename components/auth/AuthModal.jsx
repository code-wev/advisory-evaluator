"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";

export default function AuthModal({ open, onClose, type, switchAuth }) {
  // INPUT STATES
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  // UX STATES
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Disable scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  if (!open) return null;

  // ===========================
  // 🔐 LOGIN HANDLER
  // ===========================
  const handleLogin = async () => {
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res.error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    setLoading(false);
    onClose();
  };

  // ===========================
  // 📝 SIGNUP HANDLER
  // ===========================
  const handleSignup = async () => {
    setError("");

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!email || !password || !firstName || !lastName) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      // Auto login
      await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      setLoading(false);
      onClose();
    } catch (err) {
      setError("Something went wrong.");
      setLoading(false);
    }
  };

  // SUBMIT HANDLER
  const handleSubmit = () => {
    if (type === "signup") return handleSignup();
    return handleLogin();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center">
      <div className="bg-white w-[95%] max-w-lg rounded-2xl shadow-xl p-6 md:p-8 relative">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-600 text-2xl"
        >
          ×
        </button>

        {/* HEADER TEXT */}
        <h2 className="text-center text-[16px] font-medium text-gray-700 mb-6">
          Log in or Sign up
        </h2>

        {/* MAIN TITLE */}
        <h1 className="text-[22px] font-semibold mb-1 text-gray-900">
          {type === "signup" ? "Sign up" : "Log in"}
        </h1>

        {/* SWITCH LINK */}
        <p className="text-sm text-gray-500 mb-6 flex items-center gap-1">
          {type === "signup" ? (
            <>
              If you have an account,
              <button
                onClick={() => switchAuth("login")}
                className="text-[#0B61FF] font-medium underline-offset-2 hover:underline"
              >
                Log in
              </button>
            </>
          ) : (
            <>
              Don’t have an account?
              <button
                onClick={() => switchAuth("signup")}
                className="text-[#0B61FF] font-medium underline-offset-2 hover:underline"
              >
                Sign up
              </button>
            </>
          )}
        </p>

        {/* ERROR */}
        {error && (
          <div className="text-red-600 text-sm mb-4">{error}</div>
        )}

        {/* FORM */}
        <div className="space-y-4">

          {/* SIGNUP ONLY FIELDS */}
          {type === "signup" && (
            <>
              <div>
                <label className="text-sm">First Name</label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:border-[#0B61FF] outline-none"
                  placeholder="First Name"
                />
              </div>

              <div>
                <label className="text-sm">Last Name</label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:border-[#0B61FF] outline-none"
                  placeholder="Last Name"
                />
              </div>
            </>
          )}

          {/* EMAIL */}
          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:border-[#0B61FF] outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:border-[#0B61FF] outline-none"
              placeholder="Enter your password"
            />
          </div>

          {/* REPEAT PASSWORD */}
          {type === "signup" && (
            <div>
              <label className="text-sm">Repeat password</label>
              <input
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:border-[#0B61FF] outline-none"
                placeholder="Repeat your password"
              />
            </div>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-6 bg-[#0B3A6F] text-white py-2 rounded-lg hover:bg-[#093058] transition disabled:opacity-50"
        >
          {loading
            ? "Please wait..."
            : type === "signup"
            ? "Sign up"
            : "Log in"}
        </button>

        {/* CANCEL */}
        <button
          onClick={onClose}
          className="w-full mt-2 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
