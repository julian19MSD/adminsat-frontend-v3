import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksContainer } from './tasks.container';

describe('TaskComponent', () => {
  let component: TasksContainer;
  let fixture: ComponentFixture<TasksContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
