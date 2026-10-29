import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, User, Menu, BookOpen, GraduationCap, Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';

export default function Navbar() {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-12 transition-transform">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent hidden sm:block">
              EduSmart AI
            </span>
          </Link>
        </div>

        <div className="flex-1 max-w-2xl hidden md:block">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder="Search by class, subject, or chapter..."
              className="w-full bg-slate-100 border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>
          <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block" />
          <Link 
            to="/profile"
            className="flex items-center gap-2 p-1 pr-3 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
              JD
            </div>
            <span className="text-sm font-medium text-slate-700 hidden lg:block">John Doe</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
