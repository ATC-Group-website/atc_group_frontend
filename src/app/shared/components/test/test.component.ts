import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [SkeletonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent {}
