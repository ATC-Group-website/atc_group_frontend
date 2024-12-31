import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Inject,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import {
  CommonModule,
  isPlatformBrowser,
  NgOptimizedImage,
} from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ServicesSliderComponent } from './services-slider/services-slider.component';
import { RouterModule } from '@angular/router';
import { CountUpModule } from 'ngx-countup';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';
import { PostsService } from '../../shared/services/posts.service';
import { LoadingCardComponent } from './loading-card/loading-card.component';
import { LandingCarouselComponent } from './landing-carousel/landing-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TopBarComponent,
    NavBarComponent,
    CommonModule,
    CarouselModule,
    ButtonModule,
    TagModule,
    ServicesSliderComponent,
    NgOptimizedImage,
    RouterModule,
    CountUpModule,
    FooterComponent,
    LoadingCardComponent,
    LandingCarouselComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isBrowser = signal<boolean>(false);
  clients = signal<number>(1700);
  yearsOfExperience = signal<number>(0);
  industries = signal<number>(22);
  branches = signal<number>(10);
  loading = signal<boolean>(true);
  posts = signal<any[]>([]);
  postss = signal<{ text: SafeHtml; direction: string }[]>([]);

  title = inject(Title);
  meta = inject(Meta);
  postsService = inject(PostsService);
  sanitizer = inject(DomSanitizer);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser.set(isPlatformBrowser(platformId));
  }

  ngOnInit(): void {
    this.setMetaTags();

    this.postsService.getPaginatedPosts().subscribe({
      next: (res) => {
        this.posts.set(res.posts.data);

        this.postss.set(
          this.posts().map((post: { description: string }) =>
            this.truncateAndAlign(post.description || ''),
          ),
        );
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
      },
    });

    const startYear = 1998;
    const currentYear = new Date().getFullYear();
    this.yearsOfExperience.set(currentYear - startYear);
  }

  setMetaTags() {
    this.title.setTitle('ATC Group - Accounting and Tax Consultants');
    this.meta.addTags([
      {
        name: 'description',
        content:
          'Welcome to ATC Ashraf Abdel Ghani, a leading firm in the MENA Region. We provide comprehensive Accounting, Tax, and Financial Consulting Services tailored to businesses and individuals.',
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
          'Welcome to ATC Ashraf Abdel Ghani, a leading firm in the MENA Region. We provide comprehensive Accounting, Tax, and Financial Consulting Services tailored to businesses and individuals.',
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
          'Welcome to ATC Ashraf Abdel Ghani, a leading firm in the MENA Region. We provide comprehensive Accounting, Tax, and Financial Consulting Services tailored to businesses and individuals.',
      },
      {
        name: 'twitter:image',
        content: 'atc_group_white.jpg',
      },
    ]);
  }

  truncateAndAlign(description: string): { text: SafeHtml; direction: string } {
    if (!this.isBrowser()) {
      return {
        text: this.sanitizer.bypassSecurityTrustHtml(''),
        direction: 'ltr',
      };
    }

    // Create a temporary element to parse and strip HTML tags
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = description;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';

    // Truncate to the first 30 words
    const words = textContent.trim().split(/\s+/);
    const truncatedText = words.slice(0, 30).join(' ');
    const finalText = words.length > 30 ? `${truncatedText}...` : truncatedText;

    // Detect text direction
    const arabicRegex = /[\u0600-\u06FF]/;
    const direction = arabicRegex.test(textContent) ? 'rtl' : 'ltr';

    // Sanitize the result
    return {
      text: this.sanitizer.bypassSecurityTrustHtml(finalText),
      direction,
    };
  }

  getDirection(text: string): string {
    // Arabic character range: \u0600-\u06FF
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(text) ? 'rtl' : 'ltr';
  }

  scrollToSection() {
    const element = document.getElementById('about_the_company');
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offset = -160;

      window.scrollTo({
        top: elementPosition + offset,
        behavior: 'smooth',
      });
    }
  }
}
