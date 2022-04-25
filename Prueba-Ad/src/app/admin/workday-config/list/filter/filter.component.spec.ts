import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkdayConfigFilterComponent } from './filter.component';

describe('WorkdayConfigFilterComponent', () => {
  let component: WorkdayConfigFilterComponent;
  let fixture: ComponentFixture<WorkdayConfigFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkdayConfigFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkdayConfigFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
