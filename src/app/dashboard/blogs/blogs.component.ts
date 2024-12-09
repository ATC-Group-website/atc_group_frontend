import { Component } from '@angular/core';
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent {

}
