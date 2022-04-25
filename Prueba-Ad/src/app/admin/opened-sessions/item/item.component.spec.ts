import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenedSessionItemComponent } from './item.component';

describe('OpenedSessionItemComponent', () => {
  let component: OpenedSessionItemComponent;
  let fixture: ComponentFixture<OpenedSessionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenedSessionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenedSessionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
