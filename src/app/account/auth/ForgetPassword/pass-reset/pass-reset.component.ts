import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentficationService } from 'src/app/core/services/servicesProject/authentfication.service';

@Component({
  selector: 'app-pass-reset',
  templateUrl: './pass-reset.component.html',
  styleUrls: ['./pass-reset.component.scss'],
})

// Password Reset
export class PassResetComponent {
  // set the currenr year
  year: number = new Date().getFullYear();
  formRenitialiser!: FormGroup;

  constructor(
    private authService: AuthentficationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formRenitialiser = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  verifyMailPWDoublier() {
    // const email = this.formRenitialiser.get('email')?.value;

    this.authService
      .verifyMailPWDoublier(this.formRenitialiser.value)
      .subscribe((result) => {
        console.log(result);

        this.router.navigate(['/auth/codeVerifPWDoublierComponent']);
      });
  }
}
