import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Usercount from '../pages/Usercount';

const AdminPanel = () => {
  const [qrImage, setQrImage] = useState("");

  useEffect(() => {
    // Read the QR string directly from localStorage
    const savedQr = localStorage.getItem('adminQrImage');
    if (savedQr) {
      setQrImage(savedQr);
    }
  }, []);

  const handleLogout = () => {
    // Clean up storage when logging out
    localStorage.removeItem('adminQrImage');
  };

  return (
    <div className="bg-gradient-to-br from-[#0a1f11] via-[#102b18] to-[#16361e] w-full min-h-screen font-sans text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Navbar section inside panel */}
        <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Admin Dashboard
            </h1>
            <p className="text-emerald-300 text-sm mt-1">
              Welcome back! Here is your gym access status.
            </p>
          </div>
          
          <Link to="/admin">
            <button 
              onClick={handleLogout}
              className="bg-red-600/80 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-xl border border-red-500/30 transition-all duration-200 text-sm"
            >
              Logout 🔒
            </button>
          </Link>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* QR Code Section Card */}
          <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/25 shadow-lg flex flex-col items-center justify-center text-center">
            <h3 className="text-xl font-bold mb-4 text-emerald-200">
              Your Portal QR Code
            </h3>
            
            {qrImage ? (
              <div className="bg-white p-4 rounded-2xl shadow-inner border-2 border-emerald-500">
                {/* Fixed syntax error: fully closed self-terminating image tag */}
                <img 
                  src={qrImage} 
                  alt="Admin Authenticator QR" 
                  className="w-44 h-44 object-contain"
                />
              </div>
            ) : (
              <div className="w-44 h-44 flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-2xl p-4 text-gray-400 text-sm">
                <span>⚠️ No QR Code Data Found</span>
                <span className="text-xs text-gray-500 mt-2">Please login again to generate.</span>
              </div>
            )}
            
            <p className="text-xs text-emerald-300/70 mt-4 max-w-[240px]">
              Use this unique code for authorization or collaborator sync checks.
            </p>
          </div>

          {/* Placeholder for other stats / panel details */}
          <div className="md:col-span-2 bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold mb-4 text-white">Gym Status Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-500/20">
                <span className="text-xs uppercase text-emerald-400 font-bold">Status</span>
                <p className="text-2xl font-black mt-1 text-white">Active</p>
              </div>
              <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-500/20">
                <span className="text-xs uppercase text-emerald-400 font-bold">Sync</span>
                <p className="text-2xl font-black mt-1 text-white">Connected</p>
              </div>
            </div>
            <p className="text-sm text-emerald-100/50 mt-6">
        paste this qr and mark attendence digitally 
            </p>
          </div>

        </div>

      </div>
      <div className='w-full'>
<Usercount/>

      </div>
    </div>
  );
};

export default AdminPanel;