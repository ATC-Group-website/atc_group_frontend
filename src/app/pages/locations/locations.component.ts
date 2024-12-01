import { Component } from '@angular/core';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { ScrollToTopComponent } from '../../shared/components/scroll-to-top/scroll-to-top.component';
import { TabsComponent } from '../about-us/tabs/tabs.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
  ],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css',
})
export class LocationsComponent {
  activeTab: string = 'Egypt';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  getTabClass(tab: string): string {
    const baseClasses = 'flex-1 text-center';
    return this.activeTab === tab ? `${baseClasses} bg-white ` : baseClasses;
  }
}
