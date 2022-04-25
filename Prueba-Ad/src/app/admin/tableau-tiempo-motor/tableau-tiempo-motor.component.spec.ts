import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauTiempoMotorComponent } from './tableau-tiempo-motor.component';

describe('TableauTiempoMotorComponent', () => {
  let component: TableauTiempoMotorComponent;
  let fixture: ComponentFixture<TableauTiempoMotorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableauTiempoMotorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauTiempoMotorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
