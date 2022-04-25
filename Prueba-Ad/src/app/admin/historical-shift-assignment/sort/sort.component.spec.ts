import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalShiftAssignmentSortComponent } from './sort.component';

describe('HistoricalShiftAssignmentSortComponent', () => {
  let component: HistoricalShiftAssignmentSortComponent;
  let fixture: ComponentFixture<HistoricalShiftAssignmentSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricalShiftAssignmentSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalShiftAssignmentSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
