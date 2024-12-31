import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
})
export class TabsComponent {
  activeTab = signal<string>('Driving Positive Change');

  setActiveTab(tab: string) {
    this.activeTab.set(tab);
  }

  getTabClass(tab: string): string {
    const baseClasses = 'flex-1 text-center';
    return this.activeTab() === tab ? `${baseClasses} bg-white ` : baseClasses;
  }
}
