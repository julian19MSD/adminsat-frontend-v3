import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkdayFilterComponent } from './filter.component';

describe('WorkdayFilterComponent', () => {
  let component: WorkdayFilterComponent;
  let fixture: ComponentFixture<WorkdayFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkdayFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkdayFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
