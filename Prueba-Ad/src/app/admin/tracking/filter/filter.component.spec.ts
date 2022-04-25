import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingFilterComponent } from './filter.component';

describe('TrackingFilterComponent', () => {
  let component: TrackingFilterComponent;
  let fixture: ComponentFixture<TrackingFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
