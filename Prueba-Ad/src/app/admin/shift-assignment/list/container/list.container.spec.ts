import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftAssignmentListContainer } from './list.container';

describe('ShiftAssignmentComponent', () => {
  let component: ShiftAssignmentListContainer;
  let fixture: ComponentFixture<ShiftAssignmentListContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftAssignmentListContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftAssignmentListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
