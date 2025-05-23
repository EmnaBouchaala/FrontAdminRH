import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuizQuestion } from '../interfaces/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizQuestionService {
  private baseUrl = 'http://localhost:5000/api/quizquestion';

  constructor(private http: HttpClient) {}

  getQuestionsByQuiz(quizId: number): Observable<QuizQuestion[]> {
    return this.http.get<QuizQuestion[]>(`${this.baseUrl}/quiz/${quizId}`);
  }

  getQuestionById(id: number): Observable<QuizQuestion> {
    return this.http.get<QuizQuestion>(`${this.baseUrl}/${id}`);
  }

  createQuestion(question: QuizQuestion): Observable<QuizQuestion> {
    return this.http.post<QuizQuestion>(`${this.baseUrl}`, question);
  }

  updateQuestion(id: number, question: QuizQuestion): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, question);
  }

  deleteQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
