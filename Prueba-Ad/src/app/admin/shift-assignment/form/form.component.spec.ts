import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftAssignmentCreateComponent } from './form.component';

describe('ShiftAssignmentCreateComponent', () => {
  let component: ShiftAssignmentCreateComponent;
  let fixture: ComponentFixture<ShiftAssignmentCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftAssignmentCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftAssignmentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
