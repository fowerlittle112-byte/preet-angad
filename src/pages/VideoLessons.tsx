import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Play, 
  Search, 
  Filter, 
  Clock, 
  User, 
  ThumbsUp, 
  Share2,
  ChevronRight,
  Youtube
} from 'lucide-react';
import { SUBJECTS, CLASSES } from '../constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  channel: string;
  views: string;
  subject: string;
  class: string;
  youtubeId: string;
}

const VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Chemical Reactions and Equations - Class 10 Science',
    thumbnail: 'https://picsum.photos/seed/chemistry/400/225',
    duration: '45:20',
    channel: 'EduSmart Academy',
    views: '1.2M views',
    subject: 'science',
    class: '10',
    youtubeId: 'gC29lX20_S0'
  },
  {
    id: '2',
    title: 'Real Numbers - Full Chapter Explanation | Class 10 Maths',
    thumbnail: 'https://picsum.photos/seed/maths/400/225',
    duration: '1:12:05',
    channel: 'Maths Master',
    views: '850K views',
    subject: 'maths',
    class: '10',
    youtubeId: '7n26E962S_8'
  },
  {
    id: '3',
    title: 'Life Processes - Class 10 Biology One Shot',
    thumbnail: 'https://picsum.photos/seed/biology/400/225',
    duration: '58:45',
    channel: 'Science Simplified',
    views: '2.1M views',
    subject: 'science',
    class: '10',
    youtubeId: '8yvG2V_v4_g'
  },
  {
    id: '4',
    title: 'The Rise of Nationalism in Europe - Class 10 History',
    thumbnail: 'https://picsum.photos/seed/history/400/225',
    duration: '38:15',
    channel: 'History Hub',
    views: '500K views',
    subject: 'sst',
    class: '10',
    youtubeId: 'd8_X_X_X_X'
  },
  {
    id: '5',
    title: 'Electricity - Class 10 Physics Full Chapter',
    thumbnail: 'https://picsum.photos/seed/physics/400/225',
    duration: '52:10',
    channel: 'Physics Wallah',
    views: '3.5M views',
    subject: 'science',
    class: '10',
    youtubeId: 'X_X_X_X_X'
  },
  {
    id: '6',
    title: 'Polynomials - Class 10 Maths Chapter 2',
    thumbnail: 'https://picsum.photos/seed/poly/400/225',
    duration: '42:30',
    channel: 'Maths Master',
    views: '720K views',
    subject: 'maths',
    class: '10',
    youtubeId: 'X_X_X_X_X'
  }
];

export default function VideoLessons() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  const selectedClass = searchParams.get('classId') || '10';
  const selectedSubject = searchParams.get('subjectId') || 'all';

  const filteredVideos = VIDEOS.filter(video => {
    const matchesClass = video.class === selectedClass;
    const matchesSubject = selectedSubject === 'all' || video.subject === selectedSubject;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSubject && matchesSearch;
  });

  const handleClassChange = (cls: string) => {
    setSearchParams({ classId: cls, subjectId: selectedSubject });
  };

  const handleSubjectChange = (sub: string) => {
    setSearchParams({ classId: selectedClass, subjectId: sub });
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Video Lessons</h1>
          <p className="text-slate-500 mt-1">Learn from the best educators in India</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-64 transition-all"
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
            <Filter className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 shrink-0">Class:</span>
          {CLASSES.map((cls) => (
            <button
              key={cls}
              onClick={() => handleClassChange(cls)}
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
            onClick={() => handleSubjectChange('all')}
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
              onClick={() => handleSubjectChange(sub.id)}
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

      {/* Video Player (Modal or Inline) */}
      {activeVideo && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl"
        >
          <div className="aspect-video bg-slate-900 relative group">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
              title={activeVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{activeVideo.title}</h2>
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {activeVideo.channel}
                  </span>
                  <span>{activeVideo.views}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-bold text-slate-700 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  Like
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-bold text-slate-700 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <motion.div
            key={video.id}
            whileHover={{ y: -4 }}
            className={cn(
              "bg-white rounded-2xl border border-slate-200 overflow-hidden group cursor-pointer transition-all",
              activeVideo?.id === video.id ? "ring-2 ring-indigo-600" : "hover:shadow-lg hover:shadow-indigo-100"
            )}
            onClick={() => setActiveVideo(video)}
          >
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                  <Play className="w-6 h-6 text-indigo-600 fill-indigo-600 ml-1" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-[10px] font-bold rounded">
                {video.duration}
              </div>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded uppercase tracking-wider">
                  {video.subject}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  Class {video.class}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                {video.title}
              </h3>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                    <User className="w-3 h-3 text-slate-400" />
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{video.channel}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">{video.views}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Youtube className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No videos found</h3>
          <p className="text-slate-500 mt-1">Try adjusting your filters or search query</p>
        </div>
      )}

      {/* Recommended Channels */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Recommended Channels</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Physics Wallah', subs: '10M+', icon: '⚛️' },
            { name: 'Unacademy Class 10', subs: '2M+', icon: '🎓' },
            { name: 'Vedantu 9 & 10', subs: '1.5M+', icon: '📚' },
            { name: 'Magnet Brains', subs: '8M+', icon: '🧠' },
          ].map((channel) => (
            <div key={channel.name} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3 hover:border-indigo-300 transition-colors cursor-pointer group">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                {channel.icon}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{channel.name}</p>
                <p className="text-[10px] text-slate-500">{channel.subs} subscribers</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
