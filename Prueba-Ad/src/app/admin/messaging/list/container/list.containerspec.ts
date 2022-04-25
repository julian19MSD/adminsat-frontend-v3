import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagingContainerComponent } from './list.container';

describe('MessagingContainerComponent', () => {
  let component: MessagingContainerComponent;
  let fixture: ComponentFixture<MessagingContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagingContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
