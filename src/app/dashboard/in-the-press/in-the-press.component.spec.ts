import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InThePressComponent } from './in-the-press.component';

describe('InThePressComponent', () => {
  let component: InThePressComponent;
  let fixture: ComponentFixture<InThePressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InThePressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InThePressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
