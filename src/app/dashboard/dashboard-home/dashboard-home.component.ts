import { Component, inject, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { AdminDashboardService } from '../admin-dashboard.service';
import { ChartModule } from 'primeng/chart';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [NavComponent, ChartModule, LoadingComponent],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css',
})
export class DashboardHomeComponent implements OnInit {
  loading: boolean = true;
  mailSubscribers: number = 0;
  data: any;
  options: any;

  dashboardService = inject(AdminDashboardService);

  constructor() {}

  ngOnInit(): void {
    this.getPostCount();

    this.dashboardService.getEmailsCount().subscribe({
      next: (res) => {
        this.mailSubscribers = res.count;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }

  getPostCount() {
    this.dashboardService.getPostsCount().subscribe({
      next: (res) => {
        const articlesCount = res[1]?.count || 0;
        const newsCount = res[2]?.count || 0;
        const blogsCount = res[0]?.count || 0;
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.data = {
          labels: ['Articles', 'News & Events', 'Blogs'],
          datasets: [
            {
              data: [articlesCount, newsCount, blogsCount],
              backgroundColor: [
                documentStyle.getPropertyValue('--blue-500'),
                documentStyle.getPropertyValue('--yellow-500'),
                documentStyle.getPropertyValue('--green-500'),
              ],
              hoverBackgroundColor: [
                documentStyle.getPropertyValue('--blue-400'),
                documentStyle.getPropertyValue('--yellow-400'),
                documentStyle.getPropertyValue('--green-400'),
              ],
            },
          ],
        };

        this.options = {
          plugins: {
            legend: {
              labels: {
                usePointStyle: true,
                color: textColor,
              },
            },
          },
        };
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }
}
