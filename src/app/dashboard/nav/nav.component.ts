import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, InputTextModule, ButtonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  router = inject(Router);
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
    this.router.navigate(['']);
  }
}
