import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
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
    ReactiveFormsModule,
    ToastModule,
    CheckboxModule,
  ],
  providers: [MessageService],
  templateUrl: './send-emails.component.html',
  styleUrl: './send-emails.component.css',
})
export class SendEmailsComponent {
  isLoading: boolean = false;
  emailsForm!: FormGroup;
  dashboardService = inject(AdminDashboardService);
  messageService = inject(MessageService);

  ngOnInit() {
    this.emailsForm = new FormGroup({
      emails: new FormControl<string[] | null>(null),
      enableButton: new FormControl(false), // Properly initialize the checkbox
    });
  }

  onSubmit() {
    if (this.emailsForm.valid) {
      this.isLoading = true;
      // console.log(this.emailsForm.value.emails);
      this.dashboardService.sendEmails(this.emailsForm.value.emails).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.emailsForm.get('enableButton')?.setValue(false);
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail: response.message,
          });
          // this.emailsForm.reset();
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
          });
          this.emailsForm.get('enableButton')?.setValue(false);
          this.isLoading = false;
        },
      });
    }
  }
}
