import { Component } from '@angular/core';

interface slide {
  id: number;
  imageUrl: string;
}
@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent {}
