import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

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
  images = signal<string[]>([
    'home/egypt.webp',
    'home/ksa.webp',
    'home/uae.webp',
  ]);
  currentIndex = signal<number>(0);
  direction = signal<'left' | 'right'>('right');

  // Function to go to the next slide
  nextSlide() {
    this.direction.set('right');
    this.currentIndex.set((this.currentIndex() + 1) % this.images().length);
  }

  // Function to go to the previous slide
  prevSlide() {
    this.direction.set('left');
    this.currentIndex.set(
      (this.currentIndex() - 1 + this.images().length) % this.images().length,
    );
  }

  // Function to go to a specific slide
  goToSlide(index: number) {
    this.direction.set(index > this.currentIndex() ? 'right' : 'left');
    this.currentIndex.set(index);
  }
  // Scroll to a section
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
