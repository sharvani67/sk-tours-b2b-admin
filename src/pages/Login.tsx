import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "@/config/api";
import { Building2, Lock, Mail, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  try {
    const res = await fetch(`${API_URL}/api/auth/admin-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Login failed");
      return;
    }

    // Save admin session
    localStorage.setItem("admin", JSON.stringify(data.admin));

    navigate("/dashboard");

  } catch (err) {
    setError("Server error. Please try again.");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      
      {/* Login Card */}
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">

        {/* Logo / Title */}
        <div className="text-center mb-8">
         <div className="flex justify-center mb-4">
  <img
    src="/b2blogo.png"
    alt="B2B Partners Logo"
    className="h-20 w-auto object-contain"
  />
</div>
          <h2 className="text-2xl font-bold text-gray-800">
            B2B Admin Login
          </h2>
          <p className="text-gray-500 text-sm">
            Enter your credentials to access dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Email
            </label>
            <div className="flex items-center border rounded-xl px-3 mt-1 focus-within:ring-2 focus-within:ring-blue-500">
              <Mail size={18} className="text-gray-400" />
              <input
                type="email"
                placeholder="admin@b2b.com"
                className="w-full p-3 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div>
  <label className="text-sm font-medium text-gray-600">
    Password
  </label>

  <div className="flex items-center border rounded-xl px-3 mt-1 focus-within:ring-2 focus-within:ring-blue-500">
    <Lock size={18} className="text-gray-400" />

    <input
      type={showPassword ? "text" : "password"}
      placeholder="Enter password"
      className="w-full p-3 outline-none"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="text-gray-400 hover:text-gray-600"
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>
</div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-center text-gray-400 mt-6">
          © 2026 B2B Partners. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;