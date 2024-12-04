import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalTaxationComponent } from './international-taxation.component';

describe('InternationalTaxationComponent', () => {
  let component: InternationalTaxationComponent;
  let fixture: ComponentFixture<InternationalTaxationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternationalTaxationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternationalTaxationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
