import React, { useState } from "react";
import { LogIn, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- Configuration ---
const AUTH_URL =
  "https://dini-paradise-backend-akz8.onrender.com/api/auth/login";
const ADMIN_DASHBOARD_PATH = "/admin";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Placeholder for saving the token (simulating successful login)

  const saveAuthToken = (token) => {
    // Using localStorage to store the token for subsequent API calls
    localStorage.setItem("adminToken", token);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // --- ACTUAL API call to the backend ---
      const response = await fetch(AUTH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // If the server returns 400 or 401, display the error message from the JSON body
        throw new Error(
          data.msg || "Login failed due to network or server error."
        );
      } // If successful, the server returns { token: '...' }

      saveAuthToken(data.token);
      navigate(ADMIN_DASHBOARD_PATH);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "An unexpected error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
           {" "}
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-red-100">
               {" "}
        <div className="text-center mb-8">
                   {" "}
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
                        DINI Admin          {" "}
          </h1>
                   {" "}
          <p className="text-red-600 text-lg font-medium">Panel Access</p>     
           {" "}
        </div>
               {" "}
        <form onSubmit={handleLogin} className="space-y-6">
                    {/* Email Input */}         {" "}
          <div>
                       {" "}
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="email"
            >
                            Email            {" "}
            </label>
                       {" "}
            <div className="relative">
                           {" "}
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                           {" "}
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@dini.com"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-red-500 focus:border-red-500 transition duration-150"
              />
                         {" "}
            </div>
                     {" "}
          </div>
                    {/* Password Input */}         {" "}
          <div>
                       {" "}
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="password"
            >
                            Password            {" "}
            </label>
                       {" "}
            <div className="relative">
                           {" "}
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                           {" "}
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="**********"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-red-500 focus:border-red-500 transition duration-150"
              />
                         {" "}
            </div>
                     {" "}
          </div>
                    {/* Error Message */}         {" "}
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-xl text-sm font-medium border border-red-300">
                            {error}           {" "}
            </div>
          )}
                    {/* Submit Button */}         {" "}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-md text-lg font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 disabled:opacity-60"
          >
                       {" "}
            {loading ? (
              <div className="w-6 h-6 border-2 border-t-2 border-t-white border-red-300 rounded-full animate-spin mr-2"></div>
            ) : (
              <LogIn className="w-5 h-5 mr-2" />
            )}
                        {loading ? "Authenticating..." : "Log In"}         {" "}
          </button>
                 {" "}
        </form>
             {" "}
      </div>
         {" "}
    </div>
  );
}

export default AdminLogin;
