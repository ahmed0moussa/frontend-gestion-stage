import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user';
import { ListUserDTO } from '../../models/list-user-dto';

@Injectable({
  providedIn: 'root',
})
export class GestionUsersService {
  apiUrl: string = environment.baseUrl + '/crudusers';
  // injection de router dans: (navigation entre les pages)
  constructor(private http: HttpClient, private router: Router) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/createUser`, user);
  }

  getUserById(UserId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/getUserById/${UserId}`);
  }
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/createUser`, user);
  }
  // updateUser(UserId: number, User: User): Observable<User> {
  //   return this.http.put<User>(`${this.apiUrl}/UpdateUser/${UserId}`, User);
  // }
  deleteUser(UserId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/DeleteUser/${UserId}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/listUsers/all`);
  }
}
