import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visitor-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visitor-layout.component.html',
  styleUrl: './visitor-layout.component.scss'
})
export class VisitorLayoutComponent {
  constructor(private router: Router) {}
  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }
  
  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
