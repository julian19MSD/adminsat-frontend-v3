import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OpenedSessionsHeaderComponent} from './header.component';

describe('OpenedSessionsHeaderComponent', () => {
  let component: OpenedSessionsHeaderComponent;
  let fixture: ComponentFixture<OpenedSessionsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OpenedSessionsHeaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenedSessionsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
