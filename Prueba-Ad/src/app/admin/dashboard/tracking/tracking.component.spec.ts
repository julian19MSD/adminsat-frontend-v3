import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTrackingComponent } from './tracking.component';

describe('DashboardTrackingComponent', () => {
  let component: DashboardTrackingComponent;
  let fixture: ComponentFixture<DashboardTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
