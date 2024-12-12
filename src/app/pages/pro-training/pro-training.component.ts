import { Component, inject, OnInit } from '@angular/core';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { ScrollToTopComponent } from '../../shared/components/scroll-to-top/scroll-to-top.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ImageModule } from 'primeng/image';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-pro-training',
  standalone: true,
  imports: [
    TopBarComponent,
    NavBarComponent,
    ScrollToTopComponent,
    FooterComponent,
    ImageModule,
  ],
  templateUrl: './pro-training.component.html',
  styleUrl: './pro-training.component.css',
})
export class ProTrainingComponent implements OnInit {
  title = inject(Title);
  meta = inject(Meta);

  ngOnInit(): void {
    this.setMetaTags();
  }

  setMetaTags() {
    this.title.setTitle('Pro Training | ATC Group');
    this.meta.addTags([
      {
        name: 'description',
        content:
          'ATC Pro Training, a division of ATC Group Middle East - Ashraf Abdel Ghani Accountants and Tax Consultants, is dedicated to providing top-tier professional training programs designed to enhance the skills and knowledge of individuals and businesses in the fields of accounting, taxation, and finance.',
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
