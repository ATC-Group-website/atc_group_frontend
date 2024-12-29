import { Component, inject } from '@angular/core';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../../shared/components/nav-bar/nav-bar.component';
import { Meta, Title } from '@angular/platform-browser';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-accounting-advisory',
  standalone: true,
  imports: [
    TopBarComponent,
    NavBarComponent,
    FooterComponent,
  ],
  templateUrl: './accounting-advisory.component.html',
  styleUrl: './accounting-advisory.component.css',
})
export class AccountingAdvisoryComponent {
  title = inject(Title);
  meta = inject(Meta);

  ngOnInit(): void {
    this.setMetaTags();
  }

  setMetaTags() {
    this.title.setTitle('Accounting Advisory Services | ATC Group');
    this.meta.addTags([
      {
        name: 'description',
        content:
          'Enhance your financial management with our expert accounting advisory services. We provide tailored solutions for financial planning, tax strategy, and compliance to support your business growth and efficiency.',
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
        content: 'https://www.atc.com.eg/services/accounting-advisory',
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
          'Enhance your financial management with our expert accounting advisory services. We provide tailored solutions for financial planning, tax strategy, and compliance to support your business growth and efficiency.',
      },
      {
        name: 'twitter:image',
        content: 'atc_group_white.jpg',
      },
    ]);
  }
}
