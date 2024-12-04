import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemInspectionComponent } from './system-inspection.component';

describe('SystemInspectionComponent', () => {
  let component: SystemInspectionComponent;
  let fixture: ComponentFixture<SystemInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemInspectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
