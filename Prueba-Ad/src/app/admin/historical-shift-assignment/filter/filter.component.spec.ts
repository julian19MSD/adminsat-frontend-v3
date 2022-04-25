import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalShiftAssignmentFilterComponent } from './filter.component';

describe('HistoricalShiftAssignmentFilterComponent', () => {
  let component: HistoricalShiftAssignmentFilterComponent;
  let fixture: ComponentFixture<HistoricalShiftAssignmentFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricalShiftAssignmentFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalShiftAssignmentFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
