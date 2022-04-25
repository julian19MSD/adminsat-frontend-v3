import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkdayConfigItemComponent } from './workday-config-item.component';

describe('WorkdayConfigItemComponent', () => {
  let component: WorkdayConfigItemComponent;
  let fixture: ComponentFixture<WorkdayConfigItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkdayConfigItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkdayConfigItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
