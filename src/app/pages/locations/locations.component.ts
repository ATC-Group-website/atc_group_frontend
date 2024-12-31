import { Component, inject, OnInit, signal } from '@angular/core';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [
    TopBarComponent,
    FooterComponent,
    NavBarComponent,
    CommonModule,
    RouterModule,
    LeafletMapComponent,
  ],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css',
})
export class LocationsComponent implements OnInit {
  activeTab = signal<string>('Egypt');
  selectedCountry = signal<any>(null);

  title = inject(Title);
  meta = inject(Meta);

  ngOnInit(): void {
    this.setMetaTags();

    this.setCountry('egypt');
  }

  setActiveTab(tab: string) {
    this.activeTab.set(tab);
  }

  getTabClass(tab: string): string {
    const baseClasses = 'flex-1 text-center';
    return this.activeTab() === tab ? `${baseClasses} bg-white ` : baseClasses;
  }

  countries = {
    egypt: {
      name: 'Egypt',
      center: [30.058695809364792, 31.223373390693418] as [number, number],
      zoom: 12,
      locations: [
        { lat: 30.021619278847268, lng: 31.216603792139374, label: 'Giza' },
        {
          lat: 30.096016626039706,
          lng: 31.339960124837365,
          label: 'Helioplis',
        },
        {
          lat: 31.222204427337942,
          lng: 29.949250676243615,
          label: 'Alexandria',
        },
        {
          lat: 30.034832123841937,
          lng: 31.21771473007488,
          label: 'Orman',
        },
      ],
    },
    ksa: {
      name: 'KSA',
      center: [24.516921473740936, 44.41538469399682] as [number, number],
      zoom: 6,
      locations: [
        { lat: 21.376704, lng: 39.875017, label: 'Mekkah' },
        { lat: 26.299960454044644, lng: 50.22017512513515, label: 'Al Khobar' },
        { lat: 21.52168102841136, lng: 39.18073648220928, label: 'Jeddah' },
        { lat: 24.67473903834323, lng: 46.69131345618128, label: 'Riyadh' },
      ],
    },
    uae: {
      name: 'UAE',
      center: [25.243775399355457, 55.3398187410331] as [number, number],
      zoom: 16,
      locations: [
        { lat: 25.243775399355457, lng: 55.3398187410331, label: 'Dubai' },
      ],
    },
  };

  setCountry(countryKey: keyof typeof this.countries) {
    this.selectedCountry.set(this.countries[countryKey]);
  }

  setMetaTags() {
    this.title.setTitle('Locations | ATC Group');
    this.meta.addTags([
      {
        name: 'description',
        content:
          'Find ATC Group - Ashraf Abdel Ghani offices in Egypt, Saudi Arabia, and the UAE. Explore our locations to connect with our experts in accounting, taxation, and financial consulting across the MENA region.',
      },
      { name: 'robots', content: 'index, follow' },
      {
        property: 'og:title',
        content: 'ATC Group',
      },
      {
        property: 'og:site_name',
        content: 'ATC Group',
      },
      {
        property: 'og:description',
        content:
          'Find ATC Group - Ashraf Abdel Ghani offices in Egypt, Saudi Arabia, and the UAE. Explore our locations to connect with our experts in accounting, taxation, and financial consulting across the MENA region.',
      },
      { property: 'og:url', content: 'https://www.atc.com.eg/locations' },
      {
        property: 'og:image',
        content: 'atc_group_white.jpg',
      },
      { property: 'og:type', content: 'website' },
      {
        name: 'twitter:card',
        content: 'atc_group_white.jpg',
      },
      {
        name: 'twitter:title',
        content: 'ATC Group',
      },
      {
        name: 'twitter:description',
        content:
          'Find ATC Group - Ashraf Abdel Ghani offices in Egypt, Saudi Arabia, and the UAE. Explore our locations to connect with our experts in accounting, taxation, and financial consulting across the MENA region.',
      },
      {
        name: 'twitter:image',
        content: 'atc_group_white.jpg',
      },
    ]);
  }
}
