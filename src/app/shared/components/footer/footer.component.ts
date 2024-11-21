import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  message: string = '';

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
      const Data = formData.form.value;
      console.log(formData.form.value);

      // Get form data
      // this.postsService.subscribeNewsLetter(Data).subscribe({
      //   next: (response) => {
      //     this.message = response.message;
      //     formData.reset();
      //     this.clearMessageAfterDelay(5000); // Clear message after 5 seconds
      //   },
      //   error: (err) => {
      //     console.error('Error submitting form:', err);
      //   },
      // });
    }
  }

  private clearMessageAfterDelay(delay: number): void {
    setTimeout(() => {
      this.message = '';
    }, delay);
  }
}
