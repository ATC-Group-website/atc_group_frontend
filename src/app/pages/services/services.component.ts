import { Component } from '@angular/core';
import { TopBarComponent } from "../../shared/components/top-bar/top-bar.component";
import { NavBarComponent } from "../../shared/components/nav-bar/nav-bar.component";

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [TopBarComponent, NavBarComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {

}
