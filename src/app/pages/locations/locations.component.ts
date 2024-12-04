import { Component, OnInit } from '@angular/core';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { ScrollToTopComponent } from '../../shared/components/scroll-to-top/scroll-to-top.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';

type CountryKey = 'saudiArabia' | 'egypt' | 'uae';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [
    TopBarComponent,
    FooterComponent,
    NavBarComponent,
    ScrollToTopComponent,
    CommonModule,
    RouterModule,
    LeafletMapComponent,
  ],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css',
})
export class LocationsComponent implements OnInit {
  activeTab: string = 'Egypt';
  selectedCountry: any;

  ngOnInit(): void {
    this.setCountry('egypt');
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  getTabClass(tab: string): string {
    const baseClasses = 'flex-1 text-center';
    return this.activeTab === tab ? `${baseClasses} bg-white ` : baseClasses;
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
    this.selectedCountry = this.countries[countryKey];
  }
}
