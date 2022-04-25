import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalShiftAssignmentItemComponent } from './historical-shift-assignment-item.component';

describe('HistoricalShiftAssignmentItemComponent', () => {
  let component: HistoricalShiftAssignmentItemComponent;
  let fixture: ComponentFixture<HistoricalShiftAssignmentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricalShiftAssignmentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalShiftAssignmentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
