import { Component, Input, OnInit } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-gallery-images',
  standalone: true,
  imports: [GalleriaModule],
  templateUrl: './gallery-images.component.html',
  styleUrl: './gallery-images.component.css',
})
export class GalleryImagesComponent implements OnInit {
  @Input() images: any[] = [];

  responsiveOptions: any[] = [
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
  ];

  ngOnInit(): void {
    console.log('GalleryImagesComponent');
    console.log(this.images);
  }
}
