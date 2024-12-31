import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  Component,
  HostListener,
  inject,
  OnInit,
  Renderer2,
  signal,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, CommonModule, NgOptimizedImage],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  isMenuOpen = signal<boolean>(false);
  isScrolled = signal<boolean>(false);
  servicesDropdownOpen = signal<boolean>(false);

  router = inject(Router);
  renderer = inject(Renderer2);

  ngOnInit(): void {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 0);
  }

  toggleMenu(event: Event) {
    this.isMenuOpen.set(!this.isMenuOpen());
    this.servicesDropdownOpen.set(false);

    event.stopPropagation();
  }
  closeMenu() {
    if (this.isMenuOpen) {
      this.isMenuOpen.set(false);
    }
  }

  // Close menu when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    this.closeMenu();
  }

  // Toggle services dropdown
  toggleServicesDropdown() {
    this.servicesDropdownOpen.set(!this.servicesDropdownOpen());
  }
}
