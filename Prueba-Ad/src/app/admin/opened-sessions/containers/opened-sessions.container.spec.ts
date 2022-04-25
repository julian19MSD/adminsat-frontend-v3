import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenedSessionsListContainer } from './opened-sessions.container';

describe('OpenedSessionsComponent', () => {
  let component: OpenedSessionsListContainer;
  let fixture: ComponentFixture<OpenedSessionsListContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenedSessionsListContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenedSessionsListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
