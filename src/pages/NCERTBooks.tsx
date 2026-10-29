import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Book, 
  Download, 
  ExternalLink, 
  Search, 
  Filter,
  FileText,
  ChevronRight,
  Info
} from 'lucide-react';
import { SUBJECTS, CLASSES } from '../constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NCERTBook {
  id: string;
  title: string;
  class: string;
  subject: string;
  bookCode: string; // NCERT internal code
  totalChapters: number;
  thumbnail: string;
}

const NCERT_BOOKS: NCERTBook[] = [
  {
    id: '1',
    title: 'Mathematics',
    class: '10',
    subject: 'maths',
    bookCode: 'jemh1',
    totalChapters: 15,
    thumbnail: 'https://picsum.photos/seed/math-book/300/400'
  },
  {
    id: '2',
    title: 'Science',
    class: '10',
    subject: 'science',
    bookCode: 'jesc1',
    totalChapters: 16,
    thumbnail: 'https://picsum.photos/seed/science-book/300/400'
  },
  {
    id: '3',
    title: 'Contemporary India - II (Geography)',
    class: '10',
    subject: 'sst',
    bookCode: 'jegy2',
    totalChapters: 7,
    thumbnail: 'https://picsum.photos/seed/geo-book/300/400'
  },
  {
    id: '4',
    title: 'India and the Contemporary World - II (History)',
    class: '10',
    subject: 'sst',
    bookCode: 'jess1',
    totalChapters: 5,
    thumbnail: 'https://picsum.photos/seed/hist-book/300/400'
  },
  {
    id: '5',
    title: 'Mathematics Part-I',
    class: '12',
    subject: 'maths',
    bookCode: 'lemh1',
    totalChapters: 6,
    thumbnail: 'https://picsum.photos/seed/math12-book/300/400'
  },
  {
    id: '6',
    title: 'Chemistry Part-I',
    class: '12',
    subject: 'science',
    bookCode: 'lech1',
    totalChapters: 9,
    thumbnail: 'https://picsum.photos/seed/chem12-book/300/400'
  },
  {
    id: '7',
    title: 'Beehive (English)',
    class: '9',
    subject: 'english',
    bookCode: 'iebe1',
    totalChapters: 11,
    thumbnail: 'https://picsum.photos/seed/eng9-book/300/400'
  }
];

export default function NCERTBooks() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<NCERTBook | null>(null);

  const selectedClass = searchParams.get('classId') || '10';
  const selectedSubject = searchParams.get('subjectId') || 'all';

  const filteredBooks = NCERT_BOOKS.filter(book => {
    const matchesClass = book.class === selectedClass;
    const matchesSubject = selectedSubject === 'all' || book.subject === selectedSubject;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSubject && matchesSearch;
  });

  const getChapterUrl = (bookCode: string, chapterNum: number) => {
    // NCERT PDF URL Pattern: https://ncert.nic.in/textbook/pdf/{bookCode}{chapterNum}.pdf
    // Chapter numbers are usually 2 digits, e.g., 01, 02...
    const formattedNum = chapterNum.toString().padStart(2, '0');
    return `https://ncert.nic.in/textbook/pdf/${bookCode}${formattedNum}.pdf`;
  };

  const getFullBookUrl = (bookCode: string) => {
    return `https://ncert.nic.in/textbook.php?${bookCode}=0-${selectedBook?.totalChapters}`;
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">NCERT Textbooks</h1>
          <p className="text-slate-500 mt-1">Access official NCERT digital textbooks for free</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-64 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 shrink-0">Class:</span>
          {CLASSES.map((cls) => (
            <button
              key={cls}
              onClick={() => setSearchParams({ classId: cls, subjectId: selectedSubject })}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-bold transition-all shrink-0",
                selectedClass === cls
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-300"
              )}
            >
              Class {cls}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 shrink-0">Subject:</span>
          <button
            onClick={() => setSearchParams({ classId: selectedClass, subjectId: 'all' })}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-bold transition-all shrink-0",
              selectedSubject === 'all'
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-300"
            )}
          >
            All Subjects
          </button>
          {SUBJECTS.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSearchParams({ classId: selectedClass, subjectId: sub.id })}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-bold transition-all shrink-0",
                selectedSubject === sub.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-300"
              )}
            >
              {sub.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Books Grid */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <motion.div
              key={book.id}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedBook(book)}
              className={cn(
                "bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer transition-all group",
                selectedBook?.id === book.id ? "ring-2 ring-indigo-600 shadow-lg" : "hover:shadow-md"
              )}
            >
              <div className="aspect-[3/4] bg-slate-100 relative overflow-hidden">
                <img 
                  src={book.thumbnail} 
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-bold text-slate-900 shadow-sm">
                  Class {book.class}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-900 text-sm line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {book.title}
                </h3>
                <p className="text-[10px] text-slate-500 mt-1 font-medium uppercase tracking-wider">
                  {book.totalChapters} Chapters
                </p>
              </div>
            </motion.div>
          ))}

          {filteredBooks.length === 0 && (
            <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
              <Book className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900">No books found</h3>
              <p className="text-slate-500 mt-1">Try selecting a different class or subject</p>
              <a 
                href="https://ncert.nic.in/textbook.php" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 text-indigo-600 font-bold text-sm hover:underline"
              >
                Visit NCERT Official Portal
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>

        {/* Chapter List / Details */}
        <div className="space-y-6">
          {selectedBook ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm sticky top-24"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{selectedBook.title}</h2>
                  <p className="text-sm text-slate-500 mt-1">Select a chapter to read or download</p>
                </div>
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
                {Array.from({ length: selectedBook.totalChapters }).map((_, i) => (
                  <a
                    key={i}
                    href={getChapterUrl(selectedBook.bookCode, i + 1)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-xs font-bold text-slate-500 group-hover:bg-white group-hover:text-indigo-600 transition-colors">
                        {i + 1}
                      </div>
                      <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-900">Chapter {i + 1}</span>
                    </div>
                    <Download className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                  </a>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <a
                  href={`https://ncert.nic.in/textbook.php?${selectedBook.bookCode}=0-${selectedBook.totalChapters}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors"
                >
                  View Full Book
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ) : (
            <div className="bg-slate-50 rounded-3xl border border-dashed border-slate-200 p-8 text-center sticky top-24">
              <Info className="w-10 h-10 text-slate-300 mx-auto mb-4" />
              <h3 className="font-bold text-slate-900">Select a Book</h3>
              <p className="text-sm text-slate-500 mt-2">Click on a textbook cover to view its chapters and download PDFs.</p>
            </div>
          )}
        </div>
      </div>

      {/* Official Links */}
      <div className="bg-indigo-50 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
            <ExternalLink className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Official NCERT Portal</h3>
            <p className="text-sm text-slate-600">Access all books, solutions, and exemplar problems directly.</p>
          </div>
        </div>
        <a 
          href="https://ncert.nic.in/textbook.php" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2"
        >
          Open NCERT Website
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
