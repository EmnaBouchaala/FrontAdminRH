import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Role } from "../interfaces/role";

@Injectable({ providedIn: 'root' })
export class RoleService {
  private api = 'http://localhost:5000/api/Role';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(this.api);
  }
}
