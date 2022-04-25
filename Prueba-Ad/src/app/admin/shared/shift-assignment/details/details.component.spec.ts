import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftAssignmentDetailsComponent } from './details.component';

describe('ShiftAssignmentDetailsComponent', () => {
  let component: ShiftAssignmentDetailsComponent;
  let fixture: ComponentFixture<ShiftAssignmentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftAssignmentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftAssignmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
