import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkdayConfigListContainer } from './list.container';

describe('WorkdayConfigListContainer', () => {
  let component: WorkdayConfigListContainer;
  let fixture: ComponentFixture<WorkdayConfigListContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkdayConfigListContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkdayConfigListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
