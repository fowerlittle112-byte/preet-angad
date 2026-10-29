import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  FileText, 
  Trophy, 
  PlayCircle, 
  CheckCircle2, 
  ArrowRight,
  Search,
  ChevronRight,
  Book
} from 'lucide-react';
import { SUBJECTS, REAL_CHAPTERS } from '../constants';

export default function SubjectPage() {
  const { classId, subjectId } = useParams();
  const subject = SUBJECTS.find(s => s.id === subjectId);


  const realChapters = (classId && subjectId && REAL_CHAPTERS[classId]?.[subjectId]) || [];
  
  const chapters = realChapters.length > 0 
    ? realChapters.map((title, index) => ({
        id: (index + 1).toString(),
        title: `Chapter ${index + 1}: ${title}`,
        status: index === 0 ? 'completed' : index === 1 ? 'in-progress' : 'not-started'
      }))
    : [
        { id: '1', title: 'Chapter 1: Introduction', status: 'not-started' },
        { id: '2', title: 'Chapter 2: Core Concepts', status: 'not-started' },
        { id: '3', title: 'Chapter 3: Advanced Topics', status: 'not-started' },
      ];


  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-2">
            <Link to="/" className="hover:text-indigo-600">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to={`/class/${classId}`} className="hover:text-indigo-600">Class {classId}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-900 font-medium">{subject?.name}</span>
          </nav>
          <h1 className="text-3xl font-bold text-slate-900">{subject?.name} - Class {classId}</h1>
          <p className="text-slate-500 mt-1">Master every chapter with our comprehensive study material.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
          <Link 
            to={`/ncert-books?classId=${classId}&subjectId=${subjectId}`}
            className="px-4 py-2 text-indigo-600 text-sm font-bold rounded-xl hover:bg-indigo-50 flex items-center gap-2"
          >
            <Book className="w-4 h-4" />
            NCERT Book
          </Link>
          <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-200">
            All Chapters
          </button>

          <button className="px-4 py-2 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-50">
            My Progress
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Chapters List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder="Search chapters..."
              className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
            />
          </div>

          <div className="space-y-3">
            {chapters.map((chapter, i) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${
                    chapter.status === 'completed' ? 'bg-emerald-50 text-emerald-600' :
                    chapter.status === 'in-progress' ? 'bg-indigo-50 text-indigo-600' :
                    'bg-slate-50 text-slate-400'
                  }`}>
                    {chapter.id}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{chapter.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {chapter.status === 'completed' ? 'Completed' : 
                         chapter.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                      </span>
                      <div className="w-1 h-1 bg-slate-300 rounded-full" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">45 mins</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/video-lessons?classId=${classId}&subjectId=${subjectId}&chapterId=${chapter.id}`}
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                    title="Watch Video Lesson"
                  >
                    <PlayCircle className="w-5 h-5" />
                  </Link>
                  <Link
                    to={`/quiz?classId=${classId}&subjectId=${subjectId}&chapterId=${chapter.id}`}
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                    title="Take Quiz"
                  >
                    <Trophy className="w-5 h-5" />
                  </Link>

                  <Link
                    to={`/study-material?classId=${classId}&subjectId=${subjectId}&chapterId=${chapter.id}`}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
                  >
                    Learn
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Your Progress</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 font-medium">Chapters Completed</span>
                <span className="text-slate-900 font-bold">12/45</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 w-[26%]" />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <p className="text-lg font-bold text-indigo-600">85%</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Avg. Score</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <p className="text-lg font-bold text-indigo-600">12h</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Study Time</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl text-white space-y-4 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-lg font-bold">Need Help?</h3>
              <p className="text-sm text-slate-400">Ask EduSmart AI to explain any chapter in simple words.</p>
              <button 
                onClick={() => document.getElementById('chatbot-trigger')?.click()}
                className="mt-4 w-full bg-white text-slate-900 py-3 rounded-xl text-sm font-bold hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
              >
                Ask Assistant
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <PlayCircle className="absolute -right-6 -bottom-6 w-32 h-32 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
