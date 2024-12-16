import { Component, inject, OnInit } from '@angular/core';
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
import { TruncateHtmlPipe } from '../../shared/pipes/truncate-html.pipe';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-insight-details',
  standalone: true,
  imports: [
    NavBarComponent,
    TopBarComponent,
    FooterComponent,
    ScrollToTopComponent,
    TruncateHtmlPipe,
    LoadingComponent,
  ],
  templateUrl: './insight-details.component.html',
  styleUrl: './insight-details.component.css',
})
export class InsightDetailsComponent implements OnInit {
  isLoading = true;
  post!: any;
  videoURL: SafeResourceUrl = 'r';

  sanitizer = inject(DomSanitizer);
  router = inject(Router);
  route = inject(ActivatedRoute);
  postsService = inject(PostsService);

  constructor() {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (slug) {
      this.postsService.getPostBySlug(slug).subscribe({
        next: (res) => {
          console.log(res);
          this.post = res[1];
          this.isLoading = false;
        },
        error: (error) => {
          console.log(error);

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
}
