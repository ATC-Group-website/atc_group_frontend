import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

interface Service {
  title: string;
  link: string;
  imageUrl: string;
}
interface ResponsiveOptions {
  breakpoint: string;
  numVisible: number;
  numScroll: number;
}
@Component({
  selector: 'app-services-slider',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    CarouselModule,
    NgOptimizedImage,
  ],
  templateUrl: './services-slider.component.html',
  styleUrl: './services-slider.component.css',
})
export class ServicesSliderComponent implements OnInit {
  services: Service[] = [];

  responsiveOptions: ResponsiveOptions[] = [];

  ngOnInit(): void {
    this.services = [
      {
        title: 'Audit and Assurance',
        link: '/services',
        imageUrl: 'services_icons/audit.png',
      },
      {
        title: 'Tax services',
        link: '/services',
        imageUrl: 'services_icons/tax.png',
      },
      {
        title: 'Investment and companies incorporation',
        link: '/services',
        imageUrl: 'services_icons/investment.png',
      },
      {
        title: 'Social Insurance',
        link: '/services',
        imageUrl: 'services_icons/social_insurance.png',
      },
      {
        title: 'E-invoice',
        link: '/services',
        imageUrl: 'services_icons/e_invoice.png',
      },
      {
        title: 'System Inspection',
        link: '/services',
        imageUrl: 'services_icons/system_inspection.png',
      },
      {
        title: 'International Taxation Department',
        link: '/services',
        imageUrl: 'services_icons/international_taxation.png',
      },
      {
        title: 'Transfer Pricing',
        link: '/services',
        imageUrl: 'services_icons/transfer_pricing.png',
      },
      {
        title: 'Accounting & Tax Training Courses',
        link: '/services',
        imageUrl: 'services_icons/training_cources.png',
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
