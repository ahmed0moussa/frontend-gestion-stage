import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthentficationService } from 'src/app/core/services/servicesProject/authentfication.service';

@Component({
  selector: 'app-mail-verif-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './mail-verif-register.component.html',
  styleUrl: './mail-verif-register.component.scss',
})
export class MailVerifRegisterComponent {
  year: number = new Date().getFullYear();
  formConfirm!: FormGroup;

  constructor(
    private authService: AuthentficationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formConfirm = this.formBuilder.group({
      otp: ['', [Validators.required]],
    });
  }
  verifyEmailOTP() {
    console.log('aa', this.formConfirm.value);
    this.authService
      .verifyEmailOTP(this.formConfirm.value)
      .subscribe((ress: any) => {
        console.log('a2', ress);
        this.router.navigate(['/auth/login']);
      });
  }
}
