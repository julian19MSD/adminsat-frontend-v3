import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermanenceContainerComponent } from './list.container';

describe('PermanenceContainerComponent', () => {
  let component: PermanenceContainerComponent;
  let fixture: ComponentFixture<PermanenceContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermanenceContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermanenceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
