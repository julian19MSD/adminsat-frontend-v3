import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationListContainer } from './list.container';

describe('NotificationListContainer', () => {
  let component: NotificationListContainer;
  let fixture: ComponentFixture<NotificationListContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationListContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
