import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkdayConfigSortComponent } from './sort.component';

describe('WorkdayConfigSortComponent', () => {
  let component: WorkdayConfigSortComponent;
  let fixture: ComponentFixture<WorkdayConfigSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkdayConfigSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkdayConfigSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
