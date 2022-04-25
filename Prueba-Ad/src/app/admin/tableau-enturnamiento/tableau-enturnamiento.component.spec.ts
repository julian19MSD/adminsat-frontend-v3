import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauEnturnamientoComponent } from './tableau-enturnamiento.component';

describe('TableauEnturnamientoComponent', () => {
  let component: TableauEnturnamientoComponent;
  let fixture: ComponentFixture<TableauEnturnamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableauEnturnamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauEnturnamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
