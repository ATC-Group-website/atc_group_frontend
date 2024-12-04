import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../../shared/components/nav-bar/nav-bar.component';
import { ScrollToTopComponent } from '../../../shared/components/scroll-to-top/scroll-to-top.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-investment',
  standalone: true,
  imports: [
    TopBarComponent,
    NavBarComponent,
    ScrollToTopComponent,
    FooterComponent,
    CommonModule,
  ],
  templateUrl: './investment.component.html',
  styleUrl: './investment.component.css',
})
export class InvestmentComponent {
  openStates: boolean[] = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  ngOnInit(): void {
    if (this.isBrowser) {
      const panels = document.querySelectorAll('.panel');
      panels.forEach((panel, index) => {
        const element = panel as HTMLElement;
        if (this.openStates[index]) {
          element.style.maxHeight = `${element.scrollHeight}px`; // Set height for open panel
        } else {
          element.style.maxHeight = '0px'; // Collapse others
        }
      });
    }
  }

  toggleAccordion(index: number): void {
    const panel = document.querySelectorAll('.panel')[index] as HTMLElement;

    if (this.openStates[index]) {
      // Close the panel
      panel.style.maxHeight = '0px';
    } else {
      // Open the panel by setting maxHeight to the content's scrollHeight
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    }

    // Toggle the state
    this.openStates[index] = !this.openStates[index];
  }
}
