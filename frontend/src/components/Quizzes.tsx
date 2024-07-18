import React, { useEffect, useState } from 'react';
import apiClient from '../api/axiosClient';
import QuizList from './QuizList';
import { useNavigate } from 'react-router-dom';

const Quizzes: React.FC = () => {
  const [quizzes, setQuizzes] = useState<any[]>([]); // Adjust the type as per your API response
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await apiClient.get('/quiz');
        setQuizzes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleQuizSelect = (quizId: string) => {
    navigate(`/quizzes/${quizId}`);
  };

  return (
    <div className="quizzes">
      <h1>Quizzes</h1>
      <QuizList quizzes={quizzes} onQuizSelect={handleQuizSelect} />
    </div>
  );
};

export default Quizzes;
