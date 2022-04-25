import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcuAlarmContainerComponent } from './list.container';

describe('EcuAlarmContainerComponent', () => {
  let component: EcuAlarmContainerComponent;
  let fixture: ComponentFixture<EcuAlarmContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcuAlarmContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcuAlarmContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
