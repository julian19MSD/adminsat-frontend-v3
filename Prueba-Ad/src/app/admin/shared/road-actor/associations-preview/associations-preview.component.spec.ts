import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadActorAssociationsPreviewComponent } from './associations-preview.component';

describe('RoadActorAssociationsPreviewComponent', () => {
  let component: RoadActorAssociationsPreviewComponent;
  let fixture: ComponentFixture<RoadActorAssociationsPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadActorAssociationsPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadActorAssociationsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
