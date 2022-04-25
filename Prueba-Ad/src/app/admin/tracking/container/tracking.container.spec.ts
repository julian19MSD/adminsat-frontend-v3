import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingContainer } from './tracking.container';

describe('ContainerComponent', () => {
  let component: TrackingContainer;
  let fixture: ComponentFixture<TrackingContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
