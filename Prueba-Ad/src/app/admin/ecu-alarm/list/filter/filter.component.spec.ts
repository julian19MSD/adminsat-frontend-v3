import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcuAlarmFilterComponent } from './filter.component';

describe('EcuAlarmFilterComponent', () => {
  let component: EcuAlarmFilterComponent;
  let fixture: ComponentFixture<EcuAlarmFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcuAlarmFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcuAlarmFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
