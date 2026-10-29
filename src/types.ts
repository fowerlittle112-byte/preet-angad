export type ClassLevel = '6' | '7' | '8' | '9' | '10' | '11' | '12';

export interface Subject {
  id: string;
  name: string;
  icon: string;
}

export interface Chapter {
  id: string;
  title: string;
  subjectId: string;
  classLevel: ClassLevel;
}

export interface StudyMaterial {
  id: string;
  chapterId: string;
  type: 'ncert-solution' | 'revision-note' | 'mcq' | 'summary';
  content: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface UserProgress {
  userId: string;
  completedChapters: string[];
  quizScores: Record<string, number>;
  bookmarks: string[];
}
