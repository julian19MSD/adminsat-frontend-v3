import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFleetContainer } from './my-fleet.container';

describe('MyFleetContainer', () => {
  let component: MyFleetContainer;
  let fixture: ComponentFixture<MyFleetContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFleetContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFleetContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
