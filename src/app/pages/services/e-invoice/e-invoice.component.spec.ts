import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EInvoiceComponent } from './e-invoice.component';

describe('EInvoiceComponent', () => {
  let component: EInvoiceComponent;
  let fixture: ComponentFixture<EInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
