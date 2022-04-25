import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauAnalisisVelocidadComponent } from './tableau-analisis-velocidad.component';

describe('TableauAnalisisVelocidadComponent', () => {
  let component: TableauAnalisisVelocidadComponent;
  let fixture: ComponentFixture<TableauAnalisisVelocidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableauAnalisisVelocidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauAnalisisVelocidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
