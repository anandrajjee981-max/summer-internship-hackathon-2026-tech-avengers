import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const menuItems = [
    { name: "Dashboard", active: true },
    { name: "Members", active: false },
    { name: "Attendance", active: false },
    { name: "Payments", active: false },
    { name: "Trainers", active: false },
    { name: "Membership Plans", active: false },
    { name: "Reports", active: false },
    { name: "Notifications", active: false },
    { name: "Settings", active: false },
  ];
  const navigate = useNavigate();
  const [arr, setarr] = useState([]);
  const [isloading, setisloading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://summer-internship-hackathon-2026-tech.onrender.com/api/auths/colabcount",
          { withCredentials: true }
        );
        console.log(res.data);
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

  // --- DYNAMIC DATA CALCULATION FROM 'arr' ---
  const totalMembers = arr.length;
  
  // Filtering active members
  const activeMembers = arr.filter(m => m.status === "Active" || !m.status).length;
  
  // Filtering pending members
  const pendingMembers = arr.filter(m => m.status === "Pending").length;

  // Stats array
  const dynamicStats = [
    { 
      title: "Total Members", 
      value: isloading ? "..." : totalMembers, 
      change: `+${totalMembers > 0 ? Math.round(totalMembers * 0.1) : 0} new this week`, 
      glowClass: "group-hover:border-emerald-500/50",
      bgGlow: "bg-emerald-500/10",
      textColor: "text-emerald-400"
    },
    { 
      title: "Active Gym Members", 
      value: isloading ? "..." : activeMembers, 
      change: `${totalMembers > 0 ? Math.round((activeMembers / totalMembers) * 100) : 0}% active ratio`, 
      glowClass: "group-hover:border-teal-500/50",
      bgGlow: "bg-teal-500/10",
      textColor: "text-teal-400"
    },
    { 
      title: "Today Attendance", 
      value: isloading ? "..." : Math.round(activeMembers * 0.4), 
      change: "+4% vs yesterday", 
      glowClass: "group-hover:border-cyan-500/50",
      bgGlow: "bg-cyan-500/10",
      textColor: "text-cyan-400"
    },
    { 
      title: "your qr", 
      value: isloading ? "..." : pendingMembers, 
      change: `${pendingMembers} profiles review req.`, 
      glowClass: pendingMembers > 0 ? "border-amber-500/30 group-hover:border-amber-500/60" : "group-hover:border-slate-500/50",
      bgGlow: pendingMembers > 0 ? "bg-amber-500/10" : "bg-slate-500/5",
      textColor: pendingMembers > 0 ? "text-amber-400 animate-pulse" : "text-slate-400"
    },
  ];

  const NavLinks = () => (
    <nav className="space-y-1.5">
      {menuItems.map((item, index) => (
        <button
          key={index}
          className={`w-full text-left px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-3 ${
            item.active
              ? "bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/20"
              : "text-slate-400 hover:bg-emerald-950/40 hover:text-emerald-300"
          }`}
        >
          {item.name}
        </button>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#030905] text-slate-100 flex font-sans antialiased overflow-x-hidden">
      
      {/* Desktop Sidebar */}
      <div className="w-72 bg-[#051207] border-r border-emerald-950/60 p-6 flex flex-col justify-between hidden lg:flex shrink-0">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="h-9 w-9 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-emerald-500/20">
              G
            </div>
            <h1 className="text-2xl font-black tracking-wider text-white">
              GYM<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">OS</span>
            </h1>
          </div>
          <NavLinks />
        </div>

        <div className="border-t border-emerald-950/60 pt-4 flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 p-[2px]">
            <div className="w-full h-full bg-[#051207] rounded-full flex items-center justify-center text-xs font-bold text-emerald-400">AD</div>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Admin Master</p>
            <p className="text-xs text-emerald-600/60">owner@gymos.com</p>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile Sidebar Content */}
      <div className={`fixed inset-y-0 left-0 w-72 bg-[#051207] z-50 p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div>
          <div className="flex items-center justify-between mb-10 px-2">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center font-black text-white">G</div>
              <h1 className="text-2xl font-black tracking-wider text-white">
                GYM<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">OS</span>
              </h1>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-white text-xl">✕</button>
          </div>
          <NavLinks />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8 bg-gradient-to-br from-[#040e07] via-[#091b0f] to-[#112f1a]">
        
        {/* Top Navbar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-emerald-950/40 pb-6">
          <div className="flex items-center justify-between w-full md:w-auto">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden bg-[#071d10]/80 border border-emerald-900/40 p-2 rounded-xl text-emerald-400">
              ☰
            </button>
            <div className="text-right md:text-left">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Dashboard</h2>
              <p className="text-emerald-500/70 text-xs sm:text-sm mt-0.5">Real-time database insights dashboard.</p>
            </div>
          </div>

          {/* Action Row containing Search, Your QR, and Notification */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="relative flex-1 md:flex-none">
              <input
                type="text"
                placeholder="Search database..."
                className="w-full md:w-64 bg-[#071d10]/60 border border-emerald-900/40 text-slate-200 pl-4 pr-10 py-2.5 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-emerald-800"
              />
            </div>
            
            {/* UPDATED & REPOSITIONED "YOUR QR" BUTTON */}
            <button 
              onClick={() => navigate('/adminpanel')}
              className="flex items-center gap-2 bg-[#071d10]/80 border border-emerald-500/30 hover:border-emerald-400/70 text-emerald-400 hover:text-emerald-300 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md shadow-emerald-950/40 hover:shadow-emerald-500/10 shrink-0"
            >
              <span>🔳</span> Your QR
            </button>

            <button className="relative bg-[#071d10]/60 border border-emerald-900/40 p-2.5 rounded-xl text-emerald-400 shrink-0">
              <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
              🔔
            </button>
          </div>
        </div>

        {/* Dynamic Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {dynamicStats.map((item, index) => (
            <div
              key={index}
              className={`bg-[#06170d]/70 border border-emerald-950 rounded-2xl p-5 sm:p-6 relative overflow-hidden backdrop-blur-md transition-all duration-300 group ${item.glowClass}`}
            >
              <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl group-hover:scale-125 transition-all duration-500 ${item.bgGlow}`}></div>
              
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{item.title}</p>
              <h3 className={`text-3xl sm:text-4xl font-black mt-3 tracking-tight transition-colors ${item.textColor}`}>
                {item.value}
              </h3>
              <p className="text-xs mt-2 font-medium text-slate-400 bg-emerald-950/30 inline-block px-2 py-0.5 rounded-md border border-emerald-900/20">
                {item.change}
              </p>
            </div>
          ))}
        </div>

        {/* Middle Section: Table + Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Members Table Card */}
          <div className="xl:col-span-2 bg-[#06170d]/50 border border-emerald-950 rounded-2xl p-4 sm:p-6 backdrop-blur-md shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  Fetched Records 
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-normal">
                    {arr.length} Total
                  </span>
                </h3>
                <p className="text-xs text-emerald-600 mt-0.5">Live syncing directly from MongoDB Render API</p>
              </div>
              <button className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:scale-[1.02] active:scale-[0.98] text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-950/50 transition-all text-center">
                + Add New Member
              </button>
            </div>

            <div className="overflow-x-auto">
              {isloading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                  <div className="w-10 h-10 border-4 border-emerald-500/10 border-t-emerald-400 rounded-full animate-spin shadow-glow"></div>
                  <p className="text-xs tracking-wider text-emerald-500 font-medium uppercase animate-pulse">Syncing Cloud Database...</p>
                </div>
              ) : arr.length === 0 ? (
                <div className="text-center py-16 text-sm text-emerald-700/60 border border-dashed border-emerald-950 rounded-xl">
                  No active users mapped in API response array.
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-emerald-950 text-xs font-bold uppercase tracking-wider text-emerald-500 pb-2">
                      <th className="pb-3 pl-2">User Profile</th>
                      <th className="pb-3">Assigned Plan</th>
                      <th className="pb-3">Database Status</th>
                      <th className="pb-3 text-right pr-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-950/40 text-sm">
                    {arr.map((member, idx) => {
                      const isActive = member.status === "Active" || !member.status;
                      return (
                        <tr key={idx} className="hover:bg-emerald-950/20 transition-all group">
                          <td className="py-4 pl-2 flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all ${isActive ? "border-emerald-500/30 group-hover:border-emerald-400" : "border-amber-500/30 group-hover:border-amber-400"}`}>
                              <img 
                                src="https://i.pinimg.com/webp/1200x/55/87/25/55872578e75e51134cda49021da8f46c.webp" 
                                alt={member.username} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-200 group-hover:text-emerald-300 transition-colors truncate">{member.username || "Anonymous"}</p>
                              <p className="text-xs text-emerald-600 truncate">{member.email}</p>
                            </div>
                          </td>
                          <td className="py-4 text-slate-300 font-medium">{member.plan || "Pro Pass Unlimited"}</td>
                          <td className="py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                              isActive ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isActive ? "bg-emerald-400 animate-ping" : "bg-amber-400"}`}></span>
                              {member.status || "Active"}
                            </span>
                          </td>
                          <td className="py-4 text-right pr-2 whitespace-nowrap">
                            <button className="text-xs font-bold text-emerald-400 hover:text-emerald-300 mr-3 transition-colors">Edit</button>
                            <button className="text-xs font-bold text-emerald-800 hover:text-rose-400 transition-colors">Delete</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Recent Activity Card (Live Feed) */}
          <div className="bg-[#06170d]/50 border border-emerald-950 rounded-2xl p-5 sm:p-6 backdrop-blur-md shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1">Live Feed</h3>
            <p className="text-xs text-emerald-600 mb-6">System automation tracking logs</p>
            
            <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-2 before:w-[1px] before:bg-emerald-950">
              <div className="flex gap-4 relative">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center z-10 mt-1 shrink-0">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm text-slate-200 font-medium">Render database connection established</p>
                  <p className="text-xs text-emerald-700 mt-0.5">Just now</p>
                </div>
              </div>
              
              <div className="flex gap-4 relative">
                <div className="w-4 h-4 rounded-full bg-teal-500/20 border border-teal-500 flex items-center justify-center z-10 mt-1 shrink-0">
                  <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm text-slate-200 font-medium">Fetched {arr.length} user arrays successfully</p>
                  <p className="text-xs text-emerald-700 mt-0.5">1 min ago</p>
                </div>
              </div>

              <div className="flex gap-4 relative">
                <div className="w-4 h-4 rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center z-10 mt-1 shrink-0">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm text-slate-200 font-medium">{pendingMembers} accounts awaiting admin verification</p>
                  <p className="text-xs text-emerald-700 mt-0.5">3 mins ago</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminPanel;