import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, CommonModule, NgOptimizedImage],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  router = inject(Router);
  isMenuOpen = false;
  // isSubMenuOpen = false;
  isScrolled = false;
  showServices = false;

  ngOnInit(): void {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }

  toggleMenu(event: Event) {
    this.isMenuOpen = !this.isMenuOpen;
    event.stopPropagation(); // Prevent event bubbling
  }

  // Close the navbar when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    this.isMenuOpen = false;
  }

  navigateToService(service: string) {
    this.router.navigate([`/services/${service}`]); // Adjust route as per your application
  }

  isSubMenuOpen = false;

  toggleSubmenu(event: Event) {
    event.preventDefault();
    this.isSubMenuOpen = !this.isSubMenuOpen;
    const linkElement = event.target as HTMLElement;
    linkElement.classList.toggle('open');
  }
}
