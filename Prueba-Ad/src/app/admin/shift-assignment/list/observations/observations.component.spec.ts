import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftAssignmentObservationsComponent } from './observations.component';

describe('ShiftAssignmentObservationsComponent', () => {
  let component: ShiftAssignmentObservationsComponent;
  let fixture: ComponentFixture<ShiftAssignmentObservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftAssignmentObservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftAssignmentObservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
