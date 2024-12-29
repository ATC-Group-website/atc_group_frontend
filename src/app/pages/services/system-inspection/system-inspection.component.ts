import { Component, inject, OnInit } from '@angular/core';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../../shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-system-inspection',
  standalone: true,
  imports: [
    TopBarComponent,
    NavBarComponent,
    FooterComponent,
  ],
  templateUrl: './system-inspection.component.html',
  styleUrl: './system-inspection.component.css',
})
export class SystemInspectionComponent implements OnInit {
  title = inject(Title);
  meta = inject(Meta);

  ngOnInit(): void {
    this.setMetaTags();
  }

  setMetaTags() {
    this.title.setTitle('System Inspection Services | ATC Group');
    this.meta.addTags([
      {
        name: 'description',
        content:
          'Ensure the efficiency and compliance of your business operations with our system inspection services. We provide thorough evaluations to optimize performance and meet industry standards.',
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
          'Ensure the efficiency and compliance of your business operations with our system inspection services. We provide thorough evaluations to optimize performance and meet industry standards.',
      },
      {
        property: 'og:url',
        content: 'https://www.atc.com.eg/services/system-inspection',
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
          'Ensure the efficiency and compliance of your business operations with our system inspection services. We provide thorough evaluations to optimize performance and meet industry standards.',
      },
      {
        name: 'twitter:image',
        content: 'atc_group_white.jpg',
      },
    ]);
  }
}
