import { Component, inject, OnInit, signal } from '@angular/core';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { PostsService } from '../../shared/services/posts.service';
import { RouterModule } from '@angular/router';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [
    TopBarComponent,
    NavBarComponent,
    FooterComponent,
    PaginatorModule,
    SkeletonModule,
    NgOptimizedImage,
    RouterModule,
    CommonModule,
    ImageModule,
  ],
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.css',
})
export class InsightsComponent implements OnInit {
  types: { [key: string]: any } = {
    article: {
      data: [],
      currentPage: 1,
      totalPages: 1,
      isLoading: true,
      first: 0,
      rows: 3,
    },
    news: {
      data: [],
      currentPage: 1,
      totalPages: 1,
      isLoading: true,
      first: 0,
      rows: 3,
    },
    blog: {
      data: [],
      currentPage: 1,
      totalPages: 1,
      isLoading: true,
      first: 0,
      rows: 3,
    },
  };

  pressImages = [
    {
      imageUrl: 'insights/elmasry_elyom_feb_15.webp',
      alt: 'elmasry elyom feb 15th',
    },
    {
      imageUrl: 'insights/elgomhoria_feb_15.webp',
      alt: 'elgomhoria feb 15th',
    },
    {
      imageUrl: 'insights/akhbar_elyom_feb_15.webp',
      alt: 'akhbar elyom feb 15th',
    },
    {
      imageUrl: 'insights/elwafd_feb_15.webp',
      alt: 'elwafd feb 15th',
    },
    {
      imageUrl: 'insights/news_paper_feb_15.webp',
      alt: 'news paper feb 15th',
    },
  ];

  // not used
  // pageNumArticles = signal(1);
  // pageNumNews = signal(1);
  // pageNumBlogs = signal(1);
  // first = signal(0);
  // rows = signal(3);

  title = inject(Title);
  meta = inject(Meta);
  postsService = inject(PostsService);

  ngOnInit(): void {
    this.setMetaTags();

    this.fetchPosts('article', this.types['article'].currentPage);
    this.fetchPosts('news', this.types['news'].currentPage);
    this.fetchPosts('blog', this.types['blog'].currentPage);
  }

  fetchPosts(type: string, pageNum: number) {
    this.types[type].isLoading = true;

    this.postsService.getPaginatedPostsByType(type, pageNum).subscribe({
      next: (res) => {
        // console.log(res);

        this.types[type].data = res.posts.data;
        this.types[type].currentPage = res.posts.current_page;
        this.types[type].totalPages = res.posts.total;
        this.types[type].isLoading = false;
      },
      error: (err) => {
        console.log(err);

        this.types[type].isLoading = false;
      },
    });
  }

  onPageChange(event: PaginatorState, type: string) {
    this.types[type].first = event.first ?? 0;
    this.types[type].rows = event.rows ?? 3;

    const pageNum =
      Math.floor(this.types[type].first / this.types[type].rows) + 1;
    this.fetchPosts(type, pageNum);
  }

  setMetaTags() {
    this.title.setTitle('Insights | ATC Group');
    this.meta.addTags([
      {
        name: 'description',
        content:
          'Discover expert insights into accounting, taxation, and financial consulting with ATC Group - Ashraf Abdel Ghani Accountants and Tax Consultants. Stay updated with industry trends and practical advice to navigate your business challenges.',
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
          'Discover expert insights into accounting, taxation, and financial consulting with ATC Group - Ashraf Abdel Ghani Accountants and Tax Consultants. Stay updated with industry trends and practical advice to navigate your business challenges.',
      },
      { property: 'og:url', content: 'https://www.atc.com.eg/insights' },
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
          'Discover expert insights into accounting, taxation, and financial consulting with ATC Group - Ashraf Abdel Ghani Accountants and Tax Consultants. Stay updated with industry trends and practical advice to navigate your business challenges.',
      },
      {
        name: 'twitter:image',
        content: 'atc_group_white.jpg',
      },
    ]);
  }

  getDirection(text: string): string {
    // Arabic character range: \u0600-\u06FF
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(text) ? 'rtl' : 'ltr';
  }
}
