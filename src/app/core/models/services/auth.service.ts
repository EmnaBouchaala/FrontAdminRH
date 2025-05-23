import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:5000/api/Auth';

  constructor(private http: HttpClient) {}

  authWindows(): Observable<User> {
    return this.http.get<User>(`${this.api}/windows`);
  }

  authMatricule(matricule: string): Observable<User> {
    return this.http.post<User>(`${this.api}/matricule`, { matricule });
  }
}
