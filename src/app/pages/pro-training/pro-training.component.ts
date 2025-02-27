import { Component, inject, OnInit } from '@angular/core';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ImageModule } from 'primeng/image';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-pro-training',
  standalone: true,
  imports: [
    TopBarComponent,
    NavBarComponent,
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
          'Unlock your potential with ATC Pro Training, a division of ATC Group - Ashraf Abdel Ghani Accountants and Tax Consultants. Our expert-led programs in accounting, taxation, and finance are designed to enhance skills for individuals and businesses.',
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
          'Unlock your potential with ATC Pro Training, a division of ATC Group - Ashraf Abdel Ghani Accountants and Tax Consultants. Our expert-led programs in accounting, taxation, and finance are designed to enhance skills for individuals and businesses.',
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
          'Unlock your potential with ATC Pro Training, a division of ATC Group - Ashraf Abdel Ghani Accountants and Tax Consultants. Our expert-led programs in accounting, taxation, and finance are designed to enhance skills for individuals and businesses.',
      },
      {
        name: 'twitter:image',
        content: 'atc_group_white.jpg',
      },
    ]);
  }
}
