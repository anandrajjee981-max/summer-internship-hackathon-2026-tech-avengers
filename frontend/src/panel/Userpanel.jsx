import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import axios from "axios";

const Userpanel = () => {
  const [scanResult, setScanResult] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [img, setimg] = useState("");
  
  const html5QrCodeRef = useRef(null);

  // 1. Camera Scanner Start
  const startCamera = async () => {
    try {
      if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode("reader");
      }
      
      setIsCameraActive(true);
      
      await html5QrCodeRef.current.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        async (decodedText) => {
          handleSuccess(decodedText);
        },
        (errorMessage) => {
          // Soft tracking errors ignored
        }
      );
    } catch (err) {
      console.error("Camera start error:", err);
      alert("Could not start camera. Please check permissions.");
      setIsCameraActive(false);
    }
  };

  // 2. Camera Stop
  const stopCamera = async () => {
    if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
      await html5QrCodeRef.current.stop();
      setIsCameraActive(false);
    }
  };

  // 3. Gallery File Scanner
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!html5QrCodeRef.current) {
      html5QrCodeRef.current = new Html5Qrcode("reader");
    }

    if (html5QrCodeRef.current.isScanning) {
      await stopCamera();
    }

    setIsProcessing(true);
    try {
      const decodedText = await html5QrCodeRef.current.scanFile(file, true);
      handleSuccess(decodedText);
    } catch (err) {
      console.error("File scan error:", err);
      alert("Could not find any valid QR Code in this image. Try another one!");
    } finally {
      setIsProcessing(false);
    }
  };

  // Common Success Handler
  const handleSuccess = async (decodedText) => {
    console.log("Scanned Content:", decodedText);
    setScanResult(decodedText);
    setIsProcessing(true);

    // Stop camera immediately upon detection so it doesn't loop fire requests
    await stopCamera();

    try {
      const response = await axios.post(
        "https://summer-internship-hackathon-2026-tech.onrender.com/api/login/check",
        { gymcode: decodedText },
        { withCredentials: true }
      );
      
      alert(`🎉 ${response.data.message || "Verification successful!"}`);
      if (response.data.qrimage) {
        setimg(response.data.qrimage);
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Verification failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Cleanup on Unmount
  useEffect(() => {
    return () => {
      if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
        html5QrCodeRef.current.stop().catch(err => console.error(err));
      }
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#051109] via-[#0b1f11] to-[#12311a] w-full min-h-screen flex flex-col justify-center items-center font-sans px-4 py-10">

      {/* Main Glassmorphic Card */}
      <div className="w-full max-w-md bg-black/40 backdrop-blur-2xl rounded-3xl p-8 border border-emerald-500/15 shadow-[0_0_50px_rgba(16,185,129,0.1)] text-center relative overflow-hidden">
        
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#10b981] to-transparent"></div>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-4 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <span className="text-3xl">🛡️</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Gym Entry Scanner
          </h1>
          <p className="text-emerald-400/70 text-sm mt-2 font-medium">
            Scan using camera or upload a QR from your gallery
          </p>
        </div>

        {/* Custom Video Area */}
        <div className="relative rounded-2xl border-2 border-emerald-500/20 bg-black/60 overflow-hidden mb-6 aspect-square max-w-[280px] mx-auto flex items-center justify-center">
          
          <div 
            id="reader" 
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isCameraActive ? 'opacity-100 z-10' : 'opacity-0 -z-10'}`}
          ></div>

          {!isCameraActive && (
            <div className="p-6 text-center z-20">
              <span className="text-5xl block mb-3 animate-bounce">📸</span>
              <p className="text-emerald-300/60 text-xs font-semibold">Camera is sleeping</p>
            </div>
          )}

          {isCameraActive && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-400 shadow-[0_0_15px_#10b981] z-20" style={{ animation: 'scan 2s linear infinite' }}></div>
          )}
        </div>

        {/* Action Controls */}
        <div className="space-y-4">
          {!isCameraActive ? (
            <button
              onClick={startCamera}
              className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-200"
            >
              Start Camera Scan
            </button>
          ) : (
            <button
              onClick={stopCamera}
              className="w-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-extrabold py-3.5 px-6 rounded-2xl border border-rose-500/30 transition-all duration-200"
            >
              Stop Camera
            </button>
          )}

          <div className="flex items-center gap-3 my-4">
            <span className="h-[1px] bg-emerald-950 flex-1"></span>
            <span className="text-emerald-500/50 text-xs font-bold uppercase tracking-wider">OR</span>
            <span className="h-[1px] bg-emerald-950 flex-1"></span>
          </div>

          <label className="block w-full">
            <span className="flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 text-emerald-300 font-bold py-3.5 px-6 rounded-2xl cursor-pointer transition-all duration-200">
              📁 Upload from Gallery
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {isProcessing && (
          <div className="mt-6 p-4 bg-emerald-950/40 border border-emerald-500/20 rounded-2xl flex items-center justify-center gap-3 text-emerald-300 text-sm font-semibold">
            <span className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></span>
            Verifying Gym Access...
          </div>
        )}

        {scanResult && (
          <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-2xl text-xs text-emerald-300 break-all">
            <span className="font-bold uppercase tracking-wider text-emerald-400 block mb-1">Last Decoded QR</span>
            <span className="font-mono text-gray-300">{scanResult}</span>
          </div>
        )}

      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
        #reader video {
          object-fit: cover !important;
          width: 100% !important;
          height: 100% !important;
        }
      `}</style>
    </div>
  );
};

export default Userpanel;