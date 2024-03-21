import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models copy/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GestionUsersService {
  apiUrl: string = environment.baseUrl + '/auth';
  // injection de router dans: (navigation entre les pages)
  constructor(private http: HttpClient, private router: Router) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.baseUrl}/createUser`, User);
  }

  getUserById(UserId: number): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/getUserById/${UserId}`);
  }

  updateUser(UserId: number, User: User): Observable<User> {
    return this.http.put<User>(
      `${environment.baseUrl}/UpdateUser/${UserId}`,
      User
    );
  }
  deleteUser(UserId: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.baseUrl}/DeleteUser/${UserId}`
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseUrl}/listUsers/all`);
  }
}
