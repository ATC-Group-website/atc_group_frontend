import { Component } from '@angular/core';
import { ScrollTopModule } from 'primeng/scrolltop';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [ScrollTopModule],
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.css',
})
export class ScrollToTopComponent {}
