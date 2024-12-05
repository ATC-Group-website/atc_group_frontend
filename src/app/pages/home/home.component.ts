import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Inject,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import {
  CommonModule,
  isPlatformBrowser,
  NgOptimizedImage,
} from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ServicesSliderComponent } from './services-slider/services-slider.component';
import { RouterModule } from '@angular/router';
import { CountUpModule } from 'ngx-countup';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ScrollToTopComponent } from '../../shared/components/scroll-to-top/scroll-to-top.component';
import { Meta, Title } from '@angular/platform-browser';

interface slide {
  id: number;
  imageUrl: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TopBarComponent,
    NavBarComponent,
    CommonModule,
    CarouselModule,
    ButtonModule,
    TagModule,
    ServicesSliderComponent,
    NgOptimizedImage,
    RouterModule,
    CountUpModule,
    FooterComponent,
    ScrollToTopComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isBrowser: boolean;
  slides: slide[] = [];
  clients = 1700;
  yearsOfExperience: number = 0;
  industries: number = 22;
  branches: number = 10;

  articles = [1, 2, 3, 4];
  title = inject(Title);
  meta = inject(Meta);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.setMetaTags();

    this.slides = [
      {
        id: 1,
        imageUrl: 'home/egypt.webp',
      },
      {
        id: 2,
        imageUrl: 'home/ksa.webp',
      },
      {
        id: 3,
        imageUrl: 'home/uae.webp',
      },
    ];

    const startYear = 1998;
    const currentYear = new Date().getFullYear();
    this.yearsOfExperience = currentYear - startYear;
  }

  scrollToSection() {
    const element = document.getElementById('about_the_company');
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offset = -160;

      window.scrollTo({
        top: elementPosition + offset,
        behavior: 'smooth',
      });
    }
  }

  // consider changing the image path to absolute path   content: 'https://atc.com.eg/assets/images/atc_group_white2.jpg' later on after testing social media sharing

  setMetaTags() {
    this.title.setTitle('Home | ATC Group - Accounting and Tax Consultants');
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
