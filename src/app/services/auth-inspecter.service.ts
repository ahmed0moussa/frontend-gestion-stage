import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationResponse } from '../models copy/authentication-response';

@Injectable({
  providedIn: 'root'
})
// role de classe Intercepter : permettent de traiter les requêtes et les réponses HTTP avant qu'elles ne soient envoyées ou reçues par le serveur.
//chaque request lorsque nous envoyons un (email, password) il fait le clone et il envoi le token a travers (Authorization: "Bearer " + authenticationResponse


export class AuthIntercepterService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authenticationResponse: AuthenticationResponse = {};
    if (localStorage.getItem("accessToken")) {
      authenticationResponse = JSON.parse(localStorage.getItem("accessToken") as string)
      req = req.clone({
        headers: new HttpHeaders({
          Authorization: "Bearer " + authenticationResponse
        })
      })
    }
    return next.handle(req)
  }
}

