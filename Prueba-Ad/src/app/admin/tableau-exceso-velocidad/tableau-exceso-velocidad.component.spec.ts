import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauExcesoVelocidadComponent } from './tableau-exceso-velocidad.component';

describe('TableauExcesoVelocidadComponent', () => {
  let component: TableauExcesoVelocidadComponent;
  let fixture: ComponentFixture<TableauExcesoVelocidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableauExcesoVelocidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauExcesoVelocidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
