// reponse.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reponse } from '../interfaces/reponse.model';

@Injectable({ providedIn: 'root' })
export class ReponseService {
  private baseUrl = 'http://localhost:5000/api/v1/reponses';

  constructor(private http: HttpClient) {}

  getReponsesByQuestion(questionId: number, page = 0, size = 10): Observable<{content: Reponse[]}> {
    return this.http.get<{content: Reponse[]}>(`${this.baseUrl}/question/${questionId}`);
  }

  getReponseById(id: number): Observable<Reponse> {
    return this.http.get<Reponse>(`${this.baseUrl}/${id}`);
  }

  createReponse(reponse: Reponse): Observable<Reponse> {
    return this.http.post<Reponse>(`${this.baseUrl}/create`, reponse);
  }

  updateReponse(id: number, reponse: Reponse): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, reponse);
  }

  deleteReponse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
