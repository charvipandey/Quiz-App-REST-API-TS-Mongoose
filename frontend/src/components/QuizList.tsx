import React from 'react';
import QuizCard from './QuizCard';
import { Quiz } from '../types';

interface QuizListProps {
  quizzes: Quiz[];
  onQuizSelect: (quizId: string) => void;
}

const QuizList: React.FC<QuizListProps> = ({ quizzes, onQuizSelect }) => {
  return (
    <div className="quiz-list">
      {quizzes.map((quiz) => (
        <QuizCard key={quiz._id} quiz={quiz} onQuizSelect={onQuizSelect} />
      ))}
    </div>
  );
};

export default QuizList;