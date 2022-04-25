import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TpmsItemComponent } from './tpms-item.component';

describe('TpmsItemComponent', () => {
  let component: TpmsItemComponent;
  let fixture: ComponentFixture<TpmsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpmsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpmsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
