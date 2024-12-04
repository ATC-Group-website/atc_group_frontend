import { Component } from '@angular/core';
import { TopBarComponent } from "../../../shared/components/top-bar/top-bar.component";
import { NavBarComponent } from "../../../shared/components/nav-bar/nav-bar.component";
import { ScrollToTopComponent } from "../../../shared/components/scroll-to-top/scroll-to-top.component";
import { FooterComponent } from "../../../shared/components/footer/footer.component";

@Component({
  selector: 'app-transfer-pricing',
  standalone: true,
  imports: [TopBarComponent, NavBarComponent, ScrollToTopComponent, FooterComponent],
  templateUrl: './transfer-pricing.component.html',
  styleUrl: './transfer-pricing.component.css'
})
export class TransferPricingComponent {

}
