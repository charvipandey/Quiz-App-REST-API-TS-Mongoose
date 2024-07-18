export interface Quiz {
  _id: string;
  name: string;
  category: string;
  difficulty: string;
  questionsCount: number;
}

export interface Question {
  _id: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

export interface Answer {
  _id: string;
  text: string;
  isCorrect: boolean;
}