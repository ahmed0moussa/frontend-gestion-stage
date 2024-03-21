import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, Observable } from 'rxjs';
import { ChangePasswordResetRequest } from 'src/app/models copy/ModelsForgetPasword/change-password-reset-request';
import { ConfirmationOTPcompte } from 'src/app/models copy/ModelsForgetPasword/confirmation-otpcompte';
import { ResponseEmailpwdoub } from 'src/app/models copy/ModelsForgetPasword/response-emailpwdoub';
import { Verifpwdemailoublier } from 'src/app/models copy/ModelsForgetPasword/verifpwdemailoublier';
import { VerifyOtpPWDoublier } from 'src/app/models copy/ModelsForgetPasword/verify-otp-pwdoublier';
import { AuthenticationRequest } from 'src/app/models copy/authentication-request';
import { AuthenticationResponse } from 'src/app/models copy/authentication-response';
import { RegisterRequest } from 'src/app/models copy/register-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthentficationService {
  Role: any;
  isroleAdmin!: boolean;

  private currentUserSource = new ReplaySubject<AuthenticationRequest | null>(
    1
  );
  currentUser$ = this.currentUserSource.asObservable();

  apiUrl: string = environment.baseUrl + '/auth';
  // injection de router dans: (navigation entre les pages)
  constructor(private http: HttpClient, private router: Router) {}

  authenticate(
    authenticationRequest: AuthenticationRequest
  ): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(
      this.apiUrl + '/authenticate',
      authenticationRequest
    );
  }

  isUserAuthenticated(): boolean {
    if (localStorage.getItem('accessToken')) {
      return true;
    }
    this.router.navigate(['/authentification']);
    return false;
  }

  // isUserAdmin(): boolean {
  //   const role = this.getUserRole();
  //   return role === 'ADMINISTRATEUR';
  // }

  setUserToken(authenticationResponse: AuthenticationResponse) {
    localStorage.setItem('accessToken', JSON.stringify(authenticationResponse));

    const token = authenticationResponse.accessToken; // Utilisez la casse correcte ici
    console.log('aaa', token);

    if (token) {
      try {
        const decodedToken = jwtDecode(token.toString()) as any;
        const firstname = decodedToken.firstname;
        localStorage.setItem('firstname', firstname);
        const id = decodedToken.id;
        localStorage.setItem('userId', id);
        console.log('nour', decodedToken);
      } catch (error) {
        console.error('Erreur de décodage du token : ', error);
        // Gérer l'erreur de décodage ici (par exemple, rediriger vers une page d'erreur)
      }
    }
  }

  register(
    registerRequest: RegisterRequest
  ): Observable<AuthenticatorResponse> {
    return this.http.post<AuthenticatorResponse>(
      `${environment.baseUrl}/auth/register`,
      registerRequest
    );
  }

  loggin(login: any) {
    return this.http.post(`${environment.baseUrl}/auth/authenticate`, login);
  }

  getUserRole(): string[] | null {
    const token = localStorage.getItem('accessToken'); // Supposons que le token est stocké dans le local storage
    if (token) {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));

      // Supposons que "authorities" est un tableau de rôles dans le payload
      const authorities = decodedPayload.authorities;
      if (authorities && authorities.length > 0) {
        const userRole = authorities; // Vous pourriez adapter ceci selon votre structure
        console.log('cc', userRole);
        return userRole;
      }
    }
    return null;
  }
  getRole = () => {
    var user: any;
    user = localStorage.getItem('accessToken');
    let token = JSON.parse(user).token;
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken.authorities[0].authority;
  };

  isConnected() {
    if (localStorage.getItem('accessToken') != null) return true;
    else return false;
  }

  logout() {
    console.log('logoutSer');
    localStorage.clear();
  }
  // verif mail aprés Register
  verifyEmailOTP(confirmailcompte: ConfirmationOTPcompte): Observable<string> {
    return this.http.post<string>(
      `${environment.baseUrl}/verify/email`,
      confirmailcompte
    );
  }

  // Methode pour envoyer un mail de vérification PWDoublier : mail Renitialier envoi du code otp
  // verifyMailPWDoublier(email: string): Observable<string> {
  //   return this.http.post<string>(`${environment.baseUrl}/users/changePassword/{email}`, email);
  // }
  verifyMailPWDoublier(
    email: Verifpwdemailoublier
  ): Observable<ResponseEmailpwdoub> {
    return this.http.post<ResponseEmailpwdoub>(
      `${environment.baseUrl}/auth/users/verifyMail`,
      email
    );
  }
  // Methode pour vérifier l'OTP avec email PWDoublier///////////////////////////////////
  verifyOtp(verif: VerifyOtpPWDoublier): Observable<ResponseEmailpwdoub> {
    return this.http.post<ResponseEmailpwdoub>(
      `${environment.baseUrl}/auth/users/verifyOtp`,
      verif
    );
  }

  // Methode pour changer le mot de passe PWDoublier : creation nv password
  // creerPassworPWDoublier(changePassword: ChangePasswordResetRequest): Observable<ResponseEmailpwdoub> {
  //   return this.http.post<ResponseEmailpwdoub>(`/auth/users/changerDemotPasseOublier`, changePassword);
  // }
  creerPassworPWDoublier(
    changePassword: ChangePasswordResetRequest
  ): Observable<ResponseEmailpwdoub> {
    return this.http.post<ResponseEmailpwdoub>(
      `${environment.baseUrl}/auth/users/changerDemotPasseOublier`,
      changePassword
    );
  }

  // Methode pour changer le mot de passe PWDoublier
  changePasswordReconue(
    changePassword: ChangePasswordResetRequest,
    email: string
  ): Observable<string> {
    return this.http.post<string>(
      `/auth/users/changePasswordReconue/${email}`,
      changePassword
    );
  }
}

function jwtDecode(arg0: string): any {
  throw new Error('Function not implemented.');
}
