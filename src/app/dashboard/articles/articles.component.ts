import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { NavComponent } from '../nav/nav.component';
import { AdminDashboardService } from '../admin-dashboard.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Post } from '../interface';
import { CustomDatePipe } from '../../shared/pipes/custom-date.pipe';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ConfirmDialogModule,
    ButtonModule,
    ToastModule,
    RouterModule,
    InputTextModule,
    NavComponent,
    CustomDatePipe,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css',
})
export class ArticlesComponent implements OnInit {
  articles: Post[] = [];
  currentPage: number = 1;
  postsPerPage: number = 10;
  totalArticles: number = 0;
  loading: boolean = true;

  router = inject(Router);
  dashboardService = inject(AdminDashboardService);
  sanitizer = inject(DomSanitizer);
  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);

  constructor() {}

  ngOnInit(): void {
    this.fetchPosts(this.currentPage);
  }

  fetchPosts(pageNum: number) {
    this.dashboardService
      .getPostsByType('article', this.postsPerPage, pageNum)
      .subscribe({
        next: (response) => {
          this.articles = response.posts.data;
          this.totalArticles = response.posts.total;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
        },
      });
  }

  onPageChange(event: any): void {
    this.loading = true;
    this.currentPage = event.first / this.postsPerPage + 1;
    this.fetchPosts(this.currentPage);
  }

  confirmDelete(event: Event, slug: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this article?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.dashboardService.deletePost(slug).subscribe({
          next: (response) => {
            this.fetchPosts(this.currentPage);
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

  // navigateToDetails(slug: number) {
  //   this.router.navigateByUrl(`/admin/edit-post/${slug}`);
  // }

  getFirstTenWords(description: string): SafeHtml {
    // Remove HTML tags and split into words
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = description;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';

    // Split into words, take first 7, then rejoin
    const words = textContent.trim().split(/\s+/);
    const firstSevenWords = words.slice(0, 10).join(' ');

    // Add ellipsis if there are more words
    const finalText =
      words.length > 10 ? `...${firstSevenWords}` : firstSevenWords;

    // Sanitize and return
    return this.sanitizer.bypassSecurityTrustHtml(finalText);
  }
}
