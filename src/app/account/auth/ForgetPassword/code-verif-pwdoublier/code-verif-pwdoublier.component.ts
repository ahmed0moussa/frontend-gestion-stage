import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { Router, RouterModule } from '@angular/router';
import { AuthentficationService } from 'src/app/core/services/servicesProject/authentfication.service';

@Component({
  selector: 'app-code-verif-pwdoublier',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './code-verif-pwdoublier.component.html',
  styleUrls: ['./code-verif-pwdoublier.component.scss'],
})
export class CodeVerifPWDoublierComponent implements OnInit {
  formCodeverif!: FormGroup;

  constructor(
    private authService: AuthentficationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formCodeverif = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', [Validators.required, this.exactLengthValidator(8)]],
    });
  }
  // meth verif longeur otp
  exactLengthValidator(length: number) {
    return (control: AbstractControl) => {
      if (control.value && control.value.length !== length) {
        return { exactLength: true };
      }
      return null;
    };
  }

  verifyOtp() {
    this.authService
      .verifyOtp(this.formCodeverif.value)
      .subscribe((ress: any) => {
        console.log('ssss', ress);
        this.router.navigate(['/auth/creerNvPasswordComponent']);
      });
  }
}
