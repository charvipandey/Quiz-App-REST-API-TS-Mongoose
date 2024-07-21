import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosClient';

const CreateQuiz: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [questions, setQuestions] = useState([{ text: '', options: ['', '', '', ''] }]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/quiz', {
        name,
        category,
        difficulty,
        questions,
      });
      navigate('/quizzes');
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: '', options: ['', '', '', ''] }]);
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Category:
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      </label>
      <label>
        Difficulty:
        <input type="text" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} />
      </label>
      {questions.map((question, index) => (
        <div key={index}>
          <label>
            Question {index + 1}:
            <input
              type="text"
              value={question.text}
              onChange={(e) => setQuestions(questions.map((q, i) => (i === index ? { ...q, text: e.target.value } : q)))}
            />
          </label>
          <label>
            Options:
            {question.options.map((option, i) => (
              <input
                key={i}
                type="text"
                value={option}
                onChange={(e) =>
                  setQuestions(
                    questions.map((q, j) => (j === index ? { ...q, options: q.options.map((o, k) => (k === i ? e.target.value : o)) } : q))
                  )
                }
              />
            ))}
          </label>
          <button type="button" onClick={() => handleRemoveQuestion(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddQuestion}>
        Add Question
      </button>
      <button type="submit">Create Quiz</button>
    </form>
  );
};

export default CreateQuiz;