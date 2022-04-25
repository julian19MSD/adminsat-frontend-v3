import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermanenceItemComponent } from './permanence-item.component';

describe('PermanenceItemComponent', () => {
  let component: PermanenceItemComponent;
  let fixture: ComponentFixture<PermanenceItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermanenceItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermanenceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
