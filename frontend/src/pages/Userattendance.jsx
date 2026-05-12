import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Userattendance = () => {
  const [arr, setarr] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://summer-internship-hackathon-2026-tech.onrender.com/api/login/sheet",
          { withCredentials: true }
        );
        
        if (res.data && res.data.attendsheet) {
          setarr(res.data.attendsheet);
        }
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    /* Page Container: Match skin with deep background and a subtle top green gradient wash */
    <div className="h-screen bg-[#030303] bg-gradient-to-b from-emerald-950/10 via-[#030303] to-[#030303] text-white font-sans px-4 py-6 md:py-8 md:px-6 flex flex-col overflow-hidden">
      
      {/* Header Section */}
      <div className="max-w-[1200px] w-full mx-auto mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-[#121214] pb-4 shrink-0">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Attendance Register
          </h2>
          <p className="text-[#6e6e77] text-xs md:text-sm font-medium">
            Daily log of punch-ins, durations, and gym codes
          </p>
        </div>
        <div className="bg-[#09090b] border border-[#162a1e]/30 px-4 py-2 rounded-xl text-xs text-[#a1a1aa] font-medium flex items-center gap-2 w-fit">
          Total Records <span className="text-[#10b981] font-semibold bg-[#10b981]/10 px-2 py-0.5 rounded-md">{arr.length}</span>
        </div>
      </div>

      {/* Main Content Area - Handles infinite database entry overflows safely */}
      <div className="max-w-[1200px] w-full mx-auto flex-1 flex flex-col min-h-0">
        {loading ? (
          <div className="flex justify-center items-center flex-1">
            <div className="w-8 h-8 border-2 border-emerald-500/10 border-t-[#10b981] rounded-full animate-spin"></div>
          </div>
        ) : arr.length === 0 ? (
          <div className="text-center text-[#71717a] my-auto py-12 text-sm font-medium">
            No attendance records found
          </div>
        ) : (
          /* Container Box with Custom Dark Scrollbar Logic */
          <div className="w-full bg-[#09090b]/90 backdrop-blur-md border border-[#18181b] rounded-2xl flex flex-col min-h-0 overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.9)]">
            
            {/* Mobile Layout: Auto-scroll container inside card matrix */}
            <div className="flex flex-col gap-3 p-4 overflow-y-auto md:hidden flex-1 custom-scrollbar">
              {arr.map((elem, index) => (
                <div key={elem._id || index} className="bg-[#0d0d11] border border-[#162a1e]/20 rounded-xl p-4 flex flex-col gap-3 hover:border-[#10b981]/20 transition-all">
                  <div className="flex justify-between items-center border-b border-[#121214] pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#71717a] font-medium">#{index + 1}</span>
                      <span className="text-sm font-semibold text-[#f4f4f5]">{elem.gymcode}</span>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      elem.status === 'INSIDE' 
                        ? 'bg-emerald-500/10 text-[#4ade80] border-emerald-500/20' 
                        : 'bg-red-500/10 text-[#f87171] border-red-500/15'
                    }`}>
                      <span className={`w-1 h-1 rounded-full ${elem.status === 'INSIDE' ? 'bg-[#4ade80]' : 'bg-[#f87171]'}`}></span>
                      {elem.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-[#71717a] mb-0.5">Date</p>
                      <p className="text-[#cbd5e1] font-medium">{elem.date || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-[#71717a] mb-0.5">Duration</p>
                      <p className="text-[#cbd5e1] font-medium">{elem.duration} mins</p>
                    </div>
                  </div>

                  <div className="pt-1 flex justify-end">
                    <button className="text-[#10b981] text-xs font-semibold bg-[#10b981]/5 hover:bg-[#10b981]/10 px-3 py-1.5 rounded-lg active:scale-95 transition-all">
                      Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table Layout: Sticky header with content scroll bar protection */}
            <div className="hidden md:block overflow-y-auto custom-scrollbar flex-1">
              <table className="w-full text-left text-sm relative border-collapse">
                <thead>
                  <tr className="bg-[#0d0d11] text-[#71717a] text-xs font-semibold uppercase tracking-wider border-b border-[#18181b] sticky top-0 z-10">
                    <th className="px-6 py-4 bg-[#0d0d11]">S.No.</th>
                    <th className="px-6 py-4 bg-[#0d0d11]">Date</th>
                    <th className="px-6 py-4 bg-[#0d0d11]">Gym Code</th>
                    <th className="px-6 py-4 bg-[#0d0d11]">Duration</th>
                    <th className="px-6 py-4 text-center bg-[#0d0d11]">Status</th>
                    <th className="px-6 py-4 text-right bg-[#0d0d11]">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#121214]">
                  {arr.map((elem, index) => (
                    <tr key={elem._id || index} className="hover:bg-[#10b981]/[0.02] transition-colors duration-150 group">
                      <td className="px-6 py-[16px] text-[#cbd5e1]">{index + 1}</td>
                      <td className="px-6 py-[16px] text-[#cbd5e1]">{elem.date || "N/A"}</td>
                      <td className="px-6 py-[16px] font-semibold text-[#f4f4f5]">{elem.gymcode}</td>
                      <td className="px-6 py-[16px]">
                        <span className="bg-[#121214] border border-[#27272a] px-3 py-1.5 rounded-lg text-xs text-[#e4e4e7] font-medium">
                          {elem.duration} mins
                        </span>
                      </td>
                      <td className="px-6 py-[16px] text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide border ${
                          elem.status === 'INSIDE' 
                            ? 'bg-emerald-500/10 text-[#4ade80] border-emerald-500/20' 
                            : 'bg-red-500/10 text-[#f87171] border-red-500/15'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${elem.status === 'INSIDE' ? 'bg-[#4ade80]' : 'bg-[#f87171]'}`}></span>
                          {elem.status}
                        </span>
                      </td>
                      <td className="px-6 py-[16px] text-right">
                        <button className="text-[#10b981] group-hover:bg-[#10b981]/10 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200">
                          Details →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

/* Custom Scrollbar Injection to match premium dark moss theme */
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #09090b;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #162a1e; /* Dark matching green-slate track */
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #10b981; /* Highlighting to vibrant emerald on interactions */
    }
  `;
  document.head.appendChild(styleSheet);
}

export default Userattendance;