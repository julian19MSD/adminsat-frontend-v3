import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkdayRecalculateComponent } from './recalcular-jornada.component';

describe('WorkdayRecalculateComponent', () => {
  let component: WorkdayRecalculateComponent;
  let fixture: ComponentFixture<WorkdayRecalculateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkdayRecalculateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkdayRecalculateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
