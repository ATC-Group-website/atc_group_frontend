import { Component } from '@angular/core';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [TopBarComponent, NavBarComponent, FooterComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {}
