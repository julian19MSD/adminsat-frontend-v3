import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorRoadCreateComponent } from './form.component';

describe('ActorRoadCreateComponent', () => {
  let component: ActorRoadCreateComponent;
  let fixture: ComponentFixture<ActorRoadCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActorRoadCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorRoadCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
