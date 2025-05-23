import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../interfaces/service';

@Injectable({ providedIn: 'root' })
export class ServiceService {
  private api = 'http://localhost:5000/api/Service';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Service[]> {
    return this.http.get<Service[]>(this.api);
  }

  getById(id: number): Observable<Service> {
    return this.http.get<Service>(`${this.api}/${id}`);
  }

  create(service: Service): Observable<Service> {
    return this.http.post<Service>(this.api, service);
  }

  update(id: number, service: Service): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}`, service);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
