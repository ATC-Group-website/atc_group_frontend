import { Component, Inject, input, OnInit, PLATFORM_ID } from '@angular/core';
import { LeafletHelper } from '../leaflet.helper';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-leaflet-map',
  standalone: true,
  imports: [],
  templateUrl: './leaflet-map.component.html',
  styleUrl: './leaflet-map.component.css',
})
export class LeafletMapComponent implements OnInit {
  center = input<[number, number]>([0, 0]);
  zoom = input<number>(10);
  locations = input<{ lat: number; lng: number; label?: string }[]>([]);

  private leafletLib: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private leafletHelper: LeafletHelper,
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Load Leaflet dynamically
      this.leafletHelper
        .loadLeaflet()
        .then((leafletLib) => {
          // Ensure latLng exists in the loaded library
          if (leafletLib && typeof leafletLib.latLng === 'function') {
            this.initMap(leafletLib);
          } else {
          }
        })
        .catch((error) => {});
    }
  }

  private initMap(leafletLib: any) {
    const map = leafletLib.map('map').setView(this.center(), this.zoom());

    leafletLib
      .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap',
      })
      .addTo(map);
    const redSvgIcon = leafletLib.divIcon({
      className: 'custom-div-icon',
      html: `
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="red"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>`,
      iconSize: [24, 24],
      iconAnchor: [12, 24],
    });

    this.locations().forEach((location) => {
      const marker = leafletLib
        .marker([location.lat, location.lng], { icon: redSvgIcon })
        .addTo(map)
        .bindPopup(location.label);
    });
  }
}
