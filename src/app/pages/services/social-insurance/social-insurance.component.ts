import { Component } from '@angular/core';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../../shared/components/nav-bar/nav-bar.component';
import { ScrollToTopComponent } from '../../../shared/components/scroll-to-top/scroll-to-top.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-social-insurance',
  standalone: true,
  imports: [
    TopBarComponent,
    NavBarComponent,
    ScrollToTopComponent,
    FooterComponent,
  ],
  templateUrl: './social-insurance.component.html',
  styleUrl: './social-insurance.component.css',
})
export class SocialInsuranceComponent {}
