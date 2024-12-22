import { Component, inject, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
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
    NavComponent,
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
  subscribers!: any[];
  loading: boolean = true;
  totalSubscribers: number = 0;
  first = 0;
  rows = 10;

  dashboardService = inject(AdminDashboardService);
  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);

  ngOnInit(): void {
    this.getEmails();
  }

  getEmails() {
    this.dashboardService.getSubscribedEmails().subscribe({
      next: (res) => {
        this.subscribers = res.subscribers.reverse();
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
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
          next: (response) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: `Email deleted successfully`,
            });
            this.getEmails();
          },
          error: (err) => {
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
