import React, { useState } from "react";
import axios from "axios";

const Superlogin = () => {
  const [qrImage, setQrImage] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setQrImage(""); // Purane QR code ko clear karne ke liye

    const { username, password, gymcode } = e.target.elements;

    try {
      const res = await axios.post(
        "https://summer-internship-hackathon-2026-tech.onrender.com/api/login/check", 
        {
          username: username.value,
          password: password.value,
          gymcode: gymcode.value,
        },
        { 
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
        }
      );

      console.log("Response from server:", res.data);

      if (res.data && res.data.qrimage) {
        // .replace(/\s/g, '') se hum string ke andar ke saare spaces (jo comma ke baad hai) ko remove kar rahe hain
        const cleanQrImage = res.data.qrimage.replace(/\s/g, '');
        setQrImage(cleanQrImage); 
        setMessage(res.data.message || "Entry Successful!");
      } else {
        setMessage("Success, but no QR code received.");
      }
    } catch (err) {
      console.error("Login request failed:", err);
      setMessage(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white font-sans p-4">
      <div className="bg-zinc-900 p-8 rounded-2xl shadow-2xl border border-zinc-800 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-500">Gym Portal Login</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input 
              name="username" 
              type="text"
              required
              placeholder="Username" 
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500" 
            />
          </div>
          <div>
            <input 
              name="gymcode" 
              type="text"
              required
              placeholder="Gym Code" 
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500" 
            />
          </div>
          <div>
            <input 
              name="password" 
              type="password" 
              required
              placeholder="Password" 
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500" 
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-500 transition-colors duration-200 text-white font-semibold p-3 rounded-lg disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Generate QR"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-zinc-400 border border-zinc-800 p-2 rounded bg-zinc-950">
            {message}
          </p>
        )}

        {/* QR CODE DISPLAY ZONE */}
        {qrImage && (
          <div className="mt-6 flex flex-col items-center border-t border-zinc-800 pt-6">
            <p className="text-sm text-zinc-400 mb-3">Your Attendance QR:</p>
            <div className="bg-white p-3 rounded-xl shadow-lg">
              <img 
                src={qrImage} 
                alt="Gym Access QR Code" 
                className="w-44 h-44 object-contain"
                onError={(e) => console.error("Image failed to load even after cleanup.")}
              />
            </div>
            <p className="text-xs text-zinc-500 mt-2">Scan at the gym counter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Superlogin;