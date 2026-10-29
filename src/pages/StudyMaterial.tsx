import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  Download, 
  Share2, 
  Bookmark,
  Loader2,
  ChevronRight,
  Printer,
  Sparkles
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { generateAcademicResponse } from '../services/gemini';
import { SUBJECTS, REAL_CHAPTERS } from '../constants';

export default function StudyMaterial() {
  const [searchParams] = useSearchParams();
  const classId = searchParams.get('classId') || '10';
  const subjectId = searchParams.get('subjectId') || 'science';
  const chapterId = searchParams.get('chapterId') || '1';
  
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'notes' | 'solutions' | 'summary'>('notes');

  const subject = SUBJECTS.find(s => s.id === subjectId);
  const realChapters = (classId && subjectId && REAL_CHAPTERS[classId]?.[subjectId]) || [];
  const chapterName = realChapters[parseInt(chapterId) - 1] || `Chapter ${chapterId}`;

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const prompt = `Provide detailed ${activeTab === 'notes' ? 'Revision Notes' : activeTab === 'solutions' ? 'NCERT Solutions' : 'Summary'} for Class ${classId} ${subject?.name}, Chapter: ${chapterName}. 
        Include key points, important definitions, and exam-oriented questions.`;
        const response = await generateAcademicResponse(prompt);
        setContent(response || '');
      } catch (error) {
        console.error('Error fetching study material:', error);
        setContent('Failed to load content. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [classId, subjectId, chapterId, activeTab, subject?.name, chapterName]);


  return (
    <div className="space-y-8 pb-20">
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="hover:text-indigo-600">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to={`/class/${classId}`} className="hover:text-indigo-600">Class {classId}</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to={`/class/${classId}/subject/${subjectId}`} className="hover:text-indigo-600">{subject?.name}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-900 font-medium">Chapter {chapterId}</span>
          </nav>
          <h1 className="text-3xl font-bold text-slate-900">
            {activeTab === 'notes' ? 'Revision Notes' : activeTab === 'solutions' ? 'NCERT Solutions' : 'Chapter Summary'}
          </h1>
          <p className="text-slate-500">Class {classId} • {subject?.name} • Chapter {chapterId}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white rounded-xl border border-slate-200 text-slate-600 transition-all" title="Bookmark">
            <Bookmark className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-white rounded-xl border border-slate-200 text-slate-600 transition-all" title="Share">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all">
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm w-fit">
        {[
          { id: 'notes', label: 'Revision Notes', icon: FileText },
          { id: 'solutions', label: 'NCERT Solutions', icon: CheckCircle2 },
          { id: 'summary', label: 'Summary', icon: BookOpen },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`
              flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all
              ${activeTab === tab.id 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
            `}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden min-h-[600px] relative">
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-white/80 backdrop-blur-sm z-10">
            <div className="relative">
              <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-amber-400 animate-pulse" />
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-slate-900">AI is generating your study material...</p>
              <p className="text-sm text-slate-500 italic">Crafting high-quality, exam-ready content for you.</p>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-8 sm:p-12 prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-indigo-600 prose-code:text-indigo-600 prose-pre:bg-slate-900 prose-pre:text-slate-100"
          >
            <ReactMarkdown>{content}</ReactMarkdown>
          </motion.div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-slate-200">
        <button className="flex items-center gap-2 text-slate-500 font-bold hover:text-indigo-600 transition-colors">
          <ChevronRight className="w-5 h-5 rotate-180" />
          Previous Chapter
        </button>
        <Link 
          to={`/quiz?classId=${classId}&subjectId=${subjectId}&chapterId=${chapterId}`}
          className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-6 py-3 rounded-2xl font-bold hover:bg-emerald-100 transition-colors"
        >
          Take Chapter Quiz
          <Trophy className="w-5 h-5" />
        </Link>
        <button className="flex items-center gap-2 text-slate-500 font-bold hover:text-indigo-600 transition-colors">
          Next Chapter
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function Trophy({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
