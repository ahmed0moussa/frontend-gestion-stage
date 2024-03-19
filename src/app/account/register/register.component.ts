import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

// Register Auth
import { RegisterRequest } from 'src/app/models copy/register-request';
import { AuthentficationService } from 'src/app/services/authentfication.service';
import { Register } from 'src/app/store/Authentication/authentication.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

// Register Component
export class RegisterComponent {
  // Login Form
  signupForm!: UntypedFormGroup;
  submitted = false;
  successmsg = false;
  registerRequest: RegisterRequest = new RegisterRequest();
  errorMsg!: string;
  formRegister!: FormGroup;
  // set the current year
  year: number = new Date().getFullYear();

  fieldTextType!: boolean;

  constructor(
    private authService: AuthentficationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formRegister = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(10),
        ],
      ],
      roles: [['USER'], []],
    });
  }

  register() {
    console.log('ccc', this.formRegister.value);
    this.authService.register(this.formRegister.value).subscribe(
      (result) => {
        console.log('aaaaaaa', result);

        this.router.navigate(['/confirmationMailOTP']);
      },
      (err: HttpErrorResponse) => (this.errorMsg = 'this email is existe')
    );
  }
  // convenience getter for easy access to form fields

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
