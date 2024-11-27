import { Component } from '@angular/core';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { ScrollToTopComponent } from '../../shared/components/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [
    TopBarComponent,
    NavBarComponent,
    FooterComponent,
    PaginatorModule,
    SkeletonModule,
    ScrollToTopComponent,
  ],
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.css',
})
export class InsightsComponent {
  first: number = 0;

  rows: number = 3;

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 3;
  }
}
