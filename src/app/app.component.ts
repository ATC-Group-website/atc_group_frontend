import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountUpModule } from 'ngx-countup';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CountUpModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
