import { Component } from '@angular/core';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { TestComponent } from '../../shared/components/test/test.component';
import { FooterComponent } from "../../shared/components/footer/footer.component";

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [TopBarComponent, NavBarComponent, FooterComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent {}
