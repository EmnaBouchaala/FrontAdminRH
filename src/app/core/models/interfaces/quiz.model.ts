import { QuizQuestion } from "./question.model";

export interface Quiz {
  id: number;
  titre: string;
  formationId: number;
  dateCreation: string;
  questions?: QuizQuestion[];
}
