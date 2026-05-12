import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Usercount = () => {
  const [arr, setarr] = useState([]); 
  const [isloading, setisloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://summer-internship-hackathon-2026-tech.onrender.com/api/auths/colabcount",
          { withCredentials: true }
        );
        
        if (res.data && res.data.users) {
          setarr(res.data.users);
        }
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      } finally {
        setisloading(false); 
      }
    };

    fetchData();
  }, []);

  return (
    // FULL CYBER GREEN BACKGROUND (Matches your dashboard top section)
    <div className='bg-[#062013] bg-gradient-to-b from-[#04170d] to-[#082919]  w-full p-6 md:p-10 font-sans text-emerald-100'>
      
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-row justify-between items-center gap-4 border-b border-emerald-900/40 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Collaboration Roster</h1>
          <p className="text-emerald-400/70 text-xs mt-1">my members</p>
        </div>
        
        {/* Count Badge */}
        <div className="bg-[#03140b] text-emerald-400 border border-emerald-900 px-4 py-1.5 rounded-lg text-xs font-mono tracking-wider shadow-inner">
          COUNT // <span className="text-white font-bold ml-1">{arr.length}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto">
        {isloading ? (
          /* Bright Green Loading Spinner */
          <div className="flex flex-col items-center justify-center h-48">
            <div className="w-8 h-8 rounded-full border-2 border-emerald-500/10 border-t-emerald-400 animate-spin"></div>
            <p className="text-emerald-500 text-xs mt-3 font-mono tracking-widest uppercase animate-pulse">Loading Matrix...</p>
          </div>
        ) : arr.length === 0 ? (
          /* Empty State */
          <div className="bg-[#03140b]/60 rounded-xl p-10 text-center border border-emerald-900/30">
            <p className="text-emerald-600 text-sm">No active users found.</p>
          </div>
        ) : (
          /* Grid Layout for Users */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {arr.map((elem, index) => {
              const userName = typeof elem === 'object' ? elem.username || 'Anonymous' : elem;
              
              return (
                // Dark Green Cards that match the "Gym Status Metrics" blocks
                <div 
                  key={elem._id || index} 
                  className="bg-[#03160c]/90 rounded-xl p-4 border border-emerald-900/60 hover:border-emerald-400/40 shadow-lg shadow-black/20 transition-all duration-200 flex items-center space-x-3 group"
                >
                  {/* Neon Green Squircle Avatar */}
                  <div className="h-9 w-9 rounded-lg bg-emerald-400 flex items-center justify-center text-[#04170d] font-black text-sm uppercase shrink-0 transition-transform duration-200 group-hover:scale-105 shadow-md shadow-emerald-400/10">
                    {userName.charAt(0)}
                  </div>
                  
                  {/* User Details */}
                  <div className="truncate flex-1">
                    <h3 className="text-white font-medium text-sm truncate group-hover:text-emerald-300 transition-colors" title={userName}>
                      {userName}
                    </h3>
                    <div className="flex items-center space-x-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span className="text-[10px] text-emerald-400 font-mono tracking-wide uppercase">
                        Active
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

export default Usercount;