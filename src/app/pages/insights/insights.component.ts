import { Component, inject, OnInit } from '@angular/core';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { ScrollToTopComponent } from '../../shared/components/scroll-to-top/scroll-to-top.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { PostsService } from '../../shared/services/posts.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [
    TopBarComponent,
    NavBarComponent,
    FooterComponent,
    PaginatorModule,
    SkeletonModule,
    ScrollToTopComponent,
    NgOptimizedImage,
    RouterModule,
    CommonModule
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

  pageNumArticles: number = 1;
  pageNumNews: number = 1;
  pageNumBlogs: number = 1;

  title = inject(Title);
  meta = inject(Meta);
  postsService = inject(PostsService);

  first: number = 0;

  rows: number = 3;

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
        console.log(res.posts);
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

    // const pageNum = Math.floor(this.first / this.rows) + 1;

    // this.fetchPosts(type, pageNum);
  }

  setMetaTags() {
    this.title.setTitle('Insights | ATC Group');
    this.meta.addTags([
      {
        name: 'description',
        content:
          'Explore in-depth articles by our experts covering tax regulations, financial strategies, auditing practices, and more. Stay updated on the latest tax laws and trends shaping the financial landscape.',
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

  getDirection(text: string): string {
    // Arabic character range: \u0600-\u06FF
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(text) ? 'rtl' : 'ltr';
  }
}
