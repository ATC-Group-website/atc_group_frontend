import { Component, inject, OnInit } from '@angular/core';
import { ScrollToTopComponent } from '../../shared/components/scroll-to-top/scroll-to-top.component';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Title, Meta } from '@angular/platform-browser';

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
export class ContactUsComponent implements OnInit {
  title = inject(Title);
  meta = inject(Meta);
  loading: boolean = false;

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

  setMetaTags() {
    this.title.setTitle('Contact Us | ATC Group');
    this.meta.addTags([
      {
        name: 'description',
        content:
          'Welcome to ATC Ashraf Abdel Ghani, a leading firm in the MENA Region. We provide comprehensive Accounting, Tax, and Financial Consulting Services tailored to businesses and individuals.',
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
          'Explore tailored accounting and tax solutions for businesses in the MENA region.',
      },
      { property: 'og:url', content: 'https://www.atc.com.eg' },
      {
        property: 'og:image',
        content: 'atc_group_white2.jpg',
      },
      { property: 'og:type', content: 'website' },
      {
        name: 'twitter:card',
        content: 'atc_group_white2.jpg',
      },
      {
        name: 'twitter:title',
        content: 'ATC Group',
      },
      {
        name: 'twitter:description',
        content:
          'Explore tailored accounting and tax solutions for businesses in the MENA region.',
      },
      {
        name: 'twitter:image',
        content: 'atc_group_white2.jpg',
      },
    ]);
  }
}
