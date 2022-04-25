import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcuAlarmDetailsComponent } from './details.component';

describe('EcuAlarmDetailsComponent', () => {
  let component: EcuAlarmDetailsComponent;
  let fixture: ComponentFixture<EcuAlarmDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcuAlarmDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcuAlarmDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
