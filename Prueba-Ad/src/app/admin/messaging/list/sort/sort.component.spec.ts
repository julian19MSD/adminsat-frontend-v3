import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagingSortComponent } from './sort.component';

describe('MessagingSortComponent', () => {
  let component: MessagingSortComponent;
  let fixture: ComponentFixture<MessagingSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagingSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagingSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
