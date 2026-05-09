import React, { useEffect, useState } from 'react';
import axios from 'axios'; // 1. Added missing axios import

const Register = () => {
  const [display, setDisplay] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch initial data on mount
  useEffect(() => {
    axios.get("https://summer-internship-hackathon-2026-tech.onrender.com")
      .then((res) => {
        console.log("Initial fetch data:", res.data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);

  function submitHandle(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setDisplay("");

    const { username, password, email, phonenumber } = e.target.elements;

    axios.post(
      'https://summer-internship-hackathon-2026-tech.onrender.com/api/auth/register',
      {
        username: username.value,
        password: password.value,
        email: email.value,
        phonenumber: phonenumber.value
      }
    )
    .then(() => {
      setDisplay("Registered successfully! Welcome aboard.");
      e.target.reset(); // Clear the form fields on success
    })
    .catch((err) => {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1b3b22] via-[#2d5a36] to-[#407c4d] p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white tracking-wide">Create Account</h2>
          <p className="text-emerald-200/70 text-sm mt-2">Join the Summer Internship Hackathon 2026</p>
        </div>

        {/* Status Messages */}
        {display && (
          <div className="mb-6 p-4 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-200 text-sm text-center">
            {display}
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-rose-500/20 border border-rose-500/30 text-rose-200 text-sm text-center">
            {error}
          </div>
        )}

        {/* Form - 2. Form submission handler moved here */}
        <form onSubmit={submitHandle} className="space-y-5">
          
          {/* Username Input */}
          <div>
            <label className="block text-xs font-semibold text-emerald-100 uppercase tracking-wider mb-2">Full Name</label>
            <input 
              type="text" 
              name="username" 
              required
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Email Input - 3. Fixed duplicate 'name' bug here */}
          <div>
            <label className="block text-xs font-semibold text-emerald-100 uppercase tracking-wider mb-2">Email Address</label>
            <input 
              type="email" 
              name="email" 
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Phone Number Input */}
          <div>
            <label className="block text-xs font-semibold text-emerald-100 uppercase tracking-wider mb-2">Phone Number</label>
            <input 
              type="tel" 
              name="phonenumber" 
              required
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-semibold text-emerald-100 uppercase tracking-wider mb-2">Password</label>
            <input 
              type="password" 
              name="password" 
              required
              placeholder="Create your password"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full mt-4 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold tracking-wide shadow-lg shadow-emerald-900/30 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Registering..." : "Submit Registration"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Register;