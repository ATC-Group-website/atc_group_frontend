import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AdminAuthService } from '../admin-auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, InputTextModule, ButtonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  router = inject(Router);
  authService = inject(AdminAuthService);
  constructor() {}

  sidebarVisible = false;

  toggleSidebar(event: Event) {
    this.sidebarVisible = !this.sidebarVisible;
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (this.sidebarVisible) {
      this.sidebarVisible = false;
    }
  }

  logoutAdmin() {
    this.authService.logout().subscribe({
      next: (res) => {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        if (err.error.message === 'Token has expired') {
          localStorage.removeItem('token');
          this.router.navigateByUrl('admin/login');
        }
      },
    });
  }
}
