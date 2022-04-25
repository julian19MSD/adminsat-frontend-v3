import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorRoadListContainer } from './list.container';

describe('ActorRoadListContainer', () => {
  let component: ActorRoadListContainer;
  let fixture: ComponentFixture<ActorRoadListContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActorRoadListContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorRoadListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
