import { Component, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CarouselModule } from 'primeng/carousel';
import { ScrollToTopComponent } from '../../shared/components/scroll-to-top/scroll-to-top.component';
import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

interface Employee {
  name: string;
  title: string;
  imageUrl: string;
  message: string;
}
interface ResponsiveOptions {
  breakpoint: string;
  numVisible: number;
  numScroll: number;
}
@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [
    TopBarComponent,
    NavBarComponent,
    FooterComponent,
    CarouselModule,
    ScrollToTopComponent,
    NgOptimizedImage,
  ],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.css',
})
export class CareersComponent implements OnInit {
  title = inject(Title);
  meta = inject(Meta);
  employees: Employee[] = [];
  responsiveOptions: ResponsiveOptions[] = [];

  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.setMetaTags();

    if (this.isBrowser) {
      this.employees = [
        {
          name: 'Hazem Mokhtar',
          title: 'Partner and Head of Regional branches',
          imageUrl: 'careers/hazem.jpg',
          message: `"Working at ATC Group has been a transformative experience. The support and opportunities for growth are unparalleled."`,
        },
        {
          name: 'Yara Ahmed',
          title: 'Partner of International Taxation',
          imageUrl: 'careers/yara.jpg',
          message: `"I appreciate the collaborative environment here. It's a place where everyone's ideas are valued."`,
        },
        {
          name: 'Esraa Youssef',
          title: 'Hr specialist',
          imageUrl: 'careers/esraa.jpg',
          message: `"Joining ATC Group was one of the best career decisions I've made.\nThe company's commitment to excellence and forward-thinking approach\ncreate an inspiring work atmosphere."`,
        },
        {
          name: 'Mamdouh Farouk',
          title: 'partner in Corporate Tax of International Taxation',
          imageUrl: 'careers/mamdouh_farouk.jpg',
          message: `"At ATC Group, I've found a workplace that truly values creativity and initiative. The company's supportive culture encourages innovative thinking and collaboration, allowing me to contribute meaningfully to exciting projects."`,
        },
      ];

      this.responsiveOptions = [
        {
          breakpoint: '1400px',
          numVisible: 2,
          numScroll: 1,
        },
        {
          breakpoint: '1000px',
          numVisible: 1,
          numScroll: 1,
        },
      ];
    }
  }

  setMetaTags() {
    this.title.setTitle('Careers | ATC Group');
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
