import React from 'react';
import styles from './QuizCard.module.css';
import { Quiz } from '../types';

interface QuizCardProps {
  quiz: Quiz;
  onQuizSelect: (quizId: string) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onQuizSelect }) => {
  return (
    <div className={styles.quizCard} onClick={() => onQuizSelect(quiz._id)}>
      <h2>{quiz.name}</h2>
      <p>Category: {quiz.category}</p>
      <p>Difficulty: {quiz.difficulty}</p>
      <p>Questions: {quiz.questionsCount}</p>
    </div>
  );
};

export default QuizCard;