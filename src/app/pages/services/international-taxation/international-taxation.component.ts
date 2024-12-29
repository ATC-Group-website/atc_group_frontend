import { Component, inject, OnInit } from '@angular/core';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../../shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-international-taxation',
  standalone: true,
  imports: [TopBarComponent, NavBarComponent, FooterComponent],
  templateUrl: './international-taxation.component.html',
  styleUrl: './international-taxation.component.css',
})
export class InternationalTaxationComponent implements OnInit {
  title = inject(Title);
  meta = inject(Meta);

  ngOnInit(): void {
    this.setMetaTags();
  }

  setMetaTags() {
    this.title.setTitle('International Taxation Services | ATC Group');
    this.meta.addTags([
      {
        name: 'description',
        content:
          'Navigate the complexities of cross-border taxation with our expert international taxation services. We provide businesses with strategic tax planning and compliance solutions tailored for global operations.',
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
          'Navigate the complexities of cross-border taxation with our expert international taxation services. We provide businesses with strategic tax planning and compliance solutions tailored for global operations.',
      },
      {
        property: 'og:url',
        content: 'https://www.atc.com.eg/services/international-taxation',
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
          'Navigate the complexities of cross-border taxation with our expert international taxation services. We provide businesses with strategic tax planning and compliance solutions tailored for global operations.',
      },
      {
        name: 'twitter:image',
        content: 'atc_group_white.jpg',
      },
    ]);
  }
}
