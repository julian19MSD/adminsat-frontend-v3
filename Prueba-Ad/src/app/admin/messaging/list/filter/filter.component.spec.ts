import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagingFilterComponent } from './filter.component';

describe('MessagingFilterComponent', () => {
  let component: MessagingFilterComponent;
  let fixture: ComponentFixture<MessagingFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagingFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagingFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
