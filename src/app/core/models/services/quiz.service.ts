import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from '../interfaces/quiz.model';
import { QuizResult } from '../interfaces/quiz-result.model';
import { QuizSubmission } from '../interfaces/quiz-submission.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private baseUrl = 'http://localhost:5000/api/quiz';

  constructor(private http: HttpClient) {}

  getQuizsByFormation(formationId: number): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.baseUrl}/formation/${formationId}`);
  }

  getQuizById(id: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.baseUrl}/${id}`);
  }

  createQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(`${this.baseUrl}`, quiz);
  }

  updateQuiz(id: number, quiz: Quiz): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, quiz);
  }

  deleteQuiz(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  submitQuiz(quizId: number, userId: number, submission: QuizSubmission): Observable<{score: number}> {
    return this.http.post<{score: number}>(`${this.baseUrl}/${quizId}/submit/${userId}`, submission);
  }

  getQuizResultsByUser(userId: number): Observable<QuizResult[]> {
    return this.http.get<QuizResult[]>(`${this.baseUrl}result/user/${userId}`);
  }
}
