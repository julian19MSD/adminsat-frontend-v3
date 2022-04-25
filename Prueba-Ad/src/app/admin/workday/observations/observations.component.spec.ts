import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkdayObservationsComponent } from './observations.component';

describe('WorkdayObservationsComponent', () => {
  let component: WorkdayObservationsComponent;
  let fixture: ComponentFixture<WorkdayObservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkdayObservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkdayObservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
