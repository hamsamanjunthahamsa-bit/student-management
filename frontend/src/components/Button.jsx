import React from 'react';

export default function Button({ children, variant = 'primary', type = 'button', onClick, className = '', disabled = false }) {
  const baseStyle = "px-6 py-2.5 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-1",
    secondary: "bg-white/80 backdrop-blur-sm text-gray-800 border border-gray-200 hover:bg-white shadow-sm hover:shadow-md hover:-translate-y-1",
    danger: "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-1",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
