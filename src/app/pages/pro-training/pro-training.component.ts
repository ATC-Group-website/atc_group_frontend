import { Component } from '@angular/core';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { ScrollToTopComponent } from '../../shared/components/scroll-to-top/scroll-to-top.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-pro-training',
  standalone: true,
  imports: [
    TopBarComponent,
    NavBarComponent,
    ScrollToTopComponent,
    FooterComponent,
    ImageModule,
  ],
  templateUrl: './pro-training.component.html',
  styleUrl: './pro-training.component.css',
})
export class ProTrainingComponent {}
