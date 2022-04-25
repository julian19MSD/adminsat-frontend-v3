import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorRoadSortComponent } from './sort.component';

describe('ActorRoadSortComponent', () => {
  let component: ActorRoadSortComponent;
  let fixture: ComponentFixture<ActorRoadSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActorRoadSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorRoadSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
