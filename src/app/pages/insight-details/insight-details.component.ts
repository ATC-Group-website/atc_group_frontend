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
  videoURL: SafeResourceUrl = 'r';
  newDescription!: { text: SafeHtml; direction: string };
  sanitizer = inject(DomSanitizer);
  router = inject(Router);
  route = inject(ActivatedRoute);
  postsService = inject(PostsService);
  des: any;

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
          this.des = this.truncateAndAlign(this.post.description || '');
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

  // // Function to extract the video ID and sanitize the URL
  // getYouTubeUrl(videoUrl: string) {
  //   // Extract video ID from the YouTube URL (assuming URL format: https://www.youtube.com/watch?v=VIDEO_ID)
  //   const urlParts = new URL(videoUrl);
  //   const videoId = urlParts.searchParams.get('v'); // Extract the video ID

  //   if (videoId) {
  //     // Sanitize and create the embed URL
  //     this.videoURL = this.sanitizer.bypassSecurityTrustResourceUrl(
  //       `https://www.youtube.com/embed/${videoId}`,
  //     );
  //     console.log(this.videoURL);
  //   } else {
  //     console.error('Invalid YouTube URL');
  //     console.log(this.videoURL);
  //   }
  // }

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

  truncateAndAlign(description: string): { text: SafeHtml; direction: string } {
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

    // Truncate to the first 30 words
    const words = textContent.trim().split(/[\t ]+/);
    const truncatedText = words.slice(0, 700000).join(' ');
    const finalText =
      words.length > 700000 ? `${truncatedText}` : truncatedText;

    // Detect text direction
    const arabicRegex = /[\u0600-\u06FF]/;
    const direction = arabicRegex.test(textContent) ? 'rtl' : 'ltr';

    // Sanitize the result
    return {
      text: this.sanitizer.bypassSecurityTrustHtml(finalText),
      direction,
    };
  }
}
