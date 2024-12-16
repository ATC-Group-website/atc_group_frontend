import { InputTextModule } from 'primeng/inputtext';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AdminAuthService } from '../admin-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    PasswordModule,
    CommonModule,
    ButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  errorMessage: string | null = null;
  router = inject(Router);
  authService = inject(AdminAuthService);

  constructor() {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const adminToken = localStorage.getItem('token');
      if (adminToken !== null) {
        this.router.navigateByUrl('admin/dashboard');
      }
    }
  }

  onLogin(formData: NgForm) {
    if (formData.form.invalid) {
      Object.keys(formData.form.controls).forEach((field) => {
        const control = formData.form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    } else {
      this.errorMessage = null;
      this.isLoading = true;

      this.authService.login(formData.form.value).subscribe({
        next: (response) => {
          console.log(response);

          localStorage.setItem('token', response.token);
          if (
            typeof window !== 'undefined' &&
            typeof localStorage !== 'undefined'
          ) {
            const redirectUrl =
              localStorage.getItem('redirectUrl') || '/admin/dashboard';
            localStorage.removeItem('redirectUrl');

            this.router.navigate([redirectUrl]);
            this.isLoading = false;
          }
        },
        error: (err) => {
          this.errorMessage =
            err.error.error || 'Login failed. Please try again.';
          this.isLoading = false;
        },
      });
    }
  }
}
