import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ScrollToTopComponent } from '../../shared/components/scroll-to-top/scroll-to-top.component';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
} from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../shared/services/posts.service';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-insight-details',
  standalone: true,
  imports: [
    NavBarComponent,
    TopBarComponent,
    FooterComponent,
    ScrollToTopComponent,
    LoadingComponent,
  ],
  templateUrl: './insight-details.component.html',
  styleUrl: './insight-details.component.css',
})
export class InsightDetailsComponent implements OnInit {
  isBrowser: boolean;
  isLoading = true;
  post!: any;
  videoURL: SafeResourceUrl = '';
  newDescription!: { text: SafeHtml; direction: string };
  sanitizer = inject(DomSanitizer);
  router = inject(Router);
  route = inject(ActivatedRoute);
  postsService = inject(PostsService);
  title = inject(Title);
  meta = inject(Meta);
  images: any[] = [];

  embedUrl: SafeResourceUrl | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (slug) {
      this.postsService.getPostBySlug(slug).subscribe({
        next: (res) => {
          this.post = res;
          this.newDescription = this.detectTextDirection(res.description || '');
          const videoId = this.extractVideoId(res.video_url);
          this.images = res.images;

          if (videoId) {
            const embedLink = `https://www.youtube.com/embed/${videoId}`;
            this.embedUrl =
              this.sanitizer.bypassSecurityTrustResourceUrl(embedLink);
          }

          // Set the title dynamically
          this.title.setTitle(`${res.title} - ATC`);

          // Update meta description
          // this.meta.updateTag({
          //   name: 'description',
          //   content: this.truncateAndAlign(
          //     res.description || 'Explore our latest article!',
          //   ),
          // });

          // Optional: Add Open Graph meta tags for social sharing
          this.meta.updateTag({
            property: 'og:title',
            content: res.title,
          });
          // this.meta.updateTag({
          //   property: 'og:description',
          //   content: this.truncateAndAlign(
          //     res.description || 'Explore our latest article!',
          //   ),
          // });
          this.meta.updateTag({
            property: 'og:url',
            content: `https://www.atc.com.eg/articles/${slug}`,
          });
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
        },
      });
    }
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  private extractVideoId(url: string): string | null {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*[?&]v=([^&]+)/,
    );
    return match ? match[1] : null;
  }

  detectTextDirection(description: string): {
    text: SafeHtml;
    direction: string;
  } {
    if (!this.isBrowser) {
      return {
        text: this.sanitizer.bypassSecurityTrustHtml(''),
        direction: 'ltr',
      };
    }

    // Create a temporary element to parse and strip HTML tags
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = description;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';

    // Detect text direction
    const arabicRegex = /[\u0600-\u06FF]/;
    const direction = arabicRegex.test(textContent) ? 'rtl' : 'ltr';

    // Sanitize the result
    return {
      text: this.sanitizer.bypassSecurityTrustHtml(textContent),
      direction,
    };
  }

  // Function to detect direction based on language
  getDirection(text: string): string {
    const rtlPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/; // Arabic, Persian, and similar scripts
    return rtlPattern.test(text) ? 'rtl' : 'ltr';
  }
}
