import { Component, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { AdminDashboardService } from '../admin-dashboard.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Post } from '../interface';
import { CustomDatePipe } from '../../shared/pipes/custom-date.pipe';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ConfirmDialogModule,
    ButtonModule,
    ToastModule,
    RouterModule,
    TooltipModule,
    InputTextModule,
    CustomDatePipe,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css',
})
export class BlogsComponent implements OnInit {
  blogs = signal<Post[]>([]);
  currentPage = signal<number>(1);
  postsPerPage = signal<number>(10);
  totalBlogs = signal<number>(0);
  loading = signal<boolean>(true);

  router = inject(Router);
  dashboardService = inject(AdminDashboardService);
  sanitizer = inject(DomSanitizer);
  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);

  constructor() {}

  ngOnInit(): void {
    this.fetchPosts(this.currentPage());
  }

  fetchPosts(pageNum: number) {
    this.dashboardService
      .getPostsByType('blog', this.postsPerPage(), pageNum)
      .subscribe({
        next: (response) => {
          this.blogs.set(response.posts.data);
          this.totalBlogs.set(response.posts.total);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        },
      });
  }

  onPageChange(event: any): void {
    this.loading.set(true);
    const newPage = event.first / this.postsPerPage() + 1;
    this.currentPage.set(newPage);
    this.fetchPosts(this.currentPage());
  }

  confirmDelete(event: Event, slug: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this blog?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.dashboardService.deletePost(slug).subscribe({
          next: (response) => {
            this.fetchPosts(this.currentPage());
            this.messageService.add({
              severity: 'info',
              summary: 'Success',
              detail: response.message,
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err.error.message,
            });
          },
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Cancelled',
          detail: 'You have rejected',
        });
      },
    });
  }

  getFirstTenWords(description: string): SafeHtml {
    // Remove HTML tags and split into words
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = description;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';

    // Split into words, take first 10, then rejoin
    const words = textContent.trim().split(/\s+/);
    const firstSevenWords = words.slice(0, 10).join(' ');

    // Add ellipsis if there are more words
    const finalText =
      words.length > 10 ? `${firstSevenWords}...` : firstSevenWords;

    // Sanitize and return
    return this.sanitizer.bypassSecurityTrustHtml(finalText);
  }

  getDirection(text: string): string {
    const rtlPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/; // Arabic, Persian, and similar scripts
    return rtlPattern.test(text) ? 'rtl' : 'ltr';
  }
}
