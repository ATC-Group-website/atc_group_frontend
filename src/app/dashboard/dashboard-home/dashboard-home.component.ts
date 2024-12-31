import { Component, inject, OnInit, signal } from '@angular/core';
import { AdminDashboardService } from '../admin-dashboard.service';
import { ChartModule } from 'primeng/chart';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { ChartData, ChartOptions } from '../interface';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [ChartModule, LoadingComponent],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css',
})
export class DashboardHomeComponent implements OnInit {
  loading = signal<boolean>(true);
  mailSubscribers = signal<number>(0);
  data = signal<ChartData>({
    labels: [],
    datasets: [],
  });
  options = signal<ChartOptions>({
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          color: '',
        },
      },
    },
  });

  dashboardService = inject(AdminDashboardService);

  constructor() {}

  ngOnInit(): void {
    this.getPostCount();

    this.dashboardService.getEmailsCount().subscribe({
      next: (res) => {
        this.mailSubscribers.set(res.count);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
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

        this.data.set({
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
        });

        this.options.set({
          plugins: {
            legend: {
              labels: {
                usePointStyle: true,
                color: textColor,
              },
            },
          },
        });
      },
      error: () => {},
    });
  }
}
