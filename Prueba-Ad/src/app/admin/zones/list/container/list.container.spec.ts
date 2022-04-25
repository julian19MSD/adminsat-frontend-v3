import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonesListContainer } from './list.container';

describe('ZonesListContainer', () => {
  let component: ZonesListContainer;
  let fixture: ComponentFixture<ZonesListContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonesListContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonesListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
