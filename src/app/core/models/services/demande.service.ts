import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Demande } from '../interfaces/demande';

@Injectable({ providedIn: 'root' })
export class DemandeService {
  private api = 'http://localhost:5000/api/Demande';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Demande[]> {
    return this.http.get<Demande[]>(this.api);
  }

  getById(id: number): Observable<Demande> {
    return this.http.get<Demande>(`${this.api}/${id}`);
  }

  create(demande: Demande): Observable<Demande> {
    return this.http.post<Demande>(this.api, demande);
  }

  update(id: number, demande: Demande): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}`, demande);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
