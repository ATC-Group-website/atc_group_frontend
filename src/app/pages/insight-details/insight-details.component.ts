import {
  Component,
  HostListener,
  Inject,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
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
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-insight-details',
  standalone: true,
  imports: [
    NavBarComponent,
    TopBarComponent,
    FooterComponent,
    LoadingComponent,
    GalleriaModule,
  ],
  templateUrl: './insight-details.component.html',
  styleUrl: './insight-details.component.css',
})
export class InsightDetailsComponent implements OnInit {
  isBrowser = signal<boolean>(false);
  isLoading = signal<boolean>(true);
  post = signal<any>(null);
  videoURL = signal<SafeResourceUrl>('');
  newDescription = signal<{ text: SafeHtml; direction: string } | null>(null);
  images = signal<any[]>([]);
  embedUrl = signal<SafeResourceUrl | null>(null);
  selectedImage = signal<any | null>(null);
  currentImageIndex = signal<number>(0);

  title = inject(Title);
  meta = inject(Meta);
  route = inject(ActivatedRoute);
  postsService = inject(PostsService);
  sanitizer = inject(DomSanitizer);
  router = inject(Router);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser.set(isPlatformBrowser(platformId));
  }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (slug) {
      this.postsService.getPostBySlug(slug).subscribe({
        next: (res) => {
          this.post.set(res);
          this.newDescription.set(
            this.detectTextDirection(res.description || ''),
          );
          const videoId = this.extractVideoId(res.video_url);
          this.images.set(res.images);

          if (videoId) {
            const embedLink = `https://www.youtube.com/embed/${videoId}`;
            this.embedUrl.set(
              this.sanitizer.bypassSecurityTrustResourceUrl(embedLink),
            );
          }

          // Set the title dynamically
          this.title.setTitle(`${res.title}`);

          const description =
            this.sanitizer.sanitize(1, this.sanitizeHtml(res.description)) ||
            '';
          const truncatedDesc =
            description.length > 160
              ? description.substring(0, 157) + '...'
              : description;
          // Update meta description
          this.meta.updateTag({
            name: 'description',
            content: truncatedDesc,
          }),
            // Optional: Add Open Graph meta tags for social sharing
            this.meta.updateTag({
              property: 'og:title',
              content: res.title,
            });
          this.meta.updateTag({
            property: 'og:description',
            content: truncatedDesc,
          });
          this.meta.updateTag({
            property: 'og:url',
            content: `https://www.atc.com.eg/insights/${slug}`,
          });
          this.meta.updateTag({
            property: 'og:image',
            content:
              res.images[0]?.path ||
              'https://www.atc.com.eg/atc_group_white.jpg',
          });
          this.meta.updateTag({
            property: 'og:type',
            content: 'article',
          });
          this.meta.updateTag({
            property: 'og:site_name',
            content: 'ATC Group',
          });
          this.meta.updateTag({
            property: 'og:updated_time',
            content: res.updated_at,
          });
          this.meta.updateTag({
            property: 'og:author',
            content: 'ATCGroup',
          });
          this.meta.updateTag({
            property: 'og:published_time',
            content: res.created_at,
          });
          this.meta.updateTag({
            property: 'og:keywords',
            content: res.title,
          });

          this.meta.updateTag({
            property: 'og:article:published_time',
            content: res.created_at,
          });
          this.meta.updateTag({
            property: 'og:article:modified_time',
            content: res.updated_at,
          });
          this.meta.updateTag({
            property: 'og:article:author',
            content: 'ATCGroup',
          });
          this.meta.updateTag({
            property: 'og:article:tag',
            content: res.title,
          });
          this.meta.updateTag({
            rel: 'canonical',
            href: `https://www.atc.com.eg/insights/${slug}`,
          });
          this.meta.updateTag({
            name: 'twitter:card',
            content: res.title,
          });
          this.meta.updateTag({ name: 'twitter:title', content: res.title });
          this.meta.updateTag({
            name: 'twitter:description',
            content: truncatedDesc,
          });
          this.meta.updateTag({
            name: 'twitter:image',
            content:
              res.images[0]?.path ||
              'https://www.atc.com.eg/atc_group_white.jpg',
          });
          this.meta.updateTag({
            name: 'twitter:site',
            content: '@ATCGroup143796',
          });
          this.meta.updateTag({ name: 'robots', content: 'index, follow' });
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        },
      });
    }
  }

  // sanitizeHtml(html: string): SafeHtml {
  //   return this.sanitizer.bypassSecurityTrustHtml(html);
  // }
  sanitizeHtml(html: string): SafeHtml {
    const cleanedHtml = html.replace(/&nbsp;/g, ' ');
    return this.sanitizer.bypassSecurityTrustHtml(cleanedHtml);
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

  openLightbox(image: any) {
    const index = this.images().findIndex((img) => img.id === image.id);
    this.currentImageIndex.set(index);
    this.selectedImage.set(image);
  }

  closeLightbox(event?: MouseEvent) {
    if (event) event.stopPropagation();
    this.selectedImage.set(null);
  }

  prevImage(event: MouseEvent) {
    event.stopPropagation();
    const newIndex =
      (this.currentImageIndex() - 1 + this.images().length) %
      this.images().length;
    this.currentImageIndex.set(newIndex);
    this.selectedImage.set(this.images()[newIndex]);
  }

  nextImage(event: MouseEvent) {
    event.stopPropagation();
    const newIndex = (this.currentImageIndex() + 1) % this.images().length;
    this.currentImageIndex.set(newIndex);
    this.selectedImage.set(this.images()[newIndex]);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.selectedImage()) {
      switch (event.key) {
        case 'ArrowLeft':
          this.prevImage(new MouseEvent('click'));
          break;
        case 'ArrowRight':
          this.nextImage(new MouseEvent('click'));
          break;
        case 'Escape':
          this.closeLightbox();
          break;
      }
    }
  }
}
