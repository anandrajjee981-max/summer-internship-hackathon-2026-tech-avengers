import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Superlogin = () => {
  const [display, setDisplay] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [isdisplay, setisdisplay] = useState(false);

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

  function logindata(e) {
    e.preventDefault();
    setIsLoading(true);
    setDisplay("");

    const { username , password } = e.target.elements;

    axios.post(
      'https://summer-internship-hackathon-2026-tech.onrender.com/api/boss/superlogin',
      {
       username : username.value  ,
       password : password.value
      },
      {
        withCredentials: true
      }
    )
      .then((res) => {
        console.log(res.data);
        setisdisplay(true); 
        setIsError(false);
        setDisplay("super admin Login successful!");
        setIsLoading(false);

      
      })
      .catch((err) => {
        console.log("Error object:", err.response);
        setIsError(true);

        const backendMessage = err.response?.data?.message || err.response?.data?.error;

        if (backendMessage) {
          setDisplay(backendMessage);
        } else if (err.response?.status === 401) {
          setDisplay("Incorrect password or gym name. Please try again.");
        } else if (err.response?.status === 403) {
          setDisplay("Invalid gym code. Please check and try again.");
        } else {
          setDisplay("Something went wrong. Please try again later.");
        }

        setIsLoading(false);
      });
  }

  return (
    <div className="bg-gradient-to-br from-[#0a1f11] via-[#102b18] to-[#16361e] w-full min-h-screen flex flex-col items-center justify-center font-sans px-4 py-10">
      
      {/* Admin Login Card */}
      <div className="w-full max-w-md bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-white/25 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
           Super Admin Portal
          </h2>
          <p className="text-emerald-200 text-base mt-2 font-medium">
           login here
          </p>
        </div>

        {/* Notification Banner */}
        {display && (
          <div className={`mb-6 p-4 rounded-xl text-sm font-semibold border transition-all duration-300 ${
            isError
              ? "bg-red-950/80 border-red-500/50 text-red-100"
              : "bg-emerald-950/80 border-emerald-500/50 text-emerald-100"
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
        <form onSubmit={logindata} className="space-y-5">
          
          {/* Gym Name */}
          <div>
            <label className="block text-sm font-bold text-white uppercase tracking-wider mb-2">
              Camp Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-emerald-100">
                🏋️‍♂️
              </span>
              <input
                type="text"
                name="username"
                required
                placeholder="Enter your gym name"
                className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white placeholder-emerald-300/70 text-base focus:outline-none focus:ring-2 focus:ring-[#519c61] focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

         

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-white uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-emerald-100">
                🔒
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 bg-black/40 border border-white/20 rounded-xl text-white placeholder-emerald-300/70 text-base focus:outline-none focus:ring-2 focus:ring-[#519c61] focus:border-transparent transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-emerald-100 hover:text-white transition-colors"
              >
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#519c61] hover:bg-[#62ad72] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none text-white font-extrabold text-lg py-3.5 px-4 rounded-xl shadow-lg shadow-[#519c61]/40 hover:shadow-[#519c61]/60 transition-all duration-200 mt-2"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Logging in...
              </span>
            ) : (
              "Log In"
            )}
          </button>
        </form>   

        {isdisplay && (
          <div className="mt-4">
            <Link to='/gym'>
              <button className="w-full py-3 px-4 text-center text-base font-extrabold rounded-xl text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-all duration-200">
                Let's Go! 🚀
              </button>
            </Link>
          </div>
        )}

     
      </div>
    </div>
  );
};

export default Superlogin;