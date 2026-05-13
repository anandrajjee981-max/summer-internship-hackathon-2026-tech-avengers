import React from "react";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const features = [
    { id: 1, title: "Workout Plan", icon: "🏋️‍♂️", desc: "Today's training routine" },
    { id: 2, title: "Diet Chart", icon: "🥗", desc: "Daily nutrition plan" },
    { id: 3, title: "Progress", icon: "📈", desc: "Track body transformation" },
    { id: 4, title: "Supplements", icon: "💊", desc: "Dosage & inventory" },
    { id: 5, title: "Attendance", icon: "🕒", desc: "Gym check-in history" },
    { id: 6, title: "Settings", icon: "⚙️", desc: "Profile & privacy" },
  ];

  const planDetails = [
    { title: "Start Date", value: "May 07, 2026", icon: "📅" },
    { title: "End Date", value: "Jun 06, 2026", icon: "✅" },
    { title: "Final Amount", value: "₹650", icon: "💰" },
    { title: "Paid", value: "₹650", icon: "💳" },
    { title: "Plan Amount", value: "₹600", icon: "🏷️" },
    { title: "Due", value: "₹0", icon: "⚠️" },
    { title: "Discount", value: "₹50", icon: "🎯" },
    { title: "Tax/Enroll", value: "0/100", icon: "🧾" },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#051109] via-[#0b1f11] to-[#12311a] text-white px-4 py-8 font-sans">

      {/* TOP BANNER */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="relative rounded-3xl overflow-hidden border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.08)]">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48"
            alt="gym"
            className="w-full h-[250px] object-cover opacity-70"
          />

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="absolute bottom-6 left-6">
            <h1 className="text-3xl font-black tracking-tight">
               FITNESS CLUB
            </h1>
            <p className="text-emerald-300 text-sm font-medium">
              Transform Your Body • Transform Your Life
            </p>
          </div>
        </div>
      </div>

      {/* USER PROFILE CARD */}
      <div className="max-w-5xl mx-auto mb-10">
        <div className="bg-black/40 backdrop-blur-2xl rounded-3xl p-6 border border-emerald-500/15 flex items-center gap-5 shadow-xl">

          <div className="relative">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-emerald-500/30">
              <img
                src="https://i.pinimg.com/1200x/75/c6/af/75c6af9672cf147f81b3054f0876472e.jpg"
                alt="user"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0b1f11]"></div>
          </div>

          <div>
            <h2 className="text-2xl font-black">Hi, user 👋</h2>
            <p className="text-emerald-400/70 font-medium">
              Pro Member • Gym Management System
            </p>
          </div>
        </div>
      </div>

      {/* PLAN DETAILS */}
      <div className="max-w-5xl mx-auto mb-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold uppercase tracking-widest text-emerald-400">
            Your Plan Details
          </h3>
          <Link  to='/user' >
          
           <button className="px-5 py-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 transition">
            📸 scan 
          </button>
          </Link>
         
        </div>

        <div className="bg-black/40 backdrop-blur-2xl rounded-3xl p-6 border border-emerald-500/15 shadow-lg">
          <div className="mb-6">
            <h2 className="text-3xl font-black">2PM - 9PM</h2>
            <p className="text-emerald-400/60">
              Invoice: INV1451
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {planDetails.map((item, index) => (
              <div
                key={index}
                className="bg-[#101d14] border border-emerald-500/10 rounded-2xl p-4 hover:border-emerald-500/30 transition"
              >
                <p className="text-sm text-emerald-300/70 mb-2">
                  {item.icon} {item.title}
                </p>
                <h4 className="text-lg font-bold">
                  {item.value}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURE CARDS */}
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold uppercase tracking-widest text-emerald-400">
            Dashboard
          </h3>
          <span className="h-[1px] bg-emerald-950 flex-1 ml-4"></span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((item) => (
            <div
              key={item.id}
              className="bg-black/40 backdrop-blur-xl rounded-2xl p-5 border border-emerald-500/10 hover:border-emerald-500/40 transition-all duration-300 cursor-pointer hover:-translate-y-1 shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-2xl mb-4">
                {item.icon}
              </div>

              <h4 className="font-bold text-white mb-1">
                {item.title}
              </h4>

              <p className="text-emerald-400/50 text-xs font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM BUTTON */}
      <div className="max-w-5xl mx-auto mt-10">
        <Link to='/attend' >
           <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600/20 to-emerald-900/20 border border-emerald-500/30 text-emerald-400 font-black uppercase hover:from-emerald-500 hover:to-emerald-700 hover:text-white transition-all">
        your attendence sheet 
        </button>
        
        </Link>
     
      </div>
    </div>
  );
};

export default UserDashboard;