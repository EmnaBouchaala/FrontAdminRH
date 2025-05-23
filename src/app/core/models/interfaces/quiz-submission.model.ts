export interface QuizSubmission {
  answers: Answer[];
}
export interface Answer {
  questionId: number;
  optionId: number;
}
