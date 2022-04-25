import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagingItemComponent } from './messaging-item.component';

describe('MessagingItemComponent', () => {
  let component: MessagingItemComponent;
  let fixture: ComponentFixture<MessagingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagingItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
