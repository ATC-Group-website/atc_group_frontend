import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';
import { ButtonModule } from 'primeng/button';
import { AdminDashboardService } from '../admin-dashboard.service';
import { MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { finalize } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

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
  isLoadingDownload = signal<boolean>(false);

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

  // downloadEmailsContactus() {
  //   this.isLoadingDownload.set(true);
  //   this.dashboardService
  //     .getContactUsEmailsFromDatabase()
  //     .pipe(
  //       finalize(() => {
  //         this.isLoadingDownload.set(false);
  //       }),
  //     )
  //     .subscribe({
  //       next: (response) => {
  //         console.log(response);

  //         const blob = new Blob([response], { type: 'text/csv' });
  //         const url = window.URL.createObjectURL(blob);
  //         const a = document.createElement('a');
  //         a.href = url;
  //         a.download = 'emails.xlsx';
  //         a.click();
  //         window.URL.revokeObjectURL(url);
  //       },
  //       error: (error) => {
  //         console.log(error);

  //         this.messageService.add({
  //           severity: 'error',
  //           summary: 'Error',
  //           detail: error.error.message,
  //         });
  //       },
  //     });
  // }

  // downloadEmailsContactus() {
  //   this.isLoadingDownload.set(true);
  //   this.dashboardService
  //     .getContactUsEmailsFromDatabase()
  //     .pipe(
  //       finalize(() => {
  //         this.isLoadingDownload.set(false);
  //       }),
  //     )
  //     .subscribe({
  //       next: (blob: Blob) => {
  //         // Create download link
  //         const url = window.URL.createObjectURL(blob);
  //         const a = document.createElement('a');
  //         a.href = url;

  //         // Extract filename from content-disposition header if available
  //         const contentDisposition = 'content-disposition'; // This should come from headers in real implementation
  //         let filename = 'emails.xlsx';

  //         if (contentDisposition) {
  //           const filenameMatch = contentDisposition.match(
  //             /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/,
  //           );
  //           if (filenameMatch && filenameMatch[1]) {
  //             filename = filenameMatch[1].replace(/['"]/g, '');
  //           }
  //         }

  //         a.download = filename;
  //         document.body.appendChild(a);
  //         a.click();

  //         // Cleanup
  //         window.URL.revokeObjectURL(url);
  //         document.body.removeChild(a);
  //       },
  //       error: (error) => {
  //         console.error('Download error:', error);
  //         this.messageService.add({
  //           severity: 'error',
  //           summary: 'Error',
  //           detail: error.error?.message || 'Failed to download file',
  //         });
  //       },
  //     });
  // }
  downloadEmailsContactus() {
    this.isLoadingDownload.set(true);

    this.dashboardService
      .getContactUsEmailsFromDatabase()
      .pipe(finalize(() => this.isLoadingDownload.set(false)))
      .subscribe({
        next: (response: HttpResponse<Blob>) => {
          // Extract filename from headers
          const contentDisposition =
            response.headers.get('Content-Disposition') || '';
          const filenameMatch = contentDisposition.match(
            /filename\*?=(?:UTF-8'')?"?([^"]+)"?/i,
          );
          const filename = filenameMatch?.length
            ? filenameMatch[1]
            : `emails_${new Date().toISOString()}.xlsx`;

          // Create download link
          const blob = new Blob([response.body!], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });

          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = decodeURIComponent(filename); // Handle encoded filenames
          link.style.display = 'none';

          document.body.appendChild(link);
          link.click();

          // Cleanup
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
        },
        error: (error) => {
          console.error('Download failed:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error?.message || 'Failed to download email list',
            life: 5000,
          });
        },
      });
  }
}
