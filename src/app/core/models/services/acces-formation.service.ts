import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccesFormation } from '../interfaces/access-formation';

@Injectable({ providedIn: 'root' })
export class AccesFormationService {
  private api = 'http://localhost:5000/api/AccesFormation';

  constructor(private http: HttpClient) {}

  getAll(): Observable<AccesFormation[]> {
    return this.http.get<AccesFormation[]>(this.api);
  }

  getById(id: number): Observable<AccesFormation> {
    return this.http.get<AccesFormation>(`${this.api}/${id}`);
  }

  create(acces: AccesFormation): Observable<AccesFormation> {
    return this.http.post<AccesFormation>(this.api, acces);
  }

  update(id: number, acces: AccesFormation): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}`, acces);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
