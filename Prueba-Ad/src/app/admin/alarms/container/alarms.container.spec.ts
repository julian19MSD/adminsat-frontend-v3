import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmsContainer } from './alarms.container';

describe('AlarmsComponent', () => {
  let component: AlarmsContainer;
  let fixture: ComponentFixture<AlarmsContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmsContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmsContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
