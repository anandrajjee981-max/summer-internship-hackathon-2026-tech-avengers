import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Gym = () => {
  // 1. Initialize as an empty array to prevent map() from breaking before data arrives
  const [arr, setarr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 2. Wrap API call in an async function
    const fetchGyms = async () => {
      try {
        const res = await axios.get('https://summer-internship-hackathon-2026-tech.onrender.com/api/boss/gym');
        
        // Console log here to inspect your exact backend response structure if needed:
        // console.log("Backend Response: ", res.data);
        
        if (res.data && res.data.gymdetail) {
          setarr(res.data.gymdetail);
        }
      } catch (error) {
        console.error("Error fetching gym details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGyms();
  }, []); // 3. Added empty dependency array so this runs only ONCE when component mounts

  return (
    <div className='bg-gradient-to-br from-[#0a1f11] via-[#091b10] to-[#12311c] w-full min-h-screen p-6 md:p-10 font-sans text-slate-200'>
      
      {/* Header section matching your premium dashboard UI */}
      <div className="max-w-6xl mx-auto mb-8 border-b border-emerald-900/40 pb-5">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Hello, Boss 👋</h1>
        <h2 className="text-emerald-400 text-sm font-mono tracking-wider mt-1 uppercase">Gym Registration Metrics</h2>
      </div>

      <div className="max-w-6xl mx-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-48">
            <div className="w-8 h-8 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin"></div>
            <p className="text-emerald-500 text-xs mt-3 font-mono tracking-widest uppercase">Fetching Records...</p>
          </div>
        ) : arr.length === 0 ? (
          <div className="bg-[#03140b]/60 rounded-xl p-10 text-center border border-emerald-900/30">
            <p className="text-emerald-600/70 text-sm font-mono">No registered gyms found in database.</p>
          </div>
        ) : (
          /* Responsive Layout Grid for your Gym Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {arr.map((elem, index) => {
              return (
                <div 
                  key={elem._id || index} 
                  className="bg-[#03160c]/90 rounded-xl p-5 border border-emerald-900/60 hover:border-emerald-400/40 shadow-xl transition-all duration-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      {/* Displays the dynamic gym name */}
                      <h3 className="text-white font-bold text-lg tracking-wide">
                        {elem.gymname || "Unnamed Gym"}
                      </h3>
                      <p className="text-xs text-emerald-400/70 font-mono mt-0.5">Verified Franchise</p>
                    </div>
                    
                    {/* Visual Tag Badge */}
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded text-xs font-mono">
                      ACTIVE
                    </span>
                  </div>

                  <div className="space-y-2 border-t border-emerald-950 pt-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Gym Identity Code:</span>
                      {/* Displays the unique gym code */}
                      <span className="text-white font-mono font-bold tracking-wider text-emerald-400">
                        {elem.gymcode || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gym;