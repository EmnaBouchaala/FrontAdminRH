import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cours } from '../interfaces/Cours';

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  private apiUrl = 'http://localhost:5000/api/Cours';

  constructor(private http: HttpClient) {}

  uploadCours(file: File, formationId: number, titre: string): Observable<Cours> {
    const formData = new FormData();
    formData.append('fichier', file);
    formData.append('formationId', formationId.toString());
    formData.append('titre', titre);
    return this.http.post<Cours>(`${this.apiUrl}/upload`, formData);
  }

  getCoursByFormation(formationId: number): Observable<Cours[]> {
    return this.http.get<Cours[]>(`${this.apiUrl}/byFormation/${formationId}`);
  }

  deleteCours(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateCours(cours: Cours): Observable<Cours> {
    return this.http.put<Cours>(`${this.apiUrl}/${cours.id}`, cours);
  }
}
