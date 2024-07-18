import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchQuiz } from '../api';
import { Quiz, Question, Answer } from '../types';

interface QuizWithQuestions extends Quiz {
  questions: Question[];
}

const QuizDetails: React.FC = () => {
  const { quizId } = useParams<{ quizId?: string }>(); // Ensure quizId is defined as string or undefined
  const [quiz, setQuiz] = useState<QuizWithQuestions | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [questionId: string]: Answer }>({});

  useEffect(() => {
    if (quizId) {
      fetchQuiz(quizId).then((quiz) => {
        const quizWithQuestions: QuizWithQuestions = { ...quiz, questions: [] };
        setQuiz(quizWithQuestions);
        setLoading(false);
        setCurrentQuestion(quizWithQuestions.questions[0]);
      });
    }
  }, [quizId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!quiz) {
    return <p>Quiz not found</p>;
  }

  const handleAnswerSelect = (answerId: string) => {
    const questionId = currentQuestion?._id;
    if (questionId) {
      setUserAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: { _id: answerId, text: '', isCorrect: false },
      }));
      const nextQuestion = quiz.questions.find((q) => q._id !== currentQuestion?._id);
      if (nextQuestion) {
        setCurrentQuestion(nextQuestion);
      }
    }
  };

  return (
    <div>
      <h1>{quiz.name}</h1>
      <p>Category: {quiz.category}</p>
      <p>Difficulty: {quiz.difficulty}</p>
      <p>Questions: {quiz.questionsCount}</p>
      {currentQuestion && (
        <div>
          <h2>{currentQuestion.text}</h2>
          <ul>
            {currentQuestion.options.map((option, index) => (
              <li key={index}>
                <input
                  type="radio"
                  name={currentQuestion._id}
                  value={option}
                  onChange={() => handleAnswerSelect(option)}
                />
                <span>{option}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {Object.keys(userAnswers).length === quiz.questionsCount && (
        <p>
          You've completed the quiz! Your score is{' '}
          {Object.values(userAnswers).filter((answer) => answer.isCorrect).length} /{' '}
          {quiz.questionsCount}
        </p>
      )}
    </div>
  );
};

export default QuizDetails;