import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/interfaces/user';

@Injectable({ providedIn: 'root' })
export class AuthfakeauthenticationService {
  private currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  public get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  loginByMatricule(matricule: string): Observable<User> {
    return this.http.post<User>(
      'http://localhost:5000/api/auth/matricule',
      { matricule },
      { withCredentials: true } // Obligatoire pour compatibilité WindowsAuth future
    ).pipe(
      tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  windowsAuth(): Observable<User> {
    return this.http.get<User>(
      'http://localhost:5000/api/auth/windows',
      { withCredentials: true }
    ).pipe(
      tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
