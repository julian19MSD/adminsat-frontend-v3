import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauJornadaLaboralComponent } from './tableau-jornada-laboral.component';

describe('TableauJornadaLaboralComponent', () => {
  let component: TableauJornadaLaboralComponent;
  let fixture: ComponentFixture<TableauJornadaLaboralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableauJornadaLaboralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauJornadaLaboralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
