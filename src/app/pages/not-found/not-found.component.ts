import { Component, inject, OnInit } from '@angular/core';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    TopBarComponent,
    NavBarComponent,
    FooterComponent,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent implements OnInit {
  title = inject(Title);
  meta = inject(Meta);
  location = inject(Location);

  ngOnInit(): void {
    this.setMetaTags();
  }
  goBack(): void {
    this.location.back();
  }

  setMetaTags() {
    this.title.setTitle('404 Not Found | ATC Group');
    this.meta.updateTag({ name: 'robots', content: 'noindex' });
  }
}
