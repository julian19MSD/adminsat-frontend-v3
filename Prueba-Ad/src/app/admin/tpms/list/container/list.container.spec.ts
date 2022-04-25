import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TpmsListContainer } from './list.container';

describe('TpmsListContainer', () => {
  let component: TpmsListContainer;
  let fixture: ComponentFixture<TpmsListContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpmsListContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpmsListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
