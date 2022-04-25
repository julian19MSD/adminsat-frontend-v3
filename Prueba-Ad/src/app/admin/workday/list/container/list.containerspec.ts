import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkdayContainerComponent } from './list.container';

describe('WorkdayContainerComponent', () => {
  let component: WorkdayContainerComponent;
  let fixture: ComponentFixture<WorkdayContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkdayContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkdayContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
