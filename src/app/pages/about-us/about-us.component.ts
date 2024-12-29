import { Component, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import {
  CommonModule,
  isPlatformBrowser,
  NgOptimizedImage,
} from '@angular/common';
import { TabsComponent } from './tabs/tabs.component';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { CarouselModule } from 'primeng/carousel';
import { NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Meta, Title } from '@angular/platform-browser';
import { ContactUsService } from '../../shared/services/contact-us.service';
import { DropdownModule } from 'primeng/dropdown';

interface Team {
  name: string;
  title: string;
  imageUrl: string;
}
interface ResponsiveOptions {
  breakpoint: string;
  numVisible: number;
  numScroll: number;
}
@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    TopBarComponent,
    NavBarComponent,
    FooterComponent,
    CommonModule,
    RouterModule,
    TabsComponent,
    CarouselModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    InputTextareaModule,
    InputTextModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    DropdownModule,
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent implements OnInit {
  yearsOfExperience: number = 0;
  isBrowser: boolean;
  visible: boolean = false;
  loading: boolean = false;
  openStates: boolean[] = [true, false];
  team: Team[] = [];
  message: string = '';
  responsiveOptions: ResponsiveOptions[] = [];
  title = inject(Title);
  meta = inject(Meta);
  contactUsService = inject(ContactUsService);

  reasonOptions = [
    { label: 'Consultation', value: 'consultation' },
    { label: 'Services', value: 'services' },
    { label: 'Proposal', value: 'proposal' },
    { label: 'Inquiry', value: 'inquiry' },
    { label: 'Support', value: 'support' },
    { label: 'Feedback', value: 'feedback' },
    { label: 'Complaint', value: 'complaint' },
    { label: 'Other', value: 'other' },
  ];

  selectedReason: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.setMetaTags();

    const startYear = 1998;
    const currentYear = new Date().getFullYear();
    this.yearsOfExperience = currentYear - startYear;

    if (this.isBrowser) {
      const panels = document.querySelectorAll('.panel');
      panels.forEach((panel, index) => {
        const element = panel as HTMLElement;
        if (this.openStates[index]) {
          element.style.maxHeight = `${element.scrollHeight}px`; // Set height for open panel
        } else {
          element.style.maxHeight = '0px'; // Collapse others
        }
      });

      this.team = [
        {
          name: 'Ashraf Abdel Ghani',
          title:
            'Founder, Managing Director and Member of The Board of Directors',
          imageUrl: 'about_us/ashraf_abdel_ghani.png',
        },
        {
          name: 'Ahmed Abdel Ghani',
          title: 'Executive Partner',
          imageUrl: 'about_us/ahmed_abdel_ghani.png',
        },
        {
          name: 'Yara Ahmed',
          title: 'Partner & Head of International Taxation',
          imageUrl: 'about_us/yara_ahmed.jpg',
        },
        {
          name: 'Marwan Ayman',
          title: 'Regional Branch Director - UAE',
          imageUrl: 'about_us/marwan_ayman.jpg',
        },
        {
          name: 'Mayar Ahmed',
          title: 'Business Development Executive',
          imageUrl: 'about_us/mayar.jpg',
        },
      ];

      this.responsiveOptions = [
        {
          breakpoint: '1400px',
          numVisible: 3,
          numScroll: 3,
        },
        {
          breakpoint: '1220px',
          numVisible: 2,
          numScroll: 2,
        },
        {
          breakpoint: '800px',
          numVisible: 1,
          numScroll: 1,
        },
      ];
    }
  }

  toggleAccordion(index: number): void {
    const panel = document.querySelectorAll('.panel')[index] as HTMLElement;

    if (this.openStates[index]) {
      // Close the panel
      panel.style.maxHeight = '0px';
    } else {
      // Open the panel by setting maxHeight to the content's scrollHeight
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    }

    // Toggle the state
    this.openStates[index] = !this.openStates[index];
  }

  showDialog() {
    this.visible = true;
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
        // receiver: 'online@atc.com.eg',
        receiver: 'contactus@atc.com.eg',
        reason_for_contact: formData.form.controls['reasonForContact'].value,
        body: formData.form.controls['details'].value,
        company_name: formData.form.controls['company_name'].value,
        name: formData.form.controls['name'].value,
        position: formData.form.controls['position'].value,
        phone_number: formData.form.controls['phone_number'].value,
      };

      this.contactUsService.contact_US(Data).subscribe({
        next: (response) => {
          this.message = 'Thank you for contacting ATC Group.';
          formData.reset();
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
        },
      });
    }
  }

  // consider changing the image path to absolute path   content: 'https://atc.com.eg/assets/images/atc_group_white2.jpg' later on after testing social media sharing

  setMetaTags() {
    this.title.setTitle('About Us | ATC Group');
    this.meta.addTags([
      {
        name: 'description',
        content:
          'ATC Ashraf Abdel Ghani Accountants and Tax Consultants Group aims to become a leading organization in Auditing, Taxation, Accounting, Managerial, and Legal Consultancies within the MENA Region.',
      },
      { name: 'robots', content: 'index, follow' },
      {
        property: 'og:title',
        content: 'About Us | ATC Group',
      },
      {
        property: 'og:site_name',
        content: 'ATC Group',
      },
      {
        property: 'og:description',
        content:
          'ATC Ashraf Abdel Ghani Accountants and Tax Consultants Group aims to become a leading organization in Auditing, Taxation, Accounting, Managerial, and Legal Consultancies within the MENA Region.',
      },
      { property: 'og:url', content: 'https://www.atc.com.eg/about-us' },
      {
        property: 'og:image',
        content: 'atc_group_white2.jpg',
      },
      { property: 'og:type', content: 'website' },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: 'About Us | ATC Group',
      },
      {
        name: 'twitter:description',
        content:
          'ATC Ashraf Abdel Ghani Accountants and Tax Consultants Group aims to become a leading organization in Auditing, Taxation, Accounting, Managerial, and Legal Consultancies within the MENA Region.',
      },
      {
        name: 'twitter:image',
        content: 'atc_group_white2.jpg',
      },
    ]);
  }
}
