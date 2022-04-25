import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftAssignmentSortComponent } from './sort.component';

describe('ShiftAssignmentSortComponent', () => {
  let component: ShiftAssignmentSortComponent;
  let fixture: ComponentFixture<ShiftAssignmentSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftAssignmentSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftAssignmentSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
