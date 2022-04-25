import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TpmsFilterComponent } from './filter.component';

describe('TpmsFilterComponent', () => {
  let component: TpmsFilterComponent;
  let fixture: ComponentFixture<TpmsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpmsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpmsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
