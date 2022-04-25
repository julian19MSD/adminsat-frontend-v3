import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauTPMSComponent } from './tableau-tpms.component';

describe('TableauTPMSComponent', () => {
  let component: TableauTPMSComponent;
  let fixture: ComponentFixture<TableauTPMSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableauTPMSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauTPMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
