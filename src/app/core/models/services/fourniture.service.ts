import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fourniture } from '../interfaces/fourniture';

@Injectable({ providedIn: 'root' })
export class FournitureService {
  private api = 'http://localhost:5000/api/Fourniture';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Fourniture[]> {
    return this.http.get<Fourniture[]>(this.api);
  }

  getById(id: number): Observable<Fourniture> {
    return this.http.get<Fourniture>(`${this.api}/${id}`);
  }

  create(fourniture: Fourniture): Observable<Fourniture> {
    return this.http.post<Fourniture>(this.api, fourniture);
  }

  update(id: number, fourniture: Fourniture): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}`, fourniture);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
