import { Component, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../../shared/components/nav-bar/nav-bar.component';
import { ScrollToTopComponent } from '../../../shared/components/scroll-to-top/scroll-to-top.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-investment',
  standalone: true,
  imports: [
    TopBarComponent,
    NavBarComponent,
    ScrollToTopComponent,
    FooterComponent,
    CommonModule,
  ],
  templateUrl: './investment.component.html',
  styleUrl: './investment.component.css',
})
export class InvestmentComponent implements OnInit {
  title = inject(Title);
  meta = inject(Meta);
  openStates: boolean[] = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  ngOnInit(): void {
    this.setMetaTags();

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

  setMetaTags() {
    this.title.setTitle(
      'Investment and Company Incorporation Services | ATC Group',
    );
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
