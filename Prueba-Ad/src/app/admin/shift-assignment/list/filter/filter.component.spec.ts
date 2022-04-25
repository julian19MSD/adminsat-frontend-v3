import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftAssignmentFilterComponent } from './filter.component';

describe('ShiftAssignmentFilterComponent', () => {
  let component: ShiftAssignmentFilterComponent;
  let fixture: ComponentFixture<ShiftAssignmentFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftAssignmentFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftAssignmentFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
