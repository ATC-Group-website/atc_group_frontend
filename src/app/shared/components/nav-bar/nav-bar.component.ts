import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  Component,
  HostListener,
  inject,
  OnInit,
  Renderer2,
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
  isMenuOpen = false;
  isScrolled = false;
  servicesDropdownOpen = false;

  router = inject(Router);
  renderer = inject(Renderer2);

  ngOnInit(): void {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }

  toggleMenu(event: Event) {
    this.isMenuOpen = !this.isMenuOpen;
    this.servicesDropdownOpen = false;
    // if (this.isMenuOpen) {
    //   this.renderer.addClass(document.body, 'no-scroll');
    // } else {
    //   this.renderer.removeClass(document.body, 'no-scroll');
    // }
    event.stopPropagation(); // Prevent event bubbling
    // Add or remove 'no-scroll' class on body
  }
  closeMenu() {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
      // Remove the 'no-scroll' class when closing the menu
      // this.renderer.removeClass(document.body, 'no-scroll');
    }
  }

  // Close menu when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    this.closeMenu();
  }

  // Toggle services dropdown
  toggleServicesDropdown() {
    this.servicesDropdownOpen = !this.servicesDropdownOpen;
  }
}
