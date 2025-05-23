import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Matiere } from '../interfaces/matiere';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MatiereService {
  private api = 'http://localhost:5000/api/Matiere';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.api);
  }

  getById(id: number): Observable<Matiere> {
    return this.http.get<Matiere>(`${this.api}/${id}`);
  }

  create(matiere: Matiere): Observable<Matiere> {
    return this.http.post<Matiere>(this.api, matiere);
  }

  update(id: number, matiere: Matiere): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}`, matiere);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
