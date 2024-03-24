import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { TokenStorageService } from '../../core/services/token-storage.service';
import { Observable } from 'rxjs';
import { TokenModel } from '../models/TokenModel';
import { AuthenticationResponse } from '../models/authentication-response';

const TOKEN_HEADER_KEY = 'Authorization'; // for Spring Boot back-end
// const TOKEN_HEADER_KEY = 'x-access-token';   // for Node.js Express back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // intercept(
  //   req: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {
  //   let authReq = req;
  //   let authenticationResponse: AuthenticationResponse = {};
  //   if (localStorage.getItem('accessToken')) {
  //     authenticationResponse = JSON.parse(
  //       localStorage.getItem('accessToken') as string
  //     );

  //     // for Spring Boot back-end
  //     //  authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
  //     authReq = req.clone({
  //       headers: new HttpHeaders({
  //         Authorization: 'Bearer ' + authenticationResponse,
  //       }),
  //     });

  //     // for Node.js Express back-end
  //     //authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
  //   }
  //   return next.handle(authReq);
  // }
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authenticationResponse: AuthenticationResponse = {};
    if (localStorage.getItem('accessToken')) {
      authenticationResponse = JSON.parse(
        localStorage.getItem('accessToken') as string
      );
      req = req.clone({
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + authenticationResponse.accessToken,
        }),
      });
    }
    return next.handle(req);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
