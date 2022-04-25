import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorTicketsCreateComponent } from './tickets.component';

describe('ActorTicketsCreateComponent', () => {
  let component: ActorTicketsCreateComponent;
  let fixture: ComponentFixture<ActorTicketsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActorTicketsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorTicketsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
