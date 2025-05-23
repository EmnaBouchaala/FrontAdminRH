import { QuizOption } from "./quiz-option.model";

export interface QuizQuestion {
  id: number;
  quizId: number;
  question_text: string;
  options?: QuizOption[];
}
