import { InputTextModule } from 'primeng/inputtext';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

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
export class LoginComponent {
  isLoading: boolean = false;
  errorMessage: string | null = null;
  router = inject(Router);

  constructor() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const adminToken = localStorage.getItem('token');
      if (adminToken !== null) {
        this.router.navigate(['admin/dashboard']);
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
      this.router.navigate(['admin/dashboard']);

      // this.adminService.loginAdmin(formData.form.value).subscribe({
      //   next: (response) => {
      //     const token = response.token;
      //     this.adminService.setToken(token);
      //     if (
      //       typeof window !== 'undefined' &&
      //       typeof sessionStorage !== 'undefined'
      //     ) {
      //       const redirectUrl =
      //         sessionStorage.getItem('redirectUrl') || '/dashboard/home';
      //       sessionStorage.removeItem('redirectUrl');

      //       this.router.navigate([redirectUrl]);
      //       this.isLoading = false;
      //     }
      //   },
      //   error: (err) => {
      //     this.errorMessage =
      //       err.error.error || 'Login failed. Please try again.';
      //     this.isLoading = false;
      //   },
      // });
    }
  }
}
