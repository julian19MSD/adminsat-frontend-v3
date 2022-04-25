import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatingWindowsCreateComponent } from './control-installations-create.component';

describe('OperatingWindowsCreateComponent', () => {
  let component: OperatingWindowsCreateComponent;
  let fixture: ComponentFixture<OperatingWindowsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatingWindowsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatingWindowsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
