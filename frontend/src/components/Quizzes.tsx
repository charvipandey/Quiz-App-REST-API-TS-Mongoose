import React, { useEffect, useState } from 'react';
import apiClient from '../api/axiosClient';
import QuizList from './QuizList';
import { useHistory } from 'react-router-dom';

const Quizzes: React.FC = () => {
  const [quizzes, setQuizzes] = useState([]);
  const history = useHistory();

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
    history.push(`/quizzes/${quizId}`);
  };

  return (
    <div className="quizzes">
      <h1>Quizzes</h1>
      <QuizList quizzes={quizzes} onQuizSelect={handleQuizSelect} />
    </div>
  );
};

export default Quizzes;