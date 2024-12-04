import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferPricingComponent } from './transfer-pricing.component';

describe('TransferPricingComponent', () => {
  let component: TransferPricingComponent;
  let fixture: ComponentFixture<TransferPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferPricingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
