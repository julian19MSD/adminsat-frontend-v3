import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationsCreateComponent } from './form.component';

describe('InstallationsCreateComponent', () => {
  let component: InstallationsCreateComponent;
  let fixture: ComponentFixture<InstallationsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallationsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
