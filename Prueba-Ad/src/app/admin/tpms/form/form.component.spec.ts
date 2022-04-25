import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TpmsCreateComponent } from './form.component';

describe('TpmsCreateComponent', () => {
  let component: TpmsCreateComponent;
  let fixture: ComponentFixture<TpmsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpmsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpmsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
