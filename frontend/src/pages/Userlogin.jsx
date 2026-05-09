import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Userlogin = () => {
  const [display, setDisplay] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activePanel, setActivePanel] = useState("user");

  function fetchData() {
    axios.get("https://summer-internship-hackathon-2026-tech.onrender.com")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  function submitHandle(e) {
    e.preventDefault();
    setIsLoading(true);
    setDisplay("");

    const { username, password } = e.target.elements;

    axios.post(
      'https://summer-internship-hackathon-2026-tech.onrender.com/api/auth/login',
      {
        username: username.value,
        password: password.value
      },
      {
        withCredentials: true
      }
    )
      .then((res) => {
        console.log(res.data);
        fetchData();
        setIsError(false);
        setDisplay("Login successful! Welcome back.");
        setIsLoading(false);
        e.target.reset();
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.response?.data);
        console.log(err.response?.status);
        setIsError(true);
        setDisplay(err.response?.data?.message || "Something went wrong");
        setIsLoading(false);
      });
  }

  return (
    <div className="bg-gradient-to-br from-[#1b3b22] via-[#2d5a36] to-[#407c4d] w-full h-screen flex flex-col items-center justify-center font-sans px-4">
      
      {/* Top Navigation Tabs */}
      <div className="flex bg-black/20 p-1.5 rounded-xl gap-1 mb-8 backdrop-blur-md border border-white/10 max-w-md w-full">
        {["user", "admin", "super admin"].map((role) => (
          <button
            key={role}
            onClick={() => setActivePanel(role)}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-all duration-300 capitalize ${
              activePanel === role
                ? "bg-[#519c61] text-white shadow-lg shadow-[#519c61]/30"
                : "text-emerald-100/70 hover:text-white hover:bg-white/5"
            }`}
          >
            {role} panel
          </button>
        ))}
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome Back
          </h2>
          <p className="text-emerald-200/70 text-sm mt-2">
            Please enter your credentials to login
          </p>
        </div>

        {/* Notification */}
        {display && (
          <div className={`mb-6 p-4 rounded-xl text-sm font-medium border transition-all duration-300 ${
            isError
              ? "bg-red-500/10 border-red-500/30 text-red-200"
              : "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
          }`}>
            <div className="flex items-center gap-2">
              <span className="text-lg">
                {isError ? '⚠️' : '🎉'}
              </span>
              <p>{display}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={submitHandle} className="space-y-6">
          
          {/* Username */}
          <div>
            <label className="block text-xs font-semibold text-emerald-100 uppercase tracking-wider mb-2">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-emerald-300/60">
                👤
              </span>
              <input
                type="text"
                name="username"
                required
                placeholder="Enter your username"
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-emerald-200/40 focus:outline-none focus:ring-2 focus:ring-[#519c61] focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-emerald-100 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-emerald-300/60">
                🔒
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-emerald-200/40 focus:outline-none focus:ring-2 focus:ring-[#519c61] focus:border-transparent transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-emerald-300/60 hover:text-white transition-colors"
              >
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#519c61] hover:bg-[#62ad72] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-[#519c61]/30 hover:shadow-[#519c61]/40 transition-all duration-200 mt-2"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Logging in...
              </span>
            ) : (
              "Log In"
            )}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Userlogin;