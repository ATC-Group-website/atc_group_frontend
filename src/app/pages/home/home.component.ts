import { Component } from '@angular/core';
import { TopBarComponent } from "../../shard/components/top-bar/top-bar.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TopBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

}
