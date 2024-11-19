import {
  CommonModule,
  isPlatformBrowser,
  NgOptimizedImage,
} from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-services-slider',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './services-slider.component.html',
  styleUrl: './services-slider.component.css',
})
export class ServicesSliderComponent implements OnInit, OnDestroy {
  services = [
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

  currentIndex = 0;
  slidesToShow = 3;
  autoSlideInterval: any;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Check if code is running in the browser (not SSR)
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      if (this.isBrowser) {
        this.addResizeListener(); // Listen for screen size changes
        this.updateSlidesToShow(); // Calculate initial number of slides
        this.startAutoSlide();
      }
    }
  }

  get visibleSlides() {
    const extendedServices = [...this.services, ...this.services];
    const start = this.currentIndex;
    const end = this.currentIndex + this.slidesToShow;

    return extendedServices.slice(start, end);
  }

  moveNext(): void {
    this.currentIndex++;
    if (this.currentIndex >= this.services.length) {
      this.currentIndex = 0;
    }
  }

  movePrev(): void {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.services.length - 1;
    }
  }

  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.moveNext();
    }, 1500);
  }

  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  updateSlidesToShow(): void {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1024) {
      this.slidesToShow = 3;
    } else if (screenWidth >= 768) {
      this.slidesToShow = 2;
    } else {
      this.slidesToShow = 1;
    }
  }

  addResizeListener(): void {
    window.addEventListener('resize', this.updateSlidesToShow.bind(this));
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      clearInterval(this.autoSlideInterval);
      window.removeEventListener('resize', this.updateSlidesToShow.bind(this));
    }
  }
}
