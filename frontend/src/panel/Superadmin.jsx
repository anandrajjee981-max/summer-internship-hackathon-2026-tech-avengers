import React from 'react'
import Features from '../pages/Features'

const Superadmin = () => {
  return (
    // 'flex flex-col' lagaya taaki Hero section aur Features vertical stack ho jayein aur gap-12 se unke beech space bani rahe
    <div className="bg-gradient-to-br from-[#1b3b22] via-[#2d5a36] to-[#407c4d] w-full min-h-screen flex flex-col items-center justify-start font-sans px-4 py-8 gap-12">
      
      {/* Container - Hero Section */}
      <div className="relative w-full md:w-[90%] h-[60vh] md:h-[80vh] rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Direct Image Tag */}
        <img 
          src="https://i.pinimg.com/1200x/79/36/bd/7936bd2eff1bbc6ae763b694de61c2f2.jpg" 
          alt="Gym OS Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Text Overlay */}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-7xl font-black tracking-widest uppercase drop-shadow-2xl">
            gym os
          </h1>
        </div>

      </div>

      {/* Features Component Section */}
      <div className="w-full">
        <Features />
      </div>

    </div>
  )
}

export default Superadmin