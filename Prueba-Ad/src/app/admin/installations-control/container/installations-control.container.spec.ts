import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationsControlContainer } from './installations-control.container';

describe('InstallationsControlContainer', () => {
  let component: InstallationsControlContainer;
  let fixture: ComponentFixture<InstallationsControlContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallationsControlContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationsControlContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
