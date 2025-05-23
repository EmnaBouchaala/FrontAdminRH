import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuizOption } from '../interfaces/quiz-option.model';

@Injectable({
  providedIn: 'root'
})
export class QuizOptionService {
  private baseUrl = 'http://localhost:5000/api/quizoption';

  constructor(private http: HttpClient) {}

  getOptionsByQuestion(questionId: number): Observable<QuizOption[]> {
    return this.http.get<QuizOption[]>(`${this.baseUrl}/question/${questionId}`);
  }

  getOptionById(id: number): Observable<QuizOption> {
    return this.http.get<QuizOption>(`${this.baseUrl}/${id}`);
  }

  createOption(option: QuizOption): Observable<QuizOption> {
    return this.http.post<QuizOption>(`${this.baseUrl}`, option);
  }

  updateOption(id: number, option: QuizOption): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, option);
  }

  deleteOption(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
