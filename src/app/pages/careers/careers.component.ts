import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CarouselModule } from 'primeng/carousel';
import { ScrollToTopComponent } from '../../shared/components/scroll-to-top/scroll-to-top.component';
import { isPlatformBrowser } from '@angular/common';

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
  ],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.css',
})
export class CareersComponent implements OnInit {
  employees: Employee[] = [];
  responsiveOptions: ResponsiveOptions[] = [];

  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.employees = [
        {
          name: 'Hazem Mokhtar',
          title: 'Partner and Head of Regional branches',
          imageUrl: 'careers/hazem_mokhtar.jpeg',
          message: `"Working at ATC Group has been a transformative experience. The support and opportunities for growth are unparalleled."`,
        },
        {
          name: 'Yara Ahmed',
          title: 'Partner of International Taxation',
          imageUrl: 'careers/yara_ahmed.jpeg',
          message: `"I appreciate the collaborative environment here. It's a place where everyone's ideas are valued."`,
        },
        {
          name: 'Esraa Youssef',
          title: 'Hr specialist',
          imageUrl: 'careers/esraa_youssef.jpeg',
          message: `"Joining ATC Group was one of the best career decisions I've made.\nThe company's commitment to excellence and forward-thinking approach\ncreate an inspiring work atmosphere."`,
        },
        {
          name: 'Mamdouh Farouk',
          title: 'partner in Corporate Tax of International Taxation',
          imageUrl: 'careers/mamdouh_farouk.jpeg',
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
}
