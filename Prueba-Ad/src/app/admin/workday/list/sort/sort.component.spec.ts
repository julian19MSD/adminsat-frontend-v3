import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkdaySortComponent } from './sort.component';

describe('WorkdaySortComponent', () => {
  let component: WorkdaySortComponent;
  let fixture: ComponentFixture<WorkdaySortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkdaySortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkdaySortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
