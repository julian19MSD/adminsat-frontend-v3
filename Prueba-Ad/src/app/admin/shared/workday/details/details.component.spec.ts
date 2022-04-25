import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkdayDetailsComponent } from './details.component';

describe('WorkdayDetailsComponent', () => {
  let component: WorkdayDetailsComponent;
  let fixture: ComponentFixture<WorkdayDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkdayDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkdayDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
