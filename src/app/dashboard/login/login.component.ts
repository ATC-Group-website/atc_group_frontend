import { InputTextModule } from 'primeng/inputtext';
import {
  Component,
  Inject,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
  isBrowser = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  router = inject(Router);
  authService = inject(AdminAuthService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser.set(isPlatformBrowser(platformId));
  }

  ngOnInit(): void {
    if (this.isBrowser()) {
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
      this.errorMessage.set(null);
      this.isLoading.set(true);

      this.authService.login(formData.form.value).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigateByUrl('/admin/dashboard');
          this.isLoading.set(false);
        },
        error: (err) => {
          this.errorMessage.set(
            err.error.error || 'Login failed. Please try again.',
          );
          this.isLoading.set(false);
        },
      });
    }
  }
}
