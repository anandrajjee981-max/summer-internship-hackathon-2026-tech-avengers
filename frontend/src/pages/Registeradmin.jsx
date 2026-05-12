import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import added
import { Link } from 'react-router-dom';

const Registeradmin = () => {
  const [display, setDisplay] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch initial data on mount (Server spin-up check)
  useEffect(() => {
    axios.get("https://summer-internship-hackathon-2026-tech.onrender.com")
      .then((res) => {
        console.log("Initial fetch data:", res.data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);

  function registeradmin(e) {
    e.preventDefault();
    setIsLoading(true);
    setDisplay("");
    setIsError(false);

    // Form inputs value extraction
    const { gymname, gymcode, email, password } = e.target.elements;

    axios.post(
      'https://summer-internship-hackathon-2026-tech.onrender.com/api/auths/colab',
      {
        gymname: gymname.value,
        gymcode: gymcode.value,
        email: email.value,
        password: password.value
      }
    )
    .then((res) => {
      console.log(res.data);
      setIsError(false);
      setDisplay("Admin registered successfully!");
      e.target.reset(); // Clear form fields
    })
    .catch((err) => {
      console.error(err);
      setIsError(true);
      setDisplay(err.response?.data?.message || "Something went wrong during registration.");
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  return (
    // Matching Premium Dark Green Theme
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0a1f11] via-[#102b18] to-[#16361e] p-4 py-10 font-sans">
      
      {/* Registration Card */}
      <div className="w-full max-w-md bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-white/25 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">Register Admin</h2>
          <p className="text-emerald-200 text-base mt-2 font-medium">Create collaborator gym account</p>
        </div>

        {/* Status Messages */}
        {display && (
          <div className={`mb-6 p-4 rounded-xl text-sm font-semibold border transition-all duration-300 text-center ${
            isError
              ? "bg-rose-950/80 border-rose-500/50 text-rose-100"
              : "bg-emerald-950/80 border-emerald-500/50 text-emerald-100"
          }`}>
            {isError ? '⚠️ ' : '🎉 '}{display}
          </div>
        )}

        {/* Form */}
        <form onSubmit={registeradmin} className="space-y-5">
          
          {/* Gym Name Input */}
          <div>
            <label className="block text-sm font-bold text-white uppercase tracking-wider mb-2">Gym Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-emerald-100">
                🏋️‍♂️
              </span>
              <input 
                type="text" 
                name="gymname" 
                required
                placeholder="Enter your gym name"
                className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white placeholder-emerald-300/70 text-base focus:outline-none focus:ring-2 focus:ring-[#519c61] focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Gym Code Input */}
          <div>
            <label className="block text-sm font-bold text-white uppercase tracking-wider mb-2">Gym Code</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-emerald-100">
                🏢
              </span>
              <input 
                type="text" 
                name="gymcode" 
                required
                placeholder="Create unique gym code"
                className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white placeholder-emerald-300/70 text-base focus:outline-none focus:ring-2 focus:ring-[#519c61] focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-bold text-white uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-emerald-100">
                📧
              </span>
              <input 
                type="email" 
                name="email" 
                required
                placeholder="Enter admin email"
                className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white placeholder-emerald-300/70 text-base focus:outline-none focus:ring-2 focus:ring-[#519c61] focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-bold text-white uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-emerald-100">
                🔒
              </span>
              <input 
                type="password" 
                name="password" 
                required
                placeholder="Create password"
                className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white placeholder-emerald-300/70 text-base focus:outline-none focus:ring-2 focus:ring-[#519c61] focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#519c61] hover:bg-[#62ad72] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none text-white font-extrabold text-lg py-3.5 px-4 rounded-xl shadow-lg shadow-[#519c61]/40 hover:shadow-[#519c61]/60 transition-all duration-200 mt-4"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Registering...
              </span>
            ) : (
              "Register Gym"
            )}
          </button>
        </form>

        {/* Link back to admin login */}
        <Link 
          to="/adminlogin" 
          className='text-emerald-100 hover:text-white text-base font-semibold mt-6 transition-colors duration-200 block text-center'
        >
          Already have an admin account? Log In
        </Link>

      </div>




    </div>
  );
};

export default Registeradmin;