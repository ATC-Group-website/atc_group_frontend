import { Component, inject, OnInit } from '@angular/core';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../../shared/components/nav-bar/nav-bar.component';
import { ScrollToTopComponent } from '../../../shared/components/scroll-to-top/scroll-to-top.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-transfer-pricing',
  standalone: true,
  imports: [
    TopBarComponent,
    NavBarComponent,
    ScrollToTopComponent,
    FooterComponent,
  ],
  templateUrl: './transfer-pricing.component.html',
  styleUrl: './transfer-pricing.component.css',
})
export class TransferPricingComponent implements OnInit {
  title = inject(Title);
  meta = inject(Meta);

  ngOnInit(): void {
    this.setMetaTags();
  }

  setMetaTags() {
    this.title.setTitle('Transfer Pricing Services | ATC Group');
    this.meta.addTags([
      {
        name: 'description',
        content:
          'Optimize your business operations with our transfer pricing services. We offer expert solutions for compliance, documentation, and planning to help businesses navigate complex international tax regulations.',
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
          'Optimize your business operations with our transfer pricing services. We offer expert solutions for compliance, documentation, and planning to help businesses navigate complex international tax regulations.',
      },
      {
        property: 'og:url',
        content: 'https://www.atc.com.eg/services/transfer-pricing',
      },
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
          'Optimize your business operations with our transfer pricing services. We offer expert solutions for compliance, documentation, and planning to help businesses navigate complex international tax regulations.',
      },
      {
        name: 'twitter:image',
        content: 'atc_group_white.jpg',
      },
    ]);
  }
}
