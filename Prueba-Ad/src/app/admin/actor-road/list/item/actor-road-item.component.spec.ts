import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorRoadItemComponent } from './actor-road-item.component';

describe('ActorRoadItemComponent', () => {
  let component: ActorRoadItemComponent;
  let fixture: ComponentFixture<ActorRoadItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActorRoadItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorRoadItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
