import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftAssignmentDeparturesComponent } from './departures.component';

describe('ShiftAssignmentDeparturesComponent', () => {
  let component: ShiftAssignmentDeparturesComponent;
  let fixture: ComponentFixture<ShiftAssignmentDeparturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftAssignmentDeparturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftAssignmentDeparturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
