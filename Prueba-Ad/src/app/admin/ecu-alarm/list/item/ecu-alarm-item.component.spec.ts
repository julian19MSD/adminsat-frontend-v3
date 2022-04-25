import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcuAlarmItemComponent } from './ecu-alarm-item.component';

describe('EcuAlarmItemComponent', () => {
  let component: EcuAlarmItemComponent;
  let fixture: ComponentFixture<EcuAlarmItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcuAlarmItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcuAlarmItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
