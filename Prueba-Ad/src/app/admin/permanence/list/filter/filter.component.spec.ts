import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermanenceFilterComponent } from './filter.component';

describe('PermanenceFilterComponent', () => {
  let component: PermanenceFilterComponent;
  let fixture: ComponentFixture<PermanenceFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermanenceFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermanenceFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
