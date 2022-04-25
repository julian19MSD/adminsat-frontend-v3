import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingSortComponent } from './sort.component';

describe('TrackingSortComponent', () => {
  let component: TrackingSortComponent;
  let fixture: ComponentFixture<TrackingSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
