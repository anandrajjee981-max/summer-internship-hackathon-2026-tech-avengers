import React from 'react'

const features = [
  {
    title: "Smart QR Attendance",
    description: "Instant touchless check-ins for members with high-speed QR scanning.",
    icon: "⚡"
  },
  {
    title: "AI-Powered Gym Analytics",
    description: "Get smart insights, member retention trends, and peak hour reports.",
    icon: "📊"
  },
 
  {
    title: "Multi-Gym SaaS Platform",
    description: "Manage multiple branches, staff, and overall business from a single dashboard.",
    icon: "🌐"
  },
  {
    title: "Customer Mobile App",
    description: "Dedicated iOS & Android apps for members to track workouts and active plans.",
    icon: "📱"
  },
  {
    title: "Real-Time Tracking",
    description: "Live floor occupancy tracker and instant member check-in updates.",
    icon: "⏱️"
  },

];

const Features = () => {
  return (
    // min-h-screen dynamic overflow handle karega, and w-full isko bounded rakhega
    <div className="w-full min-h-screen py-12 md:py-20 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-[#a3e635] text-xs md:text-sm font-bold uppercase tracking-widest mb-2">
            Core Features
          </h2>
          <h1 className="text-white text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Everything you need to <span className="block md:inline-block text-[#1b3b22] bg-white px-3 py-1 rounded-lg mt-2 md:mt-0 text-2xl md:text-4xl">Scale your Gym</span>
          </h1>
          <p className="text-gray-300 mt-4 text-base md:text-lg max-w-2xl mx-auto px-2">
            Supercharge your fitness business with our next-generation SaaS management tool.
          </p>
        </div>

        {/* Features Grid Layout - Purely Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 md:p-6 hover:border-[#407c4d] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group flex flex-col items-start"
            >
              <div className="text-3xl md:text-4xl mb-3 md:mb-4 bg-[#2d5a36]/30 w-12 h-12 flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-white text-lg md:text-xl font-bold mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Features