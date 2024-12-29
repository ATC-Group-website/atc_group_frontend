import { Component, inject, OnInit } from '@angular/core';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
interface Service {
  title: string;
  link: string;
  imageUrl: string;
  description: string;
}
@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    TopBarComponent,
    NavBarComponent,
    FooterComponent,
    RouterModule,
    NgOptimizedImage,
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent implements OnInit {
  title = inject(Title);
  meta = inject(Meta);
  services: Service[] = [];

  ngOnInit(): void {
    this.setMetaTags();

    this.services = [
      {
        title: 'Tax services',
        link: '/services/tax',
        imageUrl: 'services_icons/tax.png',
        description:
          'ATC provides comprehensive and innovative tax solutions through dedicated teams of tax experts, each specializing in distinct tax categories.',
      },
      {
        title: 'Audit',
        link: '/services/audit',
        imageUrl: 'services_icons/audit.png',
        description:
          'Our dedicated team of experienced auditors undertake a meticulous review of your financial statements, ensuring both accuracy and compliance with stringent accounting standards and regulatory mandates.',
      },
      {
        title: 'Accounting advisory',
        link: '/services/accounting-advisory',
        imageUrl: 'services_icons/accounting_advisory.png',
        description:
          'Expert solutions in transaction registration, legal compliance, financial support, and performance supervision to optimize your accounting operations.',
      },
      {
        title: 'Investment and companies incorporation',
        link: '/services/investments-and-company-incorporation',
        imageUrl: 'services_icons/investment.png',
        description:
          'ATC provides expertise in seamless investment strategies and efficient and effective company incorporation.',
      },
      {
        title: 'Social Insurance',
        link: '/services/social-insurance',
        imageUrl: 'services_icons/social_insurance.png',
        description:
          'Our Social Insurance division manages the complete spectrum of social insurance applications and adeptly resolves any associated issues or disputes.',
      },
      {
        title: 'E-invoice',
        link: '/services/e-invoice',
        imageUrl: 'services_icons/e_invoice.png',
        description:
          'Our E-invoice division offers a comprehensive suite of E-invoicing services in full compliance with the mandates of the Local Tax Authority.',
      },
      {
        title: 'System Inspection',
        link: '/services/system-inspection',
        imageUrl: 'services_icons/system_inspection.png',
        description:
          'Our Systems Inspection Service represents a unique offering designed to address the swift technological evolution within the Tax Authority.',
      },
      {
        title: 'International Taxation',
        link: '/services/international-taxation',
        imageUrl: 'services_icons/international_taxation.png',
        description:
          'Our International Taxation Department is staffed with certified professionals who specialize in providing comprehensive international tax consultancy services.',
      },
      {
        title: 'Transfer Pricing',
        link: '/services/transfer-pricing',
        imageUrl: 'services_icons/transfer_pricing.png',
        description:
          'In the realm of cross-border transactions, the paramount importance of transfer pricing has gained recognition across businesses of diverse sizes.',
      },
      {
        title: 'Accounting & Tax Training Courses',
        link: '/pro-training',
        imageUrl: 'services_icons/training_cources.png',
        description:
          'Our Team focuses on delivering high-quality professional education & training services in financial accounting, management accounting, external & internal audit and taxation.',
      },
    ];
  }

  setMetaTags() {
    this.title.setTitle('Services | ATC Group');
    this.meta.addTags([
      {
        name: 'description',
        content:
          'Explore a wide range of professional services including tax planning, audit, transfer pricing, e-invoicing, company incorporation, and more. Our tailored solutions help businesses navigate complex financial, tax, and regulatory environments in the MENA region.',
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
          'Explore a wide range of professional services including tax planning, audit, transfer pricing, e-invoicing, company incorporation, and more. Our tailored solutions help businesses navigate complex financial, tax, and regulatory environments in the MENA region.',
      },
      { property: 'og:url', content: 'https://www.atc.com.eg/services' },
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
          'Explore a wide range of professional services including tax planning, audit, transfer pricing, e-invoicing, company incorporation, and more. Our tailored solutions help businesses navigate complex financial, tax, and regulatory environments in the MENA region.',
      },
      {
        name: 'twitter:image',
        content: 'atc_group_white.jpg',
      },
    ]);
  }
}
