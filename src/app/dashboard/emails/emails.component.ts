import { Component, inject, OnInit, signal } from '@angular/core';
import { AdminDashboardService } from '../admin-dashboard.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CustomDatePipe } from '../../shared/pipes/custom-date.pipe';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-emails',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    ToastModule,
    CustomDatePipe,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './emails.component.html',
  styleUrl: './emails.component.css',
})
export class EmailsComponent implements OnInit {
  subscribers = signal<any[]>([]);
  loading = signal<boolean>(true);
  totalSubscribers = signal<number>(0);
  first = signal<number>(0);
  rows = signal<number>(10);

  dashboardService = inject(AdminDashboardService);
  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);

  ngOnInit(): void {
    this.getEmails();
  }

  getEmails() {
    this.dashboardService.getSubscribedEmails().subscribe({
      next: (res) => {
        this.subscribers.set(res.subscribers.reverse());
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
      },
    });
  }

  pageChange(event: any) {
    this.first.set(event.first);
    this.rows.set(event.rows);
  }

  confirmDelete(event: Event, subscriberEmail: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this email?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.dashboardService.deleteSubscribedEmail(subscriberEmail).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: `Email deleted successfully`,
            });
            this.getEmails();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete email',
            });
          },
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }
}
