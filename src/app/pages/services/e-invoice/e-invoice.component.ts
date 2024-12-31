import {
  Component,
  inject,
  Inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../../shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-e-invoice',
  standalone: true,
  imports: [TopBarComponent, NavBarComponent, FooterComponent, CommonModule],
  templateUrl: './e-invoice.component.html',
  styleUrl: './e-invoice.component.css',
})
export class EInvoiceComponent {
  openStates = signal<boolean[]>([false, false, false, false]);
  isBrowser = signal<boolean>(false);

  title = inject(Title);
  meta = inject(Meta);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser.set(isPlatformBrowser(platformId));
  }
  ngOnInit(): void {
    this.setMetaTags();

    if (this.isBrowser()) {
      const panels = document.querySelectorAll('.panel');
      panels.forEach((panel, index) => {
        const element = panel as HTMLElement;
        if (this.openStates()[index]) {
          element.style.maxHeight = `${element.scrollHeight}px`; // Set height for open panel
        } else {
          element.style.maxHeight = '0px'; // Collapse others
        }
      });
    }
  }

  toggleAccordion(index: number): void {
    const panel = document.querySelectorAll('.panel')[index] as HTMLElement;

    if (this.openStates()[index]) {
      // Close the panel
      panel.style.maxHeight = '0px';
    } else {
      // Open the panel by setting maxHeight to the content's scrollHeight
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    }

    // Toggle the state
    this.openStates()[index] = !this.openStates()[index];
  }

  setMetaTags() {
    this.title.setTitle('E-Invoice Services | ATC Group');
    this.meta.addTags([
      {
        name: 'description',
        content:
          'Stay compliant with our e-invoice services. We provide efficient solutions to help businesses in the MENA region adopt electronic invoicing for improved accuracy and regulatory compliance.',
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
          'Stay compliant with our e-invoice services. We provide efficient solutions to help businesses in the MENA region adopt electronic invoicing for improved accuracy and regulatory compliance.',
      },
      { property: 'og:url', content: 'https://www.atc.com.eg' },
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
          'Stay compliant with our e-invoice services. We provide efficient solutions to help businesses in the MENA region adopt electronic invoicing for improved accuracy and regulatory compliance.',
      },
      {
        name: 'twitter:image',
        content: 'atc_group_white.jpg',
      },
    ]);
  }
}
