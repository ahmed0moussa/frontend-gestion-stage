import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthentficationService } from 'src/app/core/services/servicesProject/authentfication.service';
import { AuthenticationRequest } from 'src/app/core/models/authentication-request';
import { login } from 'src/app/store/Authentication/authentication.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

// Login Component
export class LoginComponent {
  // Login Form

  fieldTextType!: boolean;

  a: any = 10;
  b: any = 20;
  toast!: false;
  form!: FormGroup;
  authenticationRequest: AuthenticationRequest = new AuthenticationRequest();
  errorMsg!: String;
  data: any;
  token = JSON.parse(localStorage.getItem('accessToken')!);
  Role: any;
  // set the current year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(
    private authService: AuthentficationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('accessToken');
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  // on peut ajouter autres roles
  login1() {
    //console.log(this.form.value) : this.form.value : IL passe le contenue de login et password
    console.log(this.form.value);
    this.authService.loggin(this.form.value).subscribe(
      (ress: any) => {
        this.authService.setUserToken(ress);
        const name = localStorage.getItem('email');

        ////
        localStorage.setItem('accessToken', JSON.stringify(ress));
        this.Role = this.authService.getUserRole();
        console.log('role', this.authService.getUserRole());
        if (this.Role[0].authority == 'ADMINISTRATEUR') {
          this.router.navigate(['/Admin']);
        } else if (this.Role[0].authority == 'USER') {
          this.router.navigate(['/visitor']);
        } else if (this.Role[0].authority == 'ENCADRANT') {
          this.router.navigate(['/Admin']);
        } else if (this.Role[0].authority == 'STAGIAIRE') {
          this.router.navigate(['/Admin']);
        }
      },
      (error) => {
        this.errorMsg = 'login ou mot de pass incorect';
      }
    );
  }

  roleTestAdmin(roleAdmin: string): boolean {
    if (roleAdmin == 'ADMINISTRATEUR') {
      return true;
    } else this.router.navigate(['/']);

    return false;
  }

  roleTestUser(roleUser: string): boolean {
    if (roleUser == 'UTILISATEUR') {
      return true;
    } else this.router.navigate(['/']);

    return false;
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
