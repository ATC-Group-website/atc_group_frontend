import { Component } from '@angular/core';
import { ScrollToTopComponent } from '../../shared/components/scroll-to-top/scroll-to-top.component';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    ScrollToTopComponent,
    TopBarComponent,
    NavBarComponent,
    FooterComponent,
    FormsModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent {
  loading: boolean = false;

  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      Object.keys(formData.form.controls).forEach((field) => {
        const control = formData.form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    } else {
      this.loading = true;
      const Data = {
        sender: formData.form.controls['email'].value,
        // receiver: 'info@atc.com.eg',
        receiver: 'mostafa-ashraf@atc.com.eg',
        type: 'proposal',
        body: formData.form.controls['details'].value,
        company_name: formData.form.controls['company_name'].value,
        name: formData.form.controls['name'].value,
        job_title: formData.form.controls['title'].value,
        phone_number: formData.form.controls['phone_number'].value,
        // attachments: [],
      };

      // this.contactusService.contact_us(Data).subscribe({
      //   next: (response) => {
      //     console.log('Form submitted successfully:', response);
      //     formData.reset();
      //     this.loading = false;
      //   },
      //   error: (err) => {
      //     console.error('Error submitting form:', err);
      //     this.loading = false;
      //   },
      // });
    }
  }
}
