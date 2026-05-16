import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UserDashboard = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [id, setid] = useState("");
  const [loading, setLoading] = useState(true);

  const features = [
    { id: 1, title: "Workout Plan", icon: "🏋️‍♂️", desc: "Today's training routine", glow: "group-hover:border-emerald-500/50" },
    { id: 2, title: "Diet Chart", icon: "🥗", desc: "Daily nutrition plan", glow: "group-hover:border-teal-500/50" },
    { id: 3, title: "Progress", icon: "📈", desc: "Track body transformation", glow: "group-hover:border-cyan-500/50" },
    { id: 4, title: "Supplements", icon: "💊", desc: "Dosage & inventory", glow: "group-hover:border-lime-500/50" },
    { id: 5, title: "Attendance", icon: "🕒", desc: "Gym check-in history", glow: "group-hover:border-emerald-500/50" },
    { id: 6, title: "Settings", icon: "⚙️", desc: "Profile & privacy", glow: "group-hover:border-slate-500/50" },
  ];

  const planDetails = [
    { title: "Start Date", value: "May 07, 2026", icon: "📅", textColor: "text-slate-300" },
    { title: "End Date", value: "Jun 06, 2026", icon: "✅", textColor: "text-slate-300" },
    { title: "Final Amount", value: "₹650", icon: "💰", textColor: "text-emerald-400" },
    { title: "Paid", value: "₹650", icon: "💳", textColor: "text-emerald-400 font-extrabold" },
    { title: "Plan Amount", value: "₹600", icon: "🏷️", textColor: "text-slate-400" },
    { title: "Due", value: "₹0", icon: "⚠️", textColor: "text-teal-400" },
    { title: "Discount", value: "₹50", icon: "🎯", textColor: "text-lime-400" },
    { title: "Tax/Enroll", value: "0/100", icon: "🧾", textColor: "text-slate-400" },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          "https://summer-internship-hackathon-2026-tech.onrender.com/api/auth/getme",
          { withCredentials: true } // Cookies ya tokens authentication ke liye safe side check
        );
        
        if (res.data && res.data.user) {
          setusername(res.data.user.username);
          setemail(res.data.user.email);
          // Agar database se id mil rahi hai toh short ID show karne ke liye slice kiya hai
          setid(res.data.user.id || res.data.user._id || "N/A");
        }
      } catch (error) {
        console.error("Error fetching user dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#040e07] via-[#091b0f] to-[#112f1a] text-slate-100 px-4 py-6 sm:py-10 font-sans antialiased overflow-x-hidden">
      
      {/* 1. TOP HERO BANNER */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="relative rounded-[2rem] overflow-hidden border border-emerald-950 shadow-2xl group">
          <div className="absolute inset-0 bg-gradient-to-t from-[#06170d] via-black/30 to-transparent z-10" />
          
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80"
            alt="gym banner"
            className="w-full h-[180px] sm:h-[260px] object-cover scale-105 group-hover:scale-100 transition-transform duration-700 opacity-60"
          />

          <div className="absolute inset-0 bg-black/20 z-10"></div>

          <div className="absolute bottom-6 left-6 sm:left-10 z-20">
            <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] uppercase font-black tracking-widest px-2.5 py-1 rounded-md backdrop-blur-md">
              GymOS Member Hub
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tighter text-white mt-2">
              FITNESS CLUB
            </h1>
            <p className="text-emerald-400/80 text-xs sm:text-sm font-medium mt-1">
              Transform Your Body • Transform Your Life
            </p>
          </div>
        </div>
      </div>

      {/* 2. USER PROFILE BENTO CARD (DYNAMIC DATA INTEGRATED) */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="bg-[#06170d]/60 border border-emerald-950 backdrop-blur-3xl rounded-[2rem] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl"></div>
          
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-emerald-500/20 ring-4 ring-emerald-950/40">
                <img
                  src="https://i.pinimg.com/1200x/75/c6/af/75c6af9672cf147f81b3054f0876472e.jpg"
                  alt="user avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#091b0f] animate-pulse"></div>
            </div>

            <div>
              {loading ? (
                <div className="space-y-2">
                  <div className="h-6 w-32 bg-emerald-950/60 animate-pulse rounded-md"></div>
                  <div className="h-4 w-48 bg-emerald-950/40 animate-pulse rounded-md"></div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl sm:text-2xl font-black text-white capitalize">
                    Hi, {username || "Fitness Freak"} 👋
                  </h2>
                  <p className="text-emerald-500/70 text-xs sm:text-sm font-medium mt-0.5 flex flex-wrap gap-x-2 items-center">
                    <span>Pro Elite Member</span>
                    <span className="text-emerald-800">•</span>
                    <span className="text-emerald-400 font-mono">ID: #{id ? id.toString().slice(-6).toUpperCase() : "1451"}</span>
                    <span className="text-emerald-800 hidden sm:inline">•</span>
                    <span className="text-slate-400 text-xs hidden sm:inline">{email}</span>
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Quick Scan Call to Action Button */}
          <Link to="/user" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black font-bold text-sm tracking-wide transition-all duration-300 shadow-lg active:scale-95">
              <span>📸</span> Digital ID Pass
            </button>
          </Link>
        </div>
      </div>

      {/* 3. PLAN DETAILS GRID */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-4 pl-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-500">
            Current Subscription Breakdown
          </h3>
          <span className="h-[1px] bg-emerald-950 flex-1"></span>
        </div>

        <div className="bg-[#06170d]/40 border border-emerald-950 backdrop-blur-3xl rounded-[2rem] p-5 sm:p-6 shadow-2xl">
          <div className="mb-6 border-b border-emerald-950 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">2:00 PM - 9:00 PM</h2>
              <p className="text-emerald-600 text-xs font-semibold uppercase tracking-wider mt-0.5">
                Standard Afternoon-Evening Batch
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs font-mono text-slate-500">System Log Reference: INV1451</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {planDetails.map((item, index) => (
              <div
                key={index}
                className="bg-[#040e07]/60 border border-emerald-950/60 rounded-xl p-3.5 hover:border-emerald-900/60 transition-all duration-300 flex flex-col justify-between"
              >
                <p className="text-[11px] font-bold text-emerald-600/80 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <span>{item.icon}</span> {item.title}
                </p>
                <h4 className={`text-sm sm:text-base font-bold tracking-tight ${item.textColor}`}>
                  {item.value}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. DASHBOARD BENTO UTILITIES */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-4 pl-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-500">
            Features & Management
          </h3>
          <span className="h-[1px] bg-emerald-950 flex-1"></span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {features.map((item) => (
            <div
              key={item.id}
              className={`bg-[#06170d]/60 border border-emerald-950/80 backdrop-blur-3xl rounded-2xl p-5 transition-all duration-300 cursor-pointer group relative overflow-hidden flex flex-col justify-between hover:-translate-y-1 ${item.glow}`}
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/[0.02] group-hover:bg-emerald-500/[0.05] rounded-full blur-xl transition-all duration-500" />
              
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-950/50 border border-emerald-900/30 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>

                <h4 className="font-bold text-slate-200 group-hover:text-emerald-400 transition-colors text-sm sm:text-base">
                  {item.title}
                </h4>
              </div>

              <p className="text-slate-500 group-hover:text-slate-400 text-xs font-medium mt-1 transition-colors">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. BOTTOM UTILITY ACTIONS */}
      <div className="max-w-5xl mx-auto">
        <Link to="/attend">
          <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#0a1f11]/60 to-emerald-950/40 border border-emerald-900/40 text-emerald-400 hover:text-emerald-200 text-xs sm:text-sm font-black uppercase tracking-widest hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all duration-300 active:scale-[0.99]">
            📊 View Attendance Analytics Sheet
          </button>
        </Link>
      </div>

    </div>
  );
};

export default UserDashboard;