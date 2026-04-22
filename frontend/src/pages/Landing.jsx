import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';
import Button from '../components/Button';

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl mx-auto pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      <main className="flex-grow z-10 relative">
        {/* Hero Section */}
        <section className="pt-32 pb-20 lg:pt-48 lg:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-up">
            <div className="inline-block mb-6 px-5 py-2 rounded-full border border-indigo-200 bg-indigo-50/70 text-indigo-700 font-bold text-sm backdrop-blur-md shadow-sm">
              ✨ The future of student management
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tight mb-8 drop-shadow-sm">
              Manage Students with <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Absolute Elegance</span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
              A premium, intuitive platform designed to help administrators track, add, edit, and organize student records effortlessly.
            </p>
            <div className="flex justify-center gap-6">
              <Link to="/dashboard">
                <Button variant="primary" className="text-lg px-8 py-4 shadow-blue-500/30">
                  Go to Dashboard <ArrowRight size={22} className="ml-2" />
                </Button>
              </Link>
              <Link to="/add">
                <Button variant="secondary" className="text-lg px-8 py-4">
                  Add New Student
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-black text-center text-gray-900 mb-16 tracking-tight">Core Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div 
                onClick={() => navigate('/dashboard')}
                className="group cursor-pointer bg-white/60 backdrop-blur-xl p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 text-center transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] hover:bg-white"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-inner">
                  <Users size={36} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Centralized Records</h3>
                <p className="text-gray-600 text-lg leading-relaxed font-medium">View all your students in one beautiful, easy-to-read dashboard.</p>
              </div>
              
              <div 
                onClick={() => navigate('/add')}
                className="group cursor-pointer bg-white/60 backdrop-blur-xl p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 text-center transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] hover:bg-white"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-200 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 transform transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 shadow-inner">
                  <BookOpen size={36} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Instant Updates</h3>
                <p className="text-gray-600 text-lg leading-relaxed font-medium">Click here to add, edit, or delete student profiles instantly.</p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-xl p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 text-center transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] hover:bg-white group">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-rose-200 text-rose-600 rounded-3xl flex items-center justify-center mx-auto mb-8 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-inner">
                  <ShieldCheck size={36} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Secure & Reliable</h3>
                <p className="text-gray-600 text-lg leading-relaxed font-medium">Built with modern architecture ensuring data integrity and validation.</p>
              </div>

            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
