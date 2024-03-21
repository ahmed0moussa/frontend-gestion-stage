import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8091/api/v1/users/auth'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) {}

  findById(idUser: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getUser/${idUser}`);
  }
}
