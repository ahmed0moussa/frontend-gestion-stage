import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Role } from '../../models/role';
import { LabelValu } from '../../models/label-valu';

@Injectable({
  providedIn: 'root',
})
export class GestionRolesService {
  apiUrl: string = environment.baseUrl + '/roles';

  constructor(private http: HttpClient, private router: Router) {}

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}/listRoles/all`);
  }

  getRoleById(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.apiUrl}/${id}`);
  }

  createRole(Role: Role): Observable<Role> {
    return this.http.post<Role>(this.apiUrl, Role);
  }

  updateRole(id: number, Role: Role): Observable<Role> {
    return this.http.put<Role>(`${this.apiUrl}/${id}`, Role);
  }

  deleteRole(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  //Api multiselect
  getListRoles(): Observable<LabelValu[]> {
    return this.http
      .get<LabelValu[]>(`${this.apiUrl}/listRolesMultiselect`)
      .pipe(map((response: any) => response as LabelValu[]));
  }
}
