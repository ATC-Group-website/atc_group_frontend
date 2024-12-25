import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingAdvisoryComponent } from './accounting-advisory.component';

describe('AccountingAdvisoryComponent', () => {
  let component: AccountingAdvisoryComponent;
  let fixture: ComponentFixture<AccountingAdvisoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountingAdvisoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountingAdvisoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
