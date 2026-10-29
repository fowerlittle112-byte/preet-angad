import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, GraduationCap, ArrowRight, Star, Clock, Users } from 'lucide-react';
import { SUBJECTS, CLASS_SUBJECTS } from '../constants';

export default function ClassPage() {
  const { classId } = useParams<{ classId: string }>();
  const classSubjects = CLASS_SUBJECTS[classId as keyof typeof CLASS_SUBJECTS] || [];
  const availableSubjects = SUBJECTS.filter(s => classSubjects.includes(s.id));

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-2">
            <Link to="/" className="hover:text-indigo-600">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Class {classId}</span>
          </nav>
          <h1 className="text-3xl font-bold text-slate-900">Class {classId} Study Material</h1>
          <p className="text-slate-500 mt-1">Select a subject to start learning.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                <img src={`https://picsum.photos/seed/user${i}/32/32`} alt="User" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
          <p className="text-xs font-medium text-slate-600">
            <span className="text-indigo-600 font-bold">1.2K+</span> students studying now
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableSubjects.map((subject, i) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={`/class/${classId}/subject/${subject.id}`}
              className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all overflow-hidden flex flex-col h-full"
            >
              <div className="p-6 space-y-4 flex-1">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <BookOpen className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="text-[10px] font-bold text-amber-700">TOP RATED</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{subject.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">Complete NCERT solutions, notes, and practice tests.</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>15+ Hours content</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Users className="w-3 h-3" />
                    <span>450+ Enrolled</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between group-hover:bg-indigo-50 transition-colors">
                <span className="text-xs font-bold text-slate-600 group-hover:text-indigo-600">Explore Chapters</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Featured Resources */}
      <section className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-4">
          <h2 className="text-2xl font-bold">Class {classId} Revision Notes</h2>
          <p className="text-indigo-100 opacity-90 leading-relaxed">
            Download our specially curated revision notes for Class {classId} designed by CBSE toppers. 
            Perfect for last-minute exam preparation.
          </p>
          <button className="bg-white text-indigo-600 px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-50 transition-colors flex items-center gap-2">
            Download PDF
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <GraduationCap className="absolute -right-10 -bottom-10 w-64 h-64 text-white/10 rotate-12" />
      </section>
    </div>
  );
}
