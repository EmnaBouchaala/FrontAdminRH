import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TypeFourniture } from '../interfaces/type-fourniture';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TypeFournitureService {
  private api = 'http://localhost:5000/api/TypeFourniture';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TypeFourniture[]> {
    return this.http.get<TypeFourniture[]>(this.api);
  }

  getById(id: number): Observable<TypeFourniture> {
    return this.http.get<TypeFourniture>(`${this.api}/${id}`);
  }

  create(type: TypeFourniture): Observable<TypeFourniture> {
    return this.http.post<TypeFourniture>(this.api, type);
  }

  update(id: number, type: TypeFourniture): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}`, type);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
