import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountUpModule } from 'ngx-countup';
import { ScrollToTopComponent } from './shared/components/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CountUpModule, ScrollToTopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
