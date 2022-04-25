import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadActorPreviewComponent } from './preview.component';

describe('RoadActorPreviewComponent', () => {
  let component: RoadActorPreviewComponent;
  let fixture: ComponentFixture<RoadActorPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadActorPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadActorPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
