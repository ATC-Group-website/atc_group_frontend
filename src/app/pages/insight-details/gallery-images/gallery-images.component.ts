import { Component, input, OnInit, signal } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-gallery-images',
  standalone: true,
  imports: [GalleriaModule],
  templateUrl: './gallery-images.component.html',
  styleUrl: './gallery-images.component.css',
})
export class GalleryImagesComponent implements OnInit {
  images = input<any[]>([]);

  responsiveOptions = signal<any[]>([
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ]);

  ngOnInit(): void {
    // console.log('GalleryImagesComponent');
    // console.log(this.images);
  }
}
