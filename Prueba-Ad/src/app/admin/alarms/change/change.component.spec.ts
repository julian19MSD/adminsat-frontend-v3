import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAlarmsComponent } from './change.component';

describe('ChangeAlarmsComponent', () => {
  let component: ChangeAlarmsComponent;
  let fixture: ComponentFixture<ChangeAlarmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeAlarmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeAlarmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
