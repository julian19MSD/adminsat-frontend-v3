import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalShiftAssignmentComponent } from './historical-shift-assignment.container';

describe('HistoricalShiftAssignmentComponent', () => {
  let component: HistoricalShiftAssignmentComponent;
  let fixture: ComponentFixture<HistoricalShiftAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricalShiftAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalShiftAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
