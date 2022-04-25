import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkdayNoveltyComponent } from './novelty.component';

describe('WorkdayNoveltyComponent', () => {
  let component: WorkdayNoveltyComponent;
  let fixture: ComponentFixture<WorkdayNoveltyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkdayNoveltyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkdayNoveltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
