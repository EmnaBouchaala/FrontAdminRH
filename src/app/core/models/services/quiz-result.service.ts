import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuizResult } from '../interfaces/quiz-result.model';

@Injectable({
  providedIn: 'root'
})
export class QuizResultService {
  private baseUrl = 'http://localhost:5000/api/quizresult';

  constructor(private http: HttpClient) {}

  getAllResults(): Observable<QuizResult[]> {
    return this.http.get<QuizResult[]>(`${this.baseUrl}`);
  }

  getResultsByUser(userId: number): Observable<QuizResult[]> {
    return this.http.get<QuizResult[]>(`${this.baseUrl}/user/${userId}`);
  }

  getResultsByQuiz(quizId: number): Observable<QuizResult[]> {
    return this.http.get<QuizResult[]>(`${this.baseUrl}/quiz/${quizId}`);
  }

  deleteResult(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Nouvelle méthode pour obtenir le total des participants
  getTotalParticipants(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/Stats/TotalParticipants`);
  }

  // Nouvelle méthode pour obtenir les participants avec score > 10
  getPassedQuizAbove10(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/Stats/PassedQuizAbove10`);
  }

  // Nouvelle méthode pour obtenir les participants avec score < 10
  getFailedQuizBelow10(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/Stats/FailedQuizBelow10`);
  }
}
