import React from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  ArrowRight, 
  BookOpen, 
  Trophy, 
  Zap, 
  Users, 
  Star,
  CheckCircle2,
  GraduationCap,
  Book
} from 'lucide-react';

import { Link } from 'react-router-dom';
import { CLASSES, SUBJECTS } from '../constants';

export default function Home() {
  const features = [
    { 
      icon: Zap, 
      title: 'AI Study Assistant', 
      desc: 'Get instant answers to any academic question, 24/7.',
      color: 'bg-amber-100 text-amber-600'
    },
    { 
      icon: BookOpen, 
      title: 'NCERT Solutions', 
      desc: 'Step-by-step solutions for all subjects from Class 6-12.',
      color: 'bg-indigo-100 text-indigo-600'
    },
    { 
      icon: Trophy, 
      title: 'Interactive Quizzes', 
      desc: 'Test your knowledge with chapter-wise AI-generated quizzes.',
      color: 'bg-emerald-100 text-emerald-600'
    },
    { 
      icon: Zap, 
      title: 'Video Lessons', 
      desc: 'Watch curated educational videos from top teachers.',
      color: 'bg-rose-100 text-rose-600'
    },
    { 
      icon: Book, 
      title: 'NCERT Textbooks', 
      desc: 'Access and download official NCERT PDFs for free.',
      color: 'bg-blue-100 text-blue-600'
    },
  ];



  const stats = [
    { label: 'Active Students', value: '50K+' },
    { label: 'Study Materials', value: '10K+' },
    { label: 'Questions Solved', value: '1M+' },
    { label: 'Success Rate', value: '98%' },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 p-8 sm:p-12 lg:p-16 text-white">
        <div className="relative z-10 max-w-3xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium border border-white/20"
          >
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>The #1 AI Study Companion for CBSE Students</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight"
          >
            Master Your Studies with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">
              AI-Powered Learning
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-indigo-100 max-w-xl leading-relaxed"
          >
            Get complete study material, NCERT solutions, and an AI teacher that answers your questions instantly. Designed for Class 6 to 12.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Link
              to="/class/10"
              className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition-all shadow-lg shadow-indigo-900/20 flex items-center gap-2 group"
            >
              Start Learning Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="bg-indigo-500/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all">
              Watch Demo
            </button>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative h-full flex items-center justify-center"
          >
            <div className="absolute w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" />
            <GraduationCap className="w-64 h-64 text-white/10 rotate-12" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center"
          >
            <p className="text-3xl font-extrabold text-indigo-600 mb-1">{stat.value}</p>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      {/* Features Section */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-slate-900">Why Choose EduSmart AI?</h2>
          <p className="text-slate-500">We combine traditional study materials with cutting-edge AI to give you the best learning experience.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4 group transition-all hover:shadow-xl hover:shadow-indigo-500/5"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Class Selection Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Select Your Class</h2>
          <Link to="/study-material" className="text-indigo-600 font-semibold text-sm hover:underline">View All</Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {CLASSES.map((cls) => (
            <Link
              key={cls}
              to={`/class/${cls}`}
              className="bg-white p-6 rounded-2xl border border-slate-200 text-center hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-500/10 transition-all group"
            >
              <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-indigo-50 transition-colors">
                <span className="text-lg font-bold text-slate-700 group-hover:text-indigo-600">{cls}</span>
              </div>
              <p className="text-sm font-medium text-slate-500">Class {cls}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Subject Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Popular Subjects</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {SUBJECTS.map((subject) => (
            <Link
              key={subject.id}
              to={`/subject/${subject.id}`}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-all group"
            >
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="font-bold text-slate-900 mb-1">{subject.name}</h3>
              <p className="text-xs text-slate-500">120+ Chapters</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Ready to Ace Your Exams?</h2>
          <p className="text-slate-400">Join thousands of students who are already using EduSmart AI to improve their grades.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-colors">
              Create Free Account
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl font-bold transition-colors border border-white/10">
              Contact Support
            </button>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-violet-500 rounded-full blur-3xl" />
        </div>
      </section>
    </div>
  );
}
