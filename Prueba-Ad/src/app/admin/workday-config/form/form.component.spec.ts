import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkdayConfigCreateComponent } from './form.component';

describe('WorkdayConfigCreateComponent', () => {
  let component: WorkdayConfigCreateComponent;
  let fixture: ComponentFixture<WorkdayConfigCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkdayConfigCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkdayConfigCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
