/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ClassPage from './pages/ClassPage';
import SubjectPage from './pages/SubjectPage';
import Quiz from './pages/Quiz';
import StudyMaterial from './pages/StudyMaterial';
import VideoLessons from './pages/VideoLessons';
import NCERTBooks from './pages/NCERTBooks';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/class/:classId" element={<ClassPage />} />
          <Route path="/class/:classId/subject/:subjectId" element={<SubjectPage />} />
          <Route path="/subject/:subjectId" element={<SubjectPage />} />
          <Route path="/study-material" element={<StudyMaterial />} />
          <Route path="/video-lessons" element={<VideoLessons />} />
          <Route path="/ncert-books" element={<NCERTBooks />} />
          <Route path="/quiz" element={<Quiz />} />


          <Route path="/exam-prep" element={<div className="p-8 text-center text-slate-500">Exam Prep (Coming Soon)</div>} />
          <Route path="/downloads" element={<div className="p-8 text-center text-slate-500">Downloads (Coming Soon)</div>} />
          <Route path="/profile" element={<div className="p-8 text-center text-slate-500">Profile (Coming Soon)</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}



