import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { TabViewModule } from 'primeng/tabview';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { TabsComponent } from './tabs/tabs.component';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { ScrollToTopComponent } from '../../shared/components/scroll-to-top/scroll-to-top.component';
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
    TabViewModule,
    AccordionModule,
    CommonModule,
    RouterModule,
    TabsComponent,
    CarouselModule,
    ScrollToTopComponent,
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent {
  openStates: boolean[] = [true, false, false];
  team: Team[] = [];
  responsiveOptions: ResponsiveOptions[] = [];

  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
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
          name: 'Yara Ahmed',
          title: 'Partner & Head of International Taxation',
          imageUrl: 'about_us/yara_ahmed.jpg',
        },
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
          name: 'Mayar Ahmed',
          title: 'Business Development Executive',
          imageUrl: 'about_us/mayar_ahmed.jpg',
        },
        {
          name: 'Marwan Ayman',
          title: 'Regional Branch Director - UAE',
          imageUrl: 'about_us/marwan_ayman.jpg',
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
}
