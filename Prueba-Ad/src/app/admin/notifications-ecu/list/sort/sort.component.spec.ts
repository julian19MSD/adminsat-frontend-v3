import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationSortComponent } from './sort.component';

describe('NotificationSortComponent', () => {
  let component: NotificationSortComponent;
  let fixture: ComponentFixture<NotificationSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
