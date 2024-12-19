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
  }

  slides = [
    'https://mdbcdn.b-cdn.net/wp-content/themes/mdbootstrap4/content/en/_mdb5/standard/freebies/carousel-full-cover/assets/featured.jpg',
    'https://mdbcdn.b-cdn.net/wp-content/themes/mdbootstrap4/content/en/_mdb5/standard/freebies/carousel-full-cover/assets/featured.jpg',
    'https://mdbcdn.b-cdn.net/wp-content/themes/mdbootstrap4/content/en/_mdb5/standard/freebies/carousel-full-cover/assets/featured.jpg',
  ];

  currentSlide = 0;

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}
