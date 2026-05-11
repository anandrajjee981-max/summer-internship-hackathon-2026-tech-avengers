import React from 'react'
import { Link } from 'react-router-dom'
import Features from '../pages/Features'

const Superadmin = () => {
  return (
    // 'flex flex-col' lagaya taaki Hero section aur Features vertical stack ho jayein aur gap-12 se unke beech space bani rahe
    <div className="bg-gradient-to-br from-[#1b3b22] via-[#2d5a36] to-[#407c4d] w-full min-h-screen flex flex-col items-center justify-start font-sans px-4 py-8 gap-12 text-white relative">
      
      {/* 1. Navigation / Login Button */}
      <Link 
        to='/login' 
        className="absolute top-4 right-4 bg-white text-emerald-800 font-bold px-6 py-2 rounded-full shadow-lg hover:bg-neutral-100 transition z-10"
      >
        Login
      </Link>

      {/* 2. Container - Hero Section */}
      <div 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
        className="relative w-full md:w-[90%] h-[60vh] md:h-[80vh] rounded-2xl overflow-hidden shadow-2xl mt-12 bg-cover bg-center bg-no-repeat"
      >
        
        {/* Dark Overlay with Text */}
        <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-7xl font-black tracking-widest uppercase drop-shadow-2xl">
            FitNova
          </h1>
        </div>

      </div>

      {/* 3. Features Component Section */}
      <div className="w-full">
        <Features />
      </div>

    </div>
  )
}

export default Superadmin