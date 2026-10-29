import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Circle, 
  Trophy, 
  Timer, 
  ArrowRight, 
  RotateCcw,
  Loader2,
  AlertCircle,
  Star
} from 'lucide-react';
import { generateQuizQuestions } from '../services/gemini';
import { SUBJECTS } from '../constants';
import { QuizQuestion } from '../types';

export default function Quiz() {
  const [searchParams] = useSearchParams();
  const classId = searchParams.get('classId') || '10';
  const subjectId = searchParams.get('subjectId') || 'science';
  const chapterId = searchParams.get('chapterId') || '1';

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const [currentStep, setCurrentStep] = useState<'setup' | 'loading' | 'quiz' | 'result'>('setup');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const startQuiz = async () => {
    setCurrentStep('loading');
    try {
      const qs = await generateQuizQuestions(
        subjectId || 'Science', 
        chapterId || 'General Knowledge', 
        classId || '10'
      );
      setQuestions(qs);
      setCurrentStep('quiz');
    } catch (error) {
      console.error('Quiz error:', error);
      setCurrentStep('setup');
    }
  };

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    if (index === questions[currentIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setCurrentStep('result');
    }
  };

  const resetQuiz = () => {
    setCurrentStep('setup');
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowExplanation(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {currentStep === 'setup' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center space-y-6"
        >
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
            <Trophy className="w-10 h-10 text-indigo-600" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-900">AI Quiz Zone</h1>
            <p className="text-slate-500">Test your knowledge with AI-generated questions tailored to your chapter.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Questions</p>
              <p className="text-lg font-bold text-slate-900">5 MCQs</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Difficulty</p>
              <p className="text-lg font-bold text-slate-900">Class {classId || '10'}</p>
            </div>
          </div>
          <button
            onClick={startQuiz}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
          >
            Start Quiz
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      )}

      {currentStep === 'loading' && (
        <div className="bg-white p-12 rounded-3xl border border-slate-100 shadow-sm text-center space-y-6">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto" />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Generating Your Quiz...</h2>
            <p className="text-slate-500 italic">Our AI is crafting unique questions based on CBSE curriculum.</p>
          </div>
        </div>
      )}

      {currentStep === 'quiz' && questions.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold">
                {currentIndex + 1}/{questions.length}
              </div>
              <div className="h-2 w-32 sm:w-64 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                  className="h-full bg-indigo-600"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <Timer className="w-4 h-4" />
              <span className="text-sm">No Time Limit</span>
            </div>
          </div>

          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8"
          >
            <h2 className="text-xl font-bold text-slate-900 leading-relaxed">
              {questions[currentIndex].question}
            </h2>

            <div className="grid gap-3">
              {questions[currentIndex].options.map((option, i) => {
                const isSelected = selectedOption === i;
                const isCorrect = i === questions[currentIndex].correctAnswer;
                const isWrong = isSelected && !isCorrect;

                return (
                  <button
                    key={i}
                    onClick={() => handleOptionSelect(i)}
                    disabled={selectedOption !== null}
                    className={`
                      w-full p-4 rounded-2xl text-left border-2 transition-all flex items-center justify-between group
                      ${selectedOption === null ? 'border-slate-100 hover:border-indigo-600 hover:bg-indigo-50/50' : ''}
                      ${isSelected && isCorrect ? 'border-emerald-500 bg-emerald-50' : ''}
                      ${isSelected && !isCorrect ? 'border-red-500 bg-red-50' : ''}
                      ${selectedOption !== null && isCorrect ? 'border-emerald-500 bg-emerald-50' : ''}
                      ${selectedOption !== null && !isSelected && !isCorrect ? 'border-slate-100 opacity-50' : ''}
                    `}
                  >
                    <span className={`font-medium ${isSelected || (selectedOption !== null && isCorrect) ? 'text-slate-900' : 'text-slate-600'}`}>
                      {option}
                    </span>
                    {selectedOption !== null && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                    {isSelected && !isCorrect && <AlertCircle className="w-5 h-5 text-red-500" />}
                    {selectedOption === null && <Circle className="w-5 h-5 text-slate-200 group-hover:text-indigo-200" />}
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 space-y-2"
              >
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Explanation</p>
                <p className="text-sm text-indigo-900 leading-relaxed">
                  {questions[currentIndex].explanation}
                </p>
              </motion.div>
            )}

            {selectedOption !== null && (
              <button
                onClick={nextQuestion}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
              >
                {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </motion.div>
        </div>
      )}

      {currentStep === 'result' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-3xl border border-slate-100 shadow-sm text-center space-y-8"
        >
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
              <Trophy className="w-16 h-16 text-indigo-600" />
            </div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="absolute -top-2 -right-2 bg-amber-400 text-white p-2 rounded-full shadow-lg"
            >
              <Star className="w-6 h-6 fill-white" />
            </motion.div>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900">Great Job!</h2>
            <p className="text-slate-500">You've completed the quiz. Here's how you performed:</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <p className="text-4xl font-black text-indigo-600">{score}/{questions.length}</p>
              <p className="text-sm font-bold text-slate-400 uppercase mt-1">Score</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <p className="text-4xl font-black text-indigo-600">{Math.round((score / questions.length) * 100)}%</p>
              <p className="text-sm font-bold text-slate-400 uppercase mt-1">Accuracy</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={resetQuiz}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Try Again
            </button>
            <Link
              to="/"
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-900 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
