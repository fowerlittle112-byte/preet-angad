import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  FileText, 
  Trophy, 
  Calendar, 
  Download, 
  Settings, 
  HelpCircle,
  GraduationCap,
  Play,
  Book
} from 'lucide-react';
import { CLASSES } from '../constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Sidebar() {
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: BookOpen, label: 'Study Material', path: '/study-material' },
    { icon: Play, label: 'Video Lessons', path: '/video-lessons' },
    { icon: Book, label: 'NCERT Books', path: '/ncert-books' },
    { icon: Trophy, label: 'Quiz Zone', path: '/quiz' },
    { icon: Calendar, label: 'Exam Prep', path: '/exam-prep' },
    { icon: Download, label: 'Downloads', path: '/downloads' },
  ];



  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-[calc(100vh-65px)] sticky top-[65px] hidden lg:flex flex-col p-4">
      <div className="space-y-1 mb-8">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Main Menu</p>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all group",
              isActive 
                ? "bg-indigo-50 text-indigo-600" 
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-colors",
              "group-hover:text-indigo-600"
            )} />
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="space-y-1">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Classes</p>
        <div className="grid grid-cols-2 gap-2">
          {CLASSES.map((cls) => (
            <NavLink
              key={cls}
              to={`/class/${cls}`}
              className={({ isActive }) => cn(
                "flex items-center justify-center py-2 rounded-xl text-xs font-bold border transition-all",
                isActive
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200"
                  : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
              )}
            >
              Class {cls}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="mt-auto p-4 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl text-white relative overflow-hidden group">
        <div className="relative z-10">
          <p className="text-xs font-medium text-indigo-100">Upgrade to</p>
          <p className="text-lg font-bold">Pro Plan</p>
          <p className="text-[10px] text-indigo-100 mt-1 opacity-80">Get unlimited AI help & mock tests</p>
          <button className="mt-3 w-full bg-white text-indigo-600 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-50 transition-colors">
            Learn More
          </button>
        </div>
        <GraduationCap className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
      </div>
    </aside>
  );
}
