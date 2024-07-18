const API_URL = 'https://your-api-url.com/api';
import { Quiz } from './types';

export async function fetchQuizzes(): Promise<Quiz[]> {
  const response = await fetch(`${API_URL}/quizzes`);
  return response.json();
}

export async function fetchQuiz(quizId: string): Promise<Quiz> {
  const response = await fetch(`${API_URL}/quizzes/${quizId}`);
  return response.json();
}

export async function submitAnswer(quizId: string, questionId: string, answerId: string): Promise<void> {
  await fetch(`${API_URL}/quizzes/${quizId}/questions/${questionId}/answers/${answerId}`, {
    method: 'POST',
  });
}