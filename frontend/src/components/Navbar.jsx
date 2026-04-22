import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? "text-indigo-600 font-extrabold" : "text-gray-600 hover:text-indigo-600 font-medium";
  };

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-white/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-2xl text-white shadow-lg shadow-indigo-500/30">
              <GraduationCap size={26} strokeWidth={2.5} />
            </div>
            <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">EduManage</span>
          </Link>
          <nav className="flex gap-8">
            <Link to="/" className={`transition-all duration-300 relative group text-lg ${isActive('/')}`}>
              Home
              <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 transition-all duration-300 ${location.pathname === '/' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>
            <Link to="/dashboard" className={`transition-all duration-300 relative group text-lg ${isActive('/dashboard')}`}>
              Dashboard
              <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 transition-all duration-300 ${location.pathname === '/dashboard' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
