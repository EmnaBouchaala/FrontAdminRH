import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DemandeConge } from '../../models/interfaces/demande-conge';

@Injectable({ providedIn: 'root' })
export class DemandeCongeService {
  private apiUrl = 'http://localhost:5000/api/demandeconge';

  constructor(private http: HttpClient) {}

  getAll(): Observable<DemandeConge[]> {
    return this.http.get<DemandeConge[]>(this.apiUrl);
  }

  getById(id: number): Observable<DemandeConge> {
    return this.http.get<DemandeConge>(`${this.apiUrl}/${id}`);
  }

  create(demande: DemandeConge): Observable<DemandeConge> {
    return this.http.post<DemandeConge>(this.apiUrl, demande);
  }

  update(demande: DemandeConge): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${demande.id}`, demande);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
