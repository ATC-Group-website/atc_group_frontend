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
        imageUrl: 'home/egypt.jpg',
      },
      {
        id: 2,
        imageUrl: 'home/ksa.jpg',
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

  setMetaTags() {
    this.title.setTitle('Home | ATC Group');
    this.meta.addTags([
      {
        name: 'description',
        content:
          'ATC stands as a leading firm in the MENA Region, offering an extensive array of Accounting, Tax, and Financial Consulting Services tailored to meet the diverse needs of both businesses and individuals.',
      },
      {
        name: 'keywords',
        content:
          'ATC Group, ATC, consulting, training, business solutions, professional development,ATC taxes, ATC services',
      },
      { name: 'robots', content: 'index, follow' },
      {
        property: 'og:title',
        content: 'ATC Group',
      },
      {
        property: 'og:description',
        content:
          'ATC stands as a leading firm in the MENA Region, offering an extensive array of Accounting, Tax, and Financial Consulting Services tailored to meet the diverse needs of both businesses and individuals.',
      },
      { property: 'og:url', content: 'https://atc.com.eg' },
      {
        property: 'og:image',
        content: 'atc_group_white2.jpg',
      },
      { property: 'og:type', content: 'website' },
    ]);
  }
}
