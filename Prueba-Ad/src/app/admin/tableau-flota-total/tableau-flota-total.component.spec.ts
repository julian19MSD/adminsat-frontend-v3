import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauFlotaTotalComponent } from './tableau-flota-total.component';

describe('TableauFlotaTotalComponent', () => {
  let component: TableauFlotaTotalComponent;
  let fixture: ComponentFixture<TableauFlotaTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableauFlotaTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauFlotaTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
