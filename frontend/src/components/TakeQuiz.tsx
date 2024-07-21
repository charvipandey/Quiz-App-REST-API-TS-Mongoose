import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosClient';
import { Quiz, Question } from '../types';

const TakeQuiz: React.FC = () => {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const quizId = 'your_quiz_id';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/quiz/results', {
        quizId: quiz?._id,
        answers,
      });
      const score = response.data.score;
      navigate('/quiz/results', { state: { score, quiz } });
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleAnswerChange = (answer: string) => {
    setAnswers([...answers.slice(0, currentQuestion), answer, ...answers.slice(currentQuestion + 1)]);
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await apiClient.get(`/quiz/${quizId}`);
        setQuiz(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuiz();
  }, []);

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{quiz.name}</h2>
      <p>Question {currentQuestion + 1} of {quiz.questions.length}</p>
      <h3>{quiz.questions[currentQuestion].text}</h3>
      {quiz.questions[currentQuestion].options.map((option, i) => (
        <label key={i}>
          <input
            type="radio"
            name="answer"
            value={option}
            checked={answers[currentQuestion] === option}
            onChange={() => handleAnswerChange(option)}
          />
          {option}
        </label>
      ))}
      {currentQuestion > 0 && (
        <button type="button" onClick={handlePreviousQuestion}>
          Previous
        </button>
      )}
      {currentQuestion < quiz.questions.length - 1 && (
        <button type="button" onClick={handleNextQuestion}>
          Next
        </button>
      )}
      {currentQuestion === quiz.questions.length - 1 && (
        <button type="submit">Submit</button>
      )}
    </form>
  );
};

export default TakeQuiz;