import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-loading-card',
  standalone: true,
  imports: [SkeletonModule],
  templateUrl: './loading-card.component.html',
  styleUrl: './loading-card.component.css',
})
export class LoadingCardComponent {}
