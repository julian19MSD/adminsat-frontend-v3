import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftAssignmentAlarmsDetailsComponent } from './shift-assignment-alarms-details.component';

describe('AlarmsDetailsComponent', () => {
  let component: ShiftAssignmentAlarmsDetailsComponent;
  let fixture: ComponentFixture<ShiftAssignmentAlarmsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftAssignmentAlarmsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftAssignmentAlarmsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
