import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftAssignmentItemComponent } from './shift-assignment-item.component';

describe('ShiftAssignmentItemComponent', () => {
  let component: ShiftAssignmentItemComponent;
  let fixture: ComponentFixture<ShiftAssignmentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftAssignmentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftAssignmentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
