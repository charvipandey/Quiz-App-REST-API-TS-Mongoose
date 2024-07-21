import React from 'react';
import { Quiz, Question } from '../types';

interface Props {
  score: number;
  quiz: Quiz;
  answers: string[];
}

const QuizResults: React.FC<Props> = ({ score, quiz, answers }) => {
  return (
    <div>
      <h2>Quiz Results</h2>
      <p>Your score is {score} out of {quiz.questions.length}</p>
      <ul>
        {quiz.questions.map((question, i) => (
          <li key={i}>
            {question.text} - {answers[i] === question.correctAnswer ? 'Correct' : 'Incorrect'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizResults;