import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-carousel.component.html',
  styleUrl: './landing-carousel.component.css',
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class LandingCarouselComponent {
  images: string[] = ['home/egypt.webp', 'home/ksa.webp', 'home/uae.webp'];

  currentIndex = 0;
  direction: 'left' | 'right' = 'right';

  nextSlide() {
    this.direction = 'right';
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
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

  prevSlide() {
    this.direction = 'left';
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  goToSlide(index: number) {
    this.direction = index > this.currentIndex ? 'right' : 'left';
    this.currentIndex = index;
  }
}
