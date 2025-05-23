export interface QuizResult {
  id: number;
  quizId: number;
  userId: number;
  score: number;
  date_taken: string; // ISO date string
  // facultatif: Quiz et User peuvent être ajoutés selon les besoins
}
