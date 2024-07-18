import React from 'react';

interface QuizListProps {
  quizzes: any[];
  onQuizSelect: (quizId: string) => void;
}

const QuizList: React.FC<QuizListProps> = ({ quizzes, onQuizSelect }) => {
  return (
    <ul>
      {quizzes.map((quiz) => (
        <li key={quiz.id}>
          <a href="#" onClick={() => onQuizSelect(quiz.id)}>
            {quiz.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default QuizList;