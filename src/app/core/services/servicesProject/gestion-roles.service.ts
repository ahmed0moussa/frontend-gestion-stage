import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Role } from '../../models/role';

@Injectable({
  providedIn: 'root',
})
export class GestionRolesService {
  apiUrl: string = environment.baseUrl + '/roles';

  constructor(private http: HttpClient, private router: Router) {}

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}/listRoles/all`);
  }
}
