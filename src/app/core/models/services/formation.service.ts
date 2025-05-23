import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formation } from '../interfaces/formation';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private baseUrl = 'http://localhost:5000/api/Formation';

  constructor(private http: HttpClient) {}

  // Récupérer toutes les formations sans pagination
  getAllFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(this.baseUrl);
  }

  getFormationById(id: number): Observable<Formation> {
    return this.http.get<Formation>(`${this.baseUrl}/${id}`);
  }

  createFormation(formation: Formation): Observable<Formation> {
    return this.http.post<Formation>(this.baseUrl, formation);
  }

  updateFormation(id: number, formation: Formation): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, formation);
  }

  deleteFormation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
