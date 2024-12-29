import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  inject,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import {
  NavigationStart,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { AdminAuthService } from '../admin-auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit, OnDestroy {
  sidebarOpen = true;
  isBrowser: boolean;
  router = inject(Router);
  authService = inject(AdminAuthService);
  private routerSubscription!: Subscription;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Check if running in the browser
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      // Set initial state based on screen width
      this.updateSidebarState(window.innerWidth);
      // Listen to route changes
      this.routerSubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          // Close the sidebar when navigating to a new page on small screens
          if (window.innerWidth < 1024) {
            // Adjust the width as per your needs
            this.sidebarOpen = false;
          }
        }
      });
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent): void {
    if (this.isBrowser) {
      const windowWidth = (event.target as Window).innerWidth;
      this.updateSidebarState(windowWidth);
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  private updateSidebarState(width: number): void {
    this.sidebarOpen = width >= 1024;
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

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
