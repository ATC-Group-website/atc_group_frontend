import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsAndEventsComponent } from './news-and-events.component';

describe('NewsAndEventsComponent', () => {
  let component: NewsAndEventsComponent;
  let fixture: ComponentFixture<NewsAndEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsAndEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsAndEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
