import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ChatBot from './ChatBot';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-65px)]">
          {children}
        </main>
      </div>
      <ChatBot />
    </div>
  );
}
