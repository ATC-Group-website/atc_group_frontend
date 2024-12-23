import { Component, inject, OnInit } from '@angular/core';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../../shared/components/nav-bar/nav-bar.component';
import { ScrollToTopComponent } from '../../../shared/components/scroll-to-top/scroll-to-top.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-social-insurance',
  standalone: true,
  imports: [
    TopBarComponent,
    NavBarComponent,
    ScrollToTopComponent,
    FooterComponent,
  ],
  templateUrl: './social-insurance.component.html',
  styleUrl: './social-insurance.component.css',
})
export class SocialInsuranceComponent implements OnInit {
  title = inject(Title);
  meta = inject(Meta);

  ngOnInit(): void {
    this.setMetaTags();
  }

  setMetaTags() {
    this.title.setTitle('Social Insurance Services | ATC Group');
    this.meta.addTags([
      {
        name: 'description',
        content:
          'Access comprehensive social insurance services to ensure compliance with local regulations and secure benefits for employees. We provide tailored solutions to businesses across the MENA region.',
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
          'Access comprehensive social insurance services to ensure compliance with local regulations and secure benefits for employees. We provide tailored solutions to businesses across the MENA region.',
      },
      {
        property: 'og:url',
        content: 'https://www.atc.com.eg/services/social-insurance',
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
          'Access comprehensive social insurance services to ensure compliance with local regulations and secure benefits for employees. We provide tailored solutions to businesses across the MENA region.',
      },
      {
        name: 'twitter:image',
        content: 'atc_group_white.jpg',
      },
    ]);
  }
}
