import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkdayItemComponent } from './workday-item.component';

describe('WorkdayItemComponent', () => {
  let component: WorkdayItemComponent;
  let fixture: ComponentFixture<WorkdayItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkdayItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkdayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
