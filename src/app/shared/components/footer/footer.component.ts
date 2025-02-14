import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NewsletterService } from '../../services/newsletter.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    NgOptimizedImage,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  message = signal<string>('');
  loading = signal<boolean>(false);

  newsletterService = inject(NewsletterService);

  constructor() {}

  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      Object.keys(formData.form.controls).forEach((field) => {
        const control = formData.form.controls[field];
        control.markAsTouched({
          onlySelf: true,
        });
      });
    } else {
      this.loading.set(true);
      const email = formData.form.value;

      this.newsletterService.subscribe(email).subscribe({
        next: (response) => {
          this.loading.set(false);
          this.message.set(response.message);
          formData.reset();
          this.clearMessageAfterDelay(5000); // Clear message after 5 seconds
        },
        error: (err) => {
          this.loading.set(false);
          this.message.set(err.error.message);
        },
      });
    }
  }

  private clearMessageAfterDelay(delay: number): void {
    setTimeout(() => {
      this.message.set('');
    }, delay);
  }
}
