import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut, User } from 'lucide-react';
import authService from '../services/authService';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  const isActive = (path) => {
    return location.pathname === path ? "text-indigo-600 font-extrabold" : "text-gray-600 hover:text-indigo-600 font-medium";
  };

  useEffect(() => {
    // Get user info from localStorage or API
    const getUserInfo = async () => {
      if (authService.isAuthenticated()) {
        try {
          const userData = await authService.getProfile();
          setUser(userData.user);
        } catch (error) {
          // Token might be expired, logout user
          authService.logout();
          navigate('/login');
        }
      }
    };
    
    getUserInfo();
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-white/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/dashboard" className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-2xl text-white shadow-lg shadow-indigo-500/30">
              <GraduationCap size={26} strokeWidth={2.5} />
            </div>
            <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">EduManage</span>
          </Link>
          
          <nav className="flex items-center gap-8">
            <Link to="/dashboard" className={`transition-all duration-300 relative group text-lg ${isActive('/dashboard')}`}>
              Dashboard
              <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 transition-all duration-300 ${location.pathname === '/dashboard' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>
            
            {/* User Info and Logout */}
            {user && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-sm">{user.name}</span>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium text-sm"
                  title="Logout"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
