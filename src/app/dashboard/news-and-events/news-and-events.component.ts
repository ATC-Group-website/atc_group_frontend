import { Component } from '@angular/core';
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-news-and-events',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './news-and-events.component.html',
  styleUrl: './news-and-events.component.css'
})
export class NewsAndEventsComponent {

}
