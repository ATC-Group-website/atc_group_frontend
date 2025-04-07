import { Component, inject, OnInit, signal } from '@angular/core';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Title, Meta } from '@angular/platform-browser';
import { DropdownModule } from 'primeng/dropdown';
import { ContactUsService } from '../../shared/services/contact-us.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    TopBarComponent,
    NavBarComponent,
    FooterComponent,
    FormsModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    CommonModule,
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent implements OnInit {
  loading = signal<boolean>(false);
  message = signal<string>('');
  selectedReason = signal<string>('');
  reasonOptions = signal<{ label: string; value: string }[]>([
    { label: 'Consultation', value: 'consultation' },
    { label: 'Services', value: 'services' },
    { label: 'Proposal', value: 'proposal' },
    { label: 'Inquiry', value: 'inquiry' },
    { label: 'Support', value: 'support' },
    { label: 'Feedback', value: 'feedback' },
    { label: 'Complaint', value: 'complaint' },
    { label: 'Other', value: 'other' },
  ]);

  title = inject(Title);
  meta = inject(Meta);
  contactUsService = inject(ContactUsService);

  ngOnInit(): void {
    this.setMetaTags();
  }

  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      Object.keys(formData.form.controls).forEach((field) => {
        const control = formData.form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    } else {
      this.loading.set(true);
      const Data = {
        sender: formData.form.controls['email'].value,
        // receiver: 'mostafa-ashraf@atc.com.eg',
        receiver: 'contactus@atc.com.eg',
        reason_for_contact: formData.form.controls['reasonForContact'].value,
        body: formData.form.controls['details'].value,
        company_name: formData.form.controls['company_name'].value,
        name: formData.form.controls['name'].value,
        position: formData.form.controls['position'].value,
        phone_number: formData.form.controls['phone_number'].value,
      };
      console.log(Data);

      this.contactUsService.contact_US(Data).subscribe({
        next: (res) => {
          console.log(res);
          this.loading.set(false);
          this.message.set('Thank you for contacting ATC Group.');
          formData.reset();
        },
        error: (err) => {
          console.log(err);
          this.loading.set(false);
        },
      });
    }
  }

  setMetaTags() {
    this.title.setTitle('Contact Us | ATC Group');
    this.meta.addTags([
      {
        name: 'description',
        content:
          "Reach out to ATC for inquiries, consultation bookings, or proposal requests. Explore our contact details and office locations across the MENA region. We're here to assist you!",
      },
      { name: 'robots', content: 'index, follow' },
      {
        property: 'og:title',
        content: 'ATC Group',
      },
      {
        property: 'og:site_name',
        content: 'ATC Group',
      },
      {
        property: 'og:description',
        content:
          "Reach out to ATC for inquiries, consultation bookings, or proposal requests. Explore our contact details and office locations across the MENA region. We're here to assist you!",
      },
      { property: 'og:url', content: 'https://www.atc.com.eg/contact-us' },
      {
        property: 'og:image',
        content: 'atc_group_white.jpg',
      },
      { property: 'og:type', content: 'website' },
      {
        name: 'twitter:card',
        content: 'atc_group_white.jpg',
      },
      {
        name: 'twitter:title',
        content: 'ATC Group',
      },
      {
        name: 'twitter:description',
        content:
          "Reach out to ATC for inquiries, consultation bookings, or proposal requests. Explore our contact details and office locations across the MENA region. We're here to assist you!",
      },
      {
        name: 'twitter:image',
        content: 'atc_group_white.jpg',
      },
    ]);
  }
}
