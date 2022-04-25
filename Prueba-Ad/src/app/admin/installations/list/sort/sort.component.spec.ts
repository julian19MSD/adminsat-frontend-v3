import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationsSortComponent } from './sort.component';

describe('InstallationsSortComponent', () => {
  let component: InstallationsSortComponent;
  let fixture: ComponentFixture<InstallationsSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallationsSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationsSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
