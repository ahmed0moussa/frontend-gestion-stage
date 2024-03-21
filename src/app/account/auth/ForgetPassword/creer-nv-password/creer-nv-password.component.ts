import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthentficationService } from 'src/app/core/services/servicesProject/authentfication.service';

@Component({
  selector: 'app-creer-nv-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './creer-nv-password.component.html',
  styleUrls: ['./creer-nv-password.component.scss'],
})
export class CreerNvPasswordComponent {
  formNvPassword!: FormGroup;

  constructor(
    private authService: AuthentficationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formNvPassword = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
        ],
      ],
      confirmationPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
        ],
      ],
    });
  }

  creerPassworPWDoublier() {
    this.authService
      .creerPassworPWDoublier(this.formNvPassword.value)
      .subscribe((ress: any) => {
        console.log('ssss', ress);
        this.router.navigate(['/auth/login']);
      });
  }
}
