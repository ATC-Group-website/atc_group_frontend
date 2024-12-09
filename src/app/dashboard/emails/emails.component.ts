import { Component } from '@angular/core';
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-emails',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './emails.component.html',
  styleUrl: './emails.component.css'
})
export class EmailsComponent {

}
