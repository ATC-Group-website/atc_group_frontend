import { Component } from '@angular/core';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../../shared/components/nav-bar/nav-bar.component';
import { ScrollToTopComponent } from '../../../shared/components/scroll-to-top/scroll-to-top.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-international-taxation',
  standalone: true,
  imports: [
    TopBarComponent,
    NavBarComponent,
    ScrollToTopComponent,
    FooterComponent,
  ],
  templateUrl: './international-taxation.component.html',
  styleUrl: './international-taxation.component.css',
})
export class InternationalTaxationComponent {}
