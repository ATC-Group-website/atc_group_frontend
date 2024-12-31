import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';
import { ButtonModule } from 'primeng/button';
import { AdminDashboardService } from '../admin-dashboard.service';
import { MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-send-emails',
  standalone: true,
  imports: [
    FormsModule,
    ChipsModule,
    ButtonModule,
    ToastModule,
    CheckboxModule,
  ],
  providers: [MessageService],
  templateUrl: './send-emails.component.html',
  styleUrl: './send-emails.component.css',
})
export class SendEmailsComponent {
  isLoading = signal<boolean>(false);

  emails = signal<string[] | null>(null);
  enableButton = signal<boolean>(false);

  dashboardService = inject(AdminDashboardService);
  messageService = inject(MessageService);

  ngOnInit() {
    this.emails.set(null);
    this.enableButton.set(false);
  }
  onSubmit() {
    const emailList = this.emails();

    if (emailList && emailList.length > 0) {
      this.isLoading.set(true);

      this.dashboardService.sendEmails(emailList).subscribe({
        next: (response) => {
          this.isLoading.set(false);
          this.enableButton.set(false);

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message,
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
          });

          this.enableButton.set(false);
          this.isLoading.set(false);
        },
      });
    }
  }

  // You can use this to update the emails signal directly
  updateEmails(newEmails: string[] | null): void {
    this.emails.set(newEmails);
  }

  // Similarly, this could be used to update the enableButton signal
  toggleEnableButton(value: boolean): void {
    this.enableButton.set(value);
  }
}
